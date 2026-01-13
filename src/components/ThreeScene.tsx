import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';

const Constellation = (props: any) => {
    const ref = useRef<any>(null);
    const isMobile = window.innerWidth < 768;
    const sphere = useMemo(() => random.inSphere(new Float32Array(isMobile ? 1500 : 5000), { radius: 1.5 }), [isMobile]);

    useFrame((state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;

        // Parallax effect
        ref.current.rotation.x += (state.mouse.y * 0.1 - ref.current.rotation.x) * 0.1;
        ref.current.rotation.y += (state.mouse.x * 0.1 - ref.current.rotation.y) * 0.1;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere as any} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#22c55e"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const ThreeScene = () => {
    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={0.5} />
                <Constellation />
                <Stars
                    radius={100}
                    depth={50}
                    count={2000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />
            </Canvas>
        </div>
    );
};

export default ThreeScene;
