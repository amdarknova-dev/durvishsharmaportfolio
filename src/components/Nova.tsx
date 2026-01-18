import React, { useEffect, useState } from 'react';
import { Mic, Activity, Keyboard } from 'lucide-react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useNova } from '@/hooks/useNova';

const Nova = () => {
    const { isListening, transcript, response, startListening, runCommand } = useNova();
    const controls = useAnimation();
    const [showInput, setShowInput] = useState(false);
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        if (isListening) {
            controls.start({
                scale: [1, 1.2, 1],
                borderColor: ["rgba(0, 113, 227, 0.4)", "rgba(0, 113, 227, 0.8)", "rgba(0, 113, 227, 0.4)"],
                boxShadow: ["0 0 0px rgba(0, 113, 227, 0)", "0 0 20px rgba(0, 113, 227, 0.6)", "0 0 0px rgba(0, 113, 227, 0)"],
                transition: { duration: 1.5, repeat: Infinity }
            });
        } else {
            controls.stop();
            controls.set({ scale: 1, borderColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px rgba(0,0,0,0)" });
        }
    }, [isListening, controls]);

    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim()) {
            runCommand(inputText);
            setInputText('');
            // Optional: close input or keep open? Keep open for follow up.
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 hidden md:flex 2xl:hidden flex-col items-start gap-2">

            {/* Transcript / Response Bubble */}
            <AnimatePresence>
                {(transcript || response) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="mb-2 p-3 rounded-2xl glass-premium border-primary/20 bg-black/60 backdrop-blur-md max-w-[250px]"
                    >
                        {transcript && <p className="text-xs text-muted-foreground mb-1">"{transcript}"</p>}
                        {response && <p className="text-sm font-medium text-primary shadow-glow">{response}</p>}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controls Row */}
            <div className="flex items-center gap-2">

                {/* Text Input Toggle */}
                <AnimatePresence>
                    {showInput ? (
                        <motion.form
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 200, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            onSubmit={handleTextSubmit}
                            className="overflow-hidden"
                        >
                            <input
                                autoFocus
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Command Nova..."
                                className="w-full h-10 px-3 rounded-full bg-black/60 border border-white/10 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors backdrop-blur-md"
                                onBlur={() => !inputText && setShowInput(false)}
                            />
                        </motion.form>
                    ) : (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowInput(true)}
                            className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-white border-white/5 hover:bg-white/5"
                        >
                            <Keyboard className="w-4 h-4" />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Main Mic Button */}
                <motion.button
                    animate={controls}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startListening}
                    className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${isListening ? 'bg-primary/20 text-primary border-primary' : 'glass bg-black/40 text-muted-foreground hover:text-foreground border-white/10'
                        } border backdrop-blur-xl`}
                    aria-label="Activate Nova Voice Assistant"
                >
                    {isListening ? (
                        <Activity className="w-6 h-6 animate-pulse" />
                    ) : (
                        <div className="relative">
                            <Mic className="w-6 h-6" />
                            {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping opacity-75" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" /> */}
                        </div>
                    )}
                </motion.button>

                {/* Label */}
                {/* <span className="text-[10px] theme-transition font-mono tracking-widest text-muted-foreground ml-3 uppercase opacity-50">
                    NOVA AI
                </span> */}
            </div>

            <div className="flex items-center gap-2 ml-1">
                <span className="text-[10px] theme-transition font-mono tracking-widest text-muted-foreground uppercase opacity-50">
                    NOVA AI
                </span>
            </div>
        </div>
    );
};

export default Nova;
