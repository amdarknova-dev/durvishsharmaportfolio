import React, { useEffect, useRef } from 'react';
import { useHack } from '@/context/HackContext';

interface Shape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: 'cube' | 'triangle' | 'circle';
  color: string;
  opacity: number;
  floatSpeed: number;
  floatOffset: number;
}

const FloatingShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<Shape[]>([]);
  const animationRef = useRef<number>();
  const { gravity, glowIntensity, themeMode } = useHack();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createShapes = () => {
      const shapes: Shape[] = [];
      const shapeCount = 8;

      for (let i = 0; i < shapeCount; i++) {
        shapes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 60 + 20,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
          type: ['cube', 'triangle', 'circle'][Math.floor(Math.random() * 3)] as 'cube' | 'triangle' | 'circle',
          color: ['#3b82f6', '#8b5cf6', '#06b6d4'][Math.floor(Math.random() * 3)],
          opacity: Math.random() * 0.3 + 0.1,
          floatSpeed: Math.random() * 0.02 + 0.01,
          floatOffset: Math.random() * Math.PI * 2,
        });
      }
      shapesRef.current = shapes;
    };

    const animate = (time: number) => {
      if (!container) return;

      // Clear previous shapes
      container.innerHTML = '';

      shapesRef.current.forEach((shape, index) => {
        // Update rotation
        shape.rotation += shape.rotationSpeed;

        // Update floating motion
        // Apply gravity multiplier to speed and amplitude
        const floatY = Math.sin(time * (shape.floatSpeed * gravity) + shape.floatOffset) * (20 * gravity);

        // Create shape element
        const shapeElement = document.createElement('div');
        shapeElement.className = 'absolute pointer-events-none transition-transform duration-1000';
        shapeElement.style.left = `${shape.x}px`;
        shapeElement.style.top = `${shape.y + floatY}px`;
        shapeElement.style.width = `${shape.size}px`;
        shapeElement.style.height = `${shape.size}px`;
        shapeElement.style.transform = `rotate(${shape.rotation}deg)`;
        shapeElement.style.opacity = (shape.opacity * glowIntensity).toString();

        // Apply shape-specific styles
        if (shape.type === 'cube') {
          shapeElement.style.background = `linear-gradient(135deg, ${shape.color}40, ${shape.color}20)`;
          shapeElement.style.border = `1px solid ${shape.color}60`;
          shapeElement.style.borderRadius = '8px';
          shapeElement.style.backdropFilter = 'blur(10px)';
        } else if (shape.type === 'triangle') {
          shapeElement.style.width = '0';
          shapeElement.style.height = '0';
          shapeElement.style.borderLeft = `${shape.size / 2}px solid transparent`;
          shapeElement.style.borderRight = `${shape.size / 2}px solid transparent`;
          shapeElement.style.borderBottom = `${shape.size}px solid ${shape.color}40`;
          shapeElement.style.filter = `drop-shadow(0 0 10px ${shape.color}30)`;
        } else {
          shapeElement.style.background = `radial-gradient(circle, ${shape.color}40, transparent 70%)`;
          shapeElement.style.borderRadius = '50%';
          shapeElement.style.border = `1px solid ${shape.color}30`;
        }

        container.appendChild(shapeElement);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    createShapes();
    animate(0);

    const handleResize = () => {
      createShapes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gravity, glowIntensity]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
    />
  );
};

export default FloatingShapes;