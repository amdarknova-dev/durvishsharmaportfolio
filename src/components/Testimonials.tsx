import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Linkedin, Building2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useSound } from '@/context/SoundContext';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    rating: number;
    text: string;
    date: string;
    linkedin?: string;
}

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { playClick, playHover } = useSound();

    const testimonials: Testimonial[] = [
        {
            id: '1',
            name: 'Sarah Chen',
            role: 'Product Manager',
            company: 'TechCorp Inc.',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
            rating: 5,
            text: "Durvish's attention to detail and ability to translate complex requirements into beautiful, functional interfaces is exceptional. The dashboard he built for us exceeded all expectations and significantly improved our user engagement.",
            date: '2024-01-15',
            linkedin: 'https://linkedin.com'
        },
        {
            id: '2',
            name: 'Michael Rodriguez',
            role: 'CTO',
            company: 'StartupXYZ',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
            rating: 5,
            text: "Working with Durvish was a game-changer for our project. His expertise in React and Three.js brought our vision to life with stunning 3D visualizations. Highly recommend for any complex web development needs.",
            date: '2023-12-10',
            linkedin: 'https://linkedin.com'
        },
        {
            id: '3',
            name: 'Emily Thompson',
            role: 'Design Lead',
            company: 'Creative Studios',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80',
            rating: 5,
            text: "Durvish has an incredible eye for design and the technical skills to execute it perfectly. The e-commerce platform he developed is not only beautiful but also performs flawlessly. A true professional!",
            date: '2023-11-20',
            linkedin: 'https://linkedin.com'
        },
        {
            id: '4',
            name: 'James Wilson',
            role: 'Founder & CEO',
            company: 'InnovateLab',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
            rating: 5,
            text: "Durvish delivered our landing page ahead of schedule with exceptional quality. His understanding of modern web technologies and user experience design is outstanding. We've seen a 40% increase in conversions!",
            date: '2023-10-05',
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
        <section id="testimonials" className="relative py-32 px-6 bg-[#050505] overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
                        Client Feedback
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white">
                        What <span className="text-gradient">People Say</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Don't just take my word for it. Here's what clients and colleagues have to say about working with me.
                    </p>
                </motion.div>

                {/* Main Testimonial Card */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="glass p-8 md:p-12 border-white/10 relative overflow-hidden">
                                {/* Quote Icon */}
                                <div className="absolute top-8 right-8 opacity-10">
                                    <Quote className="w-32 h-32 text-primary" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Rating */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                        ))}
                                    </div>

                                    {/* Testimonial Text */}
                                    <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 italic">
                                        "{currentTestimonial.text}"
                                    </blockquote>

                                    {/* Author Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                                                <img
                                                    src={currentTestimonial.image}
                                                    alt={currentTestimonial.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-[#050505]">
                                                <Building2 className="w-3 h-3 text-black" />
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-white">
                                                {currentTestimonial.name}
                                            </h4>
                                            <p className="text-sm text-gray-400">
                                                {currentTestimonial.role} at {currentTestimonial.company}
                                            </p>
                                            <p className="text-xs text-gray-600 font-mono mt-1">
                                                {new Date(currentTestimonial.date).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>

                                        {currentTestimonial.linkedin && (
                                            <a
                                                href={currentTestimonial.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 flex items-center justify-center transition-all group"
                                            >
                                                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                            </Card>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevTestimonial}
                            onMouseEnter={() => playHover()}
                            className="w-12 h-12 rounded-full glass border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>

                        {/* Dots Indicator */}
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        playClick();
                                        setCurrentIndex(index);
                                    }}
                                    onMouseEnter={() => playHover()}
                                    className={`transition-all ${index === currentIndex
                                            ? 'w-8 h-2 bg-primary'
                                            : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                                        } rounded-full`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextTestimonial}
                            onMouseEnter={() => playHover()}
                            className="w-12 h-12 rounded-full glass border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
                >
                    {[
                        { label: 'Happy Clients', value: '15+' },
                        { label: 'Projects Completed', value: '30+' },
                        { label: 'Avg. Rating', value: '5.0' },
                        { label: 'Response Time', value: '< 24h' }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center p-6 glass rounded-2xl border border-white/10"
                        >
                            <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                {stat.value}
                            </p>
                            <p className="text-sm text-gray-400 uppercase tracking-widest font-mono">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Background Effects */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
        </section>
    );
};

export default Testimonials;
