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
    BookOpen,
    ArrowRight,
    Globe,
    Terminal,
    FileText,
    Share2,
    Cpu
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

const BeyondWork = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isGameOpen, setIsGameOpen] = useState(false);
    const [isWebOpen, setIsWebOpen] = useState(false);
    const { playHover, playClick } = useSound();
    const navigate = useNavigate();

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

    const [selectedThought, setSelectedThought] = useState<any>(null);

    const neuralThoughts = [
        {
            id: 'n1',
            title: 'The Illusion of Control in UI',
            date: '2024-03-12',
            readTime: '5 min',
            category: 'Design Philosophy',
            excerpt: 'Why user agency is often a carefully crafted mirage, and how to build ethical interfaces that respect the user.',
            content: `
> "The best interface is no interface."

In our quest for control, we often clutter screens with knobs and switches. But true control comes from intuitive prediction. 

### The Agency Paradox
Users want to feel in control, but they don't want to make micro-decisions. The sweet spot lies in **Volitional predictive interfaces**—systems that suggest the next step but wait for confirmation.

When designing the *Horizon Dashboard*, I realized that giving users 50 filters was less effective than giving them 3 smart presets based on their history.
            `
        },
        {
            id: 'n2',
            title: 'Rendering Reality: Three.js',
            date: '2024-02-28',
            readTime: '8 min',
            category: 'Technical Deep Dive',
            excerpt: 'Optimizing high-fidelity particle systems for mobile browsers without melting the GPU.',
            content: `
Achieving 60FPS with 10,000 particles requires more than just good code; it requires understanding the GPU pipeline.

### InstancedMesh is your friend
If you aren't using \`InstancedMesh\` for your particles, start now. The overhead of individual draw calls will kill performance faster than high poly counts.

### Shader Magic
Move the math to the vertex shader. Calculating positions in JS on the CPU is a bottleneck. By using a time uniform and some noise functions in GLSL, you get butter-smooth movement at zero CPU cost.
            `
        },
        {
            id: 'n3',
            title: 'Digital Minimalism',
            date: '2024-01-15',
            readTime: '4 min',
            category: 'Mindset',
            excerpt: 'How stripping away visual noise amplifies the core message of a product.',
            content: `
We are drowning in noise. Notifications, popups, vibrant gradients fighting for attention.

**Digital Minimalism** isn't just about white space; it's about *Intentionality*. Every pixel must earn its rent on the screen.

In my latest project, I removed all color except for the primary action button. The conversion rate doubled. Why? Because the path was clear.
            `
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
                            <Card
                                className="glass p-8 border-white/10 hover:border-primary/20 transition-all duration-500 h-full group cursor-pointer"
                                onMouseEnter={() => playHover()}
                                onClick={() => playClick()}
                            >
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

                {/* Future Vision Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Future Ambitions</h2>
                        <p className="text-gray-400">Targeting the next frontier of interactive experiences</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Game Vision Card */}
                        <Card
                            className="glass p-10 border-white/10 relative overflow-hidden group cursor-pointer hover:border-primary/40 transition-all duration-500"
                            onClick={() => { playClick(); setIsGameOpen(true); }}
                            onMouseEnter={() => playHover()}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col items-center text-center h-full">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-500">
                                    <Gamepad2 className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">The Game</h3>
                                <p className="text-gray-400 mb-8 flex-grow">
                                    A vision for an immersive 3D RPG where code is your magic. Validating logic through gameplay mechanics.
                                </p>
                                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-white pointer-events-none mt-auto">
                                    View Game Plan <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </Card>

                        {/* Website Vision Card */}
                        <Card
                            className="glass p-10 border-white/10 relative overflow-hidden group cursor-pointer hover:border-accent/40 transition-all duration-500"
                            onClick={() => { playClick(); setIsWebOpen(true); }}
                            onMouseEnter={() => playHover()}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col items-center text-center h-full">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 group-hover:bg-accent/20 group-hover:border-accent/50 transition-all duration-500">
                                    <Globe className="w-8 h-8 text-white group-hover:text-accent transition-colors" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">The Website</h3>
                                <p className="text-gray-400 mb-8 flex-grow">
                                    A decentralized hub for 'Creative Coding' experiments. A collaborative canvas for developers and artists.
                                </p>
                                <Button variant="outline" className="border-accent/50 text-accent hover:bg-accent hover:text-white pointer-events-none mt-auto">
                                    View Platform Details <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </Card>
                    </div>
                </motion.section>

                {/* Game Dialog */}
                <Dialog open={isGameOpen} onOpenChange={setIsGameOpen}>
                    <DialogContent className="glass border-white/10 max-w-2xl text-white">
                        <DialogHeader>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Gamepad2 className="w-6 h-6 text-primary" />
                                </div>
                                <DialogTitle className="text-3xl font-bold">Project: Codex Chronicles</DialogTitle>
                            </div>
                            <DialogDescription className="text-gray-300 text-lg leading-relaxed space-y-4">
                                <p>
                                    <strong>Concept:</strong> An educational RPG set in a cyberpunk world where the player must write real JavaScript/GLSL code to hack terminals, defeat enemies, and solve environmental puzzles.
                                </p>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
                                    <h4 className="font-bold text-white">Key Features:</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-400">
                                        <li>Built with React Three Fiber for a fully native 3D web experience.</li>
                                        <li>Real-time code execution sandbox for spell-casting.</li>
                                        <li>Multiplayer raids where teams debug legacy code bosses.</li>
                                    </ul>
                                </div>
                                <p className="pt-2">
                                    Currently in the concept phase. I am looking for game designers and backend engineers to collaborate on the prototype.
                                </p>
                                <div className="pt-4 flex justify-end">
                                    <Button
                                        onClick={() => {
                                            setIsGameOpen(false);
                                            navigate('/contact');
                                        }}
                                        className="bg-primary hover:bg-primary/90 text-white"
                                    >
                                        Join the Game Team <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* Website Dialog */}
                <Dialog open={isWebOpen} onOpenChange={setIsWebOpen}>
                    <DialogContent className="glass border-white/10 max-w-2xl text-white">
                        <DialogHeader>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-accent" />
                                </div>
                                <DialogTitle className="text-3xl font-bold">Project: DevNexus</DialogTitle>
                            </div>
                            <DialogDescription className="text-gray-300 text-lg leading-relaxed space-y-4">
                                <p>
                                    <strong>Concept:</strong> A curated platform dedicated to 'Creative Coding'. Unlike Github (code storage) or CodePen (snippeting), DevNexus focuses on finishing and showcasing immersive web experiences.
                                </p>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
                                    <h4 className="font-bold text-white">Key Features:</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-400">
                                        <li>Asset Store for Three.js models and shaders.</li>
                                        <li>Interactive Portfolio builder for creative developers.</li>
                                        <li>Monthly "Render Battles" adjudicated by community voting.</li>
                                    </ul>
                                </div>
                                <p className="pt-2">
                                    I am seeking frontend developers passionate about WebGL to help build the core MVP.
                                </p>
                                <div className="pt-4 flex justify-end">
                                    <Button
                                        onClick={() => {
                                            setIsWebOpen(false);
                                            navigate('/contact');
                                        }}
                                        className="bg-accent hover:bg-accent/90 text-white"
                                    >
                                        Join the Web Team <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* Neural Link / Brain Dump Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-32 relative"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Cpu className="w-24 h-24 rotate-12" />
                    </div>

                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                            <Brain className="w-8 h-8 text-primary" />
                            Neural Link
                        </h2>
                        <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">
                            // DOWNLOADING THOUGHT_STREAMS...
                        </p>
                    </div>

                    {/* Nodes Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                        {neuralThoughts.map((thought, i) => (
                            <motion.div
                                key={thought.id}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => { playClick(); setSelectedThought(thought); }}
                                className="group relative cursor-pointer"
                            >
                                {/* Hexagon / Node Shape BG */}
                                <div className="absolute inset-0 bg-[#0a0f18] border border-primary/20 hover:border-primary/50 transition-colors clip-path-polygon"
                                    style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
                                />

                                <div className="relative p-6 h-full flex flex-col z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-500">{thought.date}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                        {thought.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
                                        {thought.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-gray-500 font-mono border-t border-white/5 pt-3">
                                        <span>{thought.category}</span>
                                        <span className="flex items-center gap-1">
                                            {thought.readTime}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Connecting Lines Decoration (CSS) */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10" />
                </motion.section>

                {/* Thought Reader Dialog */}
                <Dialog open={!!selectedThought} onOpenChange={() => setSelectedThought(null)}>
                    <DialogContent className="glass border-white/10 max-w-3xl max-h-[85vh] overflow-hidden flex flex-col p-0 text-white bg-[#050505]">
                        {selectedThought && (
                            <>
                                {/* Terminal Header */}
                                <div className="bg-[#111] border-b border-white/10 p-3 flex items-center justify-between shrink-0">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        </div>
                                        <span className="ml-3 font-mono text-xs text-gray-400">
                                            user@portfolio:~/mind-palace/{selectedThought.id}.md
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 hover:text-white">
                                            <Share2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Content Scroll Area */}
                                <div className="flex-1 overflow-y-auto p-8 font-serif leading-relaxed text-gray-200">
                                    <div className="max-w-2xl mx-auto space-y-6">
                                        <div className="border-b border-white/10 pb-6 mb-6">
                                            <div className="flex items-center gap-3 text-xs font-mono text-primary mb-3 uppercase tracking-wider">
                                                <span>{selectedThought.category}</span>
                                                <span>//</span>
                                                <span>{selectedThought.date}</span>
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedThought.title}</h2>
                                            <p className="text-lg text-gray-400 italic">{selectedThought.excerpt}</p>
                                        </div>

                                        <div className="prose prose-invert max-w-none">
                                            {selectedThought.content.split('\n').map((line: string, i: number) => {
                                                if (line.trim().startsWith('>')) {
                                                    return (
                                                        <blockquote key={i} className="border-l-4 border-primary pl-4 italic text-xl text-gray-300 my-6 bg-white/5 p-4 rounded-r-lg">
                                                            "{line.replace('>', '').trim()}"
                                                        </blockquote>
                                                    );
                                                }
                                                if (line.trim().startsWith('###')) {
                                                    return <h3 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('###', '').trim()}</h3>;
                                                }
                                                if (line.trim().startsWith('**')) {
                                                    // Simple bold parsing could be done here, but text-only is fine for simple markdown
                                                }
                                                if (!line.trim()) return <br key={i} />;
                                                return <p key={i} className="text-gray-300 leading-7">{line}</p>;
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Status Bar */}
                                <div className="bg-[#111] border-t border-white/10 p-2 px-4 flex justify-between items-center text-[10px] font-mono text-gray-500 shrink-0">
                                    <span>Ln 1, Col 1</span>
                                    <span>UTF-8</span>
                                    <span>Markdown</span>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

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
