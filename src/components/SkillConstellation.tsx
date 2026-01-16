
import React, { useEffect, useRef } from 'react';

interface SkillNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    label: string;
    level: number; // 0-1 opacity/size
}

const skills = [
    { label: "React", level: 0.9 },
    { label: "TypeScript", level: 0.85 },
    { label: "Node.js", level: 0.75 },
    { label: "Three.js", level: 0.8 },
    { label: "Next.js", level: 0.85 },
    { label: "Tailwind", level: 0.95 },
    { label: "Framer Motion", level: 0.9 },
    { label: "WebGL", level: 0.6 },
    { label: "GLSL", level: 0.5 },
    { label: "UI/UX", level: 0.8 },
    { label: "System Design", level: 0.7 },
];

const SkillConstellation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let nodes: SkillNode[] = [];
        let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        let height = canvas.height = canvas.parentElement?.clientHeight || 500;

        // Initialize nodes
        skills.forEach(skill => {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                label: skill.label,
                level: skill.level
            });
        });

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Update positions
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off walls
                if (node.x <= 0 || node.x >= width) node.vx *= -1;
                if (node.y <= 0 || node.y >= height) node.vy *= -1;
            });

            // Draw connections
            nodes.forEach((nodeA, i) => {
                nodes.forEach((nodeB, j) => {
                    if (i <= j) return; // distinct pairs
                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 200;

                    if (dist < maxDist) {
                        const opacity = (1 - dist / maxDist) * 0.5 * Math.min(nodeA.level, nodeB.level);
                        ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`; // Primary color (greenish)
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(nodeA.x, nodeA.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        ctx.stroke();
                    }
                });
            });

            // Draw nodes
            nodes.forEach(node => {
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(node.x, node.y, 3 * node.level, 0, Math.PI * 2);
                ctx.fill();

                // Glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(34, 197, 94, 0.8)';

                // Label
                ctx.font = '10px monospace';
                ctx.fillStyle = `rgba(255, 255, 255, ${node.level})`;
                ctx.textAlign = 'center';
                ctx.shadowBlur = 0;
                ctx.fillText(node.label.toUpperCase(), node.x, node.y + 15);
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            height = canvas.height = canvas.parentElement?.clientHeight || 500;
        };

        window.addEventListener('resize', handleResize);
        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="w-full h-[500px] relative rounded-[2rem] overflow-hidden border border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="absolute top-4 left-6 z-10">
                <h3 className="text-white text-sm font-mono uppercase tracking-widest text-primary">Skill Network</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Live Node Visualization</p>
            </div>
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
};

export default SkillConstellation;
