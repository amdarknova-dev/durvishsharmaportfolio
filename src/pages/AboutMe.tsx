import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
    Code2,
    Layers,
    Zap,
    Box,
    Target,
    ShieldCheck,
    Users,
    RefreshCw,
    Rocket,
    Lightbulb,
    MousePointer2
} from 'lucide-react';

const AboutMe = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const whatIDo = [
        {
            title: "Responsive Interfaces",
            description: "Developing accessible and responsive web interfaces that provide a seamless experience across all device types and screen sizes.",
            icon: MousePointer2
        },
        {
            title: "Scalable Architecture",
            description: "Transforming complex design systems into clean, modular, and maintainable codebases using modern frontend frameworks.",
            icon: Layers
        },
        {
            title: "Interaction Design",
            description: "Integrating purposeful motion and micro-interactions to enhance user engagement and provide intuitive feedback.",
            icon: Zap
        },
        {
            title: "Immersive Visuals",
            description: "Experimenting with 3D elements and modern CSS techniques to create visually striking and memorable digital experiences.",
            icon: Box
        }
    ];

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

                {/* What I Do Section */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px flex-1 bg-white/10" />
                        <h2 className="text-3xl font-bold text-white uppercase tracking-widest text-sm">What I Do</h2>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {whatIDo.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="glass p-8 border-white/10 hover:border-primary/30 transition-all duration-500 h-full">
                                    <item.icon className="w-8 h-8 text-primary mb-6" />
                                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* How I Work Section */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px flex-1 bg-white/10" />
                        <h2 className="text-3xl font-bold text-white uppercase tracking-widest text-sm">How I Work</h2>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {howIWork.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex gap-6 p-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                                        <item.icon className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
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
