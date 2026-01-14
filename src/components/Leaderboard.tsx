import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown, Star, User, ShieldCheck, Terminal, ArrowRight } from 'lucide-react';
import { useAchievements, Pioneer } from '@/context/AchievementContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';

const Leaderboard = () => {
    const { systemsExplored, totalSystems, unlocked, globalPioneers, syncHandle } = useAchievements();
    const [name, setName] = useState('');
    const [isClaimed, setIsClaimed] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    const progress = Math.min((systemsExplored / totalSystems) * 100, 100);

    const handleClaim = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && !isSyncing) {
            setIsSyncing(true);
            await syncHandle(name);
            setIsClaimed(true);
            setIsSyncing(false);
        }
    };

    const getBadge = (count: number) => {
        if (count >= 12) return 'Apex Pioneer';
        if (count >= 8) return 'System Architect';
        if (count >= 4) return 'Void Walker';
        return 'Binary Soul';
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHrs < 1) return 'Just now';
        if (diffHrs < 24) return `${diffHrs} hours ago`;
        return `${Math.floor(diffHrs / 24)} days ago`;
    };

    return (
        <section id="leaderboard" className="py-24 px-6 bg-[#050505] relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

                {/* User Stats & Progress */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <span className="text-primary font-mono tracking-[0.4em] uppercase text-xs">Pioneer Status</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight">
                            Personal <span className="text-gradient">Advancement</span>
                        </h2>
                        <p className="text-gray-400 max-w-md">
                            Your journey through the Nexus is being tracked. Every section visited, every achievement unlocked brings you closer to the Hall of Fame.
                        </p>
                    </div>

                    <div className="glass p-8 rounded-3xl border-white/10 space-y-6 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">Systems Explored</p>
                                <p className="text-4xl font-bold text-white italic">{systemsExplored} / {totalSystems}</p>
                            </div>
                            <Trophy className="w-12 h-12 text-primary opacity-50" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-mono">
                                <span className="text-gray-500">Synchronization</span>
                                <span className="text-primary">{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-2 bg-white/5" />
                        </div>

                        <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-600 uppercase font-mono">Unlocked</p>
                                <p className="text-xl font-bold text-white">{unlocked.length} <span className="text-xs text-gray-500 font-normal">Achievements</span></p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-[10px] text-gray-600 uppercase font-mono">Rank</p>
                                <p className="text-xl font-bold text-primary">
                                    {progress >= 100 ? 'Apex' : progress >= 50 ? 'Elite' : 'Novice'}
                                </p>
                            </div>
                        </div>

                        {/* Claim Form */}
                        {!isClaimed ? (
                            <form onSubmit={handleClaim} className="pt-8 space-y-4">
                                <p className="text-sm text-gray-500 italic">"Achieve 100% Sync to immortalize your name."</p>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Enter your handle..."
                                        className="bg-white/5 border-white/10 rounded-xl"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={progress < 100 || isSyncing}
                                    />
                                    <Button
                                        disabled={progress < 100 || !name.trim() || isSyncing}
                                        className="bg-primary hover:bg-white text-black font-bold rounded-xl"
                                    >
                                        {isSyncing ? 'Syncing...' : 'Claim'}
                                    </Button>
                                </div>
                                {progress < 100 && (
                                    <p className="text-[10px] text-red-500/60 uppercase tracking-widest font-mono">
                                        [ ACCESS DENIED ] Insufficient system exploration
                                    </p>
                                )}
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="pt-8 text-center bg-primary/10 p-4 rounded-2xl border border-primary/20"
                            >
                                <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-2" />
                                <p className="text-white font-bold">Spot Secured, {name}!</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Entry added to permanent log.</p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Global Hall of Fame */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="flex items-center gap-4">
                        <Medal className="w-8 h-8 text-primary" />
                        <h3 className="text-2xl font-bold text-white">Hall of <span className="text-gradient">Pioneers</span></h3>
                    </div>

                    <div className="space-y-4">
                        {globalPioneers.length > 0 ? (
                            globalPioneers.map((leader: Pioneer, index: number) => (
                                <div
                                    key={leader.handle}
                                    className="group flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 relative overflow-hidden"
                                >
                                    {index === 0 && <Crown className="absolute -right-4 -bottom-4 w-20 h-20 text-primary/5 -rotate-12" />}

                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold ${index === 0 ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-500'
                                            }`}>
                                            #0{index + 1}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-white group-hover:text-primary transition-colors">{leader.handle}</h4>
                                                {index === 0 && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                                            </div>
                                            <div className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-mono">
                                                {getBadge(leader.systems_explored)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-xl font-bold text-white">{leader.systems_explored}</div>
                                        <div className="text-[10px] text-gray-600 font-mono italic">{formatDate(leader.last_active)}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
                                <Terminal className="w-12 h-12 text-gray-700 mx-auto mb-4 animate-pulse" />
                                <p className="text-gray-500">Initializing global synchronization...</p>
                            </div>
                        )}

                        <div className="flex items-center justify-center py-6 border-t border-dashed border-white/10 text-gray-500 gap-2">
                            <Terminal className="w-4 h-4" />
                            <span className="text-[10px] uppercase tracking-widest font-mono">Real-time Node Connection: Active</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Background elements */}
            <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] -z-10" />
        </section>
    );
};

export default Leaderboard;
