import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { motion } from 'framer-motion';
import { GitCommit, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

const changes = [
    {
        version: "v2.1.0",
        date: "2026-01-19",
        title: "System Core Upgrade",
        type: "major",
        items: [
            "Implemented 'The Neural Brain' AI Chatbot for interactive Q&A.",
            "Deployed 'Nova' Voice Assistant System (Beta).",
            "Added System Control Panel for global audio/graphics settings.",
            "Integrated 'Command Center' (Cmd+K) for rapid navigation.",
            "Launched 'The Lab' experimental WebGL playground."
        ]
    },
    {
        version: "v2.0.4",
        date: "2026-01-15",
        title: "Performance & Localization",
        type: "feature",
        items: [
            "Added full i18n support for 12 languages.",
            "Optimized mobile rendering pipeline (disabled heavy particles on mobile).",
            "Implemented custom cursor system with 'God Mode' trails.",
            "Added 'Floating Shapes' background dynamics."
        ]
    },
    {
        version: "v1.5.0",
        date: "2026-01-10",
        title: "Visual Overhaul",
        type: "feature",
        items: [
            "Redesigned Hero Section with 'Director Mode' cinematic camera.",
            "Added 'Holographic' tilt effect to project cards.",
            "Integrated gravity-based physics simulations.",
            "Enhanced typography with 'Space Grotesk' & 'JetBrains Mono'."
        ]
    },
    {
        version: "v1.0.0",
        date: "2025-12-01",
        title: "Initial Launch",
        type: "major",
        items: [
            "Core portfolio architecture deployed.",
            "Basic project showcase and contact form.",
            "Responsive layout implementation."
        ]
    }
];

const Changelog = () => {
    const { t } = useTranslation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative min-h-screen bg-background overflow-x-hidden pt-24 md:pt-32">
            <ParticleBackground />
            <Navigation />

            <main className="relative z-10 max-w-4xl mx-auto px-6 pb-32">
                <div className="text-center mb-20">
                    <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">{t('changelog.subtitle')}</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
                        {t('changelog.title')}
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        {t('changelog.description')}
                    </p>
                </div>

                <div className="space-y-16 relative">
                    {/* Time Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

                    {changes.map((log, index) => (
                        <motion.div
                            key={log.version}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative md:pl-24"
                        >
                            {/* Version Node */}
                            <div className="absolute left-8 top-8 w-3 h-3 rounded-full bg-black border-2 border-primary -translate-x-1.5 hidden md:block z-10">
                                {index === 0 && <div className="absolute inset-0 animate-ping bg-primary rounded-full opacity-50" />}
                            </div>

                            <div className="glass-premium p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-4">
                                        <Badge variant={log.type === 'major' ? 'default' : 'outline'} className="text-xs px-3 py-1 font-mono uppercase tracking-widest">
                                            {log.version}
                                        </Badge>
                                        <span className="text-gray-500 font-mono text-xs">{log.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-primary">
                                        <GitCommit className="w-4 h-4" />
                                        <span className="text-[10px] font-mono uppercase tracking-widest">{log.title}</span>
                                    </div>
                                </div>

                                <ul className="space-y-4">
                                    {log.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm font-light leading-relaxed">
                                            <CheckCircle2 className="w-4 h-4 text-green-500/50 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Changelog;
