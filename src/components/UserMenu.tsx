import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useHack } from '@/context/HackContext';
import { useSound } from '@/context/SoundContext';
import {
    User,
    Shield,
    LogOut,
    Home,
    Code2,
    Briefcase,
    Mail,
    Trophy,
    BookOpen,
    Sparkles,
    ChevronDown,
    LogIn
} from 'lucide-react';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { userType, username, logout } = useHack();
    const { playClick, playHover } = useSound();
    const navigate = useNavigate();

    const menuItems = [
        { icon: Home, label: 'Home', path: '/', section: 'home' },
        { icon: User, label: 'About', path: '/', section: 'about' },
        { icon: Code2, label: 'Skills', path: '/', section: 'skills' },
        { icon: Briefcase, label: 'Projects', path: '/', section: 'projects' },
        { icon: Sparkles, label: 'Experience', path: '/', section: 'experience' },
        { icon: Trophy, label: 'Hall of Fame', path: '/', section: 'leaderboard' },
        { icon: BookOpen, label: 'Blog', path: '/blog' },
        { icon: Mail, label: 'Contact', path: '/contact' },
    ];

    const handleItemClick = (item: typeof menuItems[0]) => {
        playClick();
        if (item.section) {
            if (window.location.pathname !== '/') {
                navigate('/#' + item.section);
            } else {
                const element = document.getElementById(item.section);
                element?.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(item.path);
        }
        setIsOpen(false);
    };

    const handleLogout = () => {
        playClick();
        logout();
        setIsOpen(false);
        navigate('/');
    };

    const handleLogin = () => {
        playClick();
        navigate('/login');
        setIsOpen(false);
    };

    const getUserDisplay = () => {
        if (userType === 'admin') return { name: username || 'Admin', role: '@administrator', icon: Shield, color: 'text-red-500' };
        if (userType === 'user') return { name: username || 'User', role: '@member', icon: User, color: 'text-primary' };
        return { name: 'Guest', role: '@portfolio', icon: User, color: 'text-gray-400' };
    };

    const userDisplay = getUserDisplay();
    const Icon = userDisplay.icon;

    return (
        <div className="relative">
            <button
                onClick={() => {
                    playClick();
                    setIsOpen(!isOpen);
                }}
                onMouseEnter={() => playHover()}
                className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-white/10 hover:border-primary/30 transition-all group"
            >
                <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ${userDisplay.color}`}>
                    <Icon className="w-4 h-4" />
                </div>
                <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-white leading-none">{userDisplay.name}</p>
                    <p className="text-[10px] text-gray-500 leading-none mt-0.5">{userDisplay.role}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-full mt-2 w-64 glass-dark border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50"
                        >
                            {/* User Info Header */}
                            <div className="p-4 border-b border-white/10 bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ${userDisplay.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{userDisplay.name}</p>
                                        <p className="text-xs text-gray-400">{userDisplay.role}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Items */}
                            <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest px-3 py-2 font-mono">
                                    Quick Navigation
                                </p>
                                {menuItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleItemClick(item)}
                                        onMouseEnter={() => playHover()}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <item.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                                        </div>
                                        <span className="text-sm">{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="p-2 border-t border-white/10 bg-black/20">
                                {userType !== 'guest' ? (
                                    <button
                                        onClick={handleLogout}
                                        onMouseEnter={() => playHover()}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="text-sm font-medium">Logout</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleLogin}
                                        onMouseEnter={() => playHover()}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-primary hover:text-primary/80 hover:bg-primary/10 transition-all"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        <span className="text-sm font-medium">Login</span>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserMenu;
