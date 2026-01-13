import React, { useEffect, useRef } from 'react';

const DigitalDust = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouseX = -1000;
        let mouseY = -1000;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            baseX: number;
            baseY: number;
            density: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.size = Math.random() * 2 + 0.1; // Varied size for depth
                this.density = (Math.random() * 30) + 1;
                // Cyberpunk/Sci-fi dust colors (white/cyan/green hints)
                const r = Math.floor(Math.random() * 50) + 200;
                const g = Math.floor(Math.random() * 255);
                const b = Math.floor(Math.random() * 255);
                this.color = `rgba(${r}, ${g}, ${b}, ${Math.random() * 0.5})`;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                // Mouse interaction physics
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = 200;

                // Swirl effect (Tangential force)
                // If close to mouse, swirl around it
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;

                    // Repulsion (keep a small void in center)
                    const repulsion = force * 5;
                    // Rotation (swirl)
                    const swirl = force * 2;

                    const angle = Math.atan2(dy, dx);

                    // Combine spiral motion: push away + rotate
                    this.x -= Math.cos(angle) * repulsion;
                    this.y -= Math.sin(angle) * repulsion;

                    // Add tangential component for swirl (perpendicular to radius)
                    this.x -= Math.sin(angle) * swirl; // -sin(angle) is dy/r roughly
                    this.y += Math.cos(angle) * swirl;
                } else {
                    // Return to original position slowly (drifting dust)
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX;
                        this.x -= dx / 50;
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY;
                        this.y -= dy / 50;
                    }
                }

                // Natural ambient drift
                this.x += (Math.random() - 0.5) * 0.5;
                this.y += (Math.random() - 0.5) * 0.5;
            }
        }

        const initParticles = () => {
            particles = [];
            // "Thousands" might be heavy for some devices, let's go with 1500 for good balance
            const particleCount = 1500;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.x;
            mouseY = e.y;
        };

        // Handle transparency fading when mouse leaves
        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        }

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
        />
    );
};

export default DigitalDust;
