import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text, Line } from '@react-three/drei';
import * as THREE from 'three';

interface SkillNode {
    id: string;
    label: string;
    position: [number, number, number];
    color: string;
    isCenter?: boolean;
}

const skills: SkillNode[] = [
    // Core
    { id: 'js', label: 'JavaScript', position: [0, 0, 0], color: '#F7DF1E', isCenter: true },
    // Frontend Cluster
    { id: 'react', label: 'React', position: [2, 1, 0], color: '#61DAFB' },
    { id: 'ts', label: 'TypeScript', position: [1.5, -1.5, 1], color: '#3178C6' },
    { id: 'next', label: 'Next.js', position: [3, 0, -1], color: '#FFFFFF' },
    { id: 'tailwind', label: 'Tailwind', position: [1, 2, -1], color: '#38B2AC' },
    // Creative Cluster
    { id: 'three', label: 'Three.js', position: [-2, 1, 1], color: '#607D8B' },
    { id: 'framer', label: 'Framer', position: [-2.5, -1, 0], color: '#0055FF' },
    { id: 'gsap', label: 'GSAP', position: [-1.5, 2, -0.5], color: '#88CE02' },
    // Backend Cluster
    { id: 'node', label: 'Node.js', position: [0, -3, -1], color: '#339933' },
    { id: 'sql', label: 'SQL', position: [-1, -3.5, 1], color: '#4479A1' },
    // Tools
    { id: 'git', label: 'Git', position: [0, 2.5, 2], color: '#F05032' },
];

const connections = [
    ['js', 'react'], ['js', 'ts'], ['js', 'node'], ['js', 'three'],
    ['react', 'next'], ['react', 'tailwind'], ['react', 'framer'],
    ['node', 'sql'],
    ['three', 'gsap'],
    ['ts', 'react'], ['ts', 'node']
];

const SkillStar = ({ skill }: { skill: SkillNode }) => {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={skill.position}>
                {/* Glow */}
                <mesh>
                    <sphereGeometry args={[skill.isCenter ? 0.4 : 0.2, 32, 32]} />
                    <meshStandardMaterial
                        color={skill.color}
                        emissive={skill.color}
                        emissiveIntensity={2}
                        toneMapped={false}
                    />
                </mesh>
                {/* Text Label */}
                <Text
                    position={[0, skill.isCenter ? 0.6 : 0.4, 0]}
                    fontSize={skill.isCenter ? 0.4 : 0.25}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {skill.label}
                </Text>
            </group>
        </Float>
    );
};

const ConstellationLines = () => {
    const points = connections.map(([startId, endId]) => {
        const start = skills.find(s => s.id === startId)?.position;
        const end = skills.find(s => s.id === endId)?.position;
        if (start && end) return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
        return null;
    }).filter(Boolean) as [THREE.Vector3, THREE.Vector3][];

    return (
        <group>
            {points.map((pair, i) => (
                <Line
                    key={i}
                    points={pair}
                    color="rgba(255,255,255,0.1)"
                    lineWidth={1}
                    transparent
                    opacity={0.2}
                />
            ))}
        </group>
    );
};

const SkillConstellation = () => {
    return (
        <div className="w-full h-[500px] bg-[#050505] relative rounded-3xl overflow-hidden border border-white/10">
            <div className="absolute top-4 left-6 z-10">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="text-primary">✦</span> Skill Constellation
                </h3>
                <p className="text-sm text-gray-500">Interactive Knowledge Graph</p>
            </div>

            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 5, 20]} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <group rotation={[0, -Math.PI / 6, 0]}>
                    {skills.map(skill => (
                        <SkillStar key={skill.id} skill={skill} />
                    ))}
                    <ConstellationLines />
                </group>

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};

export default SkillConstellation;
