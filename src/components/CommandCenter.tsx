import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Zap, Target, FileText, Smartphone, Globe, Code2, LayoutGrid, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '@/context/SoundContext';
import { askNeuralBrain } from '@/lib/gemini';
import { Bot, Sparkles, BrainCircuit, Terminal as TerminalIcon } from 'lucide-react';
import { Button } from './ui/button';

interface CommandItem {
    id: string;
    title: string;
    description: string;
    icon: any;
    section?: string;
    path?: string;
    keywords: string[];
}

const CommandCenter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isAiMode, setIsAiMode] = useState(false);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const { playClick, playHover } = useSound();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const commands: CommandItem[] = useMemo(() => [
        { id: '1', title: 'Home', description: 'Go to start', icon: Globe, section: 'home', keywords: ['start', 'top', 'hero'] },
        { id: '2', title: 'Projects', description: 'View my work', icon: LayoutGrid, section: 'projects', keywords: ['portfolio', 'work', 'apps'] },
        { id: '3', title: 'Skills', description: 'Technical arsenal', icon: Zap, section: 'skills', keywords: ['tech', 'stack', 'languages'] },
        { id: '4', title: 'Experience', description: 'Career path', icon: Target, section: 'experience', keywords: ['jobs', 'history', 'cv'] },
        { id: '5', title: 'Blog', description: 'Read articles', icon: FileText, path: '/blog', keywords: ['journal', 'thoughts', 'writing'] },
        { id: '6', title: 'Contact', description: 'Get in touch', icon: Smartphone, section: 'contact', keywords: ['email', 'message', 'hire'] },
        { id: '7', title: 'The Lab', description: 'Experiments', icon: Code2, path: '/lab', keywords: ['experiments', 'r&d', 'testing'] },
        { id: '8', title: 'Three.js Projects', description: 'Immersive WebGL work', icon: Globe, section: 'projects', keywords: ['three', '3d', 'webgl'] },
        { id: '9', title: 'Login', description: 'Access admin or user area', icon: Command, path: '/login', keywords: ['signin', 'auth', 'authenticate', 'admin', 'user'] },
        { id: '10', title: 'Hall of Fame', description: 'Join the legendary visitors', icon: Target, section: 'leaderboard', keywords: ['fame', 'visitors', 'community', 'join', 'pioneers', 'leaderboard'] },
    ], []);

    const filteredCommands = useMemo(() => {
        if (!query) return commands;
        const lowerQuery = query.toLowerCase();
        return commands.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery) ||
            item.keywords.some(k => k.includes(lowerQuery))
        );
    }, [query, commands]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            setSelectedIndex(0);
            setQuery('');
        }
    }, [isOpen]);

    const handleSelect = (item: CommandItem) => {
        playClick();
        if (item.path) {
            navigate(item.path);
        } else if (item.section) {
            if (window.location.pathname !== '/') {
                navigate('/#' + item.section);
            } else {
                const element = document.getElementById(item.section);
                element?.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsOpen(false);
    };

    const handleAiQuery = async () => {
        if (!query.trim() || isThinking) return;
        setIsThinking(true);
        setAiResponse(null);
        playClick();

        const response = await askNeuralBrain(query);
        setAiResponse(response);
        setIsThinking(false);
    };

    const handleNav = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
            playHover();
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            playHover();
        } else if (e.key === 'Enter') {
            if (filteredCommands[selectedIndex]) {
                handleSelect(filteredCommands[selectedIndex]);
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[9000]"
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl glass-dark border rounded-[32px] overflow-hidden z-[9001] shadow-[0_0_100px_rgba(34,197,94,0.1)] transition-all duration-500 ${isAiMode ? 'border-primary/50 shadow-[0_0_120px_rgba(34,197,94,0.2)]' : 'border-white/20'
                            }`}
                    >
                        {/* Header & Search */}
                        <div className="p-6 border-b border-white/10 relative">
                            <div className="absolute left-10 top-1/2 -translate-y-1/2 flex items-center">
                                {isAiMode ? (
                                    <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                                ) : (
                                    <Search className="w-6 h-6 text-gray-500" />
                                )}
                            </div>
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    if (aiResponse) setAiResponse(null);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && isAiMode) {
                                        handleAiQuery();
                                    } else {
                                        handleNav(e);
                                    }
                                }}
                                placeholder={isAiMode ? "Ask the Neural Brain anything..." : "Search resources, projects, or sections..."}
                                className="w-full bg-transparent pl-12 pr-24 py-4 text-xl text-white outline-none placeholder:text-gray-600 font-light"
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-3">
                                <button
                                    onClick={() => {
                                        setIsAiMode(!isAiMode);
                                        setAiResponse(null);
                                        playClick();
                                    }}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${isAiMode
                                        ? 'bg-primary/20 border-primary/40 text-primary'
                                        : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'
                                        }`}
                                >
                                    <BrainCircuit className="w-4 h-4" />
                                    <span className="text-[10px] uppercase tracking-widest font-bold">Neural AI</span>
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                            {isAiMode ? (
                                <div className="p-8 space-y-6">
                                    {!aiResponse && !isThinking && (
                                        <div className="text-center py-12 space-y-4">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Bot className="w-8 h-8 text-primary opacity-50" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white italic">Neural Interface Ready</h3>
                                            <p className="text-gray-500 max-w-xs mx-auto text-sm italic">
                                                "Ask me about Durvish's tech stack, his philosophy on cinematic design, or specific project technicalities."
                                            </p>
                                        </div>
                                    )}

                                    {isThinking && (
                                        <div className="py-12 flex flex-col items-center gap-6">
                                            <div className="relative">
                                                <div className="w-12 h-12 border-2 border-primary/20 rounded-full animate-ping" />
                                                <div className="absolute inset-0 w-12 h-12 border-2 border-primary rounded-full animate-spin border-t-transparent" />
                                            </div>
                                            <p className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">Syncing with Core Brain...</p>
                                        </div>
                                    )}

                                    {aiResponse && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-6"
                                        >
                                            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                                <p className="text-gray-200 leading-relaxed italic">
                                                    {aiResponse}
                                                </p>
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => setAiResponse(null)}
                                                    className="text-[10px] text-gray-500 hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest font-mono"
                                                >
                                                    <TerminalIcon className="w-3 h-3" />
                                                    Clear Memory
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-4">
                                    {filteredCommands.length > 0 ? (
                                        <div className="space-y-2">
                                            {filteredCommands.map((item, index) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleSelect(item)}
                                                    onMouseEnter={() => setSelectedIndex(index)}
                                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${selectedIndex === index
                                                        ? 'bg-primary/10 border border-primary/20 text-white'
                                                        : 'bg-transparent border border-transparent text-gray-400 hover:text-white'
                                                        }`}
                                                >
                                                    <div className={`p-2.5 rounded-xl ${selectedIndex === index ? 'bg-primary text-white shadow-glow' : 'bg-white/5'}`}>
                                                        <item.icon size={20} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-bold tracking-tight">{item.title}</div>
                                                        <div className="text-xs opacity-60">{item.description}</div>
                                                    </div>
                                                    {selectedIndex === index && (
                                                        <ArrowRight className="w-5 h-5 text-primary opacity-100 mr-2" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-20 text-center space-y-6">
                                            <div className="flex flex-col items-center">
                                                <Command className="w-12 h-12 text-gray-700 mb-4" />
                                                <p className="text-gray-500">No results found for "<span className="text-white">{query}</span>"</p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsAiMode(true)}
                                                className="border-primary/50 text-primary hover:bg-primary/10 rounded-full"
                                            >
                                                Try Neural Search?
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-black/40 border-t border-white/10 flex justify-between items-center px-8">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono">
                                    <span className="p-1 px-1.5 bg-white/5 border border-white/10 rounded">↑↓</span> Navigate
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono">
                                    <span className="p-1 px-1.5 bg-white/5 border border-white/10 rounded">ENTER</span> Select
                                </div>
                            </div>
                            <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Nexus System Search</div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CommandCenter;
