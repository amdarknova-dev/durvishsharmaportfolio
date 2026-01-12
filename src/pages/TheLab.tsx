
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Gamepad2, Layers, Cpu, Code } from 'lucide-react';

const AnimatedSphere = () => {
    const sphereRef = useRef<any>(null);
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

const LabItem = ({ title, description, icon: Icon, type }: { title: string, description: string, icon: any, type: string }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="group relative cursor-pointer"
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
                        [Interactive Preview Container]
                        <br />
                        Click to launch {type}
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}

const TheLab = () => {
    return (
        <div className="relative min-h-screen bg-background pt-32 px-6 pb-20">

            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter text-white">
                        The <span className="text-primary">Lab</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        A playground for experimental interfaces, WebGL shaders, and physics simulations.
                        Where code meets creativity without constraints.
                    </p>
                </motion.div>
            </div>

            {/* Featured Experiment: The Blob */}
            <div className="max-w-7xl mx-auto mb-32 grid lg:grid-cols-2 gap-12 items-center">
                <div className="h-[400px] w-full relative">
                    <Canvas>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <AnimatedSphere />
                        <OrbitControls enableZoom={false} />
                    </Canvas>
                </div>
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-widest">
                        <Cpu className="w-4 h-4" />
                        <span>Featured Experiment</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white">Reactive Liquid Metal</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        A real-time mesh distortion shader using Perlin noise and React Three Fiber.
                        The sphere reacts to audio input and mouse movement, demonstrating performant WebGL manipulation.
                    </p>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10">Vertex Shader</div>
                        <div className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10">Fragment Shader</div>
                        <div className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10">R3F</div>
                    </div>
                </div>
            </div>

            {/* Experiment Grid */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <LabItem
                    title="Gravity Particles"
                    description="Simulating 10,000 particles with custom physics engine and collision detection."
                    icon={Layers}
                    type="Physics"
                />
                <LabItem
                    title="Procedural Terrain"
                    description="Infinite terrain generation using Diamond-Square algorithm and height mapping."
                    icon={Gamepad2}
                    type="WebGL"
                />
                <LabItem
                    title="Neural Net Viz"
                    description="Visualizing activation functions and weights in a simple neural network."
                    icon={Code}
                    type="AI/ML"
                />
                <LabItem
                    title="Audio Visualizer"
                    description="Frequency analysis mapped to 3D geometry in real-time."
                    icon={Cpu}
                    type="Audio"
                />
                <LabItem
                    title="Raymarching Demo"
                    description="Exploring signed distance fields (SDFs) to create impossible infinite geometry."
                    icon={Layers}
                    type="Shader"
                />
                <LabItem
                    title="Soft Body Physics"
                    description="Verlet integration implementation for jelly-like object interactions."
                    icon={Gamepad2}
                    type="Physics"
                />
            </div>
        </div>
    );
};

export default TheLab;
