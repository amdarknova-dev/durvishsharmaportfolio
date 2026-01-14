import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Gamepad2, Layers, Cpu, Code, LucideIcon } from 'lucide-react';
import GravityWell from '@/components/experiments/GravityWell';
import ShaderEditor from '@/components/ShaderEditor';
import * as THREE from 'three';

const AnimatedSphere = () => {
    const sphereRef = useRef<THREE.MeshDistortMaterialImpl>(null!);
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

const LabItem = ({ title, description, icon: Icon, type, onClick }: { title: string, description: string, icon: LucideIcon, type: string, onClick?: () => void }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="group relative cursor-pointer"
            onClick={onClick}
        >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <Card className="relative h-full bg-black/40 backdrop-blur-xl border-white/10 p-6 overflow-hidden hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:text-white group-hover:bg-primary transition-all">
                        <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">{type}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>

                {/* Visual Placeholder for 'Experiment' */}
                <div className="mt-6 h-32 w-full bg-black/20 rounded-lg overflow-hidden relative border border-white/5 group-hover:border-primary/20 transition-colors flex items-center justify-center">
                    <div className="text-gray-600 text-xs text-center p-4">
                        {onClick ? '[ CLICK TO LAUNCH ]' : '[ PREVIEW CONTAINER ]'}
                        <br />
                        {type} Protocol
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}

const TheLab = () => {
    const [activeExperiment, setActiveExperiment] = useState<string | null>(null);

    return (
        <div className="relative min-h-screen bg-[#050505] pt-40 px-6 pb-20">
            <AnimatePresence>
                {activeExperiment === 'gravity' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150]"
                    >
                        <GravityWell onClose={() => setActiveExperiment(null)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <span className="text-primary font-mono tracking-[0.5em] uppercase text-xs">R&D Division</span>
                    <h1 className="text-6xl md:text-9xl font-bold mb-6 tracking-tighter text-white">
                        THE <span className="text-gradient">LAB</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        A sanctuary for experimental interfaces, procedural graphics, and the designs that were "too much" for the main site.
                    </p>
                </motion.div>
            </div>

            {/* 1. Shader Sandbox Section */}
            <section className="max-w-7xl mx-auto mb-40">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                        <Code className="text-primary w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">Shader <span className="text-primary">Sandbox</span></h2>
                        <p className="text-gray-500 text-sm">Real-time GLSL manipulation and vertex synchronization.</p>
                    </div>
                </div>
                <ShaderEditor />
            </section>

            {/* 2. Featured Experiment: The Blob */}
            <section className="max-w-7xl mx-auto mb-40">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="h-[500px] w-full relative glass rounded-[40px] border-white/5 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
                        <Canvas>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 5]} intensity={1} />
                            <AnimatedSphere />
                            <OrbitControls enableZoom={false} />
                        </Canvas>
                    </div>
                    <div className="space-y-8">
                        <div className="flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-widest">
                            <Cpu className="w-4 h-4" />
                            <span>Neural Material v2.1</span>
                        </div>
                        <h2 className="text-5xl font-bold text-white leading-tight underline decoration-primary/30 underline-offset-8">Reactive Liquid Mesh</h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            A real-time mesh distortion shader using Perlin noise and React Three Fiber.
                            The geometry reacts to simulated audio frequency data, demonstrating high-performance WebGL manipulation without dropping below 60FPS.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {['Three.js', 'Perlin Noise', 'Vertex Shaders', 'R3F'].map(tech => (
                                <span key={tech} className="px-4 py-2 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10 hover:border-primary/50 transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Discarded Designs Grid */}
            <section className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div className="space-y-4">
                        <span className="text-primary font-mono tracking-[0.2em] uppercase text-xs">Archive</span>
                        <h2 className="text-4xl font-bold text-white italic">The <span className="text-gradient">Vault</span></h2>
                    </div>
                    <p className="text-gray-600 font-mono text-xs text-right max-w-[200px]">
                        COMPONENTS DEEMED TOO EXPERIMENTAL FOR INITIAL RELEASE.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <LabItem
                        title="Gravity Particles"
                        description="Simulating 10k particles with custom physics engine and collision detection. Performance optimized using GPGPU."
                        icon={Layers}
                        type="Physics"
                        onClick={() => setActiveExperiment('gravity')}
                    />
                    <LabItem
                        title="Procedural Terrain"
                        description="Infinite terrain generation using Diamond-Square algorithm and real-time height mapping shaders."
                        icon={Gamepad2}
                        type="WebGL"
                    />
                    <LabItem
                        title="Neural Net Viz"
                        description="Interactive visualization of activation functions and weight propagation in neural architectures."
                        icon={Code}
                        type="AI/ML"
                    />
                    <LabItem
                        title="Hyper-Reactive"
                        description="A cursor-following grid system that distorts space around the user interaction point."
                        icon={Layers}
                        type="Interactive"
                    />
                </div>
            </section>
        </div>
    );
};

export default TheLab;
