import React, { useEffect } from 'react';
import { useSound } from '@/context/SoundContext';

const AmbientSound = () => {
    const { playType } = useSound();

    useEffect(() => {
        const handleKeyDown = () => {
            playType();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [playType]);

    // Ambient drone is handled by SoundContext's internal useEffect on first interaction

    return null; // This component handles side effects only
};

export default AmbientSound;
