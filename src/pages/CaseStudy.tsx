import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Play, Calendar, Clock, Users, Zap, Target, Lightbulb, Wrench, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface CaseStudyData {
    id: string;
    title: string;
    subtitle: string;
    heroImage: string;
    category: string;
    year: string;
    duration: string;
    role: string;
    overview: string;
    challenge: string;
    solution: string;
    process: { title: string; description: string }[];
    techStack: string[];
    results: { metric: string; value: string }[];
    learnings: string[];
    videoUrl?: string;
    liveUrl?: string;
    githubUrl?: string;
}

const caseStudies: Record<string, CaseStudyData> = {
    'eclipse-thunderfall': {
        id: 'eclipse-thunderfall',
        title: 'Eclipse: Thunderfall',
        subtitle: 'Anime Action RPG Prototype',
        heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80',
        category: 'Game Development',
        year: '2024',
        duration: '3 months',
        role: 'Solo Developer',
        overview: 'A third-person anime-style action RPG prototype focused on fast lightning-based combat, cinematic camera work, and challenging boss fights. Built to demonstrate AAA-feel gameplay at indie scale.',
        challenge: 'Creating fluid, responsive combat that captures the intensity of anime action sequences while maintaining 60fps performance. The challenge was making each attack feel impactful without sacrificing gameplay responsiveness.',
        solution: 'Implemented a modular combat system using Unreal Engine 5 Blueprints with animation-driven state machines. Used Niagara VFX for stylized lightning effects and FMOD for dynamic audio that responds to combat intensity.',
        process: [
            { title: 'Research & Reference', description: 'Studied combat systems from Demon Slayer, Genshin Impact, and Devil May Cry. Created frame-by-frame breakdowns of anime fight sequences.' },
            { title: 'Core Combat Prototype', description: 'Built the foundational combo system with light/heavy attacks, cancels, and recovery frames. Focused on game feel before visuals.' },
            { title: 'VFX & Polish', description: 'Added Niagara-based lightning trails, impact effects, and slow-motion hit stops. Implemented anime-style speed lines and impact frames.' },
            { title: 'Enemy AI & Boss Design', description: 'Created behavior tree-driven enemies with telegraph, attack, and recovery phases. Designed boss patterns that challenge player mastery.' }
        ],
        techStack: ['Unreal Engine 5', 'Blueprints', 'Niagara VFX', 'FMOD', 'Blender', 'Behavior Trees'],
        results: [
            { metric: 'Combat Moves', value: '12+' },
            { metric: 'Boss Patterns', value: '8' },
            { metric: 'Stable FPS', value: '60' },
            { metric: 'Dev Time', value: '3 mo' }
        ],
        learnings: [
            'Animation canceling is critical for responsive combat feel',
            'VFX should enhance, not obscure gameplay feedback',
            'Playtesting early reveals feel issues that metrics miss',
            'Modular systems save time when iterating on design'
        ],
        videoUrl: '', // Add your YouTube URL here
        githubUrl: 'https://github.com/amdarknova-dev'
    },
    'eclipse-fallen-sky': {
        id: 'eclipse-fallen-sky',
        title: 'Eclipse: Fallen Sky',
        subtitle: 'Anime Cinematic Short',
        heroImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=80',
        category: 'Anime Cinematic',
        year: '2024',
        duration: '2 months',
        role: 'Director & Technical Artist',
        overview: 'A Demon Slayer–inspired anime cinematic short rendered entirely in Unreal Engine 5. Combines 3D environments with anime-style character rendering for a hybrid visual approach.',
        challenge: 'Achieving the look and timing of traditional anime using real-time 3D rendering. The challenge was bridging the gap between anime aesthetics and 3D production pipelines.',
        solution: 'Developed a hybrid workflow using Unreal Sequencer for cinematics, Blender for character animation, and Clip Studio Paint for 2D impact frames. Used custom shaders for anime-style rendering.',
        process: [
            { title: 'Storyboarding', description: 'Created detailed storyboards focusing on camera angles, timing, and emotional beats. Referenced Demon Slayer and Jujutsu Kaisen.' },
            { title: 'Asset Production', description: 'Modeled and rigged characters in Blender. Reused game assets from Eclipse: Thunderfall for efficiency.' },
            { title: 'Sequencer Animation', description: 'Animated scenes in Unreal Sequencer. Used motion capture data as base and hand-animated key poses.' },
            { title: 'Post-Processing', description: 'Added 2D impact frames in Clip Studio Paint. Final composite and color grading in DaVinci Resolve.' }
        ],
        techStack: ['Unreal Engine 5', 'Sequencer', 'Blender', 'Clip Studio Paint', 'DaVinci Resolve', 'Niagara'],
        results: [
            { metric: 'Runtime', value: '2:30' },
            { metric: 'Shots', value: '45+' },
            { metric: 'Reused Assets', value: '80%' },
            { metric: 'Render Time', value: 'Real-time' }
        ],
        learnings: [
            'Timing is everything in anime – hold frames for impact',
            'Reusing game assets cuts production time dramatically',
            '2D elements in 3D scenes create authentic anime feel',
            'Music and SFX timing must be locked before animation'
        ],
        videoUrl: '' // Add your YouTube URL here
    }
};

const CaseStudy = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const study = id ? caseStudies[id] : null;

    if (!study) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Case Study Not Found</h1>
                    <Button onClick={() => navigate('/')}>Return Home</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Navigation />

            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-end">
                <div className="absolute inset-0">
                    <img src={study.heroImage} alt={study.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/#projects')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-mono uppercase tracking-widest">Back to Projects</span>
                    </motion.button>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <span className="text-primary font-mono text-xs uppercase tracking-[0.3em]">{study.category}</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mt-2">{study.title}</h1>
                        <p className="text-xl text-gray-400 mt-4 max-w-2xl">{study.subtitle}</p>
                    </motion.div>

                    {/* Meta Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-6 mt-8"
                    >
                        <div className="flex items-center gap-2 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{study.year}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{study.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{study.role}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-4xl mx-auto px-6 py-24 space-y-24">
                {/* Overview */}
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <Target className="w-6 h-6 text-primary" />
                        Overview
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed">{study.overview}</p>
                </motion.div>

                {/* Challenge */}
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <Zap className="w-6 h-6 text-primary" />
                        The Challenge
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed">{study.challenge}</p>
                </motion.div>

                {/* Solution */}
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <Lightbulb className="w-6 h-6 text-primary" />
                        The Solution
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed">{study.solution}</p>
                </motion.div>

                {/* Process */}
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <Wrench className="w-6 h-6 text-primary" />
                        The Process
                    </h2>
                    <div className="space-y-8">
                        {study.process.map((step, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                    {i + 1}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-500">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-2xl font-bold text-white mb-6">Tech Stack</h2>
                    <div className="flex flex-wrap gap-3">
                        {study.techStack.map((tech) => (
                            <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400">
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Results */}
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <Trophy className="w-6 h-6 text-primary" />
                        Results
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {study.results.map((result) => (
                            <div key={result.metric} className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                                <p className="text-3xl font-black text-white">{result.value}</p>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">{result.metric}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Learnings */}
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-2xl font-bold text-white mb-6">Key Learnings</h2>
                    <ul className="space-y-4">
                        {study.learnings.map((learning, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-400">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                {learning}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-4 pt-12 border-t border-white/10"
                >
                    {study.videoUrl && (
                        <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
                            <Play className="w-4 h-4 mr-2" /> Watch Demo
                        </Button>
                    )}
                    {study.liveUrl && (
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-full px-8">
                            <ExternalLink className="w-4 h-4 mr-2" /> Live Preview
                        </Button>
                    )}
                    {study.githubUrl && (
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-full px-8" asChild>
                            <a href={study.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" /> View Source
                            </a>
                        </Button>
                    )}
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default CaseStudy;
