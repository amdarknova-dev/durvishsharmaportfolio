import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const KeyboardShortcuts = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { playClick, playWhoosh } = useSound();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Mapping for UI display
    const shortcuts = [
        { key: 'Ctrl + H', description: 'Home' },
        { key: 'Ctrl + A', description: 'About Me' },
        { key: 'Ctrl + P', description: 'Portfolio/Projects' },
        { key: 'Ctrl + S', description: 'Skills' },
        { key: 'Ctrl + F', description: 'FAQ' },
        { key: 'Ctrl + B', description: 'Beyond Work' },
        { key: 'Ctrl + C', description: 'Contact' },
        { key: 'Ctrl + G', description: 'Web Games / Lab' },
        { key: 'Ctrl + N', description: 'News / Blog' },
        { key: 'Ctrl + K', description: 'Command Center' },
        { key: 'Ctrl + I', description: 'System Panel' },
        { key: 'Esc', description: 'Close Modals' },
    ];

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // General Toggles (Global)
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                // Command Center handled globally
            }

            // Navigation Shortcuts (Ctrl + Key)
            if (e.ctrlKey && !e.shiftKey && !e.altKey) {
                const key = e.key.toLowerCase();

                // Allow copying (Ctrl+C) if text is selected
                if (key === 'c' && window.getSelection()?.toString()) return;

                const navigateTo = (path: string, name: string) => {
                    e.preventDefault();
                    playWhoosh();

                    if (path.startsWith('#')) {
                        // Handle Hash Navigation
                        if (window.location.hash !== path) {
                            if (window.location.pathname !== '/') {
                                navigate('/' + path);
                            } else {
                                const element = document.getElementById(path.replace('#', ''));
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }
                        }
                    } else {
                        navigate(path);
                    }

                    toast({
                        duration: 1500,
                        className: "bg-black/80 border-white/20 text-white",
                        description: `Navigated to ${name}`
                    });
                };

                switch (key) {
                    case 'h': navigateTo('/', 'Home'); break;
                    case 'a': navigateTo('/about-me', 'About Me'); break;
                    case 'p': navigateTo('/#projects', 'Projects'); break;
                    case 's': navigateTo('/#skills', 'Skills'); break;
                    case 'f': navigateTo('/#faq', 'FAQ'); break; // Might conflict with Find
                    case 'b': navigateTo('/beyond-work', 'Beyond Work'); break;
                    case 'c': navigateTo('/contact', 'Contact'); break;
                    case 'g': navigateTo('/lab', 'Web Games / Lab'); break;
                    case 'n': navigateTo('/blog', 'News/Blog'); break;
                    case 'l': navigateTo('/login', 'Login'); break;
                    // case 'm': setIsOpen(true); break; // Ctrl+M for Menu/Map?
                }
            }

            // Help Menu
            if (e.key === '?' && !isInputFocused()) {
                e.preventDefault();
                setIsOpen(true);
                playClick();
            }

            if (e.key === 'Escape') setIsOpen(false);
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [playClick, playWhoosh, navigate, toast]);

    const isInputFocused = () => {
        const activeElement = document.activeElement;
        return activeElement?.tagName === 'INPUT' ||
            activeElement?.tagName === 'TEXTAREA' ||
            activeElement?.getAttribute('contenteditable') === 'true';
    };

    return (
        <>
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
                onClick={() => { setIsOpen(true); playClick(); }}
                className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-full flex items-center justify-center text-primary transition-all hover:scale-110 group"
            >
                <Keyboard className="w-5 h-5" />
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-3xl w-full shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Keyboard Shortcuts</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {shortcuts.map((s, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                        <span className="text-gray-400 text-sm">{s.description}</span>
                                        <kbd className="px-2 py-1 bg-black rounded border border-white/20 text-xs font-mono text-primary">{s.key}</kbd>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default KeyboardShortcuts;
