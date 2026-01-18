import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Stars, Float, MeshDistortMaterial, PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

// Hook to get scroll progress
const useScrollProgress = () => {
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            setScrollY(scrolled || 0);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return scrollY;
};

interface ConstellationProps extends React.ComponentPropsWithoutRef<'group'> {
    scrollY: number;
}

const Constellation = ({ scrollY, ...props }: ConstellationProps) => {
    const ref = useRef<THREE.Points>(null!);
    const isMobile = window.innerWidth < 768;
    // Generate points in a torus shape for a more "Sci-Fi Portal" look
    const sphere = useMemo(() => {
        const points = new Float32Array((isMobile ? 2000 : 6000) * 3);
        const count = isMobile ? 2000 : 6000;
        for (let i = 0; i < count; i++) {
            const t = Math.random() * Math.PI * 2;
            const p = Math.random() * Math.PI * 2;
            const r = 1.5 + Math.random() * 0.5; // Radius variation

            // Torus formula approximation with noise
            const x = (2 + Math.cos(p)) * Math.cos(t) * r;
            const y = (2 + Math.cos(p)) * Math.sin(t) * r;
            const z = Math.sin(p) * r;

            points[i * 3] = x;
            points[i * 3 + 1] = y;
            points[i * 3 + 2] = z;
        }
        return points;
    }, [isMobile]);

    useFrame((state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;

        // Gentle breathing animation
        const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        ref.current.scale.set(scale, scale, scale);
    });

    return (
        <group rotation={[scrollY * 0.5, scrollY * 0.3, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#4ADE80" // Greenish for "Matrix" / Tech feel
                    size={0.015} // Slightly larger for Bloom to catch
                    sizeAttenuation={true}
                    depthWrite={false}
                    toneMapped={false}
                />
            </Points>
        </group>
    );
};

interface LiquidCoreProps {
    scrollY: number;
}

const LiquidCore = ({ scrollY }: LiquidCoreProps) => {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <group rotation={[scrollY * 0.2, scrollY * 0.4, 0]}>
                <mesh scale={1.2}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <MeshDistortMaterial
                        color="#22c55e"
                        envMapIntensity={0.5}
                        clearcoat={1}
                        clearcoatRoughness={0}
                        metalness={0.5}
                        roughness={0.2}
                        distort={0.4}
                        speed={2}
                    />
                </mesh>
                {/* Inner glow core */}
                <mesh scale={0.8}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial color="#4ADE80" transparent opacity={0.5} />
                </mesh>
            </group>
        </Float>
    );
}

// Camera controller for scroll-based parallax
const CameraController = ({ scrollY }: { scrollY: number }) => {
    const { camera } = useThree();
    useFrame(() => {
        // Subtle camera movement based on scroll
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, -scrollY * 2, 0.05);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8 + scrollY * 3, 0.05);
        camera.lookAt(0, 0, 0);
    });
    return null;
};

const ThreeScene = () => {
    const scrollY = useScrollProgress();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const [degraded, setDegraded] = useState(false);

    return (
        <div className="w-full h-full absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: false }} dpr={[1, 2]}>
                <color attach="background" args={['#000000']} />

                {/* Performance Monitoring */}
                <PerformanceMonitor onDecline={() => setDegraded(true)} />
                <AdaptiveDpr pixelated />

                {/* Camera Parallax */}
                <CameraController scrollY={scrollY} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#4ADE80" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22c55e" />

                {/* Floating Elements */}
                <LiquidCore scrollY={scrollY} />

                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
                    <Constellation scrollY={scrollY} />
                </Float>

                <Stars
                    radius={100}
                    depth={50}
                    count={isMobile ? 1000 : 3000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.5}
                />

                {/* Cinematic Post Processing - Disabled on mobile or when degraded */}
                {!isMobile && !degraded && (
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.2}
                            luminanceSmoothing={0.9}
                            height={300}
                            intensity={1.2}
                        />
                        <Noise opacity={0.05} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                )}
            </Canvas>
        </div>
    );
};

export default ThreeScene;
