import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, GitBranch, Terminal, Cpu, Activity, Database, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useSound } from '@/context/SoundContext';

const GithubStats = () => {
    const { playHover } = useSound();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const stats = [
        { label: 'Neural Branches', value: '12', icon: GitBranch, color: 'text-blue-400' },
        { label: 'Success Rate', value: '98%', icon: Shield, color: 'text-emerald-400' },
        { label: 'Data Throughput', value: '1.2k', icon: Database, color: 'text-cyan-400' },
        { label: 'Signal Strength', value: 'ACTIVE', icon: Activity, color: 'text-primary' },
    ];

    // Generate random signal pings for the grid
    const pings = Array.from({ length: 48 }, (_, i) => ({
        id: i,
        delay: Math.random() * 2,
        duration: 1.5 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.4
    }));

    return (
        <section id="github" ref={sectionRef} className="py-32 px-6 bg-black relative overflow-hidden">
            {/* Background Neural Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="grid grid-cols-12 h-full w-full">
                    {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="border-[0.5px] border-white/20 h-24" />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-24 border-b border-white/5 pb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] block">Network Protocols</span>
                        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
                            Neural <br />
                            <span className="text-gradient">Activity</span>
                        </h2>
                    </motion.div>

                    <div className="flex items-center gap-4 font-mono text-[10px] text-gray-700 uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span>Syncing with Github Mainframe</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Activity Map (Signal Pings) */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="glass-premium border-white/5 bg-black/40 p-8 relative overflow-hidden">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-primary" />
                                    <span className="text-[10px] font-mono text-white tracking-widest uppercase">Encryption Burst Activity</span>
                                </div>
                                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">LAST 24 HOURS</div>
                            </div>

                            <div className="grid grid-cols-8 md:grid-cols-12 gap-3 h-48 content-center">
                                {pings.map((ping) => (
                                    <motion.div
                                        key={ping.id}
                                        initial={{ opacity: ping.opacity }}
                                        animate={{
                                            opacity: [ping.opacity, 1, ping.opacity],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{
                                            duration: ping.duration,
                                            repeat: Infinity,
                                            delay: ping.delay,
                                            ease: "easeInOut"
                                        }}
                                        className="w-full aspect-square rounded-sm bg-primary/20 hover:bg-primary transition-colors cursor-crosshair relative"
                                    >
                                        <div className="absolute inset-0 bg-primary/40 blur-sm scale-150 opacity-0 hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Background Label */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-white/[0.02] text-[120px] pointer-events-none select-none tracking-tighter">
                                COMMITS
                            </div>
                        </Card>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                onMouseEnter={() => playHover()}
                            >
                                <Card className="glass-premium border-white/5 p-6 space-y-4 hover:border-primary/20 transition-all group">
                                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} group-hover:bg-primary/10 transition-colors`}>
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                                        <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{stat.label}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call To Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 }}
                    className="mt-24 flex flex-col items-center"
                >
                    <a
                        href="https://github.com/amdarknova-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-4 px-12 py-5 bg-white text-black font-black uppercase tracking-tighter hover:bg-primary transition-all duration-500"
                    >
                        <Github className="w-5 h-5" />
                        <span>Access Source Code</span>
                        <div className="absolute -inset-2 border border-white/10 group-hover:border-primary/50 transition-colors -z-10" />
                    </a>
                    <p className="mt-6 font-mono text-[8px] text-gray-600 uppercase tracking-[0.5em]">Global Repository Network // End of Line</p>
                </motion.div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] -z-10" />
        </section>
    );
};

export default GithubStats;
