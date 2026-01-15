import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Linkedin, ShieldCheck, Activity } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useSound } from '@/context/SoundContext';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    text: string;
    linkedin?: string;
}

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { playClick, playHover } = useSound();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const testimonials: Testimonial[] = [
        {
            id: '1',
            name: 'Sarah Chen',
            role: 'Product Manager',
            company: 'TechCorp Inc.',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
            text: "Durvish's attention to detail and ability to translate complex requirements into beautiful, functional interfaces is exceptional. The dashboard he built for us exceeded all expectations.",
            linkedin: 'https://linkedin.com'
        },
        {
            id: '2',
            name: 'Michael Rodriguez',
            role: 'CTO',
            company: 'StartupXYZ',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
            text: "Working with Durvish was a game-changer for our project. His expertise in React and Three.js brought our vision to life with stunning 3D visualizations.",
            linkedin: 'https://linkedin.com'
        },
        {
            id: '3',
            name: 'Emily Thompson',
            role: 'Design Lead',
            company: 'Creative Studios',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80',
            text: "Durvish has an incredible eye for design and the technical skills to execute it perfectly. The e-commerce platform he developed is not only beautiful but also performs flawlessly.",
            linkedin: 'https://linkedin.com'
        }
    ];

    const nextTestimonial = () => {
        playClick();
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        playClick();
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section id="testimonials" ref={sectionRef} className="relative py-32 px-6 bg-black overflow-hidden">
            {/* Background HUD Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary rounded-full animate-pulse" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1 }}
                        className="space-y-4"
                    >
                        <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] block">Verified Authentications</span>
                        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
                            Client <br />
                            <span className="text-gradient">Transmissions</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            {/* Cinematic Quote Display */}
                            <div className="flex flex-col items-center">
                                {/* Digital ID / Avatar */}
                                <div className="relative mb-16 group">
                                    <div className="w-32 h-32 rounded-full border-2 border-white/10 p-1 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                        <img
                                            src={currentTestimonial.image}
                                            alt={currentTestimonial.name}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                        {/* Scanner Line */}
                                        <motion.div
                                            animate={{ top: ['0%', '100%', '0%'] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 w-full h-[2px] bg-primary/80 shadow-[0_0_8px_primary] z-20 pointer-events-none"
                                        />
                                        {/* Overlay Overlay */}
                                        <div className="absolute inset-0 bg-primary/10 opacity-30 mix-blend-overlay" />
                                    </div>

                                    {/* Verification Badge */}
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-black border border-primary rounded-full flex items-center justify-center text-primary shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* The Quote */}
                                <div className="text-center space-y-8 relative">
                                    <Quote className="absolute -top-12 -left-8 w-24 h-24 text-primary/5 -z-10" />
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                        className="text-3xl md:text-5xl lg:text-6xl text-white font-serif italic font-light leading-[1.1] tracking-tight max-w-4xl mx-auto px-4"
                                    >
                                        "{currentTestimonial.text}"
                                    </motion.p>

                                    <div className="pt-8 space-y-2">
                                        <p className="text-2xl font-bold text-white tracking-widest uppercase">{currentTestimonial.name}</p>
                                        <p className="text-primary font-mono text-[10px] tracking-[0.3em] uppercase">
                                            {currentTestimonial.role} <span className="text-gray-600 mx-2">//</span> {currentTestimonial.company}
                                        </p>
                                    </div>

                                    {currentTestimonial.linkedin && (
                                        <motion.a
                                            whileHover={{ scale: 1.1 }}
                                            href={currentTestimonial.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors pt-6"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">View Verified Profile</span>
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controll */}
                    <div className="flex items-center justify-center gap-12 mt-20">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={prevTestimonial}
                            onMouseEnter={() => playHover()}
                            className="w-16 h-16 rounded-full border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                        </Button>

                        <div className="flex gap-4">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        playClick();
                                        setCurrentIndex(index);
                                    }}
                                    className={`h-1 transition-all duration-500 rounded-full ${index === currentIndex
                                        ? 'w-12 bg-primary'
                                        : 'w-4 bg-white/10 hover:bg-white/20'
                                        }`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={nextTestimonial}
                            onMouseEnter={() => playHover()}
                            className="w-16 h-16 rounded-full border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                        </Button>
                    </div>
                </div>

                {/* Sub-stats HUD */}
                <div className="grid md:grid-cols-3 gap-8 mt-32 border-t border-white/5 pt-16">
                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">Pulse Rate</p>
                            <p className="text-white font-bold text-lg tracking-tighter">98.4% RETENTION</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">Trust Index</p>
                            <p className="text-white font-bold text-lg tracking-tighter">VETTING SECURE</p>
                        </div>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-gray-700 text-[10px] font-mono uppercase tracking-widest leading-loose">
                            ENCRYPTION: AES-256 <br />
                            STATUS: ENLIGHTENED
                        </p>
                    </div>
                </div>
            </div>

            {/* Background Glows */}
            <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10" />
        </section>
    );
};

export default Testimonials;
