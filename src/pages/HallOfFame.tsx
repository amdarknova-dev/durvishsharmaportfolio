import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useHack } from '@/context/HackContext';
import { useSound } from '@/context/SoundContext';
import { useToast } from '@/hooks/use-toast';
import { Trophy, Star, Crown, Medal, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { supabase } from '@/lib/supabase';

interface HallOfFameEntry {
    id: string;
    username: string;
    message: string;
    created_at: string;
    rank?: number;
}

const HallOfFame = () => {
    const [entries, setEntries] = useState<HallOfFameEntry[]>([]);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { userType, username, isAdmin } = useHack();
    const { playClick, playSuccess } = useSound();
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        fetchEntries();

        const channel = supabase
            .channel('hall_of_fame_changes')
            .on(
                'postgres_changes' as any,
                {
                    event: '*',
                    schema: 'public',
                    table: 'hall_of_fame'
                },
                (_payload: { new: HallOfFameEntry }) => {
                    fetchEntries();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchEntries = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('hall_of_fame')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setEntries(data);
        }
        setIsLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userType === 'guest') {
            toast({
                variant: "destructive",
                title: "ACCESS DENIED",
                description: "Please login to add your name to the Hall of Fame.",
            });
            navigate('/login');
            return;
        }

        playClick();
        setIsSubmitting(true);

        const { data, error } = await supabase
            .from('hall_of_fame')
            .insert([
                {
                    username: username,
                    message: message.trim() || 'I was here!',
                }
            ])
            .select();

        if (error) {
            toast({
                variant: "destructive",
                title: "SUBMISSION FAILED",
                description: error.message,
            });
        } else {
            playSuccess();
            toast({
                title: "ENTRY ADDED!",
                description: "Your name has been added to the Hall of Fame!",
                className: "bg-green-900 border-green-500 text-green-100",
            });
            setMessage('');
            fetchEntries();
        }

        setIsSubmitting(false);
    };

    const handleDelete = async (id: string) => {
        if (!isAdmin) return;

        playClick();
        const { error } = await supabase
            .from('hall_of_fame')
            .delete()
            .eq('id', id);

        if (!error) {
            toast({
                title: "ENTRY DELETED",
                description: "Entry removed from Hall of Fame.",
            });
            fetchEntries();
        }
    };

    const RankIndicator = ({ index }: { index: number }) => {
        const colors = [
            'bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]',
            'bg-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.3)]',
            'bg-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.3)]',
            'bg-primary/20'
        ];

        const dotColor = index < 3 ? colors[index] : colors[3];

        return (
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span className="text-[10px] font-mono text-gray-500 tracking-[0.2em] font-bold uppercase">
                    Rank {index + 1}
                </span>
            </div>
        );
    };

    return (
        <div className="relative min-h-screen bg-background overflow-x-hidden pt-32 md:pt-48">
            <ParticleBackground />
            <Navigation />

            <main className="relative z-10 max-w-6xl mx-auto px-6 pb-64">
                {/* Minimal Centered Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-32"
                >
                    <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] mb-6 block">Recognition</span>
                    <h1 className="text-6xl md:text-[8rem] font-black mb-8 tracking-tighter text-white uppercase leading-none">
                        Hall of <br />
                        <span className="text-gradient">Fame</span>
                    </h1>
                    <p className="mt-8 text-gray-500 text-lg max-w-xl mx-auto font-light leading-relaxed">
                        A digital ledger of legendary entities who have interfaced with this environment.
                    </p>
                </motion.div>

                {/* Entry Action Section */}
                <div className="max-w-3xl mx-auto mb-48">
                    {userType !== 'guest' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Card className="glass-premium p-12 border-white/5 rounded-[3rem] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-700" />
                                <h2 className="text-3xl font-black text-white mb-10 uppercase tracking-tighter">Initialize Entry</h2>

                                <form onSubmit={handleSubmit} className="space-y-12">
                                    <div className="relative group/field">
                                        <input
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white focus:outline-none transition-all duration-500 font-light text-lg placeholder:opacity-0 peer"
                                            placeholder="Transmission Message"
                                            maxLength={200}
                                        />
                                        <label className="absolute left-0 top-4 text-gray-500 text-lg transition-all duration-500 pointer-events-none peer-focus:-top-6 peer-focus:text-primary peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.2em] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]">
                                            Transmission Message <span className="text-[10px] lowercase opacity-40">(Optional)</span>
                                        </label>
                                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover/field:w-full peer-focus:w-full shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                                        <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                                            <span>Payload: {message.length}/200</span>
                                            <span>Auth: {username}</span>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold tracking-widest uppercase transition-all duration-500 relative overflow-hidden group shadow-2xl"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            {isSubmitting ? 'Uplinking...' : 'Commit to History'}
                                            {!isSubmitting && <Plus className="w-5 h-5" />}
                                        </span>
                                    </Button>
                                </form>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Card className="glass-premium p-16 border-white/5 rounded-[3rem] text-center relative overflow-hidden group border-dashed hover:border-primary/30 transition-all duration-500">
                                <div className="max-w-md mx-auto space-y-8">
                                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20 group-hover:scale-110 transition-transform duration-700">
                                        <Star className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Identity Required</h3>
                                    <p className="text-gray-500 text-lg font-light leading-relaxed">
                                        Establish a secure session to permanently record your presence in the legendary ledger.
                                    </p>
                                    <Button
                                        onClick={() => navigate('/login')}
                                        className="h-16 px-12 rounded-2xl bg-white text-black font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-500"
                                    >
                                        Initialize Login
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </div>

                {/* Ledger Index */}
                <div className="space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-12">
                        <div className="space-y-4">
                            <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] block">Database</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                                Synchronized <span className="text-gradient">Entities</span>
                            </h2>
                        </div>
                        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em]">
                            Total Records: {entries.length} // Status: Online
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-40 space-y-8">
                            <div className="w-16 h-16 border-t-2 border-primary rounded-full animate-spin shadow-[0_0_20px_rgba(34,197,94,0.3)]"></div>
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em] animate-pulse">Syncing Ledger...</p>
                        </div>
                    ) : entries.length === 0 ? (
                        <div className="text-center py-40 glass-premium rounded-[3rem] border border-dashed border-white/5">
                            <Trophy className="w-20 h-20 text-gray-800 mx-auto mb-8 opacity-20" />
                            <p className="text-gray-500 text-lg font-light">The ledger is currently blank. Be the first to emerge.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            <AnimatePresence mode="popLayout">
                                {entries.map((entry, index) => (
                                    <motion.div
                                        key={entry.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.6, delay: index * 0.05 }}
                                    >
                                        <Card className={`glass-premium p-10 border border-white/5 hover:border-primary/20 transition-all duration-500 group rounded-[2.5rem] relative overflow-hidden ${index < 3 ? 'bg-primary/[0.02]' : ''
                                            }`}>
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                                <div className="flex items-start gap-8 flex-1">
                                                    <div className="w-16 h-16 bg-white/[0.03] rounded-3xl flex items-center justify-center shrink-0 border border-white/5 group-hover:border-primary/20 transition-colors">
                                                        <Trophy className={`w-7 h-7 ${index < 3 ? 'text-primary' : 'text-gray-600'}`} />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-6">
                                                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors">{entry.username}</h3>
                                                            <RankIndicator index={index} />
                                                        </div>
                                                        {entry.message && (
                                                            <p className="text-gray-400 text-lg leading-relaxed font-light max-w-2xl">{entry.message}</p>
                                                        )}
                                                        <div className="flex items-center gap-4 text-[10px] font-mono text-gray-600 uppercase tracking-widest pt-2">
                                                            <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                                                            <span className="opacity-30">|</span>
                                                            <span>ID: {entry.id.substring(0, 8)}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {isAdmin && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(entry.id)}
                                                        className="h-14 w-14 rounded-2xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white md:opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </Button>
                                                )}
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            {/* Background Glow */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.03),transparent_70%)] -z-10 pointer-events-none" />
        </div>
    );
};

export default HallOfFame;
