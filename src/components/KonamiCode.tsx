import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useHack } from '@/context/HackContext';

const SEQUENCE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

const KonamiCode = () => {
    const [keys, setKeys] = useState<string[]>([]);
    const { toast } = useToast();
    const { setThemeMode, setGravity, setGlowIntensity } = useHack();

    const handleActivation = React.useCallback(() => {
        // Reset keys
        setKeys([]);

        // Unlock everything
        toast({
            title: "CHEAT CODE ACTIVATED",
            description: "Super Developer Mode Unlocked. Matrix Logic Applied.",
            className: "bg-green-900 border-green-500 text-green-100 font-mono tracking-widest",
            duration: 6000,
        });

        // "Glitch" the site via HackContext
        setThemeMode('matrix');
        setGravity(0.5); // Floatier
        setGlowIntensity(2.0); // Maximum Glow

        // Add a temporary glitch class to body for CSS animations (shake effect)
        document.body.classList.add('glitch-active');
        setTimeout(() => {
            document.body.classList.remove('glitch-active');
        }, 1000);
    }, [toast, setThemeMode, setGravity, setGlowIntensity]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setKeys((prev) => {
                const newKeys = [...prev, e.key];
                if (newKeys.length > SEQUENCE.length) {
                    newKeys.shift();
                }
                return newKeys;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (keys.join(',') === SEQUENCE.join(',')) {
            handleActivation();
        }
    }, [keys, handleActivation]);

    return null; // Invisible component
};

export default KonamiCode;
