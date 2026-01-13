import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommentary } from '@/context/CommentaryContext';
import { Info, Code, X } from 'lucide-react';
import { useSound } from '@/context/SoundContext';

interface HotspotProps {
    title: string;
    description: string;
    codeSnippet?: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}

const Hotspot = ({ title, description, codeSnippet, placement = 'top', className = '' }: HotspotProps) => {
    const { isCommentaryOpen } = useCommentary();
    const [isOpen, setIsOpen] = useState(false);
    const { playClick, playHover } = useSound();

    if (!isCommentaryOpen) return null;

    return (
        <div className={`absolute z-50 ${className}`}>
            {/* Pulsing Hotspot Marker */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => { playClick(); setIsOpen(true); }}
                onMouseEnter={() => playHover()}
                className="relative w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center group cursor-pointer"
            >
                <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-50" />
                <Info className="w-4 h-4 text-red-500" />
            </motion.button>

            {/* Popover Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className={`absolute ${placement === 'top' ? 'bottom-full mb-4' :
                                placement === 'bottom' ? 'top-full mt-4' :
                                    placement === 'left' ? 'right-full mr-4' : 'left-full ml-4'
                            } w-80 bg-black/90 backdrop-blur-xl border border-red-500/30 rounded-xl p-4 shadow-2xl z-[100]`}
                        style={{ minWidth: '300px' }}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-red-400 font-bold font-mono text-sm uppercase flex items-center gap-2">
                                <Code className="w-4 h-4" /> Director's Note
                            </h4>
                            <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-gray-500 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <h3 className="text-white font-bold mb-2">{title}</h3>
                        <p className="text-gray-300 text-xs leading-relaxed mb-3">
                            {description}
                        </p>

                        {codeSnippet && (
                            <div className="bg-black/50 rounded-lg p-2 border border-white/10 font-mono text-[10px] text-green-400 overflow-x-auto">
                                <pre>{codeSnippet}</pre>
                            </div>
                        )}

                        {/* Connecting Line */}
                        <div className={`absolute w-3 h-3 bg-black/90 border-l border-b border-red-500/30 transform rotate-45 ${placement === 'top' ? 'bottom-[-6px] left-1/2 -translate-x-1/2 border-l-0 border-t border-r-0 border-b-0' :
                                placement === 'bottom' ? 'top-[-6px] left-1/2 -translate-x-1/2 border-l border-t border-r-0 border-b-0 bg-transparent border-none' : // Fix arrow later if needed, simple approach for now
                                    'hidden'
                            }`} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Hotspot;
