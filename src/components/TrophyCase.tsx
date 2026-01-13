import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Lock, Star, X } from 'lucide-react';
import { useAchievements } from '@/context/AchievementContext';
import { useSound } from '@/context/SoundContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Reusing types from context since they aren't exported.
// In a real scenario we'd export them, but for now we'll duplicate the shape or just infer.
// Actually, let's keep it robust. It's better to just use the data we have.

const TrophyCase = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { unlocked } = useAchievements();
    const { playHover, playClick } = useSound();

    // Configuration for achievements content (matching Context IDs)
    const achievementList = [
        {
            id: 'night-owl',
            title: 'Night Owl',
            description: 'Visit the site late at night (10 PM - 4 AM).',
            icon: Trophy,
            color: 'text-yellow-400',
            bg: 'bg-yellow-400/10'
        },
        {
            id: 'explorer',
            title: 'Explorer',
            description: 'Visit all main pages of the portfolio.',
            icon: Star,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10'
        },
        {
            id: 'combo-breaker',
            title: 'Combo Breaker',
            description: 'Click 5 times in rapid succession!',
            icon: Trophy,
            color: 'text-red-500',
            bg: 'bg-red-500/10'
        }
    ];

    return (
        <>
            {/* Trigger Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => { playClick(); setIsOpen(true); }}
                onMouseEnter={() => playHover()}
                className="relative glass border-white/10 hover:bg-white/10 rounded-xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-yellow-400"
            >
                <Trophy className="w-5 h-5" />
                {unlocked.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
                        {unlocked.length}
                    </span>
                )}
            </Button>

            {/* Modal / Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                        />

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 50 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[101] p-6"
                        >
                            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 z-20">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsOpen(false)}
                                        className="rounded-full text-gray-400 hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>

                                {/* Header */}
                                <div className="text-center mb-8 relative z-10">
                                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                                        <Trophy className="w-8 h-8 text-yellow-500" />
                                        Trophy Case
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                        {unlocked.length} / {achievementList.length} Achievements Unlocked
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="w-full h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(unlocked.length / achievementList.length) * 100}%` }}
                                            className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400"
                                        />
                                    </div>
                                </div>

                                <ScrollArea className="h-[300px] pr-4">
                                    <div className="space-y-4">
                                        {achievementList.map((achievement) => {
                                            const isUnlocked = unlocked.includes(achievement.id);
                                            const Icon = achievement.icon;

                                            return (
                                                <div
                                                    key={achievement.id}
                                                    className={`
                                                        relative p-4 rounded-xl border transition-all duration-300
                                                        ${isUnlocked
                                                            ? 'bg-white/5 border-white/10'
                                                            : 'bg-black/40 border-white/5 opacity-50 grayscale'
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className={`
                                                            w-12 h-12 rounded-full flex items-center justify-center shrink-0
                                                            ${isUnlocked ? `${achievement.bg} ${achievement.color} shadow-lg shadow-${achievement.color}/20` : 'bg-gray-900 text-gray-600'}
                                                        `}>
                                                            {isUnlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                                                        </div>
                                                        <div>
                                                            <h3 className={`font-bold mb-1 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                                                                {achievement.title}
                                                            </h3>
                                                            <p className="text-xs text-gray-400 leading-relaxed">
                                                                {isUnlocked ? achievement.description : '??? (Keep exploring to unlock)'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </ScrollArea>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default TrophyCase;
