import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';

import Footer from '@/components/Footer';
import ThemedBackground from '@/components/ThemedBackground'; // New import
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
    BookOpen,
    ArrowRight,
    Globe,
    Terminal,
    FileText,
    Share2
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useSound } from '@/context/SoundContext';
import { useNavigate } from 'react-router-dom';

type NeuralThought = {
    id: string;
    title: string;
    date: string;
    readTime: string;
    category: string;
    excerpt: string;
    content: string;
};

const BeyondWork = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isGameOpen, setIsGameOpen] = useState(false);
    const [isWebOpen, setIsWebOpen] = useState(false);
    const [isAnimeOpen, setIsAnimeOpen] = useState(false);
    const [theme, setTheme] = useState<'default' | 'embers' | 'sakura' | 'matrix'>('default'); // Theme state
    const { playHover, playClick } = useSound();
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
        window.scrollTo(0, 0);
    }, []);

    const interests = [
        {
            title: "Cinematic Universes",
            description: "Analyzing expansive storytelling and world-building in modern cinema to understand narrative structures and character progression.",
            icon: Film,
            tag: "Film Theory"
        },
        {
            title: "Anime & Animation",
            description: "Studying high-quality animation for precision in pacing and experimental visual storytelling models.",
            icon: Tv,
            tag: "Visual Art"
        },
        {
            title: "Interactive Media",
            description: "Engaging with competitive games to study user interaction loops and intuitive interface feedback mechanics.",
            icon: Gamepad2,
            tag: "UX Design"
        },
        {
            title: "Visual Exploration",
            description: "Continuously exploring modern UI patterns to incorporate cinematic motion design into digital products.",
            icon: Palette,
            tag: "Motion"
        }
    ];

    const connections = [
        {
            title: "Creative Insight",
            text: "Diverse media provides a wealth of ideas that translate into unique digital solutions.",
            icon: Brain
        },
        {
            title: "Visual Hierarchy",
            text: "Cinematic works influence my approach to color, lighting, and composition.",
            icon: Eye
        },
        {
            title: "Narrative Flow",
            text: "Understanding storytelling helps me create digital experiences that feel intuitive.",
            icon: Sparkles
        }
    ];

    const [selectedThought, setSelectedThought] = useState<NeuralThought | null>(null);

    const neuralThoughts = [
        {
            id: 'n1',
            title: 'The Illusion of Control',
            date: '2024.03.12',
            readTime: '5m',
            category: 'Interface Psychology',
            excerpt: 'Why user agency is often a carefully crafted mirage, and how to build ethical interfaces that respect the user intent.',
            content: `
> "The best interface is no interface."

In our quest for control, we often clutter screens with knobs and switches. But true control comes from intuitive prediction. 

### The Agency Paradox
Users want to feel in control, but they don't want to make micro-decisions. The sweet spot lies in **Volitional predictive interfaces**—systems that suggest the next step but wait for confirmation.
            `
        },
        {
            id: 'n2',
            title: 'Rendering Reality',
            date: '2024.02.28',
            readTime: '8m',
            category: 'Graphics Engineering',
            excerpt: 'Optimizing high-fidelity particle systems for mobile browsers without melting the internal hardware.',
            content: `
Achieving 60FPS with 10,000 particles requires more than just good code; it requires understanding the GPU pipeline.

### Shader Logic
Move the math to the vertex shader. Calculating positions in JS on the CPU is a bottleneck. By using a time uniform and some noise functions in GLSL, you get butter-smooth movement.
            `
        },
        {
            id: 'n3',
            title: 'Intentional Minimalism',
            date: '2024.01.15',
            readTime: '4m',
            category: 'Design Ethics',
            excerpt: 'How stripping away visual noise amplifies the core mission of a digital product ecosystem.',
            content: `
We are drowning in noise. Notifications, popups, vibrant gradients fighting for attention.

**Digital Minimalism** isn't just about white space; it's about *Intentionality*. Every pixel must earn its rent on the screen.
            `
        }
    ];

    const mindset = [
        "Curious Adaptability",
        "Detail Precision",
        "Narrative Strategy",
        "Cognitive Logic"
    ];

    return (
        <div className="relative min-h-screen bg-background overflow-x-hidden pt-32 md:pt-48">
            <ThemedBackground theme={theme} />
            <Navigation />

            <main className="relative z-10 max-w-6xl mx-auto px-6 pb-64">
                {/* Minimal Centered Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-32"
                >
                    <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] mb-6 block">Beyond Work</span>
                    <h1 className="text-6xl md:text-[8rem] font-black mb-8 tracking-tighter text-white uppercase leading-none">
                        Creative <br />
                        <span className="text-gradient">Logic</span>
                    </h1>
                    <p className="mt-8 text-gray-500 text-lg max-w-xl mx-auto font-light leading-relaxed">
                        The intersection of technical engineering and artistic curiosity.
                    </p>
                </motion.div>

                {/* Interests Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-48">
                    {interests.map((interest, index) => (
                        <motion.div
                            key={interest.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                            <Card
                                className="glass-premium p-10 border-white/5 hover:border-primary/20 transition-all duration-500 h-full group cursor-pointer rounded-[2.5rem]"
                                onMouseEnter={() => playHover()}
                                onClick={() => playClick()}
                            >
                                <div className="space-y-8">
                                    <div className="flex justify-between items-start">
                                        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/5 group-hover:border-primary/20 transition-all">
                                            <interest.icon className="w-7 h-7 text-gray-400 group-hover:text-primary transition-colors" />
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{interest.tag}</span>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors">{interest.title}</h3>
                                        <p className="text-gray-400 leading-relaxed font-light text-lg">{interest.description}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Connection Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-48 py-32 border-y border-white/5"
                >
                    <div className="grid md:grid-cols-3 gap-16">
                        {connections.map((item, index) => (
                            <div key={item.title} className="space-y-8">
                                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center border border-primary/10">
                                    <item.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-white uppercase tracking-widest">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed font-light">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Future Ambitions */}
                <div className="grid lg:grid-cols-3 gap-8 mb-48">
                    <Card
                        className="glass-premium p-12 border-white/5 relative overflow-hidden group cursor-pointer rounded-[3rem] hover:border-primary/30 transition-all duration-700"
                        onClick={() => { playClick(); setIsGameOpen(true); setTheme('embers'); }} // Trigger Embers
                        onMouseEnter={() => playHover()}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative z-10 space-y-12">
                            <div className="w-20 h-20 rounded-3xl bg-white/[0.03] flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-700">
                                <Gamepad2 className="w-10 h-10 text-white group-hover:text-primary transition-colors" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[2.5rem] font-black text-white uppercase tracking-tighter leading-none">The <br /><span className="text-gradient">Game</span></h3>
                                <p className="text-gray-400 text-xl font-light leading-relaxed max-w-sm">
                                    An immersive 3D RPG where technical code is the core magic mechanic.
                                </p>
                            </div>
                            <Button variant="link" className="text-primary p-0 h-auto text-sm uppercase tracking-[0.2em] font-bold group items-center gap-4">
                                View Logic
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </div>
                    </Card>

                    <Card
                        className="glass-premium p-12 border-white/5 relative overflow-hidden group cursor-pointer rounded-[3rem] hover:border-purple-500/30 transition-all duration-700"
                        onClick={() => { playClick(); setIsAnimeOpen(true); setTheme('sakura'); }} // Trigger Sakura
                        onMouseEnter={() => playHover()}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        {/* Lightning effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 space-y-12">
                            <div className="w-20 h-20 rounded-3xl bg-white/[0.03] flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-purple-500/30 transition-all duration-700">
                                <Tv className="w-10 h-10 text-white group-hover:text-purple-400 transition-colors" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[2.5rem] font-black text-white uppercase tracking-tighter leading-none">The <br /><span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">Anime</span></h3>
                                <p className="text-gray-400 text-xl font-light leading-relaxed max-w-sm">
                                    Eclipse: Thunder of the Fallen - A dark fantasy shonen epic.
                                </p>
                            </div>
                            <Button variant="link" className="text-purple-400 p-0 h-auto text-sm uppercase tracking-[0.2em] font-bold group items-center gap-4">
                                View Universe
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </div>
                    </Card>

                    <Card
                        className="glass-premium p-12 border-white/5 relative overflow-hidden group cursor-pointer rounded-[3rem] hover:border-accent/30 transition-all duration-700"
                        onClick={() => { playClick(); setIsWebOpen(true); setTheme('matrix'); }} // Trigger Matrix
                        onMouseEnter={() => playHover()}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative z-10 space-y-12">
                            <div className="w-20 h-20 rounded-3xl bg-white/[0.03] flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-accent/30 transition-all duration-700">
                                <Globe className="w-10 h-10 text-white group-hover:text-accent transition-colors" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[2.5rem] font-black text-white uppercase tracking-tighter leading-none">The <br /><span className="text-gradient">Nexus</span></h3>
                                <p className="text-gray-400 text-xl font-light leading-relaxed max-w-sm">
                                    Experimental decentralized hub for creative coding and high-end visual art.
                                </p>
                            </div>
                            <Button variant="link" className="text-accent p-0 h-auto text-sm uppercase tracking-[0.2em] font-bold group items-center gap-4">
                                View Protocol
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </div>
                    </Card>
                </div>


                {/* Neural Link Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-48"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-12 mb-12">
                        <div className="space-y-4">
                            <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] block">Interface</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                                Neural <span className="text-gradient">Link</span>
                            </h2>
                        </div>
                        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em]">
                            Source: Mind Palace // Stream: Enabled
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        {neuralThoughts.map((thought, i) => (
                            <motion.div
                                key={thought.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => { playClick(); setSelectedThought(thought); }}
                                className="group cursor-pointer"
                            >
                                <Card className="glass-premium p-8 h-full border border-white/5 hover:border-primary/20 transition-all duration-500 rounded-[2rem] flex flex-col justify-between space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-primary" />
                                            </div>
                                            <span className="text-[10px] font-mono text-gray-600 tracking-widest">{thought.date}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white uppercase leading-tight group-hover:text-primary transition-colors">{thought.title}</h3>
                                        <p className="text-gray-500 text-sm font-light line-clamp-3 leading-relaxed">{thought.excerpt}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{thought.category}</span>
                                        <span className="text-[10px] font-mono text-primary uppercase tracking-widest">{thought.readTime}</span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Mindset Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-premium p-16 md:p-24 rounded-[4rem] border-white/5 relative overflow-hidden"
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                        <div className="space-y-10 flex-1">
                            <div className="space-y-4">
                                <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] block">Ecosystem</span>
                                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                                    Cognitive <br />
                                    <span className="text-gradient">Mindset</span>
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                                {mindset.map((item) => (
                                    <div key={item} className="flex items-center gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                        <span className="text-gray-300 font-mono text-xs uppercase tracking-[0.2em]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 text-gray-500 text-2xl font-light italic leading-relaxed border-l border-white/5 pl-12 lg:max-w-md">
                            "The synthesis of high-fidelity engineering and immersive human storytelling defines the next generation of the web."
                        </div>
                    </div>
                    {/* Subtle Accent Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
                </motion.div>
            </main>

            {/* Eclipse Game Dialog */}
            <Dialog open={isGameOpen} onOpenChange={(open) => {
                setIsGameOpen(open);
                if (!open) setTheme('default'); // Reset theme
            }}>
                <DialogContent className="glass-premium border-primary/20 max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 text-white bg-background rounded-[3rem]">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary/10 via-transparent to-yellow-500/10 border-b border-white/10 p-8 flex items-center justify-between shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,197,94,0.15),transparent_50%)]" />
                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-yellow-500/20 flex items-center justify-center border border-primary/30">
                                <Gamepad2 className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em] block mb-1">Action RPG • Dark Fantasy</span>
                                <DialogTitle className="text-3xl font-black uppercase tracking-tighter bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
                                    Eclipse: Storm of the Fallen
                                </DialogTitle>
                            </div>
                        </div>
                        <div className="text-right relative z-10">
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Platforms</span>
                            <span className="text-sm font-bold text-white">PC • PS5 • Xbox • VR</span>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {/* Genre Tags */}
                        <div className="flex flex-wrap gap-2">
                            {['Action RPG', 'Dark Fantasy', 'Supernatural', 'Adventure', 'Psychological', 'Comedy', 'Romance'].map(genre => (
                                <span key={genre} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 uppercase tracking-widest">
                                    {genre}
                                </span>
                            ))}
                        </div>

                        {/* World Setting */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-white uppercase tracking-widest text-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary rounded-full" /> Three Realms
                            </h4>
                            <div className="grid md:grid-cols-3 gap-3">
                                <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/20 space-y-2">
                                    <h5 className="font-bold text-blue-400 text-sm">⛅ Celestial Sky</h5>
                                    <p className="text-xs text-gray-400">Floating cities powered by emotions. Eclipse Slayers' Council HQ.</p>
                                </div>
                                <div className="p-4 bg-gray-500/5 rounded-2xl border border-gray-500/20 space-y-2">
                                    <h5 className="font-bold text-gray-300 text-sm">🏙️ Earthly Surface</h5>
                                    <p className="text-xs text-gray-400">Modern cities unaware of demons. Urban stealth & investigations.</p>
                                </div>
                                <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/20 space-y-2">
                                    <h5 className="font-bold text-red-400 text-sm">🌀 Abyssal Depths</h5>
                                    <p className="text-xs text-gray-400">Dark dimension where fears become demons. Nightmare landscapes.</p>
                                </div>
                            </div>
                        </div>

                        {/* Main Characters */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-white uppercase tracking-widest text-sm">Playable Heroes</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-5 bg-yellow-500/5 rounded-2xl border border-yellow-500/20 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">⚡</span>
                                        <div>
                                            <h5 className="font-bold text-yellow-400">Raizo Ardent</h5>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Thunder Soul Breather</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400">Age 16, grows stronger with fear. Rank 8 → Eclipse Pillar journey.</p>
                                </div>
                                <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/20 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">❄</span>
                                        <div>
                                            <h5 className="font-bold text-blue-400">Selene Moon</h5>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Moon Breather</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400">Calm strategist. Communicates across time via dreams.</p>
                                </div>
                                <div className="p-5 bg-red-500/5 rounded-2xl border border-red-500/20 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">🥊</span>
                                        <div>
                                            <h5 className="font-bold text-red-400">Kuro Fist</h5>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Street Fighter</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400">Human brawler. Protects civilians without superpowers.</p>
                                </div>
                                <div className="p-5 bg-cyan-500/5 rounded-2xl border border-cyan-500/20 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">✨</span>
                                        <div>
                                            <h5 className="font-bold text-cyan-400">Nori</h5>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">AI Spirit Companion</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400">Gadgets, tactical advice, equipment upgrades.</p>
                                </div>
                            </div>
                        </div>

                        {/* Combat System */}
                        <div className="p-6 bg-gradient-to-r from-primary/5 to-yellow-500/5 rounded-2xl border border-primary/20 space-y-4">
                            <h4 className="font-bold text-white uppercase tracking-widest text-sm">⚔️ Hybrid Combat System</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-400"><strong className="text-white">Melee + Ranged + Magic</strong> — Fluid combo system</p>
                                    <p className="text-sm text-gray-400"><strong className="text-white">Environmental Attacks</strong> — Use terrain as weapons</p>
                                    <p className="text-sm text-gray-400"><strong className="text-primary">Fear Mechanic</strong> — Fear spikes trigger Fearless Thunder Mode</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Thunder Soul Techniques:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Flash Step', 'Thunder Pulse', 'Echo Slash', 'Godspeed Coffin', 'Fearless Thunder'].map(t => (
                                            <span key={t} className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-[10px] rounded-lg">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enemy Hierarchy */}
                        <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                            <h4 className="font-bold text-white uppercase tracking-widest text-sm">👹 Enemy Hierarchy</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                                <span className="text-red-500 font-bold">Varyon Noctyss</span>
                                <span className="text-gray-400 col-span-2">Eclipse Demon King — Reality Warper</span>
                                <span className="text-orange-400 font-bold">Moon Tyrants (6)</span>
                                <span className="text-gray-400 col-span-2">Pride, Wrath, Despair, Hunger, Silence, Time</span>
                                <span className="text-gray-300">Demon Generals</span>
                                <span className="text-gray-400 col-span-2">Elite commanders</span>
                                <span className="text-gray-500">Feral Demons</span>
                                <span className="text-gray-400 col-span-2">Common enemies</span>
                            </div>
                        </div>

                        {/* Game Features Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                                <h4 className="font-bold text-white uppercase tracking-widest text-sm">🎮 Progression</h4>
                                <ul className="space-y-1 text-sm text-gray-400">
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Rank 10 → Rank 1 progression</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Skill Trees: Combat, Breathing, Blood Arts</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Equipment: Weapons, Armor, Gadgets</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Dynamic world reacts to choices</li>
                                </ul>
                            </div>
                            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                                <h4 className="font-bold text-white uppercase tracking-widest text-sm">👥 Eclipse Legions</h4>
                                <ul className="space-y-1 text-sm text-gray-400">
                                    <li className="flex items-center gap-2"><span className="text-yellow-400">⚡</span> Thunder Legion — Speed & assassination</li>
                                    <li className="flex items-center gap-2"><span className="text-blue-400">🌙</span> Moon Legion — Stealth & intel</li>
                                    <li className="flex items-center gap-2"><span className="text-orange-400">☀️</span> Solar Legion — Heavy hitters</li>
                                    <li className="flex items-center gap-2"><span className="text-cyan-400">❄️</span> Frost Legion — Battlefield control</li>
                                </ul>
                            </div>
                        </div>

                        {/* Multiplayer */}
                        <div className="p-5 bg-purple-500/5 rounded-2xl border border-purple-500/20 space-y-3">
                            <h4 className="font-bold text-white uppercase tracking-widest text-sm">🌐 Multiplayer Modes</h4>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-2 bg-white/5 rounded-xl text-sm text-gray-300"><strong>Co-op Missions</strong> — Fight demons together</span>
                                <span className="px-3 py-2 bg-white/5 rounded-xl text-sm text-gray-300"><strong>Territory Wars</strong> — Faction-based PvP</span>
                                <span className="px-3 py-2 bg-white/5 rounded-xl text-sm text-gray-300"><strong>Async</strong> — Actions affect other worlds</span>
                            </div>
                        </div>

                        {/* Inspirations */}
                        <div className="flex flex-wrap gap-2">
                            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mr-2">Inspired by:</span>
                            {['Demon Slayer', 'One Piece', 'JJK', 'Chainsaw Man', 'Your Name', 'AOT', 'Naruto', 'Dragon Ball'].map(game => (
                                <span key={game} className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-mono uppercase">
                                    {game}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10 bg-white/[0.02] shrink-0">
                        <Button
                            onClick={() => { setIsGameOpen(false); navigate('/contact'); }}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-yellow-500 text-white font-bold uppercase tracking-widest hover:opacity-90"
                        >
                            ⚡ Join the Eclipse Project
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>


            <Dialog open={isWebOpen} onOpenChange={(open) => {
                setIsWebOpen(open);
                if (!open) setTheme('default');
            }}>
                <DialogContent className="glass-premium border-white/10 max-w-2xl text-white rounded-[3rem] p-12">
                    <DialogHeader className="space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                                <Globe className="w-8 h-8 text-accent" />
                            </div>
                            <DialogTitle className="text-4xl font-black uppercase tracking-tighter">DevNexus</DialogTitle>
                        </div>
                        <DialogDescription className="text-gray-400 text-lg leading-relaxed space-y-6 font-light">
                            <p>A curated platform dedicated to 'Creative Coding' experiments. Exploring the boundaries of WebGL, GLSL, and high-performance UI architecture.</p>
                            <div className="p-8 bg-white/[0.02] rounded-[2rem] border border-white/5 space-y-4">
                                <h4 className="font-bold text-white uppercase tracking-widest text-sm">Core Modules:</h4>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent rounded-full" /> Asset Repository (Models/Shaders)</li>
                                    <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent rounded-full" /> Interactive Portfolio Engine</li>
                                    <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent rounded-full" /> Creative Rendering Challenges</li>
                                </ul>
                            </div>
                            <div className="pt-4">
                                <Button
                                    onClick={() => { setIsWebOpen(false); navigate('/contact'); }}
                                    className="w-full h-16 rounded-2xl bg-accent text-white font-bold uppercase tracking-widest"
                                >
                                    Join the Web Hub
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Dialog open={!!selectedThought} onOpenChange={() => setSelectedThought(null)}>
                <DialogContent className="glass-premium border-white/10 max-w-3xl max-h-[85vh] overflow-hidden flex flex-col p-0 text-white bg-background rounded-[3rem]">
                    {selectedThought && (
                        <>
                            <div className="bg-white/[0.03] border-b border-white/10 p-6 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/30" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/30" />
                                    </div>
                                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                                        Protocol: {selectedThought.id}.sh
                                    </span>
                                </div>
                                <Share2 className="w-4 h-4 text-gray-600 cursor-pointer hover:text-white transition-colors" />
                            </div>

                            <div className="flex-1 overflow-y-auto p-12 leading-relaxed">
                                <div className="max-w-2xl mx-auto space-y-12">
                                    <div className="space-y-6">
                                        <span className="text-primary font-mono text-[10px] uppercase tracking-[0.4em]">{selectedThought.category}</span>
                                        <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-tight">{selectedThought.title}</h2>
                                        <p className="text-xl text-gray-500 italic font-light">{selectedThought.excerpt}</p>
                                    </div>

                                    <div className="prose prose-invert max-w-none space-y-8 font-light text-gray-400">
                                        {selectedThought.content.split('\n').map((line: string, i: number) => {
                                            if (line.trim().startsWith('>')) {
                                                return (
                                                    <blockquote key={i} className="border-l-2 border-primary pl-8 italic text-2xl text-white py-4 font-normal">
                                                        "{line.replace('>', '').trim()}"
                                                    </blockquote>
                                                );
                                            }
                                            if (line.trim().startsWith('###')) {
                                                return <h3 key={i} className="text-2xl font-bold text-white uppercase tracking-tight pt-8">{line.replace('###', '').trim()}</h3>;
                                            }
                                            if (!line.trim()) return null;
                                            return <p key={i} className="text-lg leading-relaxed">{line}</p>;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Eclipse Anime Dialog */}
            <Dialog open={isAnimeOpen} onOpenChange={(open) => {
                setIsAnimeOpen(open);
                if (!open) setTheme('default');
            }}>
                <DialogContent className="glass-premium border-purple-500/20 max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 text-white bg-background rounded-[3rem]">
                    {/* Header with lightning effect */}
                    <div className="bg-gradient-to-r from-purple-500/10 via-transparent to-yellow-500/10 border-b border-white/10 p-8 flex items-center justify-between shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15),transparent_50%)]" />
                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-yellow-500/20 flex items-center justify-center border border-purple-500/30">
                                <Tv className="w-8 h-8 text-purple-400" />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.4em] block mb-1">Original Anime Series</span>
                                <DialogTitle className="text-3xl font-black uppercase tracking-tighter bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
                                    Eclipse: Thunder of the Fallen
                                </DialogTitle>
                            </div>
                        </div>
                        <div className="text-right relative z-10">
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Season 1</span>
                            <span className="text-lg font-bold text-white">26 Episodes</span>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {/* Genre Tags */}
                        <div className="flex flex-wrap gap-2">
                            {['Action', 'Dark Fantasy', 'Supernatural', 'Adventure', 'Romance', 'Psychological', 'Comedy'].map(genre => (
                                <span key={genre} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 uppercase tracking-widest">
                                    {genre}
                                </span>
                            ))}
                        </div>

                        {/* Synopsis */}
                        <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                            <h4 className="font-bold text-white uppercase tracking-widest text-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-400 rounded-full" /> World Setting
                            </h4>
                            <p className="text-gray-400 leading-relaxed">
                                The world is divided into three realms: <span className="text-purple-400">Sky Realm</span> (floating cities powered by emotions),
                                <span className="text-blue-400"> Surface World</span> (modern cities unaware of demons), and
                                <span className="text-red-400"> Abyss Realm</span> (where human fears become demons).
                                Every 100 years, the <span className="text-yellow-400 font-bold">Eclipse Event</span> weakens the barriers, flooding demons into the human world.
                            </p>
                        </div>

                        {/* Main Characters */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-white uppercase tracking-widest text-sm">Main Heroes</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-5 bg-yellow-500/5 rounded-2xl border border-yellow-500/20 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">⚡</span>
                                        <div>
                                            <h5 className="font-bold text-yellow-400">Aren Raizo</h5>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Thunder Soul Breather</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400">Age 16, cowardly but wields devastating single-strike mastery. Fights only when unconscious... until he learns to turn fear into power.</p>
                                </div>
                                <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/20 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">🌙</span>
                                        <div>
                                            <h5 className="font-bold text-blue-400">Yumi Aster</h5>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Moon Breather</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400">Calm and strategic. Anchors Aren emotionally. Can communicate through dreams across time (Your Name-style connection).</p>
                                </div>
                                <div className="p-5 bg-red-500/5 rounded-2xl border border-red-500/20 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">🥊</span>
                                        <div>
                                            <h5 className="font-bold text-red-400">Kaito</h5>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Street Fighter</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400">No breathing style. Proves that bravery doesn't need superpowers. Comic relief + inspiration.</p>
                                </div>
                                <div className="p-5 bg-cyan-500/5 rounded-2xl border border-cyan-500/20 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">🤖</span>
                                        <div>
                                            <h5 className="font-bold text-cyan-400">Nori</h5>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">AI Spirit Companion</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400">Provides gadgets, tactical advice, and comic relief. The team's tactical brain and tech support.</p>
                                </div>
                            </div>
                        </div>

                        {/* Main Villain */}
                        <div className="p-6 bg-gradient-to-r from-red-500/5 to-purple-500/5 rounded-2xl border border-red-500/20 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">👹</span>
                                    <div>
                                        <h4 className="font-bold text-red-400 text-xl">Varyon Noctyss</h4>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">Eclipse Demon King • The First Fear</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Cold, calculating, rarely fights directly. Wields <span className="text-red-400">Fear Command</span>, <span className="text-red-400">Blood Creation</span>,
                                <span className="text-red-400"> Regeneration</span>, and <span className="text-red-400">Memory Erasure</span>.
                                Goal: Freeze the world in eternal night, removing hope and choice forever.
                            </p>
                        </div>

                        {/* Power Systems */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                                <h4 className="font-bold text-white uppercase tracking-widest text-sm">Thunder Soul Breathing</h4>
                                <ul className="space-y-1 text-sm text-gray-400">
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-yellow-400 rounded-full" /> Flash Step</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-yellow-400 rounded-full" /> Thunder Pulse</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-yellow-400 rounded-full" /> Echo Slash</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-yellow-400 rounded-full" /> Godspeed Coffin</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-yellow-400 rounded-full" /> Fearless Thunder (Ultimate)</li>
                                </ul>
                            </div>
                            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                                <h4 className="font-bold text-white uppercase tracking-widest text-sm">Slayer Ranks</h4>
                                <ul className="space-y-1 text-sm text-gray-400">
                                    <li className="flex items-center gap-2"><span className="text-[10px] text-gray-600 w-4">10</span> Initiate</li>
                                    <li className="flex items-center gap-2"><span className="text-[10px] text-gray-600 w-4">8</span> Shadow Runner (Aren starts)</li>
                                    <li className="flex items-center gap-2"><span className="text-[10px] text-gray-600 w-4">3</span> Pillar</li>
                                    <li className="flex items-center gap-2"><span className="text-[10px] text-primary w-4">1</span> Eclipse Pillar (Legendary)</li>
                                </ul>
                            </div>
                        </div>

                        {/* Season 1 Arcs */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-white uppercase tracking-widest text-sm">Season 1 Arcs</h4>
                            <div className="space-y-2">
                                <div className="flex items-center gap-4 p-3 bg-white/[0.02] rounded-xl">
                                    <span className="text-[10px] font-mono text-gray-600">EP 1-6</span>
                                    <span className="text-white font-bold">Crying Thunder</span>
                                    <span className="text-gray-500 text-sm">- Aren joins, first unconscious kill</span>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-white/[0.02] rounded-xl">
                                    <span className="text-[10px] font-mono text-gray-600">EP 7-10</span>
                                    <span className="text-white font-bold">Demons Were Human</span>
                                    <span className="text-gray-500 text-sm">- Moral ambiguity emerges</span>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-white/[0.02] rounded-xl">
                                    <span className="text-[10px] font-mono text-gray-600">EP 11-16</span>
                                    <span className="text-white font-bold">Thunder That Chose Fear</span>
                                    <span className="text-gray-500 text-sm">- Training, romance with Yumi</span>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-white/[0.02] rounded-xl">
                                    <span className="text-[10px] font-mono text-gray-600">EP 17-22</span>
                                    <span className="text-white font-bold">Rise of Moon Tyrants</span>
                                    <span className="text-gray-500 text-sm">- Legions unite, Pillars fall</span>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-purple-500/10 to-yellow-500/10 rounded-xl border border-purple-500/20">
                                    <span className="text-[10px] font-mono text-purple-400">EP 23-26</span>
                                    <span className="text-purple-400 font-bold">Eclipse End</span>
                                    <span className="text-gray-400 text-sm">- Final battle, bittersweet ending</span>
                                </div>
                            </div>
                        </div>

                        {/* Themes */}
                        <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 space-y-4">
                            <h4 className="font-bold text-white uppercase tracking-widest text-sm">Core Themes</h4>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
                                <div className="flex items-start gap-3">
                                    <span className="text-purple-400 mt-1">💔</span>
                                    <span><strong className="text-white">Fear ≠ Weakness</strong> — Courage is acting despite fear</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-yellow-400 mt-1">✨</span>
                                    <span><strong className="text-white">Hope in Tragedy</strong> — Light must exist even in darkness</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1">👹</span>
                                    <span><strong className="text-white">Demons = Emotions</strong> — They reflect human feelings</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-pink-400 mt-1">💕</span>
                                    <span><strong className="text-white">Love Survives</strong> — Even erased timelines</span>
                                </div>
                            </div>
                        </div>

                        {/* Style Inspirations */}
                        <div className="flex flex-wrap gap-2">
                            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mr-2">Inspired by:</span>
                            {['Demon Slayer', 'One Piece', 'JJK', 'Chainsaw Man', 'Your Name', 'AOT', 'Naruto', 'Dragon Ball'].map(anime => (
                                <span key={anime} className="px-2 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-[10px] font-mono uppercase">
                                    {anime}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10 bg-white/[0.02] shrink-0">
                        <Button
                            onClick={() => { setIsAnimeOpen(false); navigate('/contact'); }}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-yellow-500 text-white font-bold uppercase tracking-widest hover:opacity-90"
                        >
                            ⚡ Join the Eclipse Universe
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Footer />

            <div className="fixed inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background to-transparent pointer-events-none -z-10" />
        </div>
    );
};

export default BeyondWork;
