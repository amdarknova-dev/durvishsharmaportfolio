import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';
import { useSound } from '@/context/SoundContext';

const KeyboardShortcuts = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { playClick } = useSound();

    const shortcuts = [
        { key: 'Ctrl + M', description: 'Show keyboard shortcuts' },
        { key: 'Ctrl + K', description: 'Open command center' },
        { key: 'Esc', description: 'Close modals/dialogs' },
        { key: '↑ ↓', description: 'Navigate command center' },
        { key: 'Enter', description: 'Select/Confirm' },
        { key: 'H', description: 'Go to home' },
        { key: 'P', description: 'Go to projects' },
        { key: 'C', description: 'Go to contact' },
        { key: 'B', description: 'Go to blog' },
        { key: 'L', description: 'Go to login' },
        { key: 'Ctrl + /', description: 'Toggle developer console' },
        { key: 'Ctrl + Shift + D', description: 'Toggle dark mode' },
    ];

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Show shortcuts with ?
            if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                setIsOpen(true);
                playClick();
            }

            // Close with Escape
            if (e.key === 'Escape') {
                setIsOpen(false);
            }

            // Navigation shortcuts
            if (!e.ctrlKey && !e.metaKey && !isInputFocused()) {
                switch (e.key.toLowerCase()) {
                    case 'h':
                        window.location.hash = '#home';
                        break;
                    case 'p':
                        window.location.hash = '#projects';
                        break;
                    case 'c':
                        window.location.hash = '#contact';
                        break;
                    case 'b':
                        window.location.href = '/#/blog';
                        break;
                    case 'l':
                        window.location.href = '/#/login';
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [playClick]);

    const isInputFocused = () => {
        const activeElement = document.activeElement;
        return activeElement?.tagName === 'INPUT' ||
            activeElement?.tagName === 'TEXTAREA' ||
            activeElement?.getAttribute('contenteditable') === 'true';
    };

    return (
        <>
            {/* Floating Help Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
                onClick={() => {
                    setIsOpen(true);
                    playClick();
                }}
                className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-full flex items-center justify-center text-primary transition-all hover:scale-110 group"
                title="Keyboard Shortcuts (?)"
            >
                <Keyboard className="w-5 h-5" />
                <span className="absolute -top-8 right-0 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Press ?
                </span>
            </motion.button>

            {/* Shortcuts Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl glass-dark border border-white/10 rounded-3xl p-8 z-[9999]"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                                        <Keyboard className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Keyboard Shortcuts</h2>
                                        <p className="text-sm text-gray-400">Navigate faster with these shortcuts</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3 max-h-96 overflow-y-auto custom-scrollbar">
                                {shortcuts.map((shortcut, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-primary/30 transition-colors group"
                                    >
                                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                                            {shortcut.description}
                                        </span>
                                        <kbd className="px-3 py-1.5 bg-black/50 border border-white/20 rounded-lg text-xs font-mono text-primary whitespace-nowrap">
                                            {shortcut.key}
                                        </kbd>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10 text-center">
                                <p className="text-xs text-gray-500 font-mono">
                                    Press <kbd className="px-2 py-1 bg-white/10 rounded">Esc</kbd> to close
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default KeyboardShortcuts;
