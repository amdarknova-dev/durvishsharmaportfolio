import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const DarkNovaCore = () => {
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const outerWireframeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const [overclocked, setOverclocked] = useState(false);

  const targetColor = new THREE.Color(overclocked ? '#ef4444' : '#c2a4ff');
  const targetEmissive = new THREE.Color(overclocked ? '#dc2626' : '#7c3aed');
  const targetScale = overclocked ? 1.5 : 1;

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    // Rotate elements (faster if overclocked)
    const speedMult = overclocked ? 3 : 1;
    
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x += delta * 0.2 * speedMult;
      innerCoreRef.current.rotation.y += delta * 0.3 * speedMult;
      
      // Lerp color
      const material = innerCoreRef.current.material as THREE.MeshStandardMaterial;
      material.color.lerp(targetColor, 0.1);
      material.emissive.lerp(targetEmissive, 0.1);
      material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, overclocked ? 8 : 4, 0.1);
    }
    
    if (outerWireframeRef.current) {
      outerWireframeRef.current.rotation.x -= delta * 0.1 * speedMult;
      outerWireframeRef.current.rotation.y -= delta * 0.15 * speedMult;
      
      const material = outerWireframeRef.current.material as THREE.MeshStandardMaterial;
      material.color.lerp(targetColor, 0.1);
      material.emissive.lerp(targetColor, 0.1);
    }

    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Camera shake / group shake if overclocked
      if (overclocked) {
        groupRef.current.position.x = (Math.random() - 0.5) * 0.05;
        groupRef.current.position.y = (Math.random() - 0.5) * 0.05;
      } else {
        groupRef.current.position.set(0, 0, 0);
      }
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setOverclocked(!overclocked);
  };

  return (
    <group ref={groupRef} onClick={handleClick} onPointerEnter={() => document.body.style.cursor = 'pointer'} onPointerLeave={() => document.body.style.cursor = 'move'}>
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
      <Float speed={overclocked ? 5 : 2} rotationIntensity={0.5} floatIntensity={1}>
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
      <Sparkles count={overclocked ? 400 : 200} scale={overclocked ? 10 : 6} size={overclocked ? 4 : 2} speed={overclocked ? 1.5 : 0.4} opacity={0.6} color={overclocked ? "#ef4444" : "#c2a4ff"} />
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
