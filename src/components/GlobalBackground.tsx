
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useTheme } from 'next-themes';
const CyberParticles = () => {
    const ref = useRef<any>();
    // Generate 2000 particles in a sphere
    const particles = useMemo(() => {
        const p = new Float32Array(2000 * 3);
        random.inSphere(p, { radius: 2.5 });
        return p;
    }, []);

    useFrame((state) => {
        const { clock, mouse } = state;
        const time = clock.getElapsedTime();

        // Gentle global rotation
        if (ref.current) {
            ref.current.rotation.y = time * 0.05;
            ref.current.rotation.x = mouse.y * 0.05; // Mouse parallax Y
            ref.current.rotation.z = mouse.x * 0.05; // Mouse parallax X
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00ff88" // Matrix/Cyber Green
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                    blending={2} // Additive blending
                />
            </Points>
        </group>
    )
}

const GlobalBackground = () => {
    const { theme } = useTheme();

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none fade-in-slow">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <color attach="background" args={[theme === 'light' ? '#ffffff' : '#030303']} />
                {/* Only clear color if needed, but usually we want transparent to show CSS bg */}
                <CyberParticles />
            </Canvas>
            {/* Gradient Overlay for depth */}
            <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'light'
                ? 'from-transparent via-white/50 to-white'
                : 'from-transparent via-black/50 to-black'
                }`} />
        </div>
    );
};

export default GlobalBackground;
