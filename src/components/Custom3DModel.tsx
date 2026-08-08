import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const DarkNovaCore = () => {
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const outerWireframeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Rotate elements
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x = t * 0.2;
      innerCoreRef.current.rotation.y = t * 0.3;
    }
    
    if (outerWireframeRef.current) {
      outerWireframeRef.current.rotation.x = -t * 0.1;
      outerWireframeRef.current.rotation.y = -t * 0.15;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group>
      {/* Outer Wireframe Shell */}
      <mesh ref={outerWireframeRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          wireframe 
          transparent 
          opacity={0.3} 
          emissive="#3b82f6"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={innerCoreRef}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshStandardMaterial 
            color="#c2a4ff" 
            emissive="#7c3aed"
            emissiveIntensity={4}
            roughness={0.1}
            metalness={0.8}
            wireframe={true}
          />
        </mesh>
      </Float>

      {/* Magical Sparkles */}
      <Sparkles count={200} scale={6} size={2} speed={0.4} opacity={0.6} color="#c2a4ff" />
    </group>
  );
};

export default function Custom3DModel() {
  return (
    <div className="w-full h-full relative cursor-move">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#c2a4ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        
        {/* The 3D Object */}
        <DarkNovaCore />
        
        {/* Background Environment */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.2}
        />
      </Canvas>
      
      {/* Overlay Glow to blend with the background */}
      <div className="absolute inset-0 pointer-events-none" 
        style={{ background: 'radial-gradient(circle at center, transparent 40%, #050505 100%)' }}
      />
    </div>
  );
}
