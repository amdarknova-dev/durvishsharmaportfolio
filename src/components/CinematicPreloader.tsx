import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicPreloaderProps {
    onComplete: () => void;
}

const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('INITIALIZING...');
    const [showCurtain, setShowCurtain] = useState(true);

    // Loading simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.random() * 2;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    // Text updates based on progress
    useEffect(() => {
        if (progress < 30) setLoadingText('INITIALIZING SYSTEM...');
        else if (progress < 60) setLoadingText('LOADING ASSETS...');
        else if (progress < 90) setLoadingText('COMPILING SHADERS...');
        else setLoadingText('ACCESS GRANTED');
    }, [progress]);

    // Completion handler
    useEffect(() => {
        if (progress === 100) {
            // Delay slightly to show "ACCESS GRANTED" or "100%"
            const timeout = setTimeout(() => {
                setShowCurtain(false); // Trigger exit animation
                // We wait for the exit animation to finish before unmounting (handled by AnimatePresence in parent usually, or we can just callback after delay)
                setTimeout(onComplete, 1500); // 1.5s for the shutter animation
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [progress, onComplete]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            <AnimatePresence>
                {showCurtain && (
                    <>
                        {/* Top Shutter */}
                        <motion.div
                            initial={{ y: 0 }}
                            exit={{ y: '-100%', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
                            className="absolute top-0 left-0 w-full h-1/2 bg-black flex items-end justify-center pb-2 border-b border-primary/20 z-20"
                        >
                        </motion.div>

                        {/* Bottom Shutter */}
                        <motion.div
                            initial={{ y: 0 }}
                            exit={{ y: '100%', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
                            className="absolute bottom-0 left-0 w-full h-1/2 bg-black flex items-start justify-center pt-2 border-t border-primary/20 z-20"
                        >
                        </motion.div>

                        {/* Content overlaid on shutters (or inside them if we want them to split) */}
                        {/* We want the content to fade out as shutters open, or split with them.
                Let's put content in a separate container that fades out.
            */}
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.5 } }}
                            className="absolute z-30 flex flex-col items-center justify-center w-full h-full"
                        >
                            <div className="text-center">
                                <motion.div
                                    initial={{ opacity: 0, letterSpacing: '0.2em' }}
                                    animate={{ opacity: 1, letterSpacing: '0.5em' }}
                                    transition={{ duration: 1 }}
                                    className="mb-4"
                                >
                                    <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-widest">
                                        Durvish Sharma
                                    </h1>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="text-primary tracking-[0.3em] text-sm md:text-base font-mono mb-12"
                                >
                                    CINEMATIC PORTFOLIO
                                </motion.div>

                                {/* Sci-fi Loader */}
                                <div className="w-64 md:w-96 h-1 bg-gray-800 rounded-full overflow-hidden relative">
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-primary box-shadow-glow"
                                        style={{ width: `${progress}%`, boxShadow: '0 0 20px #22c55e' }}
                                    />
                                </div>

                                <div className="mt-4 flex justify-between w-64 md:w-96 text-xs text-gray-500 font-mono">
                                    <span>{loadingText}</span>
                                    <span>{Math.floor(progress)}%</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CinematicPreloader;
