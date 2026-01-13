import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clapperboard } from 'lucide-react';

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setShow(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center p-6"
                >
                    <div className="relative">
                        {/* Animated Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all duration-700 animate-pulse" />
                                <div className="w-24 h-24 rounded-3xl glass border border-white/10 flex items-center justify-center relative z-10">
                                    <Clapperboard className="w-12 h-12 text-primary" />
                                </div>
                            </div>

                            <div className="text-center space-y-2">
                                <h1 className="text-3xl font-bold text-white tracking-widest uppercase">
                                    Nexus <span className="text-primary italic">OS</span>
                                </h1>
                                <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em] font-mono">
                                    Initializing Cinematic Modules
                                </p>
                            </div>
                        </motion.div>

                        {/* Progress Bar */}
                        <div className="mt-16 w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-primary glow-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.2 }}
                            />
                        </div>

                        {/* Loading Text */}
                        <div className="mt-4 flex flex-col items-center">
                            <span className="text-[10px] text-gray-500 font-mono">
                                {progress.toFixed(0)}% COMPLETE
                            </span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-[8px] text-primary/60 uppercase tracking-widest mt-2"
                            >
                                System Calibration in Progress
                            </motion.span>
                        </div>
                    </div>

                    {/* Background Decorative Grid */}
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)]" />
                        <div className="w-full h-full bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
