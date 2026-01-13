import React, { createContext, useContext, useState, useEffect } from 'react';

type WeatherCondition = 'clear' | 'clouds' | 'rain' | 'storm' | 'snow' | 'night';

interface WeatherContextType {
    condition: WeatherCondition;
    temp: number | null;
    location: string | null;
    isNight: boolean;
    setCondition: (condition: WeatherCondition) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [condition, setCondition] = useState<WeatherCondition>('clear');
    const [temp, setTemp] = useState<number | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [isNight, setIsNight] = useState(false);

    const userCoords = useRef<{ lat: number; lon: number } | null>(null);

    useEffect(() => {
        const fetchWeather = async (lat?: number, lon?: number) => {
            const finalLat = lat ?? userCoords.current?.lat;
            const finalLon = lon ?? userCoords.current?.lon;

            try {
                // Detect Day/Night based on local time
                const hour = new Date().getHours();
                const nightMode = hour < 6 || hour > 18;
                setIsNight(nightMode);

                // Construct URL
                const query = (finalLat && finalLon) ? `${finalLat},${finalLon}` : '';
                const response = await fetch(`https://wttr.in/${query}?format=j1`);

                if (!response.ok) throw new Error('Weather fetch failed');

                const data = await response.json();
                const current = data.current_condition[0];
                const weatherDesc = current.weatherDesc[0].value.toLowerCase();
                const currentTemp = parseInt(current.temp_C);

                setTemp(currentTemp);
                setLocation(data.nearest_area[0].areaName[0].value);

                // Map description to our conditions
                if (nightMode) {
                    setCondition('night');
                } else if (weatherDesc.includes('storm')) {
                    setCondition('storm');
                } else if (weatherDesc.includes('rain') || weatherDesc.includes('drizzle')) {
                    setCondition('rain');
                } else if (weatherDesc.includes('cloud') || weatherDesc.includes('overcast')) {
                    setCondition('clouds');
                } else if (weatherDesc.includes('snow')) {
                    setCondition('snow');
                } else {
                    setCondition('clear');
                }
            } catch (error) {
                console.error('Weather Detection Error:', error);
                // Fallback to time-based only
                const hour = new Date().getHours();
                setCondition(hour < 6 || hour > 18 ? 'night' : 'clear');
                setIsNight(hour < 6 || hour > 18);
            }
        };

        // Try Geolocation FIRST
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    userCoords.current = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    };
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                () => fetchWeather()
            );
        } else {
            fetchWeather();
        }

        // Refresh every 30 minutes
        const interval = setInterval(() => fetchWeather(), 1800000);
        return () => clearInterval(interval);
    }, []);

    return (
        <WeatherContext.Provider value={{ condition, temp, location, isNight, setCondition }}>
            <div className={`weather-root ${condition} ${isNight ? 'is-night' : ''}`}>
                {children}
            </div>
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (context === undefined) {
        throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
};
