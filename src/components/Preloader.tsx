import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techPhrases = [
    "INITIALIZING_CORE_SYSTEMS...",
    "LOADING_ASSETS...",
    "CALIBRATING_OPTICS...",
    "ESTABLISHING_SECURE_CONNECTION...",
    "RENDERING_VIRTUAL_ENVIRONMENTS...",
    "OPTIMIZING_PHYSICS_ENGINE...",
    "SYNCING_WITH_SATELLITE_UPLINK...",
    "DECRYPTING_SECURE_DATA...",
    "SYSTEM_READY."
];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Progress Timer
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                // Random increment for realistic feel
                const increment = Math.random() * 2.5;
                return Math.min(prev + increment, 100);
            });
        }, 40); // Approx 2-3 seconds total

        // Phrase Timer
        const phraseInterval = setInterval(() => {
            setCurrentPhraseIndex(prev => {
                if (prev >= techPhrases.length - 1) {
                    clearInterval(phraseInterval);
                    return prev;
                }
                return prev + 1;
            });
        }, 300);

        const completeTimeout = setTimeout(() => {
            onComplete();
        }, 2800); // Slightly longer than progress to ensure 100% shows

        return () => {
            clearInterval(progressInterval);
            clearInterval(phraseInterval);
            clearTimeout(completeTimeout);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* Background Grid/Noise (Optional texture) */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-start gap-4">
                {/* Main large percentage */}
                <div className="text-8xl md:text-9xl font-black text-white/10 tracking-tighter self-end select-none font-mono">
                    {Math.floor(progress).toString().padStart(3, '0')}%
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-1 bg-white/10 overflow-hidden relative">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(34,197,94,0.8)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Tech Text */}
                <div className="font-mono text-xs md:text-sm text-primary/80 h-6">
                    <span className="mr-2 text-white/40">{`>`}</span>
                    {techPhrases[currentPhraseIndex]}
                    <span className="animate-pulse inline-block ml-1 w-2 h-4 bg-primary align-middle"></span>
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
