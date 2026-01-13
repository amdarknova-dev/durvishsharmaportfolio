import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSound } from '@/context/SoundContext';

const ContactCTA = () => {
    const navigate = useNavigate();
    const { playHover, playClick } = useSound();

    return (
        <section className="relative py-32 px-6 overflow-hidden">
            {/* Content */}
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-sm text-gray-300">Open for Opportunities</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
                        Ready to build <br />
                        <span className="text-gradient">something extraordinary?</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        I'm currently available for freelance projects and open to full-time opportunities.
                        Let's discuss how we can bring your vision to life.
                    </p>
                    <Button
                        size="lg"
                        onClick={() => {
                            playClick();
                            window.scrollTo(0, 0);
                            navigate('/contact');
                        }}
                        onMouseEnter={() => playHover()}
                        className="h-16 px-12 text-lg rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:scale-105 group font-bold"
                    >
                        Start a Project
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </div>

            {/* Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50" />
        </section>
    );
};

export default ContactCTA;
