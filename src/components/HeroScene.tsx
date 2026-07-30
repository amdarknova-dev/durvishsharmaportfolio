import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ── Custom Shader Ring / Cyber Ring ── */
const CyberRing = ({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) => {
  const ringRef = useRef<THREE.Mesh>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.2 + mousePos.current.y * 0.2;
      ringRef.current.rotation.y = Math.cos(t * 0.4) * 0.2 + mousePos.current.x * 0.2;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -t * 0.2;
      outerRingRef.current.rotation.x = -mousePos.current.y * 0.15;
    }
  });

  return (
    <group>
      {/* Primary Cyber Torus Ring */}
      <mesh ref={ringRef} scale={2.2}>
        <torusGeometry args={[1, 0.015, 16, 120]} />
        <meshStandardMaterial
          color="#c2a4ff"
          emissive="#7b3fff"
          emissiveIntensity={1.2}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Counter-rotating Outer Ring with Dash effect */}
      <mesh ref={outerRingRef} scale={2.8}>
        <torusGeometry args={[1, 0.008, 16, 64]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} wireframe />
      </mesh>
    </group>
  );
};

/* ── Inner spinning distort knot mesh ── */
const TorusKnotMesh = ({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<any>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;
    
    // Smooth target rotation incorporating mouse position
    const targetRotX = t * 0.18 + mousePos.current.y * 0.4;
    const targetRotY = t * 0.24 + mousePos.current.x * 0.4;

    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.08;
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.08;

    if (materialRef.current) {
      materialRef.current.distort = 0.45 + Math.sin(t * 0.8) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.25}>
      <torusKnotGeometry args={[1, 0.3, 256, 32, 2, 3]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#c2a4ff"
        emissive="#7b3fff"
        emissiveIntensity={0.8}
        roughness={0.05}
        metalness={0.98}
        distort={0.45}
        speed={3.0}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
};

/* ── Interactive Particle Swarm ── */
const InteractiveParticles = ({
  count = 250,
  mousePos,
}: {
  count?: number;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}) => {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate particle positions & initial offsets
  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.0 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3 + 0] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3 + 0] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }
    return [pos, orig];
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const mx = mousePos.current.x * 3.0;
    const my = -mousePos.current.y * 3.0;

    // Slowly rotate overall swarm
    pointsRef.current.rotation.y = t * 0.04;
    pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.1;

    // React each point dynamically to mouse position
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const ox = originalPositions[ix];
      const oy = originalPositions[iy];
      const oz = originalPositions[iz];

      const dx = ox - mx;
      const dy = oy - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repulsion force from cursor
      if (dist < 1.8) {
        const force = (1.8 - dist) * 0.4;
        posAttr.setXYZ(
          i,
          ox + (dx / dist) * force,
          oy + (dy / dist) * force,
          oz + Math.sin(t * 2 + i) * 0.05
        );
      } else {
        // Smooth return to base orbit position
        const cx = posAttr.getX(i);
        const cy = posAttr.getY(i);
        const cz = posAttr.getZ(i);
        posAttr.setXYZ(
          i,
          cx + (ox - cx) * 0.05,
          cy + (oy - cy) * 0.05,
          cz + (oz - cz) * 0.05
        );
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#d8c4ff"
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/* ── Mouse-reactive camera rig ── */
const CameraRig = ({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) => {
  useFrame(({ camera }) => {
    camera.position.x += (mousePos.current.x * 0.9 - camera.position.x) * 0.04;
    camera.position.y += (-mousePos.current.y * 0.9 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

/* ── Public component ── */
interface HeroSceneProps {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

const HeroScene: React.FC<HeroSceneProps> = ({ mousePos }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2.0} color="#c2a4ff" />
      <pointLight position={[-5, -5, -5]} intensity={1.2} color="#7b3fff" />
      <pointLight position={[0, 6, 2]} intensity={0.8} color="#00f0ff" />

      <TorusKnotMesh mousePos={mousePos} />
      <CyberRing mousePos={mousePos} />
      <InteractiveParticles count={220} mousePos={mousePos} />
      <CameraRig mousePos={mousePos} />
    </Canvas>
  );
};

export default HeroScene;

