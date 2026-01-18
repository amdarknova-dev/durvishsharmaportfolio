
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Bookmark, Hash, BookOpen, Star, GitBranch, Box, Code } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import PaymentGateway from '@/components/PaymentGateway';

const resources = [
    {
        category: "3D Pipeline",
        items: [
            { title: "Modeling", desc: "ZBrush + Maya", link: "#", tags: ["Sculpting", "Poly"] },
            { title: "Rigging", desc: "Auto-Rig Pro + Maya", link: "#", tags: ["Rigging", "Animation"] },
            { title: "Texturing", desc: "Substance Painter", link: "#", tags: ["PBR", "Materials"] },
            { title: "Animation", desc: "Maya + Cascadeur", link: "#", tags: ["Motion", "Physics"] },
            { title: "Shading/Rendering", desc: "Redshift / Octane", link: "#", tags: ["Render", "GPU"] },
            { title: "Effects", desc: "Houdini + After Effects", link: "#", tags: ["VFX", "Comp"] },
            { title: "Editing", desc: "DaVinci Resolve Studio", link: "#", tags: ["Post", "Color"] },
            { title: "Audio", desc: "Pro Tools + Epidemic Sound", link: "#", tags: ["Sound", "SFX"] },
            { title: "Pipeline", desc: "ShotGrid", link: "#", tags: ["Management", "Production"] },
        ]
    },
    {
        category: "Game Engine (UE5)",
        items: [
            { title: "Core Engine", desc: "Unreal Engine 5", link: "#", tags: ["Game Dev", "Real-time"] },
            { title: "World Gen", desc: "Houdini + Gaea", link: "#", tags: ["Terrain", "Procedural"] },
            { title: "VFX", desc: "Houdini + Niagara", link: "#", tags: ["Particles", "Sim"] },
            { title: "Audio Integration", desc: "Wwise + Pro Tools", link: "#", tags: ["Audio Middleware"] },
            { title: "Cinematics", desc: "Unreal Sequencer", link: "#", tags: ["Linear", "Story"] },
            { title: "Version Control", desc: "Perforce + ShotGrid", link: "#", tags: ["DevOps", "Collaboration"] },
        ]
    },
    {
        category: "Web & Design",
        items: [
            { title: "React Three Fiber", desc: "React renderer for Three.js", link: "https://docs.pmnd.rs/react-three-fiber", tags: ["3D", "React"] },
            { title: "Framer Motion", desc: "Production-ready motion library for React", link: "https://www.framer.com/motion/", tags: ["Animation", "UI"] },
            { title: "Zustand", desc: "Small, fast and scalable bearbones state-management", link: "#", tags: ["State", "React"] },
            { title: "Tailwind CSS", desc: "Utility-first CSS framework", link: "#", tags: ["Styling", "CSS"] },
        ]
    }
];

const TheHub = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const flatResources = resources.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.category })));
    const filtered = flatResources.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
            r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

        const matchesCategory = selectedCategory === "All" || r.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="relative min-h-screen bg-background pt-32 pb-32">
            <Navigation />
            <ParticleBackground />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <header className="text-center mb-24 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
                    <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] mb-6 block">Knowledge Base</span>
                    <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none mb-8">
                        The <span className="text-gradient">Hub</span>
                    </h1>
                    <p className="text-gray-500 max-w-lg mx-auto text-lg font-light leading-relaxed">
                        A curated constellation of high-value assets, libraries, and intelligence for modern development.
                    </p>

                    <div className="mt-16 max-w-xl mx-auto relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-6 w-5 h-5 text-gray-500" />
                            <Input
                                placeholder="SEARCH DATABASE..."
                                className="h-16 pl-16 rounded-full bg-black/50 border-white/10 text-white font-mono uppercase tracking-widest focus:ring-primary/50 focus:border-primary/50 transition-all"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                {/* Filter Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <Button
                        variant={selectedCategory === "All" ? "default" : "outline"}
                        onClick={() => setSelectedCategory("All")}
                        className={`rounded-full px-6 uppercase tracking-wider text-xs ${selectedCategory === "All" ? "bg-primary text-black" : "border-white/10 text-gray-400 hover:text-white bg-black/20"}`}
                    >
                        All Systems
                    </Button>
                    {resources.map((cat, i) => (
                        <Button
                            key={i}
                            variant={selectedCategory === cat.category ? "default" : "outline"}
                            onClick={() => setSelectedCategory(cat.category)}
                            className={`rounded-full px-6 uppercase tracking-wider text-xs ${selectedCategory === cat.category ? "bg-primary text-black" : "border-white/10 text-gray-400 hover:text-white bg-black/20"}`}
                        >
                            {cat.category}
                        </Button>
                    ))}
                </div>

                {/* Funding Directive Section */}
                {!search && selectedCategory === "All" && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-32"
                    >
                        <Card className="relative overflow-hidden border-primary/30 bg-primary/5 p-8 md:p-12 rounded-[2rem]">
                            {/* Animated Background Mesh */}
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(34,197,94,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-gradient-xy pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1 space-y-6 text-center md:text-left">
                                    <Badge variant="outline" className="border-primary text-primary animate-pulse tracking-widest uppercase">
                                        Priority Directive
                                    </Badge>
                                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                                        Project <span className="text-gradient">Genesis</span>
                                    </h2>
                                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                        Refining the human aesthetic to fund the next evolution of entertainment.
                                        Proceeds directly support the $10M Anime Initiative and $50M Game Development roadmap.
                                    </p>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-gray-500">
                                            <span>Funding Progress</span>
                                            <span className="text-primary">$150 / $60,000,000</span>
                                        </div>
                                        <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/10">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "0.00025%" }}
                                                className="h-full bg-primary glow-primary"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Card className="glass-premium p-8 rounded-2xl border-white/10 w-full md:w-96 flex flex-col items-center text-center space-y-6 hover:border-primary/50 transition-colors transform hover:scale-105 duration-500">
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                        <BookOpen className="w-10 h-10 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Lookmaxing Protocol</h3>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Volume I</p>
                                    </div>
                                    <div className="text-4xl font-black text-white">
                                        ₹150 <span className="text-sm font-normal text-gray-500 align-top">INR</span>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            console.log("Acquire button clicked");
                                            setIsPaymentOpen(true);
                                        }}
                                        className="w-full h-14 bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest rounded-xl text-xs"
                                    >
                                        Acquire Asset & Support
                                    </Button>
                                    <p className="text-[9px] text-gray-500 uppercase tracking-widest">
                                        Secure Transaction // Instant Download
                                    </p>
                                </Card>
                            </div>
                        </Card>
                    </motion.section>
                )}

                <PaymentGateway
                    isOpen={isPaymentOpen}
                    onClose={() => setIsPaymentOpen(false)}
                    onSuccess={() => {
                        setIsPaymentOpen(false);
                        window.open('https://www.canva.com/design/DAG1S1W9ZYg/tfCLVz6htf5R_fBqlMlgAQ/view?utm_content=DAG1S1W9ZYg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he19b574757', '_blank');
                    }}
                    amount={150}
                    itemName="Lookmaxing Protocol Vol. I"
                />

                {/* Categories Grid */}
                <div className="grid gap-16">
                    {/* Render grouped if searching is empty AND no specific category selected, else render flat list */}
                    {search || selectedCategory !== "All" ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((item, i) => (
                                <ResourceCard key={i} item={item} />
                            ))}
                            {filtered.length === 0 && <div className="col-span-full text-center text-gray-500 font-mono">NO DATA FOUND</div>}
                        </div>
                    ) : (
                        resources.map((category, idx) => (
                            <section key={idx} className="space-y-8">
                                <div className="flex items-center gap-4 text-white">
                                    <div className="w-2 h-8 bg-primary rounded-full" />
                                    <h2 className="text-2xl font-bold uppercase tracking-widest">{category.category}</h2>
                                    <div className="h-px flex-1 bg-white/5" />
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {category.items.map((item, i) => (
                                        <ResourceCard key={i} item={item} />
                                    ))}
                                </div>
                            </section>
                        ))
                    )}
                </div>

            </div >
            <Footer />
        </div >
    );
};

interface ResourceItem {
    title: string;
    desc: string;
    link: string;
    tags: string[];
    category?: string;
}

const ResourceCard = ({ item }: { item: ResourceItem }) => (
    <motion.div
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
    >
        <Card className="glass-premium p-6 rounded-2xl border-white/5 hover:border-primary/30 group cursor-pointer h-full flex flex-col justify-between transition-all duration-300">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        {item.tags.includes('3D') ? <Box className="w-5 h-5" /> :
                            item.tags.includes('React') ? <Code className="w-5 h-5" /> :
                                item.tags.includes('Design') ? <Star className="w-5 h-5" /> :
                                    <Hash className="w-5 h-5" />}
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{item.desc}</p>
            </div>

            <div className="flex flex-wrap gap-2">
                {item.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-gray-400 text-[10px] uppercase tracking-wider font-mono">
                        {tag}
                    </Badge>
                ))}
            </div>
        </Card>
    </motion.div>
);

export default TheHub;
