import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Lock, X, Lightbulb } from 'lucide-react';
import { useAchievements, ACHIEVEMENTS } from '@/context/AchievementContext';
import { useSound } from '@/context/SoundContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const TrophyCase = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { unlockedAchievements } = useAchievements();
    const { playHover, playClick } = useSound();

    const achievementList = ACHIEVEMENTS;

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
                {unlockedAchievements.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
                        {unlockedAchievements.length}
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
                                        {unlockedAchievements.length} / {achievementList.length} Achievements Unlocked
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="w-full h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(unlockedAchievements.length / achievementList.length) * 100}%` }}
                                            className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400"
                                        />
                                    </div>
                                </div>

                                <ScrollArea className="h-[400px] pr-4">
                                    <div className="space-y-4">
                                        {achievementList.map((achievement) => {
                                            const isUnlocked = unlockedAchievements.includes(achievement.id);

                                            return (
                                                <div
                                                    key={achievement.id}
                                                    className={`
                                                        relative p-4 rounded-xl border transition-all duration-300
                                                        ${isUnlocked
                                                            ? 'bg-white/5 border-white/10'
                                                            : 'bg-black/40 border-white/5'
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className={`
                                                            w-12 h-12 rounded-full flex items-center justify-center shrink-0
                                                            ${isUnlocked ? 'bg-yellow-400/20 text-yellow-400' : 'bg-gray-900 text-gray-600'}
                                                        `}>
                                                            {isUnlocked ? <Trophy className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className={`font-bold mb-1 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                                                                {isUnlocked ? achievement.title : '???'}
                                                            </h3>
                                                            <p className="text-xs text-gray-400 leading-relaxed mb-2">
                                                                {isUnlocked ? achievement.description : 'Keep exploring to unlock!'}
                                                            </p>

                                                            {/* Hint for locked achievements */}
                                                            {!isUnlocked && (
                                                                <div className="flex items-start gap-2 mt-2 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                                                    <Lightbulb className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                                                    <p className="text-xs text-blue-300">
                                                                        {achievement.hint}
                                                                    </p>
                                                                </div>
                                                            )}
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
