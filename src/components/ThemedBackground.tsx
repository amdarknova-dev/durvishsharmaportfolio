
import React, { useEffect, useRef } from 'react';

type ThemeType = 'default' | 'embers' | 'sakura' | 'matrix';

interface ThemedBackgroundProps {
    theme: ThemeType;
}

const ThemedBackground: React.FC<ThemedBackgroundProps> = ({ theme }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Reset canvas state
        let animationFrameId: number;

        interface Particle {
            x: number;
            y: number;
            size?: number;
            speedX?: number;
            speedY: number;
            opacity?: number;
            color: string;
            rotation?: number;
            rotationSpeed?: number;
            value?: string;
        }

        let particles: Particle[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const count = theme === 'matrix' ? 100 : 150; // Matrix uses columns

            for (let i = 0; i < count; i++) {
                if (theme === 'embers') {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height + canvas.height, // Start below or random
                        size: Math.random() * 3 + 1,
                        speedY: Math.random() * 2 + 1, // Upwards
                        speedX: (Math.random() - 0.5) * 1, // Wiggle
                        opacity: Math.random(),
                        color: `rgba(${255}, ${Math.floor(Math.random() * 100)}, 0,` // Orange/Red
                    });
                } else if (theme === 'sakura') {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height - canvas.height, // Start above
                        size: Math.random() * 5 + 3,
                        speedY: Math.random() * 2 + 1, // Downwards
                        speedX: Math.random() * 2 - 1,
                        rotation: Math.random() * 360,
                        rotationSpeed: (Math.random() - 0.5) * 2,
                        color: `rgba(${255}, ${200 + Math.random() * 55}, ${220 + Math.random() * 35},` // Pinkish
                    });
                } else if (theme === 'matrix') {
                    particles.push({
                        x: Math.floor(Math.random() * (canvas.width / 20)) * 20, // Grid columns
                        y: Math.random() * canvas.height,
                        speedY: Math.random() * 5 + 5,
                        value: String.fromCharCode(0x30A0 + Math.random() * 96), // Katakana
                        opacity: Math.random(),
                        color: '#0f0'
                    });
                } else {
                    // Default generic particles
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: Math.random() * 2,
                        speedX: (Math.random() - 0.5) * 0.5,
                        speedY: (Math.random() - 0.5) * 0.5,
                        opacity: Math.random() * 0.5 + 0.1,
                        color: `rgba(255, 255, 255,`
                    });
                }
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear

            // Specific styles based on theme
            if (theme === 'embers') {
                ctx.fillStyle = 'rgba(0,0,0,0.1)'; // Trail effect?
            }

            particles.forEach((p, i) => {
                if (theme === 'embers') {
                    p.y -= p.speedY; // Up
                    p.x += Math.sin(p.y * 0.01) * 0.5; // Wiggle
                    if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }

                    ctx.beginPath();
                    ctx.fillStyle = `${p.color} ${p.opacity})`;
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = 'orange';
                }
                else if (theme === 'sakura') {
                    p.y += p.speedY; // Down
                    p.x += Math.sin(p.y * 0.005) + p.speedX * 0.2;
                    p.rotation += p.rotationSpeed;

                    if (p.y > canvas.height + 10) { p.y = -10; p.x = Math.random() * canvas.width; }

                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation * Math.PI / 180);
                    ctx.fillStyle = `${p.color} 0.6)`;
                    // Draw petal shape roughly
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.bezierCurveTo(5, -5, 10, 5, 0, 10);
                    ctx.bezierCurveTo(-10, 5, -5, -5, 0, 0);
                    ctx.fill();
                    ctx.restore();
                }
                else if (theme === 'matrix') {
                    p.y += p.speedY;
                    if (p.y > canvas.height) p.y = -20;

                    // Randomly change character
                    if (Math.random() > 0.95) p.value = String.fromCharCode(0x30A0 + Math.random() * 96);

                    ctx.font = '15px monospace';
                    ctx.fillStyle = `rgba(0, 255, 0, ${p.opacity})`;
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = '#0f0';
                    ctx.fillText(p.value, p.x, p.y);
                }
                else {
                    // Default
                    p.x += p.speedX;
                    p.y += p.speedY;
                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;

                    ctx.fillStyle = `${p.color} ${p.opacity})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${theme === 'default' ? 'opacity-20' : 'opacity-60' // Make themed ones more visible
                }`}
        />
    );
};

export default ThemedBackground;
