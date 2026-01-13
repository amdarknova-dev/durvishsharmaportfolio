import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Text, Float, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Project {
    title: string;
    description: string;
    image: string;
    category: string;
    tech: string[];
}

interface ProjectCardProps {
    project: Project;
    position: [number, number, number];
    rotation: [number, number, number];
    onClick: () => void;
}

const ProjectCard3D = ({ project, position, rotation, onClick }: ProjectCardProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <group
            position={position}
            rotation={rotation}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
                {/* Holographic Frame */}
                <mesh onClick={onClick}>
                    <boxGeometry args={[3.2, 4.2, 0.1]} />
                    <meshBasicMaterial
                        color={hovered ? "#00ff88" : "#00aa55"}
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </mesh>

                {/* Content Overlay */}
                <Html
                    transform
                    occlude
                    position={[0, 0, 0.06]}
                    style={{
                        width: '300px',
                        height: '400px',
                        background: 'rgba(0, 5, 20, 0.85)',
                        border: hovered ? '2px solid #00ff88' : '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '16px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        boxShadow: hovered ? '0 0 30px rgba(0, 255, 136, 0.3)' : 'none',
                        userSelect: 'none',
                    }}
                >
                    <div className="flex flex-col h-full pointer-events-auto cursor-pointer" onClick={onClick}>
                        {/* Image */}
                        <div className="h-32 mb-4 overflow-hidden rounded-lg bg-black">
                            <img src={project.image} alt="" className="w-full h-full object-cover opacity-80" />
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                            <Badge className="bg-primary/20 text-primary border-primary/20 mb-2 text-[10px]">
                                {project.category}
                            </Badge>
                            <h3 className="text-xl font-bold text-white mb-2 leading-tight">{project.title}</h3>
                            <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-1">
                            {project.tech.slice(0, 3).map(t => (
                                <span key={t} className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </Html>
            </Float>
        </group>
    );
};

const Carousel = ({ projects, onSelect }: { projects: Project[], onSelect: (p: Project) => void }) => {
    const radius = 6;
    const count = projects.length;

    return (
        <group>
            {projects.map((project, i) => {
                const angle = (i / count) * Math.PI * 2;
                const x = Math.sin(angle) * radius;
                const z = Math.cos(angle) * radius;
                return (
                    <ProjectCard3D
                        key={project.title}
                        project={project}
                        position={[x, 0, z]}
                        rotation={[0, angle, 0]}
                        onClick={() => onSelect(project)}
                    />
                );
            })}
        </group>
    );
};

const HolographicProjectGallery = ({ projects, onSelectProject }: { projects: any[], onSelectProject: (p: any) => void }) => {
    return (
        <div className="w-full h-[600px] border border-white/10 rounded-3xl overflow-hidden bg-black/50 relative">
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="text-xs font-mono text-primary animate-pulse">
                    ● HOLOGRAPHIC_ARCHIVE_V1
                </span>
            </div>

            {/* Interaction Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
                <p className="text-[10px] text-gray-500 font-mono">[ DRAG TO ROTATE | CLICK TO INSPECT ]</p>
            </div>

            <Canvas camera={{ position: [0, 2, 12], fov: 50 }}>
                <color attach="background" args={['#020205']} />
                <fog attach="fog" args={['#020205', 10, 25]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <group position={[0, -0.5, 0]}>
                    <Carousel projects={projects} onSelect={onSelectProject} />
                </group>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.8}
                />
            </Canvas>
        </div>
    );
};

export default HolographicProjectGallery;
