
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, TrackballControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
    'React', 'TypeScript', 'Next.js', 'Tailwind',
    'Node.js', 'Three.js', 'Git', 'Figma',
    'GSAP', 'HTML5', 'CSS3', 'JavaScript',
    'Vite', 'Redux', 'GraphQL', 'Framer',
    'PostgreSQL', 'Prisma', 'Docker', 'AWS'
];

const Word = ({ children, position, color }: { children: string; position: THREE.Vector3; color: string }) => {
    const fontRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(({ camera }) => {
        if (!fontRef.current) return;
        // Make text always face the camera
        fontRef.current.quaternion.copy(camera.quaternion);
    });

    return (
        <Float floatIntensity={1} rotationIntensity={0}>
            <Text
                ref={fontRef}
                position={position}
                fontSize={hovered ? 0.6 : 0.45}
                color={hovered ? '#60A5FA' : color} // bright blue on hover
                anchorX="center"
                anchorY="middle"
                onPointerOver={() => {
                    document.body.style.cursor = 'pointer';
                    setHovered(true);
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'auto';
                    setHovered(false);
                }}
            >
                {children}
            </Text>
        </Float>
    );
};

const Cloud = ({ count = 4, radius = 20 }) => {
    // Create a count x count random words with spherical distribution
    const words = useMemo(() => {
        const temp = [];
        const phiSpan = Math.PI * (3 - Math.sqrt(5)); // golden angle

        for (let i = 0; i < skills.length; i++) {
            // Spherical distribution
            const y = 1 - (i / (skills.length - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // radius at y

            const theta = phiSpan * i; // golden angle increment

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            // Scale by radius
            temp.push([new THREE.Vector3(x * radius, y * radius, z * radius), skills[i]]);
        }
        return temp;
    }, [count, radius]);

    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        // Constant rotation
        groupRef.current.rotation.y += 0.001;
        groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    })

    return (
        <group ref={groupRef}>
            {words.map(([pos, word], index) => (
                <Word key={index} position={pos as THREE.Vector3} color="#FFFFFF">
                    {word as string}
                </Word>
            ))}
        </group>
    );
};

const SkillsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="relative py-20 px-6 min-h-[80vh] flex flex-col justify-center items-center overflow-hidden">
            {/* Header */}
            <div className={`text-center mb-10 transition-all duration-1000 z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                    <span className="text-white">Technical</span> <span className="text-gradient">Arsenal</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
                    A constantly expanding galaxy of tools and technologies I use to bring ideas to life.
                </p>
            </div>

            {/* 3D Canvas */}
            <div className={`w-full h-[600px] cursor-grab active:cursor-grabbing transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
                    <fog attach="fog" args={['#030712', 10, 25]} />
                    <Cloud count={8} radius={4.5} />
                    <TrackballControls noZoom />
                </Canvas>
            </div>

            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        </section>
    );
};

export default SkillsSection;
