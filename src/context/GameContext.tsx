import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameContextType {
    isUnlocked: boolean;
    unlockGames: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        const unlocked = localStorage.getItem('portfolio_games_unlocked') === 'true';
        if (unlocked) setIsUnlocked(true);
    }, []);

    const unlockGames = () => {
        setIsUnlocked(true);
        localStorage.setItem('portfolio_games_unlocked', 'true');
    };

    return (
        <GameContext.Provider value={{ isUnlocked, unlockGames }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGames = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGames must be used within a GameProvider');
    }
    return context;
};
