import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Settings, Monitor, Volume2, Globe, Cpu,
    RefreshCcw, Power, Check, Zap, Eye, RotateCcw
} from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import { useHack, ThemeMode } from '@/context/HackContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

// Event emitter for opening the panel
export const openSystemPanel = () => {
    window.dispatchEvent(new CustomEvent('open-system-panel'));
};

const SystemControlPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'general' | 'display' | 'audio'>('general');

    const { isPlaying, toggleSound, playClick, playHover, playSuccess } = useSound();
    const {
        themeMode, setThemeMode,
        isOverclocked, toggleOverclock,
        glowIntensity, setGlowIntensity
    } = useHack();
    const { i18n, t } = useTranslation();

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-system-panel', handleOpen);

        // Keyboard shortcut: Ctrl/Cmd + I (Interface)
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') setIsOpen(false);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('open-system-panel', handleOpen);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const themes: { id: ThemeMode; label: string; color: string }[] = [
        { id: 'default', label: 'Matrix Green', color: '#22c55e' },
        { id: 'cyberpunk', label: 'Neon Cyber', color: '#db2777' },
        { id: 'ocean', label: 'Deep Ocean', color: '#3b82f6' },
        { id: 'sunset', label: 'Solar Flare', color: '#f97316' },
        { id: 'cherry', label: 'Red Alert', color: '#ef4444' },
        { id: 'gold', label: 'Midas Touch', color: '#eab308' },
    ];

    const languages = [
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
        { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
        { code: 'de', label: 'German', flag: '🇩🇪' },
        { code: 'fr', label: 'French', flag: '🇫🇷' },
        { code: 'es', label: 'Spanish', flag: '🇪🇸' },
        { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
        { code: 'ru', label: 'Russian', flag: '🇷🇺' },
        { code: 'ar', label: 'Arabic', flag: '🇸🇦' },
    ];

    const handleThemeChange = (mode: ThemeMode) => {
        playClick();
        setThemeMode(mode);
    };

    const handleLanguageChange = (code: string) => {
        playClick();
        i18n.changeLanguage(code);
    };

    const handleReset = () => {
        playSuccess();
        window.location.reload();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                onClick={(e) => {
                    if (e.target === e.currentTarget) setIsOpen(false);
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="w-full max-w-4xl h-[600px] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(34,197,94,0.1)] overflow-hidden flex flex-col md:flex-row relative"
                >
                    {/* Sidebar */}
                    <div className="w-full md:w-64 bg-white/5 border-r border-white/5 p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-8 text-primary">
                                <Settings className="w-6 h-6 animate-spin-slow" />
                                <h2 className="text-lg font-bold tracking-widest uppercase">System</h2>
                            </div>

                            <nav className="space-y-2">
                                <button
                                    onClick={() => { playClick(); setActiveTab('general'); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'general' ? 'bg-primary/20 text-primary border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Globe className="w-4 h-4" />
                                    <span className="text-sm font-medium">{t('system.general')}</span>
                                </button>
                                <button
                                    onClick={() => { playClick(); setActiveTab('display'); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'display' ? 'bg-primary/20 text-primary border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Monitor className="w-4 h-4" />
                                    <span className="text-sm font-medium">{t('system.display')}</span>
                                </button>
                                <button
                                    onClick={() => { playClick(); setActiveTab('audio'); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'audio' ? 'bg-primary/20 text-primary border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Volume2 className="w-4 h-4" />
                                    <span className="text-sm font-medium">{t('system.audio')}</span>
                                </button>
                            </nav>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono mb-2">
                                <Cpu className="w-3 h-3" />
                                <span>CPU: OPTIMAL</span>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    animate={{ width: ["20%", "40%", "30%", "60%"] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-dots-pattern">
                        <div className="absolute top-6 right-6">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === 'general' && (
                                <motion.div
                                    key="general"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                            <Globe className="w-6 h-6 text-primary" />
                                            {t('system.localization')}
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => handleLanguageChange(lang.code)}
                                                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${i18n.language === lang.code
                                                        ? 'bg-primary/20 border-primary text-white'
                                                        : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'
                                                        }`}
                                                >
                                                    <span className="text-xl">{lang.flag}</span>
                                                    <span className="text-sm font-medium">{lang.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/5">
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <Power className="w-5 h-5 text-red-500" />
                                            System Actions
                                        </h3>
                                        <div className="flex gap-4">
                                            <Button
                                                variant="destructive"
                                                onClick={handleReset}
                                                className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/50"
                                            >
                                                <RotateCcw className="w-4 h-4 mr-2" />
                                                {t('system.reboot')}
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'display' && (
                                <motion.div
                                    key="display"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                            <Monitor className="w-6 h-6 text-primary" />
                                            {t('system.theme')}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {themes.map((theme) => (
                                                <button
                                                    key={theme.id}
                                                    onClick={() => handleThemeChange(theme.id)}
                                                    className={`group relative p-4 rounded-xl border transition-all overflow-hidden ${themeMode === theme.id
                                                        ? 'bg-white/10 border-white/30'
                                                        : 'bg-black/40 border-white/5 hover:border-white/20'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between relative z-10">
                                                        <span className={`text-sm font-bold ${themeMode === theme.id ? 'text-white' : 'text-gray-400'}`}>
                                                            {theme.label}
                                                        </span>
                                                        {themeMode === theme.id && <Check className="w-4 h-4 text-white" />}
                                                    </div>
                                                    <div
                                                        className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30"
                                                        style={{ backgroundColor: theme.color }}
                                                    />
                                                    <div
                                                        className="absolute bottom-0 right-0 w-12 h-12 blur-xl opacity-40"
                                                        style={{ backgroundColor: theme.color }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/5 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h4 className="text-white font-medium flex items-center gap-2">
                                                    <Zap className="w-4 h-4 text-yellow-500" />
                                                    {t('system.overclock')}
                                                </h4>
                                                <p className="text-xs text-gray-500">Maximum visual fidelity (High GPU usage)</p>
                                            </div>
                                            <Switch
                                                checked={isOverclocked}
                                                onCheckedChange={() => {
                                                    playClick();
                                                    toggleOverclock();
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-white font-medium flex items-center gap-2">
                                                    <Eye className="w-4 h-4 text-blue-500" />
                                                    Glow Intensity
                                                </h4>
                                                <span className="text-xs font-mono text-primary">{glowIntensity.toFixed(1)}x</span>
                                            </div>
                                            <Slider
                                                value={[glowIntensity]}
                                                max={2}
                                                step={0.1}
                                                onValueChange={(val) => setGlowIntensity(val[0])}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'audio' && (
                                <motion.div
                                    key="audio"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                            <Volume2 className="w-6 h-6 text-primary" />
                                            Audio Control
                                        </h3>

                                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <h4 className="text-white font-medium">Master Audio</h4>
                                                    <p className="text-xs text-gray-500">Toggle all system sounds and ambience</p>
                                                </div>
                                                <Switch
                                                    checked={isPlaying}
                                                    onCheckedChange={() => {
                                                        playClick();
                                                        toggleSound();
                                                    }}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between opacity-50 pointer-events-none">
                                                <div className="space-y-1">
                                                    <h4 className="text-white font-medium">Ambience Volume</h4>
                                                    <p className="text-xs text-gray-500">Drone and background noise</p>
                                                </div>
                                                <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                                                    <div className="w-1/2 h-full bg-primary" />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between opacity-50 pointer-events-none">
                                                <div className="space-y-1">
                                                    <h4 className="text-white font-medium">SFX Volume</h4>
                                                    <p className="text-xs text-gray-500">Interface interactions</p>
                                                </div>
                                                <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                                                    <div className="w-3/4 h-full bg-primary" />
                                                </div>
                                            </div>

                                            <p className="text-[10px] text-gray-600 italic text-center pt-2">
                                                * Granular volume control requires AudioContext v2 upgrade
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SystemControlPanel;
