import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minimize2, Settings, Zap, Moon, Sun, Smartphone, Trophy, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useHack } from '@/context/HackContext';
import { useSound } from '@/context/SoundContext';
import { Card } from '@/components/ui/card';
import { useAchievements } from '@/context/AchievementContext';
import { useWeather } from '@/context/WeatherContext';
import { CloudRain, CloudLightning, Sun as SunIcon, Moon as MoonIcon, Cloud } from 'lucide-react';

const DeveloperConsole = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { gravity, setGravity, glowIntensity, setGlowIntensity, themeMode, setThemeMode, isOverclocked, toggleOverclock } = useHack();
    const { playClick, playHover } = useSound();
    const { unlocked, unlockAchievement } = useAchievements();
    const { condition, setCondition, temp, location } = useWeather();

    // Hardcoded list for display (duplicating context generic list logic for UI simplicity here, normally should export list from context)
    const allAchievements = [
        { id: 'explorer', title: 'Explorer', desc: 'Visit all main pages' },
        { id: 'night-owl', title: 'Night Owl', desc: 'Visit late at night (10PM-4AM)' },
        { id: 'combo-breaker', title: 'Combo Breaker', desc: 'Click 5 times rapidly' }
    ];

    return (
        <>
            {/* Trigger Button (Fixed Bottom Left or hidden trigger) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="fixed bottom-20 md:bottom-6 right-20 md:right-28 z-[60]"
            >
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => { playClick(); setIsOpen(true); }}
                    onMouseEnter={() => playHover()}
                    className="w-12 h-12 rounded-full glass border-white/10 hover:border-primary/50 text-gray-400 hover:text-primary shadow-lg shadow-black/50"
                    title="Open Developer Console"
                >
                    <Terminal className="w-5 h-5" />
                </Button>
            </motion.div>

            {/* Console Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
                        />

                        {/* Slide-out Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[1000] shadow-2xl p-6 overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <Terminal className="w-6 h-6 text-primary" />
                                    <div>
                                        <h2 className="text-xl font-bold text-white font-mono">Dev_Console</h2>
                                        <p className="text-xs text-gray-500 font-mono">v2.0.4.beta // ROOT_ACCESS</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Content */}
                            <div className="space-y-8">
                                {/* Theme Selector */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Settings className="w-4 h-4" /> System Theme
                                        </h3>
                                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10">Active</Badge>
                                    </div>
                                    <Select value={themeMode} onValueChange={(val: any) => { playClick(); setThemeMode(val); }}>
                                        <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
                                            <SelectValue placeholder="Select Theme" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#111] border-white/10 text-white">
                                            <SelectItem value="default">Default (Emerald)</SelectItem>
                                            <SelectItem value="cyberpunk">Cyberpunk (Neon)</SelectItem>
                                            <SelectItem value="matrix">The Matrix (Code)</SelectItem>
                                            <SelectItem value="sunset">Sunset (Warm)</SelectItem>
                                            <SelectItem value="ocean">Ocean (Deep Blue)</SelectItem>
                                            <SelectItem value="cherry">Cherry (Red/Pink)</SelectItem>
                                            <SelectItem value="gold">Luxury (Gold)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Weather Control */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <CloudRain className="w-4 h-4" /> Environmental Override
                                        </h3>
                                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10">
                                            {location || 'Detecting...'}
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        {[
                                            { id: 'clear', icon: SunIcon, label: 'Clear' },
                                            { id: 'clouds', icon: Cloud, label: 'Clouds' },
                                            { id: 'rain', icon: CloudRain, label: 'Rain' },
                                            { id: 'storm', icon: CloudLightning, label: 'Storm' },
                                            { id: 'night', icon: MoonIcon, label: 'Night' }
                                        ].map((w) => (
                                            <button
                                                key={w.id}
                                                onClick={() => { playClick(); setCondition(w.id as any); }}
                                                className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${condition === w.id
                                                    ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                                                    : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'
                                                    }`}
                                                title={w.label}
                                            >
                                                <w.icon size={18} />
                                                <span className="text-[8px] mt-1 font-mono">{w.id.toUpperCase()}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-gray-600 font-mono text-center italic">
                                        Current Temp: {temp}°C | Simulating environmental variables
                                    </p>
                                </div>

                                {/* Physics Controls */}
                                <div className="space-y-6 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-4">
                                        <Zap className="w-4 h-4" /> Physics Engine
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white">Gravity Force</span>
                                            <span className="text-primary font-mono">{gravity.toFixed(1)}x</span>
                                        </div>
                                        <Slider
                                            value={[gravity]}
                                            min={0.1}
                                            max={3.0}
                                            step={0.1}
                                            onValueChange={([val]) => setGravity(val)}
                                            className="cursor-pointer"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white">Glow Intensity</span>
                                            <span className="text-primary font-mono">{glowIntensity.toFixed(1)}x</span>
                                        </div>
                                        <Slider
                                            value={[glowIntensity]}
                                            min={0.1}
                                            max={2.0}
                                            step={0.1}
                                            onValueChange={([val]) => setGlowIntensity(val)}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </div>

                                {/* System Overclock (Danger Zone) */}
                                <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-xl">
                                    <h3 className="text-sm font-medium text-red-400 uppercase tracking-wider flex items-center gap-2 mb-4">
                                        <Zap className="w-4 h-4" /> DANGER ZONE
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-white font-bold">System Overclock</p>
                                            <p className="text-xs text-gray-400">Maximize performance (Unstable)</p>
                                        </div>
                                        <Button
                                            variant={isOverclocked ? "destructive" : "outline"}
                                            onClick={() => { playClick(); toggleOverclock(); }}
                                            className={`transition-all duration-300 ${isOverclocked ? 'animate-pulse' : 'hover:border-red-500 hover:text-red-500'}`}
                                        >
                                            {isOverclocked ? 'ABORT' : 'ACTIVATE'}
                                        </Button>
                                    </div>
                                    {isOverclocked && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-4 p-2 bg-red-950/50 border border-red-500/30 rounded text-xs font-mono text-red-200"
                                        >
                                            WARNING: CPU LIMITER DISABLED. VISUAL ARTIFACTS IMMINENT.
                                        </motion.div>
                                    )}
                                </div>

                                {/* Achievements Panel */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <Trophy className="w-4 h-4" /> Achievements ({unlocked.length}/{allAchievements.length})
                                    </h3>
                                    <div className="grid gap-3">
                                        {allAchievements.map(ach => {
                                            const isUnlocked = unlocked.includes(ach.id);
                                            return (
                                                <div
                                                    key={ach.id}
                                                    className={`p-3 rounded-lg border flex items-center gap-3 transition-colors ${isUnlocked
                                                        ? 'bg-primary/10 border-primary/30'
                                                        : 'bg-white/5 border-white/10 opacity-50'
                                                        }`}
                                                >
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-primary/20 text-primary' : 'bg-white/10 text-gray-500'
                                                        }`}>
                                                        {isUnlocked ? <Trophy className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <h4 className={`text-sm font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                                                            {ach.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500">{ach.desc}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-xs border-dashed border-gray-700 text-gray-500 hover:text-white"
                                        onClick={() => unlockAchievement('combo-breaker')}
                                    >
                                        [DEBUG] Force Unlock Combo
                                    </Button>
                                    <p className="text-[10px] text-gray-600 text-center">
                                        *Achievements reset on refresh (demo mode)
                                    </p>
                                </div>

                                {/* Debug Info (Fake) */}
                                <div className="p-4 bg-black rounded-xl border border-white/5 font-mono text-xs space-y-2 text-gray-500">
                                    <p>{">"} System Status: ONLINE</p>
                                    <p>{">"} Memory Usage: 142MB / 1024MB</p>
                                    <p>{">"} Render Engine: WebGL 2.0</p>
                                    <p>{">"} Connected: {new Date().toLocaleTimeString()}</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence >
        </>
    );
};

export default DeveloperConsole;
