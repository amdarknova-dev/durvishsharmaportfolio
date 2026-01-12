import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
    Film,
    Tv,
    Gamepad2,
    Palette,
    Music,
    Brain,
    Eye,
    Sparkles,
    BookOpen
} from 'lucide-react';

const BeyondWork = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        window.scrollTo(0, 0);
    }, []);

    const interests = [
        {
            title: "Movies & Cinematic Universes",
            description: "Analyzing the expansive storytelling and visual world-building found in Marvel and DC cinematic universes to understand complex character arcs and narrative structure.",
            icon: Film,
        },
        {
            title: "Anime & Animation",
            description: "Observing high-quality animation in series like Demon Slayer, focusing on the precision of pacing, emotional delivery, and experimental visual storytelling.",
            icon: Tv,
        },
        {
            title: "Gaming & Interactive Media",
            description: "Engaging with story-driven and competitive games to study user interaction models, interface feedback loops, and intuitive game mechanics.",
            icon: Gamepad2,
        },
        {
            title: "Design & Visual Exploration",
            description: "Continuously exploring modern UI/UX patterns and learning from cinematic visuals to incorporate better motion design and aesthetics into my projects.",
            icon: Palette,
        },
        {
            title: "Music & Focus",
            description: "Utilizing music as a tool for focus and relaxation, allowing for sustained periods of productivity and creative mental clarity.",
            icon: Music,
        }
    ];

    const connections = [
        {
            title: "Creative Inspiration",
            text: "Diverse media provides a wealth of ideas that translate into unique and professional digital solutions."
        },
        {
            title: "Visual Thinking",
            text: "Cinematic and animated works influence my approach to color, lighting, and layout composition."
        },
        {
            title: "Narrative Design",
            text: "Understanding storytelling helps me create digital experiences that feel intuitive and logically structured."
        }
    ];

    const mindset = [
        "Curious learner",
        "Detail-oriented",
        "Enjoys creative storytelling",
        "Balances logic with imagination"
    ];

    return (
        <div className="relative min-h-screen overflow-x-hidden pt-32 selection:bg-primary/30 selection:text-white">
            {/* Cinematic Thor Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                    src="https://w0.peakpx.com/wallpaper/101/447/HD-wallpaper-thor-avengers-infinity-war-lightning.jpg"
                    alt="Thor Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 saturate-[1.2] brightness-75 scale-105"
                />
                {/* Thunder Flash Overlay */}
                <div className="absolute inset-0 bg-white thunder-flash mix-blend-overlay pointer-events-none" />
                {/* Vignette & Gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
            </div>

            <div className="fixed inset-0 z-[1] pointer-events-none">
                <ParticleBackground />
            </div>
            <Navigation />

            <main className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
                {/* Page Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        <span className="text-white">Beyond</span> <span className="text-gradient">The Code</span>
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-8" />
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Maintaining a balance between technical work and creative interests is essential for long-term focus.
                        Exploring different forms of storytelling and design outside of development helps me approach digital problems with a more genuine and creative perspective.
                    </p>
                </motion.div>

                {/* Interests & Passions */}
                <div className="grid md:grid-cols-2 gap-8 mb-32">
                    {interests.map((interest, index) => (
                        <motion.div
                            key={interest.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Card className="glass p-8 border-white/10 hover:border-primary/20 transition-all duration-500 h-full group">
                                <div className="flex items-start gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all">
                                        <interest.icon className="w-7 h-7 text-gray-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-3">{interest.title}</h3>
                                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">{interest.description}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Connection to Work */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">The Connection</h2>
                        <p className="text-gray-400">How these interests influence my professional work</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {connections.map((item, index) => (
                            <div key={item.title} className="text-center space-y-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto border border-accent/20">
                                    {index === 0 ? <Brain className="w-6 h-6 text-accent" /> :
                                        index === 1 ? <Eye className="w-6 h-6 text-accent" /> :
                                            <Sparkles className="w-6 h-6 text-accent" />}
                                </div>
                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Personal Mindset */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass p-10 md:p-16 border-white/10 rounded-3xl relative overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-6 flex-1">
                            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                <BookOpen className="w-8 h-8 text-primary" />
                                Personal Mindset
                            </h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {mindset.map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 text-gray-400 text-lg italic leading-relaxed border-l border-white/10 pl-8">
                            "Focusing on the intersections of technology and storytelling allows me to build digital products that are as functional as they are engaging."
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default BeyondWork;
