import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, MousePointer2, RefreshCw } from 'lucide-react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    mass: number;
    color: string;
    size: number;
}

const GravityWell = ({ onClose }: { onClose: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [particleCount, setParticleCount] = useState(0);
    const requestRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0, active: false });

    // Configuration
    const INITIAL_PARTICLES = 200;
    const G = 0.5; // Gravitational constant proxy
    const FRICTION = 0.99;

    const initParticles = (width: number, height: number, count: number) => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            newParticles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                mass: Math.random() * 2 + 1,
                size: Math.random() * 2 + 1,
                color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)` // Blue to Purple
            });
        }
        return newParticles;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (particlesRef.current.length === 0) {
                particlesRef.current = initParticles(canvas.width, canvas.height, INITIAL_PARTICLES);
                setParticleCount(INITIAL_PARTICLES);
            }
        };

        const update = () => {
            if (!ctx) return;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trails
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Center of screen (default gravity well if mouse inactive)
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            const targetX = mouseRef.current.active ? mouseRef.current.x : centerX;
            const targetY = mouseRef.current.active ? mouseRef.current.y : centerY;

            particlesRef.current.forEach(p => {
                // Calculate distance to target
                const dx = targetX - p.x;
                const dy = targetY - p.y;
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);

                // Gravity Force (F = G * m1 * m2 / r^2)
                // We clamp distance to avoid infinite force at 0
                const force = (G * p.mass * 1000) / Math.max(distSq, 1000);
                const angle = Math.atan2(dy, dx);

                const ax = Math.cos(angle) * force;
                const ay = Math.sin(angle) * force;

                p.vx += ax;
                p.vy += ay;
                p.vx *= FRICTION;
                p.vy *= FRICTION;

                p.x += p.vx;
                p.y += p.vy;

                // Screen wrapping
                // if (p.x < 0) p.x = canvas.width;
                // if (p.x > canvas.width) p.x = 0;
                // if (p.y < 0) p.y = canvas.height;
                // if (p.y > canvas.height) p.y = 0;

                // Bounce off walls
                if (p.x < 0 || p.x > canvas.width) p.vx *= -0.8;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -0.8;

                // Draw
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                // Color based on speed
                ctx.fillStyle = `hsl(${200 + speed * 10}, 100%, ${50 + speed * 5}%)`;
                ctx.fill();
            });

            // Draw gravity center indicator
            if (mouseRef.current.active) {
                ctx.beginPath();
                ctx.arc(targetX, targetY, 20, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            requestRef.current = requestAnimationFrame(update);
        };

        window.addEventListener('resize', resize);
        resize();
        update();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
        mouseRef.current.active = false;
    }

    const handleCanvasClick = (e: React.MouseEvent) => {
        // Spawn explosion of particles at click
        const count = 20;
        for (let i = 0; i < count; i++) {
            particlesRef.current.push({
                x: e.clientX,
                y: e.clientY,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                mass: Math.random() * 2 + 0.5,
                size: Math.random() * 2 + 0.5,
                color: '#fff'
            });
        }
        setParticleCount(prev => prev + count);
    };

    const reset = () => {
        if (canvasRef.current) {
            particlesRef.current = initParticles(canvasRef.current.width, canvasRef.current.height, INITIAL_PARTICLES);
            setParticleCount(INITIAL_PARTICLES);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] bg-black">
            <canvas
                ref={canvasRef}
                className="block w-full h-full cursor-none"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleCanvasClick}
            />

            {/* HUD Overlay */}
            <div className="absolute top-6 left-6 pointer-events-none">
                <h2 className="text-2xl font-bold text-white font-mono tracking-tighter">GRAVITY_WELL_SIM</h2>
                <div className="flex flex-col gap-1 mt-2 text-xs text-green-400 font-mono">
                    <span>PARTICLES: {particleCount}</span>
                    <span>GRAVITY: {G} m/s²</span>
                    <span>FRICTION: {FRICTION}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute top-6 right-6 flex gap-4">
                <Button
                    variant="outline"
                    onClick={reset}
                    className="bg-black/50 border-white/20 text-white backdrop-blur hover:bg-white/10"
                >
                    <RefreshCw className="w-4 h-4 mr-2" /> Reset
                </Button>
                <Button
                    variant="destructive"
                    onClick={onClose}
                    className="rounded-full w-10 h-10 p-0"
                >
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm font-mono pointer-events-none animate-pulse">
                &lt; CLICK TO SPAWN / MOVE MOUSE TO ATTRACT &gt;
            </div>
        </div>
    );
};

export default GravityWell;
