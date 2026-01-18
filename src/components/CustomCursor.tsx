import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useHack } from '@/context/HackContext';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    size: number;
    hue: number;
}

const CustomCursor = () => {
    // Current mouse position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const { isOverclocked: godMode } = useHack();

    // Smooth spring animation for the main cursor
    const springConfig = { damping: 25, stiffness: 150 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Trail logic
    const TRAIL_LENGTH = godMode ? 24 : 12; // More trail in God Mode
    const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
    const historyRef = useRef<{ x: number; y: number }[]>([]);

    // Particle system for God Mode
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const [clickRipples, setClickRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    // God Mode particle system
    useEffect(() => {
        if (!godMode || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let animationId: number;
        let lastTime = Date.now();

        const animate = () => {
            if (!ctx) return;

            const now = Date.now();
            const delta = (now - lastTime) / 1000;
            lastTime = now;

            // Fade out previous frame
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particlesRef.current = particlesRef.current.filter((particle) => {
                // Update position
                particle.x += particle.vx * delta;
                particle.y += particle.vy * delta;
                particle.life -= delta;

                if (particle.life <= 0) return false;

                // Draw particle
                const opacity = particle.life;
                ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                return true;
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [godMode]);

    // Spawn particles on mouse move (God Mode)
    const spawnParticles = React.useCallback((x: number, y: number) => {
        if (!godMode) return;

        for (let i = 0; i < 3; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 50 + Math.random() * 100;

            particlesRef.current.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0.5 + Math.random() * 0.5,
                size: 2 + Math.random() * 3,
                hue: 180 + Math.random() * 40, // Cyan to green
            });
        }
    }, [godMode]);

    // Click ripple effect
    const createRipple = React.useCallback((x: number, y: number) => {
        const id = Date.now() + Math.random();
        setClickRipples((prev) => [...prev, { x, y, id }]);
        setTimeout(() => {
            setClickRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
    }, []);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Update main framer motion values
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Spawn particles in God Mode
            spawnParticles(e.clientX, e.clientY);

            // Magnetic Logic
            const target = e.target as HTMLElement;
            const isMagnetic = target.closest('[data-magnetic="true"]');
            setIsHovering(!!isMagnetic || target.tagName === 'BUTTON' || target.tagName === 'A');

            // Shift history
            historyRef.current.unshift({ x: e.clientX, y: e.clientY });
            if (historyRef.current.length > TRAIL_LENGTH) {
                historyRef.current.pop();
            }

            // Update trail elements with a "stream" effect
            trailRefs.current.forEach((el, index) => {
                if (el && historyRef.current[index]) {
                    const point = historyRef.current[index];
                    const scale = 1 - index / TRAIL_LENGTH;
                    el.style.transform = `translate(${point.x}px, ${point.y}px) scale(${scale})`;

                    // Rainbow effect in God Mode
                    if (godMode) {
                        el.style.backgroundColor = `hsl(${180 + index * 15}, 100%, 60%)`;
                        el.style.opacity = String(0.8 - index / TRAIL_LENGTH);
                    }
                }
            });
        };

        const handleClick = (e: MouseEvent) => {
            if (godMode) {
                createRipple(e.clientX, e.clientY);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('click', handleClick);
        };
    }, [godMode, TRAIL_LENGTH, cursorX, cursorY, spawnParticles, createRipple]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block 2xl:hidden">
            {/* God Mode Particle Canvas */}
            {godMode && (
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none"
                    style={{ mixBlendMode: 'screen' }}
                />
            )}

            {/* Click Ripples */}
            {clickRipples.map((ripple) => (
                <motion.div
                    key={ripple.id}
                    className="absolute"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className="w-20 h-20 rounded-full border-2 border-primary" />
                </motion.div>
            ))}

            {/* Flashlight / God Mode Reveal Layer */}
            <motion.div
                className="fixed inset-0 z-0 bg-transparent pointer-events-none"
                style={{
                    background: godMode
                        ? `radial-gradient(800px circle at ${cursorX.get()}px ${cursorY.get()}px, rgba(59, 130, 246, 0.15), transparent 50%)`
                        : `radial-gradient(600px circle at ${cursorX.get()}px ${cursorY.get()}px, rgba(29, 233, 182, 0.03), transparent 40%)`,
                }}
            />

            {/* Main Cursor (White Dot) */}
            <motion.div
                className={`absolute top-0 left-0 rounded-full mix-blend-difference ${godMode ? 'w-4 h-4 bg-primary shadow-[0_0_20px_rgba(59,130,246,0.8)]' : 'w-3 h-3 bg-white'
                    }`}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 2.5 : godMode ? 1.5 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />

            {/* Ghost Trail (Sparks) */}
            {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) trailRefs.current[i] = el;
                    }}
                    className={`absolute top-0 left-0 rounded-full ${godMode
                        ? 'w-3 h-3 blur-[2px] opacity-80'
                        : 'w-2 h-2 bg-primary blur-[1px] opacity-40'
                        }`}
                    style={{
                        transform: 'translate(-100px, -100px)',
                        marginLeft: '-4px',
                        marginTop: '-4px',
                        transition: 'opacity 0.2s',
                        backgroundColor: godMode ? undefined : undefined,
                    }}
                />
            ))}

            {/* Large Glow Follower */}
            <motion.div
                className={`absolute top-0 left-0 rounded-full blur-3xl ${godMode
                    ? 'w-96 h-96 bg-primary/30'
                    : 'w-64 h-64 bg-primary/10 opacity-50'
                    }`}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: godMode ? 0.6 : isHovering ? 0.8 : 0.4,
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.4 }}
            />
        </div>
    );
};

export default CustomCursor;
