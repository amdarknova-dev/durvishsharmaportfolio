import React, { useEffect, useRef, useState } from 'react';
import { useSound } from '@/context/SoundContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, Play, Pause, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AudioVisualizer = () => {
    const { isPlaying, toggleSound } = useSound();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        const bars = 32;
        const barWidth = 2;
        const gap = 1;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (!isPlaying) {
                // Flat line
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);
                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.stroke();
                return;
            }

            // "Simulated" frequency data
            const centerX = canvas.width / 2;

            for (let i = 0; i < bars; i++) {
                const time = Date.now() / 150;
                // Mirrored visualizer
                const height = Math.sin(time + i * 0.5) * 10 + Math.random() * 8;

                // Color gradient based on height
                const hue = 120 + height * 5; // Greens to Cyans
                ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.8)`;

                const x = centerX + i * (barWidth + gap);
                const x2 = centerX - i * (barWidth + gap) - barWidth;

                const y = (canvas.height - height) / 2;

                // Draw mirrored bars
                ctx.fillRect(x, y, barWidth, height);
                ctx.fillRect(x2, y, barWidth, height);
            }

            animationId = requestAnimationFrame(animate);
        };

        if (isPlaying) {
            animate();
        } else {
            // Draw initial static line
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
            ctx.stroke();
        }

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [isPlaying]);

    return (
        <div className="fixed bottom-6 left-6 z-50 flex items-end gap-2">

            {/* Expanded Controls */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, width: 0, x: -20 }}
                        animate={{ opacity: 1, width: 'auto', x: 0 }}
                        exit={{ opacity: 0, width: 0, x: -20 }}
                        className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center gap-3 overflow-hidden h-[88px]"
                    >
                        <div className="flex flex-col gap-1 min-w-[100px]">
                            <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase truncate">Now Playing</span>
                            <span className="text-xs text-primary font-bold truncate">Cyber-Ambient_V1.mp3</span>
                            <div className="flex gap-2 mt-1">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="w-6 h-6 hover:text-white text-gray-400"
                                    onClick={() => toggleSound()}
                                >
                                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cassette UI */}
            <motion.div
                className="relative w-[140px] h-[88px] bg-black/80 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden cursor-pointer group shadow-2xl shadow-primary/10"
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.05 }}
            >
                {/* Tape Texture/Decals */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, #000 100%), repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 4px)' }}
                />

                {/* Screw Holes */}
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full border border-white/20 bg-black/50" />
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full border border-white/20 bg-black/50" />
                <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full border border-white/20 bg-black/50" />
                <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full border border-white/20 bg-black/50" />

                {/* Reels */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] flex justify-between px-2 pointer-events-none">
                    <div className={`w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
                        <div className="w-2 h-2 bg-white/10 rounded-full" />
                        <div className="absolute w-full h-[1px] bg-white/20" />
                        <div className="absolute h-full w-[1px] bg-white/20" />
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
                        <div className="w-2 h-2 bg-white/10 rounded-full" />
                        <div className="absolute w-full h-[1px] bg-white/20" />
                        <div className="absolute h-full w-[1px] bg-white/20" />
                    </div>
                </div>

                {/* Center Label / Visualizer Area */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-black/90 rounded border border-white/10 flex items-center justify-center overflow-hidden">
                    <canvas ref={canvasRef} width={80} height={30} />
                </div>

                {/* Tape Window */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[40%] h-[6px] bg-white/10 rounded-full" />
            </motion.div>
        </div>
    );
};

export default AudioVisualizer;
