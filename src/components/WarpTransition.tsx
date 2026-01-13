import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const WarpTransition = () => {
    const location = useLocation();
    const [isWarping, setIsWarping] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Skip animation on initial load
        if (!hasLoaded) {
            setHasLoaded(true);
            return;
        }

        // Trigger warp on location change (faster now)
        setIsWarping(true);
        const timer = setTimeout(() => setIsWarping(false), 500); // Reduced from 1000ms to 500ms
        return () => clearTimeout(timer);
    }, [location.pathname]);

    useEffect(() => {
        if (!isWarping || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        const stars: { x: number; y: number; z: number }[] = [];
        const width = canvas.width = window.innerWidth;
        const height = canvas.height = window.innerHeight;
        const centerX = width / 2;
        const centerY = height / 2;

        // Init stars
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * width - centerX,
                y: Math.random() * height - centerY,
                z: Math.random() * width
            });
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trail effect
            ctx.fillRect(0, 0, width, height);

            stars.forEach(star => {
                // Move towards screen (decrease z)
                star.z -= 25; // Speed

                if (star.z <= 0) {
                    star.z = width;
                    star.x = Math.random() * width - centerX;
                    star.y = Math.random() * height - centerY;
                }

                const k = 128.0 / star.z;
                const px = star.x * k + centerX;
                const py = star.y * k + centerY;

                // Draw star line (warp streak)
                const size = (1 - star.z / width) * 5;
                const shade = Math.floor((1 - star.z / width) * 255);

                // Old position for line
                const oldK = 128.0 / (star.z + 25);
                const oldPx = star.x * oldK + centerX;
                const oldPy = star.y * oldK + centerY;

                ctx.strokeStyle = `rgb(${shade}, ${shade}, 255)`; // Blue-ish white
                ctx.lineWidth = size;
                ctx.beginPath();
                ctx.moveTo(oldPx, oldPy);
                ctx.lineTo(px, py);
                ctx.stroke();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, [isWarping]);

    return (
        <AnimatePresence>
            {isWarping && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }} // Faster fade
                    className="fixed inset-0 z-[9999] pointer-events-none"
                >
                    <canvas ref={canvasRef} className="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-primary/20 mix-blend-overlay" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WarpTransition;
