
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/context/SoundContext';
import Magnetic from '@/components/Magnetic';

interface Project {
    title: string;
    description: string;
    longDescription?: string;
    features?: string[];
    image: string;
    tech: string[];
    category: string;
    featured: boolean;
    year: string;
}

interface HolographicProjectGalleryProps {
    projects: Project[];
    onSelectFn: (project: Project) => void;
}

const HolographicProjectGallery: React.FC<HolographicProjectGalleryProps> = ({ projects, onSelectFn }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { playHover, playClick } = useSound();

    // Auto-rotate every 5 seconds if not interacting? 
    // Maybe better to leave it manual for "Mission Select" feel.

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
        playClick();
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
        playClick();
    };

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden py-20 perspective-1000">
            {/* Ambient Holographic Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative w-full max-w-6xl mx-auto h-full flex items-center justify-center">
                <AnimatePresence mode='popLayout'>
                    {projects.map((project, index) => {
                        // Calculate offset from active index
                        let offset = index - activeIndex;

                        // Handle infinite loop visual logic if we wanted, but for simple gallery let's keep it bounded or simple modulo ? 
                        // For a simple coverflow with modest item count, simple offset is fine. 
                        // Let's make it a truly circular buffer for visual smoothness if list is long, 
                        // but simple math is safer for 5-6 items.

                        // Let's just render all, but animate based on distance.
                        // We need the visual order to be correct (zIndex).

                        const isActive = index === activeIndex;
                        const isPrev = index === (activeIndex - 1 + projects.length) % projects.length; // Wrapping previous
                        const isNext = index === (activeIndex + 1) % projects.length; // Wrapping next

                        // We want only 3-5 items visible. 
                        // Let's force a valid distance calc that handles wrapping for the "3D circle" feel.

                        // Simpler approach: Just linear list for 5 items, no wrapping complications for now to ensure stability.
                        // Or better: Just render the active, previous, and next.

                        // Let's go with a cleaner implementation:
                        // Only render index if it's within range [active-1, active+1] 
                        // BUT wrapping array logic makes this tricky.

                        // "Orbit" logic:
                        // Everything exists, but transforms place them.

                        return (
                            <GalleryCard
                                key={project.title}
                                project={project}
                                index={index}
                                activeIndex={activeIndex}
                                total={projects.length}
                                onClick={() => {
                                    if (isActive) onSelectFn(project);
                                    else setActiveIndex(index);
                                }}
                                isActive={isActive}
                            />
                        )
                    })}
                </AnimatePresence>
            </div>

            {/* Navigation Dots (Holographic Style) */}
            <div className="absolute bottom-10 flex gap-4">
                {projects.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`w-12 h-1 rounded-full transition-all duration-300 ${i === activeIndex
                            ? 'bg-primary shadow-[0_0_15px_rgba(34,197,94,0.8)]'
                            : 'bg-white/10 hover:bg-white/30'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

// Sub-component for individual card magic
interface GalleryCardProps {
    project: Project;
    index: number;
    activeIndex: number;
    total: number;
    onClick: () => void;
    isActive: boolean;
}

const GalleryCard = ({ project, index, activeIndex, total, onClick, isActive }: GalleryCardProps) => {
    // Calculate "circular" distance
    let diff = (index - activeIndex) % total;
    if (diff < -total / 2) diff += total;
    if (diff > total / 2) diff -= total;

    // Only render if within visual range to save performance
    if (Math.abs(diff) > 2) return null;

    const xOffset = diff * 320; // 320px spacing
    const zOffset = Math.abs(diff) * -200; // Recede in Z
    const rotateY = diff * -25; // Rotate towards center

    return (
        <motion.div
            layout
            initial={false}
            animate={{
                x: xOffset,
                z: zOffset,
                rotateY: rotateY,
                scale: isActive ? 1 : 0.85,
                opacity: Math.abs(diff) > 1 ? 0 : 1 - Math.abs(diff) * 0.3,
                zIndex: 100 - Math.abs(diff)
            }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }}
            onClick={onClick}
            className={`absolute w-[600px] aspect-video cursor-pointer select-none`}
            style={{
                transformStyle: 'preserve-3d'
            }}
        >
            {/* The Glass Card */}
            <div className={`relative w-full h-full rounded-[2rem] overflow-hidden border transition-all duration-500 ${isActive
                ? 'border-primary/50 shadow-[0_0_50px_rgba(34,197,94,0.2)]'
                : 'border-white/10 grayscale-[50%]'
                }`}>
                {/* Image / Video Background */}
                <div className="absolute inset-0 bg-black">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>

                {/* Holographic Overlay Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none" />

                {/* Content Layer */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-mono tracking-widest uppercase backdrop-blur-md">
                                {project.category}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono tracking-widest">
                                {project.year} // SYS.LOG
                            </span>
                        </div>

                        <h3 className="text-4xl font-black text-white uppercase tracking-tight mb-2 text-shadow-glow">
                            {project.title}
                        </h3>

                        <p className="text-gray-300 text-sm max-w-md line-clamp-2 mb-6 font-light">
                            {project.description}
                        </p>

                        <div className="flex gap-4">
                            <Magnetic intensity={0.3}>
                                <Button size="sm" className="bg-white text-black hover:bg-white/90 rounded-full font-bold uppercase tracking-widest text-[10px]">
                                    Initialize
                                </Button>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Orbiting Tech Stack (Only for Active) */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -right-20 top-10 flex flex-col gap-4 z-30"
                    >
                        {project.tech.slice(0, 4).map((tech: string, i: number) => (
                            <motion.div
                                key={tech}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                className="glass-premium px-4 py-2 rounded-lg border border-white/10 text-[10px] text-primary font-mono tracking-widest uppercase shadow-lg backdrop-blur-xl"
                            >
                                {tech}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
}

export default HolographicProjectGallery;
