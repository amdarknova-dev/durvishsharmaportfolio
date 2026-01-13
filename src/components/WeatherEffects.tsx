import React, { useMemo } from 'react';
import { useWeather } from '@/context/WeatherContext';

const WeatherEffects = () => {
    const { condition } = useWeather();

    const raindrops = useMemo(() => {
        if (condition !== 'rain' && condition !== 'storm') return [];
        return Array.from({ length: 60 }).map((_, i) => ({
            left: `${Math.random() * 100}%`,
            duration: `${0.4 + Math.random() * 0.8}s`,
            delay: `${Math.random() * 2}s`,
            opacity: 0.1 + Math.random() * 0.3
        }));
    }, [condition]);

    const ripples = useMemo(() => {
        if (condition !== 'rain' && condition !== 'storm') return [];
        return Array.from({ length: 15 }).map((_, i) => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 5}s`,
            scale: 0.5 + Math.random() * 1.5
        }));
    }, [condition]);

    return (
        <>
            {(condition === 'rain' || condition === 'storm') && (
                <div className="rain-overlay">
                    {raindrops.map((drop, i) => (
                        <div
                            key={i}
                            className="raindrop"
                            style={{
                                left: drop.left,
                                animationDuration: drop.duration,
                                animationDelay: drop.delay,
                                opacity: drop.opacity
                            }}
                        />
                    ))}
                    {ripples.map((ripple, i) => (
                        <div
                            key={`ripple-${i}`}
                            className="weather-ripple"
                            style={{
                                left: ripple.left,
                                top: ripple.top,
                                animationDelay: ripple.delay,
                                transform: `scale(${ripple.scale})`
                            }}
                        />
                    ))}
                </div>
            )}

            {condition === 'storm' && <div className="thunder-overlay" />}
        </>
    );
};

export default WeatherEffects;
