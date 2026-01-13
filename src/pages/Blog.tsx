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
            title: "Mastering the Cinematic Web: Three.js & Framer Motion",
            excerpt: "Explore how to combine high-performance WebGL animations with React-based motion libraries for a truly immersive UX.",
            date: "Jan 12, 2024",
            readTime: "8 min read",
            category: "Tech",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
            tags: ["Three.js", "WebGL", "UX"]
        },
        {
            id: 2,
            title: "Building Scalable AI Dashboards with Next.js",
            excerpt: "A deep dive into real-time data streaming and neural network visualization using modern React patterns.",
            date: "Dec 28, 2023",
            readTime: "12 min read",
            category: "AI",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
            tags: ["AI", "React", "Streaming"]
        },
        {
            id: 3,
            title: "The Future of Minimalist Design in 2024",
            excerpt: "Why 'less is more' is evolving into 'intentional is everything' in the next era of personal branding.",
            date: "Dec 15, 2023",
            readTime: "5 min read",
            category: "Design",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800",
            tags: ["Minimalism", "Design", "Trends"]
        }
    ];

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navigation />

            {/* Header Section */}
            <section className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <span className="text-primary font-mono tracking-[0.5em] uppercase text-xs">Technical Journal</span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                            Thoughts <span className="text-gradient">& Insights</span>
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            Exploring the intersection of cinematic design, artificial intelligence, and high-performance software engineering.
                        </p>
                    </motion.div>

                    <div className="mt-12 max-w-xl mx-auto relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors group-focus-within:text-primary" />
                        <Input
                            placeholder="Search articles, tags, or topics..."
                            className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary/20 focus:border-primary/50 text-white placeholder:text-gray-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group flex flex-col bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-all duration-500"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-md">
                                                {post.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-4 text-xs text-gray-500 font-mono mb-4">
                                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                                        </div>

                                        <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors leading-snug">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex gap-2">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] text-gray-600 font-mono">#{tag}</span>
                                                ))}
                                            </div>
                                            <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group/btn">
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-primary/5">
                <div className="max-w-4xl mx-auto glass p-12 rounded-[40px] border-white/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

                    <div className="relative z-10 space-y-6">
                        <AnimatePresence mode="wait">
                            {!isSubscribed ? (
                                <motion.div
                                    key="subscribe"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    className="space-y-6"
                                >
                                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-primary/30">
                                        <Mail className="w-8 h-8 text-primary" />
                                    </div>
                                    <h2 className="text-4xl font-bold tracking-tight">Stay in the Loop</h2>
                                    <p className="text-gray-400 max-w-md mx-auto">
                                        Get weekly updates on new projects, deep dives into tech, and exclusive insights delivered to your inbox.
                                    </p>

                                    <form
                                        className="mt-10 flex flex-col md:flex-row gap-4 max-w-md mx-auto"
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                            if (!email.trim() || !email.includes('@')) return;

                                            setIsLoading(true);
                                            playClick();

                                            try {
                                                const { error } = await supabase
                                                    .from('newsletter_subs')
                                                    .insert([{ email: email.trim() }]);

                                                if (error) {
                                                    if (error.code === '23505') { // Unique constraint violation
                                                        toast({
                                                            title: "Already Synced!",
                                                            description: "This email is already in our transmission loop.",
                                                            variant: "destructive"
                                                        });
                                                    } else {
                                                        throw error;
                                                    }
                                                } else {
                                                    playWhoosh();
                                                    setIsSubscribed(true);
                                                    toast({
                                                        title: "Subscription Confirmed! 🚀",
                                                        description: "Welcome to the Nexus inner circle.",
                                                    });
                                                }
                                            } catch (error) {
                                                console.error('Subscription Error:', error);
                                                toast({
                                                    title: "Sync Failed",
                                                    description: "Unable to connect to the newsletter uplink.",
                                                    variant: "destructive"
                                                });
                                            } finally {
                                                setIsLoading(false);
                                            }
                                        }}
                                    >
                                        <Input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="h-14 bg-white/5 border-white/20 rounded-2xl focus:ring-primary/20 text-white"
                                            disabled={isLoading}
                                        />
                                        <Button
                                            size="lg"
                                            disabled={isLoading}
                                            className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold glow-primary"
                                        >
                                            {isLoading ? "Syncing..." : "Subscribe"}
                                        </Button>
                                    </form>
                                    <p className="text-[10px] text-gray-600 mt-4 uppercase tracking-widest font-mono">No spam. Only high-performance content.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="py-12 space-y-4"
                                >
                                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 12 }}
                                        >
                                            <ArrowRight className="w-10 h-10 text-primary" />
                                        </motion.div>
                                    </div>
                                    <h2 className="text-3xl font-bold italic">Synchronization Complete</h2>
                                    <p className="text-gray-400">You are now part of the 1% who stay ahead of the curve.</p>
                                    <Button
                                        variant="ghost"
                                        className="text-primary hover:text-white"
                                        onClick={() => setIsSubscribed(false)}
                                    >
                                        Use another email
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Blog;
