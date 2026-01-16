
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Cpu, Mouse, Keyboard, Headphones, Laptop, Code, Terminal, Database, Globe, Wrench, Zap, Shield, Box, LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSound } from '@/context/SoundContext';

interface GearItem {
    id: string;
    name: string;
    description: string;
    stats: { label: string; value: number }[]; // 0-100 scale
    icon: LucideIcon;
    category: 'hardware' | 'software' | 'analog';
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const gearData: GearItem[] = [
    // Hardware
    {
        id: 'h1',
        name: 'MacBook Pro M2 Max',
        description: 'Primary battle station. Handles heavy compiling and 3D rendering with ease.',
        stats: [{ label: 'Power', value: 95 }, { label: 'Portability', value: 80 }, { label: 'Cooling', value: 85 }],
        icon: Laptop,
        category: 'hardware',
        rarity: 'legendary'
    },
    {
        id: 'h2',
        name: 'Dual 4K Monitors',
        description: 'Expanded visual cortex. Essential for multitasking and pixel-perfect design.',
        stats: [{ label: 'Clarity', value: 90 }, { label: 'Refresh Rate', value: 75 }, { label: 'Immersion', value: 88 }],
        icon: Monitor,
        category: 'hardware',
        rarity: 'epic'
    },
    {
        id: 'h3',
        name: 'Mechanical Keypad',
        description: 'Tactile input device. Custom switches for maximum typing velocity.',
        stats: [{ label: 'Tactility', value: 100 }, { label: 'Noise', value: 90 }, { label: 'Speed', value: 85 }],
        icon: Keyboard,
        category: 'hardware',
        rarity: 'rare'
    },
    {
        id: 'h4',
        name: 'Precision Mouse',
        description: 'High-DPI tracking for surgical cursor movements.',
        stats: [{ label: 'Precision', value: 98 }, { label: 'Ergonomics', value: 85 }, { label: 'Response', value: 95 }],
        icon: Mouse,
        category: 'hardware',
        rarity: 'rare'
    },
    // Software
    {
        id: 's1',
        name: 'VS Code',
        description: 'The Command Center. Heavily modded with extensions and themes.',
        stats: [{ label: 'Versatility', value: 100 }, { label: 'Speed', value: 90 }, { label: 'Extensions', value: 99 }],
        icon: Code,
        category: 'software',
        rarity: 'legendary'
    },
    {
        id: 's2',
        name: 'Figma',
        description: 'Blueprint generator. Where logic meets aesthetics.',
        stats: [{ label: 'Design', value: 95 }, { label: 'Collab', value: 90 }, { label: 'Prototyping', value: 85 }],
        icon: Box,
        category: 'software',
        rarity: 'epic'
    },
    {
        id: 's3',
        name: 'Terminal (Zsh)',
        description: 'The direct uplink to the system core.',
        stats: [{ label: 'Power', value: 100 }, { label: 'Control', value: 100 }, { label: 'GUI', value: 0 }],
        icon: Terminal,
        category: 'software',
        rarity: 'common'
    },
    // Analog
    {
        id: 'a1',
        name: 'Noise Cancelling',
        description: 'Audio shielding. Blocks out reality to focus on the code.',
        stats: [{ label: 'Silence', value: 95 }, { label: 'Fidelity', value: 90 }, { label: 'Comfort', value: 85 }],
        icon: Headphones,
        category: 'analog',
        rarity: 'epic'
    }
];

const RarityColor = {
    common: 'text-gray-400 border-gray-500/50 shadow-gray-500/20',
    rare: 'text-blue-400 border-blue-500/50 shadow-blue-500/20',
    epic: 'text-purple-400 border-purple-500/50 shadow-purple-500/20',
    legendary: 'text-yellow-400 border-yellow-500/50 shadow-yellow-500/20',
};

const TheArsenal = () => {
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'hardware' | 'software' | 'analog'>('all');
    const [selectedItem, setSelectedItem] = useState<GearItem | null>(null);
    const { playHover, playClick, playWhoosh } = useSound();

    const filteredGear = selectedCategory === 'all' ? gearData : gearData.filter(item => item.category === selectedCategory);

    return (
        <div className="relative min-h-screen bg-background overflow-hidden pt-32 px-6 pb-20">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12">

                {/* Left Panel: Inventory */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                            The <span className="text-primary italic">Arsenal</span>
                        </h1>
                        <div className="flex gap-2">
                            {/* Category Tabs */}
                            {(['all', 'hardware', 'software', 'analog'] as const).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => { playClick(); setSelectedCategory(cat); }}
                                    className={`px-3 py-1 rounded-lg border text-[10px] font-mono uppercase tracking-widest transition-all ${selectedCategory === cat
                                        ? 'bg-primary/20 border-primary text-primary'
                                        : 'bg-transparent border-white/10 text-gray-500 hover:text-white'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <AnimatePresence mode="popLayout">
                            {filteredGear.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => { playClick(); setSelectedItem(item); }}
                                    onMouseEnter={() => playHover()}
                                    className={`relative cursor-pointer group aspect-square rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center p-4 transition-all duration-300 ${selectedItem?.id === item.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-white/5'
                                        }`}
                                >
                                    <div className={`mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 ${RarityColor[item.rarity].split(' ')[0]}`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-bold text-white text-center uppercase tracking-wider">{item.name}</span>
                                    <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${RarityColor[item.rarity].split(' ')[0].replace('text-', 'bg-')}`} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Panel: Item Details (Stats) */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-40">
                        <AnimatePresence mode="wait">
                            {selectedItem ? (
                                <motion.div
                                    key={selectedItem.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="glass-premium border border-white/10 rounded-2xl p-8 relative overflow-hidden"
                                >
                                    {/* Holographic BG */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <Badge variant="outline" className={`${RarityColor[selectedItem.rarity].split(' ')[0]} border-current uppercase tracking-widest text-[10px]`}>
                                                {selectedItem.rarity} Tier
                                            </Badge>
                                            <selectedItem.icon className={`w-8 h-8 ${RarityColor[selectedItem.rarity].split(' ')[0]}`} />
                                        </div>

                                        <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">{selectedItem.name}</h2>
                                        <p className="text-gray-400 leading-relaxed text-sm mb-8 font-light italic border-l-2 border-primary/50 pl-4">
                                            "{selectedItem.description}"
                                        </p>

                                        {/* Stats Bars */}
                                        <div className="space-y-4 mb-8">
                                            {selectedItem.stats.map((stat, i) => (
                                                <div key={stat.label}>
                                                    <div className="flex justify-between text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-1">
                                                        <span>{stat.label}</span>
                                                        <span className="text-primary">{stat.value}%</span>
                                                    </div>
                                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${stat.value}%` }}
                                                            transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: "easeOut" }}
                                                            className={`h-full bg-gradient-to-r ${selectedItem.rarity === 'legendary' ? 'from-yellow-500 to-amber-300' :
                                                                selectedItem.rarity === 'epic' ? 'from-purple-500 to-fuchsia-300' :
                                                                    'from-primary to-emerald-300'
                                                                }`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                                            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">ID: {selectedItem.id.toUpperCase()}</span>
                                            <button className="text-primary text-xs uppercase font-bold tracking-widest hover:text-white transition-colors">
                                                Equip Item
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full flex items-center justify-center p-12 border-2 border-dashed border-white/10 rounded-2xl text-gray-600 font-mono text-sm uppercase tracking-widest">
                                    Select Gear to Analyze
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TheArsenal;
