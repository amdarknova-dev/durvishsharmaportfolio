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
import { useTranslation } from 'react-i18next';

const Blog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const { playClick, playWhoosh, playHover } = useSound();
    const { t } = useTranslation();

    const posts = [
        {
            id: 1,
            title: "Mastering the Cinematic Web",
            excerpt: "Explore how to combine high-performance WebGL animations with React-based motion libraries for a truly immersive experience.",
            date: "2024.01.12",
            readTime: "8 min",
            category: "Technical",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
            tags: ["Three.js", "WebGL"],
            encryptionLevel: "L3"
        },
        {
            id: 2,
            title: "Scalable Intelligence Dashboards",
            excerpt: "A deep dive into real-time data streaming and neural network visualization using modern React architecture patterns.",
            date: "2023.12.28",
            readTime: "12 min",
            category: "AI",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
            tags: ["Next.js", "AI"],
            encryptionLevel: "L5"
        },
        {
            id: 3,
            title: "The Future of Digital Intent",
            excerpt: "Why 'less is more' is evolving into 'intentional is everything' in the next era of professional personal branding.",
            date: "2023.12.15",
            readTime: "5 min",
            category: "Design",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800",
            tags: ["Minimalism", "UX"],
            encryptionLevel: "L2"
        }
    ];

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="relative min-h-screen bg-black overflow-x-hidden pt-32 md:pt-48 selection:bg-primary/30 selection:text-black">
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
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-primary/50"></div>
                        <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] glow-text">{t('blog.secure_archives')}</span>
                        <div className="h-[1px] w-12 bg-primary/50"></div>
                    </div>
                    <h1 className="text-6xl md:text-[8rem] font-black mb-8 tracking-tighter text-white uppercase leading-none">
                        {t('blog.title')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">{t('blog.subtitle')}</span>
                    </h1>

                    {/* Terminal Search */}
                    <div className="mt-20 max-w-2xl mx-auto relative group">
                        <div className="absolute inset-0 bg-primary/5 blur-xl group-focus-within:bg-primary/10 transition-all duration-500 rounded-full" />
                        <div className="relative flex items-center bg-black/50 border border-white/10 group-focus-within:border-primary/50 rounded-full transition-all duration-300">
                            <span className="pl-6 text-primary font-mono select-none">{'>'}</span>
                            <Input
                                placeholder={t('blog.search_placeholder')}
                                className="pl-4 h-16 bg-transparent border-none focus:ring-0 text-primary font-mono tracking-widest text-sm placeholder:text-gray-700 uppercase"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="pr-6">
                                <div className="w-2 h-4 bg-primary/50 animate-pulse" />
                            </div>
                        </div>
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
                                onMouseEnter={() => playHover()}
                            >
                                <div className="group relative h-full cursor-pointer perspective-1000">
                                    {/* Holographic Border */}
                                    <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                                    <Card className="relative h-full bg-black/40 backdrop-blur-md border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 flex flex-col">
                                        {/* Image Section */}
                                        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5">
                                            <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                                            />

                                            {/* HUD Overlay */}
                                            <div className="absolute top-4 left-4 z-20 flex gap-2">
                                                <Badge className="bg-black/50 text-white border-white/10 backdrop-blur-md font-mono text-[9px] uppercase tracking-widest">
                                                    SEC: {post.encryptionLevel}
                                                </Badge>
                                            </div>

                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-20" />
                                        </div>

                                        <div className="p-8 flex flex-col flex-1">
                                            {/* Meta Data */}
                                            <div className="flex items-center justify-between mb-6 text-[9px] font-mono text-gray-500 uppercase tracking-widest border-b border-white/5 pb-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                                    {post.date}
                                                </div>
                                                <div>{t('blog.read_time')}: {post.readTime}</div>
                                            </div>

                                            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4 group-hover:text-primary transition-colors leading-tight">
                                                {post.title}
                                            </h3>

                                            <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-3 mb-8">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between group/btn">
                                                <div className="flex gap-2">
                                                    {post.tags.map(tag => (
                                                        <span key={tag} className="text-[9px] text-gray-600 font-mono border border-white/5 px-2 py-1 rounded hover:border-primary/30 hover:text-primary transition-colors">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                                    <span>{t('blog.decrypt')}</span>
                                                    <ArrowRight className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
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
                    <div className="relative rounded-[3rem] overflow-hidden border border-white/5 bg-black/40 backdrop-blur-xl">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(34,197,94,0.05),_transparent_70%)]" />

                        <div className="relative p-12 md:p-24 grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em]">System Alert</span>
                                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                                        {t('blog.subscribe_title')}
                                    </h2>
                                </div>
                                <p className="text-gray-400 text-sm font-light leading-relaxed max-w-md">
                                    {t('blog.subscribe_desc')}
                                </p>
                            </div>

                            <form
                                className="relative group"
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    if (!email.trim() || !email.includes('@')) return;
                                    setIsLoading(true);
                                    playClick();
                                    try {
                                        const { error } = await supabase.from('newsletter_subs').insert([{ email: email.trim() }]);
                                        if (error) throw error;
                                        playWhoosh();
                                        setIsSubscribed(true);
                                        toast({ title: "UPLINK ESTABLISHED", description: "Terminal connected to secure feed.", className: "font-mono" });
                                    } catch (error) {
                                        toast({ title: "CONNECTION FAILED", description: "Signal lost. Retry transmission.", variant: "destructive" });
                                    } finally { setIsLoading(false); }
                                }}
                            >
                                <div className="flex items-center border-b border-white/20 hover:border-primary/50 transition-colors pb-2">
                                    <span className="text-primary font-mono mr-4 text-xs">{t('blog.input_label')}</span>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="USER@NET.COM"
                                        className="bg-transparent border-none focus:ring-0 text-white font-mono tracking-widest text-sm w-full placeholder:text-gray-800 uppercase"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="text-primary hover:text-white transition-colors disabled:opacity-50 font-mono text-xs uppercase"
                                    >
                                        {t('blog.enter')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.section>
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
