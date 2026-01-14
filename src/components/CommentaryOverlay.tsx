import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommentary } from '@/context/CommentaryContext';
import { Headset, X } from 'lucide-react';

const CommentaryOverlay = () => {
    const { isCommentaryOpen, activeMessage, toggleCommentary } = useCommentary();
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        if (isCommentaryOpen && activeMessage) {
            let i = 0;
            setDisplayText('');
            const timer = setInterval(() => {
                if (i < activeMessage.length) {
                    setDisplayText((prev) => prev + activeMessage.charAt(i));
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 30)
            return () => clearInterval(timer);
        }
    }, [isCommentaryOpen, activeMessage]);

    return (
        <AnimatePresence>
            {isCommentaryOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="fixed bottom-10 right-10 z-[10000] w-[300px] md:w-[350px] mb-24 md:mb-0 mr-4 md:mr-0"
                >
                    <div className="relative glass-dark border border-primary/30 rounded-[24px] overflow-hidden p-6 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/20 rounded-lg">
                                    <Headset className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-primary uppercase font-bold tracking-widest font-mono">Director Mode</p>
                                    <p className="text-[8px] text-gray-400 font-mono italic">Transmitting thought-stream...</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleCommentary}
                                className="p-1.5 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X className="w-3 h-3 text-gray-500" />
                            </button>
                        </div>

                        {/* Text Area */}
                        <div className="min-h-[80px]">
                            <p className="text-sm text-gray-200 leading-relaxed font-serif italic">
                                "{displayText}"
                            </p>
                        </div>

                        {/* Waveform Animation */}
                        <div className="flex gap-1 mt-4 h-4 items-end">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [4, 12, 4] }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                        ease: "easeInOut"
                                    }}
                                    className="w-1 bg-primary/40 rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommentaryOverlay;
