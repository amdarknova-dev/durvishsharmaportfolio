import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/context/SoundContext';
import {
    Code2, Globe, Cpu, Database, Layout,
    Terminal, Smartphone, Layers, Box, Cpu as Chip
} from 'lucide-react';

// Define Node Types
type SkillNode = {
    id: string;
    label: string;
    description: string;
    x: number; // Percent 0-100
    y: number; // Percent 0-100
    icon: React.ReactNode;
    category: 'core' | 'frontend' | 'backend' | 'creative' | 'tools';
    parents: string[];
};

const skillNodes: SkillNode[] = [
    // Roots
    { id: 'web', label: 'Web Foundation', description: 'The core building blocks of the web.', x: 10, y: 50, icon: <Globe className="w-5 h-5" />, category: 'core', parents: [] },

    // Level 1
    { id: 'html', label: 'HTML5', description: 'Semantic structure and accessibility.', x: 25, y: 30, icon: <Layout className="w-5 h-5" />, category: 'frontend', parents: ['web'] },
    { id: 'js', label: 'JavaScript', description: 'Dynamic logic and ES6+ features.', x: 25, y: 70, icon: <Code2 className="w-5 h-5" />, category: 'frontend', parents: ['web'] },

    // Level 2 (CSS Branch)
    { id: 'css', label: 'CSS3', description: 'Styling, Flexbox, and Grid.', x: 40, y: 20, icon: <Layers className="w-5 h-5" />, category: 'frontend', parents: ['html'] },
    { id: 'tailwind', label: 'Tailwind', description: 'Utility-first styling architecture.', x: 55, y: 15, icon: <Box className="w-5 h-5" />, category: 'tools', parents: ['css'] },

    // Level 2 (JS Branch)
    { id: 'react', label: 'React', description: 'Component-based UI architecture.', x: 45, y: 60, icon: <Chip className="w-5 h-5" />, category: 'frontend', parents: ['js'] },
    { id: 'ts', label: 'TypeScript', description: 'Type safety and scalability.', x: 38, y: 85, icon: <Terminal className="w-5 h-5" />, category: 'tools', parents: ['js'] },

    // Level 3 (React Ecosystem)
    { id: 'next', label: 'Next.js', description: 'Server-side rendering and full-stack capabilities.', x: 65, y: 55, icon: <Smartphone className="w-5 h-5" />, category: 'frontend', parents: ['react'] },
    { id: 'framer', label: 'Motion', description: 'Complex animations and gestures.', x: 60, y: 75, icon: <Layers className="w-5 h-5" />, category: 'creative', parents: ['react'] },

    // Creative/3D Branch (Mixed parents)
    { id: 'three', label: 'Three.js', description: '3D graphics in the browser.', x: 55, y: 90, icon: <Box className="w-5 h-5" />, category: 'creative', parents: ['js'] },
    { id: 'r3f', label: 'R3F', description: 'React Three Fiber ecosystem.', x: 75, y: 85, icon: <Box className="w-5 h-5" />, category: 'creative', parents: ['three', 'react'] },

    // Advanced
    { id: 'backend', label: 'Backend', description: 'Node.js, APIs, and Databases.', x: 80, y: 40, icon: <Database className="w-5 h-5" />, category: 'backend', parents: ['js', 'next'] },
];

const SkillTree = () => {
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const [hoveredPath, setHoveredPath] = useState<string[]>([]);
    const { playHover, playClick } = useSound();
    const containerRef = useRef<HTMLDivElement>(null);

    // Color Helpers
    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case 'core': return 'text-white border-white bg-white/10';
            case 'frontend': return 'text-blue-400 border-blue-400 bg-blue-400/10';
            case 'backend': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
            case 'creative': return 'text-purple-400 border-purple-400 bg-purple-400/10';
            case 'tools': return 'text-green-400 border-green-400 bg-green-400/10';
            default: return 'text-gray-400 border-gray-400';
        }
    };

    const getStrokeColor = (cat: string) => {
        switch (cat) {
            case 'core': return '#ffffff';
            case 'frontend': return '#60a5fa'; // blue-400
            case 'backend': return '#facc15'; // yellow-400
            case 'creative': return '#c084fc'; // purple-400
            case 'tools': return '#4ade80'; // green-400
            default: return '#9ca3af';
        }
    };

    // Calculate Paths (Upstream)
    const getUpstreamPath = (nodeId: string, currentPath: string[] = []): string[] => {
        const node = skillNodes.find(n => n.id === nodeId);
        if (!node) return currentPath;

        let newPath = [...currentPath, nodeId];
        node.parents.forEach(parentId => {
            if (!currentPath.includes(parentId)) {
                newPath = [...newPath, ...getUpstreamPath(parentId, newPath)];
            }
        });
        return newPath;
    };

    const handleNodeHover = (id: string | null) => {
        if (id) {
            playHover();
            const path = getUpstreamPath(id);
            setHoveredPath(path);
        } else {
            setHoveredPath([]);
        }
        setActiveNode(id);
    };

    return (
        <div className="relative w-full h-[600px] md:h-[500px] bg-black/20 rounded-2xl border border-white/5 backdrop-blur-sm overflow-hidden group select-none" ref={containerRef}>
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />

            {/* SVG Connections Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {skillNodes.map(node => {
                    return node.parents.map(parentId => {
                        const parent = skillNodes.find(n => n.id === parentId);
                        if (!parent) return null;

                        const isPathActive = hoveredPath.includes(node.id) && hoveredPath.includes(parentId);

                        return (
                            <motion.path
                                key={`${parentId}-${node.id}`}
                                d={`M ${parent.x}% ${parent.y}% C ${parent.x + 10}% ${parent.y}%, ${node.x - 10}% ${node.y}%, ${node.x}% ${node.y}%`}
                                fill="none"
                                stroke={isPathActive ? getStrokeColor(node.category) : 'rgba(255,255,255,0.1)'}
                                strokeWidth={isPathActive ? 2 : 1}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: 1,
                                    opacity: 1,
                                    strokeDasharray: isPathActive ? "5,5" : "0,0"
                                }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        );
                    });
                })}
            </svg>

            {/* Nodes Layer */}
            <div className="absolute inset-0 z-10 p-4">
                {skillNodes.map((node) => {
                    const isActive = activeNode === node.id;
                    const isPath = hoveredPath.includes(node.id);
                    const isDimmed = activeNode && !isPath;

                    return (
                        <motion.button
                            key={node.id}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group/node focus:outline-none`}
                            style={{
                                left: `${node.x}%`,
                                top: `${node.y}%`
                            }}
                            onMouseEnter={() => handleNodeHover(node.id)}
                            onMouseLeave={() => handleNodeHover(null)}
                            onClick={() => playClick()}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: isActive ? 1.2 : 1,
                                opacity: isDimmed ? 0.3 : 1
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            {/* Node Circle */}
                            <div className={`
                                w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center 
                                backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300
                                ${getCategoryColor(node.category)}
                                ${isActive || isPath ? 'scale-110 shadow-[0_0_25px_currentColor]' : ''}
                            `}>
                                {node.icon}
                            </div>

                            {/* Label */}
                            <div className={`
                                absolute top-14 md:top-16 text-center w-32 transition-all duration-300
                                ${isActive ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-[-5px]'}
                            `}>
                                <span className={`text-xs md:text-sm font-bold bg-black/50 px-2 py-1 rounded backdrop-blur-sm ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                    {node.label}
                                </span>
                            </div>

                            {/* Tooltip Popup (Only on Active) */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        className="absolute top-20 left-1/2 -translate-x-1/2 z-50 w-48 bg-gray-900/90 border border-white/10 p-3 rounded-xl backdrop-blur-xl shadow-2xl pointer-events-none"
                                    >
                                        <h4 className="font-bold text-white text-sm mb-1">{node.label}</h4>
                                        <p className="text-[10px] text-gray-400 leading-relaxed">{node.description}</p>
                                        <div className="mt-2 text-[10px] uppercase font-mono tracking-widest text-primary/80 border-t border-white/5 pt-2">
                                            {node.category}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-4 text-[10px] text-gray-500 font-mono">
                [SYSTEM]: HOVER_NODES_TO_Scan_PATH.exe
            </div>
        </div>
    );
};

export default SkillTree;
