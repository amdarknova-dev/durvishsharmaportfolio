import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'default' | 'cyberpunk' | 'matrix' | 'sunset' | 'ocean' | 'cherry' | 'gold';

export type UserType = 'guest' | 'user' | 'admin';

type HackContextType = {
    gravity: number; // 0.1 to 2.0
    setGravity: (val: number) => void;
    glowIntensity: number; // 0.1 to 2.0
    setGlowIntensity: (val: number) => void;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    isAdmin: boolean;
    setIsAdmin: (val: boolean) => void;
    isOverclocked: boolean;
    toggleOverclock: () => void;
    userType: UserType;
    setUserType: (type: UserType) => void;
    username: string;
    setUsername: (name: string) => void;
    logout: () => void;
};

const HackContext = createContext<HackContextType | undefined>(undefined);

export const useHack = () => {
    const context = useContext(HackContext);
    if (!context) {
        throw new Error('useHack must be used within a HackProvider');
    }
    return context;
};

export const HackProvider = ({ children }: { children: React.ReactNode }) => {
    const [gravity, setGravity] = useState(1);
    const [glowIntensity, setGlowIntensity] = useState(1);
    const [themeMode, setThemeMode] = useState<ThemeMode>('default');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOverclocked, setIsOverclocked] = useState(false);
    const [userType, setUserType] = useState<UserType>('guest');
    const [username, setUsername] = useState('');

    // Load user data from localStorage on mount
    useEffect(() => {
        const savedUserType = localStorage.getItem('userType') as UserType;
        const savedUsername = localStorage.getItem('username');
        if (savedUserType) setUserType(savedUserType);
        if (savedUsername) setUsername(savedUsername);
        if (savedUserType === 'admin') setIsAdmin(true);
    }, []);

    // Save user data to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('userType', userType);
        localStorage.setItem('username', username);
    }, [userType, username]);

    const logout = () => {
        setUserType('guest');
        setUsername('');
        setIsAdmin(false);
        localStorage.removeItem('userType');
        localStorage.removeItem('username');
    };

    const toggleOverclock = () => {
        setIsOverclocked(prev => !prev);
    };

    // Apply Overclock Effects
    useEffect(() => {
        if (isOverclocked) {
            document.body.classList.add('overclocked');
            // Force theme change temporarily
            const root = document.documentElement;
            root.style.setProperty('--primary', '0 100% 50%'); // Pure Red
            root.style.setProperty('--accent', '300 100% 50%'); // Glitch Magenta
        } else {
            document.body.classList.remove('overclocked');
            // Trigger theme re-apply
            setThemeMode(prev => prev); // This might not trigger effect if value is same, so we might need to manually call theme logic or just rely on the existing theme effect to run if we reset vars.
            // Actually, the existing theme effect runs on 'themeMode' change. 
            // We should just re-run the theme application logic.
            // A simple way is to reset the styles to empty first then letting the other effect take over, or just force a re-render.

            // Let's refactor the theme effect to also depend on isOverclocked so it re-runs when overclock turns off.
        }
    }, [isOverclocked]);

    // Apply Theme Changes
    useEffect(() => {
        // If overclocked, skip normal theme application (handled above or we merge logic)
        if (isOverclocked) return;

        const root = document.documentElement;

        // Reset first
        root.style.removeProperty('--primary');
        root.style.removeProperty('--primary-foreground');
        root.style.removeProperty('--accent');

        switch (themeMode) {
            case 'cyberpunk':
                // Pink/Cyan
                // Using HSL values for --primary: 310 100% 50% (Pink)
                root.style.setProperty('--primary', '326 100% 60%'); // Neon Pink
                root.style.setProperty('--accent', '190 100% 50%'); // Cyan
                break;
            case 'matrix':
                // Green/Black
                root.style.setProperty('--primary', '142 76% 36%'); // Green
                root.style.setProperty('--accent', '142 76% 50%'); // Brighter Green
                break;
            case 'sunset':
                // Orange/Purple
                root.style.setProperty('--primary', '25 100% 50%'); // Orange
                root.style.setProperty('--accent', '270 100% 60%'); // Purple
                break;
            case 'ocean':
                // Deep Blue/Teal
                root.style.setProperty('--primary', '210 100% 50%'); // Electric Blue
                root.style.setProperty('--accent', '180 100% 50%'); // Teal
                break;
            case 'cherry':
                // Red/Hot Pink
                root.style.setProperty('--primary', '350 100% 60%'); // Bright Red
                root.style.setProperty('--accent', '320 100% 60%'); // Hot Pink
                break;
            case 'gold':
                // Gold/Yellow
                root.style.setProperty('--primary', '45 100% 60%'); // Gold
                root.style.setProperty('--accent', '30 100% 50%'); // Amber
                break;
            default:
                // Default Green
                root.style.setProperty('--primary', '142.1 76.2% 36.3%');
                root.style.setProperty('--accent', '142.1 76.2% 36.3%');
                break;
        }

    }, [themeMode, isOverclocked]);

    return (
        <HackContext.Provider value={{
            gravity, setGravity,
            glowIntensity, setGlowIntensity,
            themeMode, setThemeMode,
            isAdmin, setIsAdmin,
            isOverclocked, toggleOverclock,
            userType, setUserType,
            username, setUsername,
            logout
        }}>
            {children}
        </HackContext.Provider>
    );
};
