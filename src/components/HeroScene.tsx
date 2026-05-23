import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

/* ── Inner spinning torus-knot mesh ── */
const TorusKnotMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<any>(null!);

  // Animate rotation + distortion over time
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;
    meshRef.current.rotation.x = t * 0.18;
    meshRef.current.rotation.y = t * 0.24;
    if (materialRef.current) {
      materialRef.current.distort = 0.4 + Math.sin(t * 0.6) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.3}>
      <torusKnotGeometry args={[1, 0.32, 256, 32, 2, 3]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#c2a4ff"
        emissive="#7b3fff"
        emissiveIntensity={0.6}
        roughness={0.08}
        metalness={0.95}
        distort={0.45}
        speed={2.5}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
};

/* ── Outer glow rings ── */
const GlowRings = () => {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.4;
      ring1.current.rotation.z = t * 0.2;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.3;
      ring2.current.rotation.x = -t * 0.15;
    }
  });

  return (
    <>
      <mesh ref={ring1} scale={2.0}>
        <torusGeometry args={[1, 0.008, 16, 100]} />
        <meshBasicMaterial color="#c2a4ff" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring2} scale={2.4}>
        <torusGeometry args={[1, 0.005, 16, 100]} />
        <meshBasicMaterial color="#9b6dff" transparent opacity={0.15} />
      </mesh>
    </>
  );
};

/* ── Particle cloud ── */
const Particles = ({ count = 80 }) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#c2a4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

/* ── Mouse-reactive camera rig ── */
const CameraRig = ({ mousePos }: { mousePos: React.MutableRefObject<{x: number; y:number}> }) => {
  useFrame(({ camera }) => {
    camera.position.x += (mousePos.current.x * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (-mousePos.current.y * 0.8 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

/* ── Public component ── */
interface HeroSceneProps {
  mousePos: React.MutableRefObject<{x: number; y: number}>;
}

const HeroScene: React.FC<HeroSceneProps> = ({ mousePos }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#c2a4ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#7b3fff" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />

      <TorusKnotMesh />
      <GlowRings />
      <Particles />
      <CameraRig mousePos={mousePos} />
    </Canvas>
  );
};

export default HeroScene;
