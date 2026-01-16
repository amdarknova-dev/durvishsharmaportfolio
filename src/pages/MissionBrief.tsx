
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Zap, FileText, ChevronRight, Lock, Eye, Code, Users, Box } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

const MissionBrief = () => {
    const [scrolled, setScrolled] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setScrolled(totalScroll / windowHeight);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mock Data for "Eclipse: Thunder of the Fallen" Project
    const missionData = {
        title: "Project Eclipse",
        subtitle: "Immersive 3D Web Experience",
        status: "Classified",
        clearance: "Level 5",
        objective: "Develop a high-fidelity web platform for the 'Eclipse' IP that mirrors the intensity and atmosphere of the anime/game universe using WebGL.",
        intel: [
            { label: "Target Audience", value: "Hardcore Gamers & Anime Fans" },
            { label: "Core Tech", value: "React Three Fiber, GLSL, GSAP" },
            { label: "Timeline", value: "3 Months (Agile)" },
        ],
        tactics: [
            {
                icon: Box,
                title: "Volumetric Lighting",
                desc: "Implemented custom shaders to simulate atmospheric density and god-rays."
            },
            {
                icon: Zap,
                title: "Particle Systems",
                desc: "Instanced mesh rendering for 50k+ interactive embers at 60fps."
            },
            {
                icon: Target,
                title: "Camera Control",
                desc: "Cinematic camera rigs that react to scroll velocity and cursor position."
            }
        ]
    };

    return (
        <div className="relative min-h-screen bg-black overflow-x-hidden font-sans">
            <Navigation />
            <ParticleBackground />

            {/* Progress Bar (Top) */}
            <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/5">
                <motion.div
                    className="h-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    style={{ width: `${scrolled * 100}%` }}
                />
            </div>

            <main className="relative z-10 pt-32 pb-64">

                {/* Hero / Header */}
                <section className="max-w-6xl mx-auto px-6 mb-32 relative">
                    <div className="absolute top-0 right-0 p-4 border border-red-500/20 bg-red-500/5 text-red-500 font-mono text-xs uppercase tracking-widest rounded animate-pulse">
                        Top Secret // Eyes Only
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4 text-primary font-mono text-xs uppercase tracking-[0.5em]">
                            <div className="w-12 h-[1px] bg-primary/30" />
                            <span>Mission Dossier: {missionData.status}</span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none uppercase">
                            Mission: <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{missionData.title}</span>
                        </h1>
                    </motion.div>
                </section>

                {/* Primary Intel Grid */}
                <section className="max-w-6xl mx-auto px-6 mb-40">
                    <div className="grid md:grid-cols-12 gap-12">
                        {/* Left: Objective */}
                        <div className="md:col-span-8 space-y-8">
                            <h2 className="text-2xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
                                <Target className="w-6 h-6 text-primary" />
                                Mission Objective
                            </h2>
                            <div className="glass-premium p-8 rounded-3xl border-l-4 border-primary">
                                <p className="text-xl text-gray-300 leading-relaxed font-light">
                                    {missionData.objective}
                                </p>
                            </div>

                            {/* Screenshots Scroll */}
                            <div className="space-y-4 pt-12">
                                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Visual Reconnaissance</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10 group">
                                        <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10 group">
                                        <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-red-500/20 group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Key Intel Sidebar */}
                        <div className="md:col-span-4 space-y-8">
                            <Card className="glass-premium p-8 rounded-3xl border-white/10">
                                <div className="flex items-center gap-2 mb-6 text-gray-400">
                                    <Lock className="w-4 h-4" />
                                    <span className="text-xs font-mono uppercase tracking-widest">Classification Level</span>
                                </div>

                                <div className="space-y-6">
                                    {missionData.intel.map((item, i) => (
                                        <div key={i} className="pb-4 border-b border-white/5 last:border-0">
                                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{item.label}</div>
                                            <div className="text-white font-bold">{item.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <div className="p-6 bg-primary/10 rounded-3xl border border-primary/20">
                                <span className="text-[10px] text-primary/80 font-mono uppercase tracking-widest block mb-2">Outcome</span>
                                <div className="text-3xl font-black text-primary">SUCCESS</div>
                                <p className="text-xs text-primary/70 mt-2">All objectives met. User engagement increased by 140%.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tactical Analysis (Tech Stack) */}
                <section className="bg-white/[0.02] border-y border-white/5 py-32">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex items-center justify-between mb-16">
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Tactical Analysis</h2>
                            <Code className="w-8 h-8 text-gray-600" />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {missionData.tactics.map((tactic, i) => (
                                <Card key={i} className="glass bg-transparent border-white/10 p-8 hover:border-primary/30 transition-colors group">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                        <div className="text-white group-hover:text-primary transition-colors">
                                            {/* Placeholder for dynamic icon */}
                                            <tactic.icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{tactic.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {tactic.desc}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="flex justify-center pt-32">
                    <Button size="lg" className="rounded-full px-12 h-16 text-lg font-bold bg-white text-black hover:bg-white/90">
                        Next Mission <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default MissionBrief;
