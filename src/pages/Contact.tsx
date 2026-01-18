import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    Users,
    Lightbulb,
    Globe,
    Instagram,
    Twitter,
    Linkedin,
    Github,
    Plus,
    ArrowUpRight
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useSound } from '@/context/SoundContext';
import { useEmailJS } from '@/lib/emailjs';
import Magnetic from '@/components/Magnetic';

const FAQItem = ({ number, question, answer }: { number: string; question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { playHover, playClick } = useSound();

    return (
        <div className={`transition-all duration-700 rounded-[2rem] overflow-hidden ${isOpen ? 'glass-premium border border-primary/20 bg-primary/[0.02]' : 'border-b border-white/5 hover:bg-white/[0.01]'
            }`}>
            <button
                onClick={() => { playClick(); setIsOpen(!isOpen); }}
                onMouseEnter={() => playHover()}
                className="w-full py-10 px-8 flex items-center justify-between text-left group"
            >
                <div className="flex items-center gap-10">
                    <span className="text-[10px] font-mono text-gray-600 tracking-[0.3em] font-bold">{number}</span>
                    <h3 className={`text-xl md:text-2xl font-bold tracking-tight uppercase transition-all duration-500 ${isOpen ? 'text-primary' : 'text-white group-hover:text-primary'
                        }`}>
                        {question}
                    </h3>
                </div>
                <div className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-700 shrink-0 ${isOpen ? 'bg-primary border-primary rotate-[135deg] shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'group-hover:border-primary group-hover:bg-primary/5'
                    }`}>
                    <Plus className={`w-5 h-5 transition-colors ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="pb-10 pl-24 pr-12 max-w-4xl">
                            <p className="text-gray-400 text-lg leading-relaxed font-light">
                                {answer}
                            </p>
                            {/* Subtle HUD Detail */}
                            <div className="mt-8 flex gap-2">
                                <div className="h-0.5 w-12 bg-primary/30" />
                                <div className="h-0.5 w-2 bg-primary/30" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        countryCode: '+91',
        email: '',
        phone: '',
        jobTitle: '',
        inquiryType: 'none',
        message: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mana, setMana] = useState(0); // For gamified input
    const [isTransmitting, setIsTransmitting] = useState(false);
    const { toast } = useToast();
    const { playHover, playClick, playSuccess, playType } = useSound();
    const { sendEmail, isSubmitting: emailSubmitting } = useEmailJS();
    const [captchaToken, setCaptchaToken] = useState<string | null>("skipped"); // Skipped


    const faqs = [
        {
            question: "What kind of developer are you?",
            answer: "I am a Creative Frontend Developer focusing on building modern, interactive, and high-performance web experiences."
        },
        {
            question: "What technologies do you work with?",
            answer: "I specialize in React, TypeScript, Framer Motion, Tailwind CSS, Next.js, and Three.js for interactive experiences."
        },
        {
            question: "Are you open to freelance or full-time opportunities?",
            answer: "Yes, I'm currently open to both freelance projects and full-time opportunities at forward-thinking companies."
        },
        {
            question: "What type of projects do you usually take on?",
            answer: "I handle everything from high-conversion landing pages and SaaS dashboards to complex 3D web experiences."
        },
        {
            question: "Can you work with designers or teams?",
            answer: "Absolutely. I thrive in collaborative environments and pride myself on bridging the gap between design vision and technical implementation."
        },
        {
            question: "Do you only work on frontend?",
            answer: "While frontend is my core expertise, I have experience with full-stack environments and can navigate backend systems when needed."
        },
        {
            question: "Are you willing to learn new technologies?",
            answer: "Always. The tech landscape evolves constantly, and I spend a significant portion of my time researching and adopting new tools."
        },
        {
            question: "How can someone contact you?",
            answer: "You can use the form above, email me directly, or connect with me on LinkedIn/Twitter. I usually respond within 24 hours."
        },
        {
            question: "Are your projects personal or client-based?",
            answer: "My portfolio features a curated mix of client work and deep-dive personal experiments that showcase my range."
        },
        {
            question: "What are you currently focused on improving?",
            answer: "I'm currently deepening my knowledge of WebGL, GLSL shaders, and more complex physics-based animations."
        },
        {
            question: "Are you available for collaboration?",
            answer: "Yes! If you have an interesting idea or project, I'd love to hear about it. Let's build something amazing together."
        }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const validateEmail = (email: string): string => {
        if (!email) return '';
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const validatePhone = (phone: string): string => {
        if (!phone) return '';
        // Remove all non-digit characters for validation
        const digitsOnly = phone.replace(/\D/g, '');

        // Check if it contains only digits and common phone characters
        const phoneRegex = /^[\d\s\-+()]+$/;
        if (!phoneRegex.test(phone)) {
            return 'Phone number can only contain digits, spaces, +, -, ( )';
        }

        // Check length (minimum 10 digits, maximum 15)
        if (digitsOnly.length < 10) {
            return 'Phone number must be at least 10 digits';
        }
        if (digitsOnly.length > 15) {
            return 'Phone number cannot exceed 15 digits';
        }

        return '';
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        playType();

        // Real-time validation
        if (name === 'email') {
            const error = validateEmail(value);
            setErrors(prev => ({ ...prev, email: error }));
        } else if (name === 'phone') {
            const error = validatePhone(value);
            setErrors(prev => ({ ...prev, phone: error }));
        }

        if (name === 'message') {
            // Calculate mana based on length (max 500 chars)
            const newMana = Math.min((value.length / 500) * 100, 100);
            setMana(newMana);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields before submission
        const emailError = validateEmail(formData.email);
        const phoneError = validatePhone(formData.phone);

        if (emailError || phoneError) {
            setErrors({
                email: emailError,
                phone: phoneError,
            });
            toast({
                title: "Validation Error",
                description: "Please fix the errors in the form before submitting.",
                variant: "destructive",
                duration: 3000,
            });
            return;
        }



        playSuccess(); // Play Warp Sound
        setIsTransmitting(true); // Trigger visual warp

        // Wait for animation start (500ms)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Send email using EmailJS
        const success = await sendEmail(formData);

        // Wait for animation completion (1.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsTransmitting(false);

        if (success) {
            // Clear form on success
            setFormData({
                firstName: '',
                lastName: '',
                countryCode: '+91',
                email: '',
                phone: '',
                jobTitle: '',
                inquiryType: 'none',
                message: '',
            });
            setErrors({ email: '', phone: '' });
            setMana(0);
            setCaptchaToken(null);
        }
    };

    const supportChannels = [
        {
            title: "Technical Support",
            description: "Need help with a technical implementation or bug report?",
            email: "support@durvish.dev",
            icon: MessageSquare
        },
        {
            title: "Collaboration",
            description: "Interested in working together on a project?",
            email: "collab@durvish.dev",
            icon: Users
        },
        {
            title: "General Inquiries",
            description: "Any other questions or just want to say hi?",
            email: "hello@durvish.dev",
            icon: Lightbulb
        }
    ];

    return (
        <div className="relative min-h-screen bg-background overflow-x-hidden pt-24 md:pt-32 lg:pt-40">
            <ParticleBackground />
            <Navigation />

            <main className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-16 mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter text-white">
                            Contact <span className="text-gradient">Us</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-lg mb-12 leading-relaxed">
                            Have a project in mind or just want to chat? Fill out the form and I'll get back to you within 24 hours.
                        </p>

                        <div className="hidden lg:block space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-widest">Email me at</p>
                                    <p className="text-white font-medium select-text">durvishsharma23221@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-widest">Call me at</p>
                                    <p className="text-white font-medium select-text">+91 98177 15454</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Card className="glass p-8 md:p-12 border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-700" />
                            <h2 className="text-3xl font-bold text-white mb-12 uppercase tracking-tighter">Initialize Transmission</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {/* First Name */}
                                    <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                                        <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">First name</label>
                                        <input
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full bg-transparent border-none p-0 text-white focus:outline-none focus:ring-0 text-lg font-light placeholder:text-gray-700"
                                            placeholder="Thien"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                                        <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Last name</label>
                                        <input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full bg-transparent border-none p-0 text-white focus:outline-none focus:ring-0 text-lg font-light placeholder:text-gray-700"
                                            placeholder="Le"
                                        />
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div className={`bg-[#1a1a1a] border rounded-2xl p-5 focus-within:ring-1 focus-within:ring-primary/30 transition-all ${errors.email ? 'border-red-500/30' : 'border-white/5'}`}>
                                    <label className={`block text-[10px] font-mono uppercase tracking-widest mb-1 ${errors.email ? 'text-red-400' : 'text-gray-500'}`}>Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-none p-0 text-white focus:outline-none focus:ring-0 text-lg font-light placeholder:text-gray-700"
                                        placeholder="lethien@tayato.com"
                                    />
                                    {errors.email && <p className="mt-2 text-[10px] text-red-400 uppercase tracking-tight font-mono">{errors.email}</p>}
                                </div>

                                {/* Project Type Select */}
                                <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                                    <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Project Type *</label>
                                    <Select
                                        name="jobTitle"
                                        value={formData.jobTitle}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, jobTitle: value }))}
                                    >
                                        <SelectTrigger className="bg-transparent border-none p-0 text-white h-auto rounded-none focus:ring-0 text-lg font-light">
                                            <SelectValue placeholder="Select project type" />
                                        </SelectTrigger>
                                        <SelectContent className="glass-dark border-white/10 text-white">
                                            <SelectItem value="game">🎮 Game Development</SelectItem>
                                            <SelectItem value="web">🌐 Web Development</SelectItem>
                                            <SelectItem value="mobile">📱 Mobile Development</SelectItem>
                                            <SelectItem value="anime">🎬 Anime Project</SelectItem>
                                            <SelectItem value="fullstack">⚡ Full Stack</SelectItem>
                                            <SelectItem value="other">💼 Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-[120px_1fr] gap-4">
                                    <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                                        <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Code</label>
                                        <Select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, countryCode: value }))}
                                        >
                                            <SelectTrigger className="bg-transparent border-none p-0 text-white h-auto rounded-none focus:ring-0 text-lg font-light">
                                                <SelectValue placeholder="+91" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-dark border-white/10 text-white max-h-60">
                                                <SelectItem value="+91">🇮🇳 +91</SelectItem>
                                                <SelectItem value="+1">🇺🇸 +1</SelectItem>
                                                <SelectItem value="+44">🇬🇧 +44</SelectItem>
                                                <SelectItem value="+971">🇦🇪 +971</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className={`bg-[#1a1a1a] border rounded-2xl p-5 focus-within:ring-1 focus-within:ring-primary/30 transition-all ${errors.phone ? 'border-red-500/30' : 'border-white/5'}`}>
                                        <label className={`block text-[10px] font-mono uppercase tracking-widest mb-1 ${errors.phone ? 'text-red-400' : 'text-gray-500'}`}>Phone *</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-transparent border-none p-0 text-white focus:outline-none focus:ring-0 text-lg font-light placeholder:text-gray-700"
                                            placeholder="000000000"
                                        />
                                        {errors.phone && <p className="mt-2 text-[10px] text-red-400 uppercase tracking-tight font-mono">{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                                    <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Add a comment</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={3}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-none p-0 text-white focus:outline-none focus:ring-0 text-lg font-light resize-none placeholder:text-gray-700"
                                        placeholder="Describe your vision..."
                                    />
                                </div>

                                <div className="pt-6">
                                    <Magnetic intensity={0.5}>
                                        <Button
                                            type="submit"
                                            disabled={emailSubmitting || isTransmitting}
                                            className="w-full h-16 bg-white hover:bg-white/90 text-black rounded-full text-lg font-bold transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50"
                                        >
                                            {emailSubmitting || isTransmitting ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                    <span>Transmitting...</span>
                                                </div>
                                            ) : (
                                                "Send contact request"
                                            )}
                                        </Button>
                                    </Magnetic>
                                </div>
                            </form>

                            <div className="mt-8 text-center">
                                <Link to="/beyond-work" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                                    Interested in my creative side projects?
                                    <span className="text-primary underline-offset-4 group-hover:underline">Visit Beyond Work</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Secondary Sections - Hidden on Mobile */}
                <div className="hidden lg:block">
                    {/* Support Channels */}
                    <div className="grid md:grid-cols-3 gap-8 mb-32">
                        {supportChannels.map((channel, index) => (
                            <motion.div
                                key={channel.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="glass p-8 border-white/10 hover:border-primary/30 transition-all duration-300">
                                    <channel.icon className="w-10 h-10 text-primary mb-6" />
                                    <h3 className="text-xl font-bold text-white mb-4">{channel.title}</h3>
                                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">{channel.description}</p>
                                    <a href={`mailto:${channel.email}`} className="text-primary font-medium hover:underline select-text">
                                        {channel.email}
                                    </a>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Location Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-12 items-center bg-white/5 rounded-[2rem] p-8 md:p-16 border border-white/10 mb-40"
                    >
                        <div className="aspect-video bg-gray-900 rounded-3xl overflow-hidden relative border border-white/10">
                            {/* Simple Map Placeholder with aesthetic styling */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                <Globe className="w-24 h-24 text-white/20 animate-pulse" />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="w-6 h-6 bg-primary rounded-full animate-ping" />
                                <div className="w-6 h-6 bg-primary rounded-full absolute top-0" />
                            </div>
                        </div>
                        <div className="space-y-6 lg:pl-12">
                            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Our Headquarters</h2>
                            <p className="text-gray-400 text-lg font-light leading-relaxed">
                                Working primarily remotely, but available for meetings in person across Haryana and the Delhi-NCR region.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 text-primary mt-1" />
                                    <div>
                                        <p className="text-white font-medium">Haryana, India</p>
                                        <p className="text-gray-500 text-sm">Industrial Hub Center, Sector 12</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <Magnetic intensity={0.3}>
                                        <a href="https://instagram.com/durvish_sharma.22.23" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHover()} onClick={() => playClick()} className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:text-primary transition-colors">
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                    </Magnetic>
                                    <Magnetic intensity={0.3}>
                                        <a href="https://x.com/durvishsharma01" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHover()} onClick={() => playClick()} className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:text-primary transition-colors">
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                    </Magnetic>
                                    <Magnetic intensity={0.3}>
                                        <a href="https://www.linkedin.com/in/durvish-sharma-a936b93a5" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHover()} onClick={() => playClick()} className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:text-primary transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                    </Magnetic>
                                    <Magnetic intensity={0.3}>
                                        <a href="https://github.com/amdarknova-dev" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHover()} onClick={() => playClick()} className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:text-primary transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                    </Magnetic>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Luxury FAQ Section - Refined Minimal */}
                    <section className="mb-48">
                        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-24 lg:gap-32">
                            {/* Left Column: Title & Intro */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="space-y-10"
                            >
                                <div className="space-y-4">
                                    <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] block">Support</span>
                                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                                        Common <br />
                                        <span className="text-gradient">Logic</span>
                                    </h2>
                                </div>
                                <p className="text-gray-500 text-lg font-light leading-relaxed max-w-sm">
                                    Explore established transmission protocols and common procedural inquiries.
                                </p>
                                <div className="pt-4">
                                    <Button variant="link" className="text-white hover:text-primary transition-colors p-0 h-auto text-sm uppercase tracking-[0.2em] font-bold group items-center gap-4">
                                        Contact Support
                                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all">
                                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </div>
                                    </Button>
                                </div>
                            </motion.div>

                            {/* Right Column: Refined Accordions */}
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                    >
                                        <FAQItem
                                            number={String(index + 1).padStart(2, '0')}
                                            question={faq.question}
                                            answer={faq.answer}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />

            <AnimatePresence>
                {isTransmitting && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Warp Lines */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] z-10" />
                            {Array.from({ length: 20 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute top-1/2 left-1/2 w-[200vw] h-[2px] bg-blue-500 shadow-[0_0_20px_#3b82f6]"
                                    initial={{
                                        x: "-50%",
                                        y: "-50%",
                                        rotate: i * 18,
                                        scaleX: 0,
                                        opacity: 0
                                    }}
                                    animate={{
                                        scaleX: [0, 5, 20],
                                        opacity: [0, 1, 0],
                                        width: ["0%", "50%", "200%"]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: Math.random() * 0.5,
                                        ease: "circIn"
                                    }}
                                    style={{ transformOrigin: "center" }}
                                />
                            ))}
                        </div>

                        {/* Central Burst */}
                        <motion.div
                            className="w-4 h-4 bg-white rounded-full shadow-[0_0_100px_50px_rgba(59,130,246,0.5)] z-20"
                            animate={{ scale: [1, 50, 150], opacity: [1, 1, 0] }}
                            transition={{ duration: 1.5, ease: "circIn" }}
                        />

                        <div className="absolute bottom-20 text-center z-30">
                            <motion.h2
                                className="text-4xl font-black text-white tracking-[1em] uppercase"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 2, times: [0, 0.2, 1] }}
                            >
                                TRANSMITTING
                            </motion.h2>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default Contact;
