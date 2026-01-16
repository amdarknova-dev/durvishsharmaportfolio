import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
    Target,
    Users,
    RefreshCw,
    Rocket,
    Lightbulb,
    Cpu
} from 'lucide-react';
import SkillConstellation from '@/components/SkillConstellation';
import MissionLog from '@/components/MissionLog';
import MindsetRadar from '@/components/MindsetRadar';

const AboutMe = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const howIWork = [
        {
            title: "Detail-Oriented",
            description: "Approaching every project with a structured mindset, ensuring precision in both design implementation and logic.",
            icon: Target
        },
        {
            title: "Performance First",
            description: "Prioritizing speed and efficiency through optimized assets, lazy loading, and clean rendering patterns.",
            icon: Rocket
        },
        {
            title: "Collaborative Mindset",
            description: "Valuing clear communication and professional collaboration to align technical solutions with project goals.",
            icon: Users
        },
        {
            title: "Continuous Refinement",
            description: "Maintaining a habit of constant learning and iterative improvement to stay ahead of industry standards.",
            icon: RefreshCw
        }
    ];

    return (
        <div className="relative min-h-screen bg-background overflow-x-hidden pt-24 md:pt-32 lg:pt-40">
            <ParticleBackground />
            <Navigation />

            <main className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
                {/* Intro Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-32 max-w-3xl"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        <span className="text-white">I'm</span> <span className="text-gradient">Durvish Sharma</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                        A Creative Frontend Developer focused on building modern, interactive, and high-performance web experiences.
                        I bridge the gap between design and technology through clean code and purposeful animations.
                    </p>
                </motion.div>

                {/* Interactive Skills Section - Constellation */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px flex-1 bg-white/10" />
                        <h2 className="text-3xl font-bold text-white uppercase tracking-widest text-sm">Neural Network</h2>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <SkillConstellation />
                </section>

                {/* Methodology & Mindset Section */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px flex-1 bg-white/10" />
                        <h2 className="text-3xl font-bold text-white uppercase tracking-widest text-sm">Operative Mindset</h2>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <MindsetRadar />
                        </div>

                        <div className="order-1 lg:order-2 space-y-8">
                            <div className="glass p-8 border-white/10 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Cpu className="w-24 h-24 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <Target className="w-6 h-6 text-primary" />
                                    Precision Engineering
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    I approach development with a structured, data-driven mindset. Every pixel is calculated, every animation curve is refined. I believe that chaotic creativity needs a solid logical foundation to truly shine.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {howIWork.map((item, index) => (
                                    <div key={item.title} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                        <item.icon className="w-5 h-5 text-gray-500 mb-2" />
                                        <h4 className="text-white font-bold text-sm">{item.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Log - History */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-20">
                        <div className="h-px flex-1 bg-white/10" />
                        <h2 className="text-3xl font-bold text-white uppercase tracking-widest text-sm">Mission Log</h2>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <MissionLog />
                </section>

                {/* Current Focus Section */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-32 glass p-10 md:p-16 border-white/10 rounded-3xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50" />
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <Lightbulb className="w-8 h-8 text-primary" />
                            Current Focus
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed mb-8">
                            I am currently deepening my expertise in advanced React patterns and exploring the intersection of 3D interactions and web performance. My focus remains on building real-world projects that challenge my technical boundaries and refine my design intuition.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {['Advanced React', 'Framer Motion', 'Three.js', 'System Design'].map(skill => (
                                <span key={skill} className="px-4 py-2 rounded-full glass border-white/10 text-gray-400 text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Personal Note Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 italic">A Personal Note</h2>
                    <p className="text-gray-400 leading-relaxed">
                        My creative drive is often fueled by storytelling in film, anime, and games. These mediums inspire my approach to digital narratives, influencing how I handle lighting, composition, and user flow in my professional work. Balancing technical logic with a bit of imagination is what keeps my work exciting.
                    </p>
                </motion.section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutMe;
