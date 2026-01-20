import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
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
    LogIn,
    Settings,
    Globe
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const { user, profile, signOut, isAdmin } = useAuth();
    const { playClick, playHover } = useSound();
    const navigate = useNavigate();

    const menuItems = [
        { icon: Home, label: t('nav.home'), path: '/', section: 'home' },
        { icon: User, label: t('nav.about'), path: '/', section: 'about' },
        { icon: Code2, label: t('nav.skills'), path: '/', section: 'skills' },
        { icon: Briefcase, label: t('nav.projects'), path: '/', section: 'projects' },
        { icon: Sparkles, label: t('nav.experience'), path: '/', section: 'experience' },
        { icon: Trophy, label: t('nav.hall_of_fame'), path: '/', section: 'leaderboard' },
        { icon: BookOpen, label: t('nav.blog'), path: '/blog' },
        { icon: Globe, label: t('nav.guestbook'), path: '/guestbook' },
        { icon: Code2, label: t('nav.changelog'), path: '/changelog' },
        { icon: Mail, label: t('nav.contact'), path: '/contact' },
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

    const handleLogout = async () => {
        playClick();
        await signOut();
        setIsOpen(false);
        navigate('/');
    };

    const handleLogin = () => {
        playClick();
        navigate('/login');
        setIsOpen(false);
    };

    const getUserDisplay = () => {
        if (!user && !isAdmin) return { name: 'Guest', role: '@portfolio', icon: User, color: 'text-gray-400', image: null };

        return {
            name: isAdmin ? 'Admin' : (profile?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'),
            role: isAdmin ? '@root' : '@member',
            icon: isAdmin ? Shield : User,
            color: isAdmin ? 'text-red-500' : 'text-primary',
            image: user?.user_metadata?.avatar_url
        };
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
                <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 ${userDisplay.color}`}>
                    {userDisplay.image ? (
                        <img src={userDisplay.image} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <Icon className="w-4 h-4" />
                    )}
                </div>
                <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-white leading-none whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">{userDisplay.name}</p>
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
                            className="absolute right-0 top-full mt-2 w-64 glass-premium border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 p-2"
                        >
                            {/* User Info Header */}
                            <div className="p-4 border-b border-white/5 bg-white/5 rounded-xl mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden border border-white/10 ${userDisplay.color}`}>
                                        {userDisplay.image ? (
                                            <img src={userDisplay.image} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <Icon className="w-6 h-6" />
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">{userDisplay.name}</p>
                                        <p className="text-[10px] text-gray-400 font-mono tracking-widest">{userDisplay.role}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Items */}
                            <div className="space-y-1 max-h-80 overflow-y-auto custom-scrollbar p-1">
                                <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] px-3 py-2 font-mono">
                                    {t('menu.navigation')}
                                </p>
                                {menuItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleItemClick(item)}
                                        onMouseEnter={() => playHover()}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <item.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                                        </div>
                                        <span className="text-sm">{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="p-1 pt-2 mt-2 border-t border-white/5 space-y-1">
                                {/* System Settings Button */}
                                <button
                                    onClick={() => {
                                        playClick();
                                        window.dispatchEvent(new CustomEvent('open-system-panel')); // Dispatch directly
                                        setIsOpen(false);
                                    }}
                                    onMouseEnter={() => playHover()}
                                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all font-bold"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Settings className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm">{t('menu.settings')}</span>
                                </button>

                                {isAdmin && (
                                    <button
                                        onClick={() => { playClick(); navigate('/dashboard'); setIsOpen(false); }}
                                        onMouseEnter={() => playHover()}
                                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-bold"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                                            <Settings className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm">{t('menu.admin')}</span>
                                    </button>
                                )}
                                {(user || isAdmin) ? (
                                    <button
                                        onClick={handleLogout}
                                        onMouseEnter={() => playHover()}
                                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all font-bold"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                            <LogOut className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm">{t('menu.disconnect')}</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleLogin}
                                        onMouseEnter={() => playHover()}
                                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-primary hover:text-white hover:bg-primary/20 transition-all font-bold"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                            <LogIn className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm">{t('menu.login')}</span>
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
