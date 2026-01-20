import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, MessageSquare, Clock, Globe } from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import { toast } from 'sonner';

interface GuestEntry {
    id: string;
    name: string;
    message: string;
    date: string;
    location: string;
    avatar_color: string;
}

const AVATAR_COLORS = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500',
    'bg-purple-500', 'bg-yellow-500', 'bg-pink-500',
    'bg-indigo-500', 'bg-orange-500'
];

const Guestbook = () => {
    const [entries, setEntries] = useState<GuestEntry[]>([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { playClick, playSuccess, playWhoosh } = useSound();
    const { t } = useTranslation();

    useEffect(() => {
        const saved = localStorage.getItem('guestbook_entries');
        if (saved) {
            setEntries(JSON.parse(saved));
        } else {
            // Seed data
            const seed: GuestEntry[] = [
                {
                    id: '1',
                    name: "Alex Design",
                    message: "Incredible attention to detail! The animations are buttery smooth.",
                    date: new Date().toLocaleDateString(),
                    location: "New York, USA",
                    avatar_color: 'bg-blue-500'
                },
                {
                    id: '2',
                    name: "DevSarah",
                    message: "Love the React structure. Is the source code available?",
                    date: new Date(Date.now() - 86400000).toLocaleDateString(),
                    location: "London, UK",
                    avatar_color: 'bg-purple-500'
                }
            ];
            setEntries(seed);
            localStorage.setItem('guestbook_entries', JSON.stringify(seed));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        playClick();
        setIsSubmitting(true);

        // Simulate network delay
        setTimeout(() => {
            const newEntry: GuestEntry = {
                id: Date.now().toString(),
                name: name.trim(),
                message: message.trim(),
                date: new Date().toLocaleDateString(),
                location: "Unknown Sector", // Mock location
                avatar_color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]
            };

            const updated = [newEntry, ...entries];
            setEntries(updated);
            localStorage.setItem('guestbook_entries', JSON.stringify(updated));

            setName('');
            setMessage('');
            setIsSubmitting(false);
            playSuccess();
            toast.success("Signature added to the registry!");
        }, 800);
    };

    return (
        <div className="relative min-h-screen bg-background overflow-x-hidden pt-24 md:pt-32">
            <ParticleBackground />
            <Navigation />

            <main className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
                <div className="text-center mb-20">
                    <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">{t('guestbook.subtitle')}</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
                        {t('guestbook.title')}
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        {t('guestbook.description')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-5">
                        <div className="glass-premium p-8 rounded-3xl border border-white/5 sticky top-32">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-primary" />
                                {t('guestbook.sign_registry')}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">{t('guestbook.identify')}</label>
                                    <Input
                                        placeholder={t('guestbook.placeholder_name')}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                        maxLength={20}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">{t('guestbook.transmission')}</label>
                                    <Textarea
                                        placeholder={t('guestbook.placeholder_msg')}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="bg-white/5 border-white/10 text-white focus:border-primary/50 min-h-[120px]"
                                        maxLength={140}
                                    />
                                    <div className="text-right text-[10px] text-gray-600">
                                        {message.length}/140
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !name || !message}
                                    className="w-full bg-primary text-white font-bold tracking-widest uppercase hover:bg-primary/90"
                                >
                                    {isSubmitting ? t('guestbook.transmitting') : t('guestbook.upload')}
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Entries List */}
                    <div className="lg:col-span-7 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {entries.map((entry) => (
                                <motion.div
                                    key={entry.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    layout
                                    className="glass-premium p-6 rounded-2xl border border-white/5 flex gap-4 hover:border-white/10 transition-colors"
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg ${entry.avatar_color}`}>
                                        <span className="text-white font-bold text-lg">
                                            {entry.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-white font-bold">{entry.name}</h4>
                                                <div className="flex items-center gap-3 text-[10px] text-gray-500 font-mono mt-0.5">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {entry.date}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Globe className="w-3 h-3" /> {entry.location}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed text-sm">
                                            "{entry.message}"
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {entries.length === 0 && (
                            <div className="text-center py-20 text-gray-600 font-mono text-sm">
                                No signals detected yet. Be the first.
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Guestbook;
