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

        // Subscribe to real-time updates
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

    const getRankIcon = (index: number) => {
        if (index === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
        if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
        if (index === 2) return <Medal className="w-5 h-5 text-orange-600" />;
        return <Star className="w-4 h-4 text-primary" />;
    };

    return (
        <div className="relative min-h-screen bg-background overflow-x-hidden pt-24 md:pt-32 lg:pt-40">
            <ParticleBackground />
            <Navigation />

            <main className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20">
                        <Trophy className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white">
                        Hall of <span className="text-gradient">Fame</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Join the legendary visitors who have explored this portfolio. Leave your mark in history.
                    </p>
                </motion.div>

                {/* Add Entry Form */}
                {userType !== 'guest' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-16"
                    >
                        <Card className="glass p-8 border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Plus className="w-6 h-6 text-primary" />
                                Add Your Entry
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">
                                        Logged in as: <span className="text-primary font-bold">{username}</span>
                                    </label>
                                </div>
                                <div>
                                    <Input
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Leave a message (optional)..."
                                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-primary/50"
                                        maxLength={200}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{message.length}/200 characters</p>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold"
                                >
                                    {isSubmitting ? 'SUBMITTING...' : 'ADD TO HALL OF FAME'}
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                )}

                {userType === 'guest' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-16"
                    >
                        <Card className="glass p-8 border-white/10 text-center">
                            <h3 className="text-xl font-bold text-white mb-4">Want to join the Hall of Fame?</h3>
                            <p className="text-gray-400 mb-6">Login to add your name to the legendary list!</p>
                            <Button
                                onClick={() => navigate('/login')}
                                className="bg-primary hover:bg-primary/90 text-black font-bold"
                            >
                                LOGIN NOW
                            </Button>
                        </Card>
                    </motion.div>
                )}

                {/* Entries List */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
                        <Star className="w-6 h-6 text-primary" />
                        Legendary Visitors ({entries.length})
                    </h2>

                    {isLoading ? (
                        <div className="text-center py-20">
                            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                            <p className="text-gray-400 mt-4">Loading entries...</p>
                        </div>
                    ) : entries.length === 0 ? (
                        <Card className="glass p-12 border-white/10 text-center">
                            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg">No entries yet. Be the first to join the Hall of Fame!</p>
                        </Card>
                    ) : (
                        <AnimatePresence>
                            {entries.map((entry, index) => (
                                <motion.div
                                    key={entry.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card className={`glass p-6 border-white/10 hover:border-primary/30 transition-all group ${index < 3 ? 'bg-primary/5' : ''
                                        }`}>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                                                    {getRankIcon(index)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-lg font-bold text-white">{entry.username}</h3>
                                                        {index < 3 && (
                                                            <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full font-mono">
                                                                #{index + 1}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {entry.message && (
                                                        <p className="text-gray-400 text-sm mb-2">{entry.message}</p>
                                                    )}
                                                    <p className="text-xs text-gray-600 font-mono">
                                                        {new Date(entry.created_at).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                            {isAdmin && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(entry.id)}
                                                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HallOfFame;
