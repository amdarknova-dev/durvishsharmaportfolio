import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Search, ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useSound } from '@/context/SoundContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import ParticleBackground from '@/components/ParticleBackground';
import { Card } from '@/components/ui/card';

const Blog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const { playClick, playWhoosh } = useSound();

    const posts = [
        {
            id: 1,
            title: "Mastering the Cinematic Web",
            excerpt: "Explore how to combine high-performance WebGL animations with React-based motion libraries for a truly immersive experience.",
            date: "2024.01.12",
            readTime: "8 min",
            category: "Technical",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
            tags: ["Three.js", "WebGL"]
        },
        {
            id: 2,
            title: "Scalable Intelligence Dashboards",
            excerpt: "A deep dive into real-time data streaming and neural network visualization using modern React architecture patterns.",
            date: "2023.12.28",
            readTime: "12 min",
            category: "AI",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
            tags: ["Next.js", "AI"]
        },
        {
            id: 3,
            title: "The Future of Digital Intent",
            excerpt: "Why 'less is more' is evolving into 'intentional is everything' in the next era of professional personal branding.",
            date: "2023.12.15",
            readTime: "5 min",
            category: "Design",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800",
            tags: ["Minimalism", "UX"]
        }
    ];

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="relative min-h-screen bg-background overflow-x-hidden pt-32 md:pt-48">
            <ParticleBackground />
            <Navigation />

            <main className="relative z-10 max-w-7xl mx-auto px-6 pb-64">
                {/* Minimal Centered Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-32"
                >
                    <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] mb-6 block">Transmission</span>
                    <h1 className="text-6xl md:text-[8rem] font-black mb-8 tracking-tighter text-white uppercase leading-none">
                        Insights <br />
                        <span className="text-gradient">& Theory</span>
                    </h1>
                    <p className="mt-8 text-gray-500 text-lg max-w-xl mx-auto font-light leading-relaxed">
                        Technical field notes on high-performance engineering and cinematic design.
                    </p>

                    <div className="mt-20 max-w-2xl mx-auto relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 transition-colors group-focus-within:text-primary" />
                        <Input
                            placeholder="SEARCH PROTOCOLS..."
                            className="pl-16 h-20 bg-white/[0.02] border-white/5 rounded-[2rem] focus:ring-primary/20 focus:border-primary/50 text-white placeholder:text-gray-700 font-mono tracking-widest text-xs transition-all duration-500 hover:bg-white/[0.04]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </motion.div>

                {/* Article Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-48">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="glass-premium flex flex-col h-full border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-primary/20 transition-all duration-700">
                                    <div className="relative aspect-[16/10] overflow-hidden cursor-pointer">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 saturate-[0.8] group-hover:saturate-100"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <Badge className="bg-background/80 text-white border-white/10 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold">
                                                {post.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="p-10 flex flex-col flex-1 space-y-6">
                                        <div className="flex items-center gap-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                                            <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                                            <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-500 text-base leading-relaxed font-light line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="pt-6 flex items-center justify-between border-t border-white/5 mt-auto">
                                            <div className="flex gap-4">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] text-gray-700 font-mono uppercase tracking-widest font-bold">#{tag}</span>
                                                ))}
                                            </div>
                                            <button className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-500 group/btn">
                                                <ArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Newsletter Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="py-12"
                >
                    <Card className="glass-premium p-16 md:p-24 rounded-[4rem] border-white/5 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/[0.03] rounded-full blur-[120px] -z-10 -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 max-w-2xl mx-auto space-y-12">
                            <AnimatePresence mode="wait">
                                {!isSubscribed ? (
                                    <motion.div
                                        key="subscribe"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-12"
                                    >
                                        <div className="space-y-6">
                                            <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] block">Newsletter</span>
                                            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Stay <br /><span className="text-gradient">Synchronized</span></h2>
                                            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md mx-auto">
                                                Join the transmission loop for technical deep dives and exclusive workflow insights.
                                            </p>
                                        </div>

                                        <form
                                            className="flex flex-col md:flex-row gap-4"
                                            onSubmit={async (e) => {
                                                e.preventDefault();
                                                if (!email.trim() || !email.includes('@')) return;
                                                setIsLoading(true);
                                                playClick();
                                                try {
                                                    const { error } = await supabase.from('newsletter_subs').insert([{ email: email.trim() }]);
                                                    if (error) {
                                                        if (error.code === '23505') {
                                                            toast({ title: "ALREADY SYNCED", description: "This address is already in the loop.", variant: "destructive" });
                                                        } else throw error;
                                                    } else {
                                                        playWhoosh();
                                                        setIsSubscribed(true);
                                                        toast({ title: "TRANSMISSION ENABLED", description: "Authentication successful. Welcome to the Nexus." });
                                                    }
                                                } catch (error) {
                                                    toast({ title: "LINK FAILED", description: "Unable to establish connection to the uplink.", variant: "destructive" });
                                                } finally { setIsLoading(false); }
                                            }}
                                        >
                                            <Input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="IDENTITY@DOMAIN.COM"
                                                className="h-20 bg-white/[0.03] border-white/5 rounded-[2rem] focus:ring-primary/20 text-white font-mono text-xs tracking-widest transition-all"
                                                disabled={isLoading}
                                            />
                                            <Button
                                                size="lg"
                                                disabled={isLoading}
                                                className="h-20 px-12 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest transition-all duration-500 shrink-0"
                                            >
                                                {isLoading ? "SYNCING..." : "SUBSCRIBE"}
                                            </Button>
                                        </form>
                                        <p className="text-[10px] text-gray-700 uppercase tracking-[0.4em] font-bold">Standard Protocol: Zero Spam // Encrypted Loop</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 space-y-8"
                                    >
                                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
                                            <ArrowRight className="w-10 h-10 text-primary" />
                                        </div>
                                        <div className="space-y-4">
                                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Sync Complete</h2>
                                            <p className="text-gray-500 text-lg font-light italic">Your identity has been added to the secure transmission loop.</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            className="text-primary hover:text-white uppercase tracking-widest font-bold text-xs"
                                            onClick={() => setIsSubscribed(false)}
                                        >
                                            Update Identity
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Card>
                </motion.section>
            </main>

            <Footer />
            <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.05),transparent_50%)] -z-10 pointer-events-none" />
        </div>
    );
};

export default Blog;
