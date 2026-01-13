import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitBranch, Terminal, Code2, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/card';

const GithubStats = () => {
    const [stats, setStats] = useState({
        repos: 12,
        stars: 48,
        commits: '1.2k+',
        contributions: '98%',
    });

    return (
        <section className="py-24 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-mono tracking-[0.3em] uppercase text-xs mb-4 block">Open Source Impact</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                        GitHub <span className="text-gradient">Activity</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Repositories', value: stats.repos, icon: GitBranch, color: 'text-blue-400' },
                        { label: 'Stars Earned', value: stats.stars, icon: Star, color: 'text-yellow-400' },
                        { label: 'Annual Commits', value: stats.commits, icon: Terminal, color: 'text-green-400' },
                        { label: 'Contribution Rate', value: stats.contributions, icon: Cpu, color: 'text-purple-400' },
                    ].map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="glass p-8 border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group overflow-hidden relative">
                                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <item.icon size={120} />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <div className={`p-3 rounded-2xl bg-white/5 w-fit ${item.color}`}>
                                        <item.icon size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-4xl font-bold text-white tracking-tighter group-hover:text-primary transition-colors">
                                            {item.value}
                                        </h4>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">
                                            {item.label}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-12 text-center"
                >
                    <a
                        href="https://github.com/amdarknova-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 glass-dark border border-white/10 px-8 py-4 rounded-full text-white hover:bg-primary hover:border-primary transition-all group"
                    >
                        <Github size={20} className="group-hover:rotate-12 transition-transform" />
                        <span className="font-bold tracking-tight">Explore the Source Code</span>
                        <Code2 size={16} className="text-primary group-hover:text-white" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default GithubStats;
