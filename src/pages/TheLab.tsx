import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text, MeshWobbleMaterial } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Gamepad2, Layers, Cpu, Code, LucideIcon, Play, Terminal as TerminalIcon, Zap, Activity, Box, Radio, FileJson, Binary, Palette, Type, Hash, Key, Fingerprint, Regex, Link, CaseSensitive, FileText, Clock, GitCompare, QrCode, Printer, Monitor } from 'lucide-react';
import GravityWell from '@/components/experiments/GravityWell';
import ShaderEditor from '@/components/ShaderEditor';
import CodePlayground from '@/components/CodePlayground';
import {
    ToolCard,
    JsonFormatter,
    Base64Tool,
    ColorConverter,
    LoremGenerator,
    HashGenerator,
    PasswordGenerator,
    UuidGenerator,
    RegexTester,
    UrlEncoder,
    TextCaseConverter,
    WordCounter,
    TimestampConverter,
    DiffChecker,
    QrCodeGenerator,
    DeviceInfo,
    PdfTool
} from '@/components/DevTools';
import { useSound } from '@/context/SoundContext';
import * as THREE from 'three';

const AnimatedSphere = () => {
    const sphereRef = useRef<any>(null!);
    useFrame(({ clock }) => {
        if (sphereRef.current) {
            sphereRef.current.distort = 0.4 + Math.sin(clock.getElapsedTime()) * 0.2;
        }
    });

    return (
        <Sphere visible args={[1, 100, 200]} scale={2}>
            <MeshDistortMaterial
                ref={sphereRef}
                color="#22c55e"
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0}
                metalness={0.8}
            />
        </Sphere>
    );
};

const LabItem = ({ title, description, icon: Icon, type, onClick, index }: { title: string, description: string, icon: LucideIcon, type: string, onClick?: () => void, index: number }) => {
    const { playHover, playClick } = useSound();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative cursor-pointer"
            onClick={() => {
                onClick?.();
                playClick();
            }}
            onMouseEnter={() => playHover()}
        >
            <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />

            <Card className="relative h-full bg-black/40 backdrop-blur-3xl border-white/5 p-8 overflow-hidden transition-all duration-500 group-hover:border-primary/20">
                {/* Header HUD */}
                <div className="flex items-start justify-between mb-8">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
                            <Activity className="w-3 h-3" />
                            <span>Protocol {String(index + 1).padStart(2, '0')}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">{title}</h3>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-gray-500 group-hover:text-primary group-hover:border-primary/30 transition-all">
                        <Icon className="w-6 h-6" />
                    </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light italic">"{description}"</p>

                {/* Launch Button */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{type} SYSTEM</span>
                    <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <span className="text-[10px] font-mono font-bold">INITIALIZE</span>
                        <Play className="w-3 h-3 fill-current" />
                    </div>
                </div>

                {/* Scanlines Decor */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
        </motion.div>
    )
}

const TheLab = () => {
    const [activeExperiment, setActiveExperiment] = useState<string | null>(null);
    const [isBooting, setIsBooting] = useState(true);
    const { playClick } = useSound();

    useEffect(() => {
        const timer = setTimeout(() => setIsBooting(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const warpTo = (experiment: string) => {
        playClick();
        setActiveExperiment(experiment);
    }

    return (
        <div className="relative min-h-screen bg-black overflow-hidden selection:bg-primary/30">
            {/* Warp Transition Overlay */}
            <AnimatePresence>
                {activeExperiment && (
                    <motion.div
                        initial={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
                        className="fixed inset-0 z-[200] bg-black"
                    >
                        {activeExperiment === 'gravity' && <GravityWell onClose={() => setActiveExperiment(null)} />}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Boot Sequence Overlay */}
            <AnimatePresence>
                {isBooting && (
                    <motion.div
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center p-12 overflow-hidden"
                    >
                        <div className="max-w-md w-full space-y-4 font-mono text-[10px]">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.5 }}
                                className="h-0.5 bg-primary/30"
                            />
                            <div className="space-y-1 text-primary">
                                <p>INITIALIZING R&D TERMINAL...</p>
                                <p>LOADING VERTEX SHADERS [SUCCESS]</p>
                                <p>CONNECTING TO NEURAL MESH [STABLE]</p>
                                <p>AUTHORIZATION REQUIRED: GUEST_01</p>
                            </div>
                            <div className="pt-8 flex justify-between text-gray-600">
                                <span>SYSTEM_OS_V2.0.48</span>
                                <motion.span
                                    animate={{ opacity: [0, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.5 }}
                                >
                                    _
                                </motion.span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Atmosphere */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_70%)]" />
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
            </div>

            {/* Content Scroller */}
            <div className="relative pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Termnal Section */}
                    <div className="mb-40">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col md:flex-row items-end gap-8 mb-16"
                        >
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-4 text-primary font-mono text-xs uppercase tracking-[0.5em]">
                                    <div className="w-12 h-[1px] bg-primary/30" />
                                    <span>Division: Experimental Tech</span>
                                </div>
                                <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none uppercase">
                                    The <br />
                                    <span className="text-primary italic">Lab</span>
                                </h1>
                            </div>
                            <div className="md:w-1/3 p-6 glass-premium border-white/5 font-mono text-[10px] text-gray-500 space-y-2">
                                <p className="text-primary font-bold">// ARCHIVE ACCESS GRANTED</p>
                                <p>This sector contains non-linear interfaces and procedural experiments deemed too volatile for the general production environment.</p>
                                <p className="pt-4 text-gray-700">COORD: 40.7128° N, 74.0060° W</p>
                            </div>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Shader Sandbox Large Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                                <div className="relative h-full glass-premium border-white/5 rounded-3xl overflow-hidden p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all">
                                                <TerminalIcon className="w-5 h-5" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white tracking-tight">Shader Sandbox</h2>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Live Compiler</span>
                                        </div>
                                    </div>
                                    <ShaderEditor />
                                </div>
                            </motion.div>

                            {/* Featured Experiment: The Blob */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="glass-premium border-white/5 rounded-3xl overflow-hidden flex flex-col"
                            >
                                <div className="h-2/3 w-full relative group">
                                    <Canvas>
                                        <ambientLight intensity={0.5} />
                                        <directionalLight position={[10, 10, 5]} intensity={1} />
                                        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                                            <AnimatedSphere />
                                        </Float>
                                        <OrbitControls enableZoom={false} />
                                    </Canvas>
                                    <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                                        <Zap className="w-3 h-3 text-primary" />
                                        <span className="text-[10px] font-mono text-white tracking-widest uppercase">GPGPU Reaction</span>
                                    </div>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold text-white tracking-tight uppercase">Neural Material v2</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed font-light italic">
                                            "A study in procedural distortion using simplex noise and vertex attribute mapping."
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-4">
                                        {['R3F', 'GLSL', 'NOISE'].map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] text-gray-600 font-mono">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Code Playground Section */}
                    <div className="mb-40">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-12 mb-12">
                            <div className="space-y-4">
                                <span className="text-primary font-mono tracking-[0.3em] uppercase text-[10px]">Live Environment</span>
                                <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">Code <span className="text-gradient">Playground</span></h2>
                            </div>
                            <p className="text-gray-500 text-sm max-w-md font-light">Write HTML, CSS, and JavaScript in real-time. Like CodePen, but integrated.</p>
                        </div>
                        <CodePlayground />
                    </div>

                    {/* Developer Tools Section */}
                    <div className="mb-40">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-12 mb-12">
                            <div className="space-y-4">
                                <span className="text-primary font-mono tracking-[0.3em] uppercase text-[10px]">Utility Suite</span>
                                <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">Dev <span className="text-gradient">Tools</span></h2>
                            </div>
                            <p className="text-gray-500 text-sm max-w-md font-light">Essential developer utilities for everyday coding tasks.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <ToolCard title="JSON Formatter" description="Format and minify JSON data" icon={FileJson}>
                                <JsonFormatter />
                            </ToolCard>
                            <ToolCard title="Base64 Encoder" description="Encode and decode Base64 strings" icon={Binary}>
                                <Base64Tool />
                            </ToolCard>
                            <ToolCard title="Color Converter" description="Convert between HEX and RGB" icon={Palette}>
                                <ColorConverter />
                            </ToolCard>
                            <ToolCard title="Lorem Generator" description="Generate placeholder text" icon={Type}>
                                <LoremGenerator />
                            </ToolCard>
                            <ToolCard title="Hash Generator" description="Generate SHA hashes from text" icon={Hash}>
                                <HashGenerator />
                            </ToolCard>
                            <ToolCard title="Password Generator" description="Create strong random passwords" icon={Key}>
                                <PasswordGenerator />
                            </ToolCard>
                            <ToolCard title="UUID Generator" description="Generate unique identifiers" icon={Fingerprint}>
                                <UuidGenerator />
                            </ToolCard>
                            <ToolCard title="Regex Tester" description="Test regular expressions" icon={Regex}>
                                <RegexTester />
                            </ToolCard>
                            <ToolCard title="URL Encoder" description="Encode and decode URLs" icon={Link}>
                                <UrlEncoder />
                            </ToolCard>
                            <ToolCard title="Text Case Converter" description="Convert text to different cases" icon={CaseSensitive}>
                                <TextCaseConverter />
                            </ToolCard>
                            <ToolCard title="Word Counter" description="Count words, characters, and more" icon={FileText}>
                                <WordCounter />
                            </ToolCard>
                            <ToolCard title="Timestamp Converter" description="Convert Unix timestamps" icon={Clock}>
                                <TimestampConverter />
                            </ToolCard>
                            <ToolCard title="Diff Checker" description="Compare two texts line by line" icon={GitCompare}>
                                <DiffChecker />
                            </ToolCard>
                            <ToolCard title="QR Code Generator" description="Create QR codes instantly" icon={QrCode}>
                                <QrCodeGenerator />
                            </ToolCard>
                            <ToolCard title="PDF Tools" description="Save page as PDF" icon={Printer}>
                                <PdfTool />
                            </ToolCard>
                            <ToolCard title="Device Info" description="View system information" icon={Monitor}>
                                <DeviceInfo />
                            </ToolCard>
                        </div>
                    </div>

                    {/* The Vault Grid */}
                    <div className="space-y-16">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-12">
                            <div className="space-y-4">
                                <span className="text-primary font-mono tracking-[0.3em] uppercase text-[10px]">Secure Storage</span>
                                <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">The <span className="text-gradient">Vault</span></h2>
                            </div>
                            <div className="flex items-center gap-8 font-mono text-[9px] text-gray-700 tracking-[0.25em]">
                                <div className="flex items-center gap-2">
                                    <Activity className="w-3 h-3" />
                                    <span>LOAD: 12%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio className="w-3 h-3" />
                                    <span>SIGNAL: STRONG</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <LabItem
                                index={0}
                                title="Gravity Particles"
                                description="Simulating 10k particles with custom physics engine and collision detection."
                                icon={Layers}
                                type="PHYSICS"
                                onClick={() => warpTo('gravity')}
                            />
                            <LabItem
                                index={1}
                                title="Procedural Terrain"
                                description="Infinite terrain generation using Diamond-Square algorithm."
                                icon={Gamepad2}
                                type="WEBGL"
                            />
                            <LabItem
                                index={2}
                                title="Neural Net Viz"
                                description="Interactive visualization of activation functions and weight propagation."
                                icon={Code}
                                type="AI/ML"
                            />
                            <LabItem
                                index={3}
                                title="Hyper-Reactive"
                                description="A cursor-following grid system that distorts space around interaction."
                                icon={Box}
                                type="INTERACTIVE"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom HUD Decor */}
            <div className="fixed bottom-0 left-0 w-full p-8 flex justify-between items-end pointer-events-none opacity-20">
                <div className="space-y-1 font-mono text-[8px] text-gray-500 uppercase tracking-widest">
                    <p>SYSTEM READY</p>
                    <p>ST_CODE: EXPERIMENTAL</p>
                </div>
                <div className="text-right space-y-1 font-mono text-[8px] text-gray-500 uppercase tracking-widest">
                    <p>© AM_DARKNOVA R&D</p>
                    <p>TRANSMISSION: SECURE</p>
                </div>
            </div>
        </div>
    );
};

export default TheLab;
