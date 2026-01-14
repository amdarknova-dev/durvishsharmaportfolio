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
    ArrowUpRight,
    AlertCircle
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
import ReCAPTCHA from "react-google-recaptcha";

const FAQItem = ({ number, question, answer }: { number: string; question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { playHover, playClick } = useSound();

    return (
        <div className="border-b border-white/10 overflow-hidden">
            <button
                onClick={() => { playClick(); setIsOpen(!isOpen); }}
                onMouseEnter={() => playHover()}
                className="w-full py-8 flex items-center justify-between text-left group"
            >
                <div className="flex items-center gap-8">
                    <span className="text-sm font-mono text-gray-500">{number}</span>
                    <h3 className="text-xl md:text-2xl font-medium text-white group-hover:text-primary transition-colors">
                        {question}
                    </h3>
                </div>
                <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-primary border-primary rotate-45' : 'group-hover:border-primary'
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
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="pb-8 pl-16 md:pl-20 max-w-2xl">
                            <p className="text-gray-400 text-lg leading-relaxed font-light">
                                {answer}
                            </p>
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
    const { playHover, playClick, playSuccess } = useSound();
    const { sendEmail, isSubmitting: emailSubmitting } = useEmailJS();
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = React.useRef<ReCAPTCHA>(null);

    const captchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // Default is Google Test Key

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
        const phoneError = formData.phone ? validatePhone(formData.phone) : '';

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

        if (!captchaToken) {
            toast({
                title: "Security Check Required",
                description: "Please complete the reCAPTCHA to verify you're human.",
                variant: "destructive"
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
                inquiryType: 'none',
                message: '',
            });
            setErrors({ email: '', phone: '' });
            setMana(0);
            setCaptchaToken(null);
            recaptchaRef.current?.reset();
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

                        <div className="space-y-8">
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
                        <Card className="glass p-8 md:p-12 border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10" />
                            <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-gray-400">First Name</Label>
                                        <Input
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="John"
                                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary/20"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-400">Last Name <span className="text-gray-500 text-sm">(Optional)</span></Label>
                                        <Input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Doe"
                                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary/20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-400">Email Address</Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="john@example.com"
                                        className={`bg-white/5 text-white h-12 rounded-xl focus:ring-primary/20 ${errors.email
                                            ? 'border-red-500/50 focus:border-red-500'
                                            : 'border-white/10 focus:border-primary/50'
                                            }`}
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-red-400 text-sm flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-400">Phone Number <span className="text-gray-500 text-sm">(Optional)</span></Label>
                                    <div className="flex gap-2">
                                        <Select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, countryCode: value }))}
                                        >
                                            <SelectTrigger className="w-[100px] bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary/20">
                                                <SelectValue placeholder="+91" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-black/90 border-white/10 text-white backdrop-blur-xl max-h-60">
                                                <SelectItem value="+91">IN +91</SelectItem>
                                                <SelectItem value="+1">US +1</SelectItem>
                                                <SelectItem value="+44">UK +44</SelectItem>
                                                <SelectItem value="+61">AU +61</SelectItem>
                                                <SelectItem value="+81">JP +81</SelectItem>
                                                <SelectItem value="+49">DE +49</SelectItem>
                                                <SelectItem value="+33">FR +33</SelectItem>
                                                <SelectItem value="+86">CN +86</SelectItem>
                                                <SelectItem value="+971">AE +971</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="00000 00000"
                                            className={`bg-white/5 text-white h-12 rounded-xl focus:ring-primary/20 flex-1 ${errors.phone
                                                ? 'border-red-500/50 focus:border-red-500'
                                                : 'border-white/10 focus:border-primary/50'
                                                }`}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-red-400 text-sm flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-400">Inquiry Type</Label>
                                    <Select
                                        name="inquiryType"
                                        value={formData.inquiryType}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, inquiryType: value }))}
                                    >
                                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary/20">
                                            <SelectValue placeholder="Select an option" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-black/90 border-white/10 text-white backdrop-blur-xl">
                                            <SelectItem value="none">General Inquiry (None)</SelectItem>
                                            <SelectItem value="game">Game Development</SelectItem>
                                            <SelectItem value="website">Website Development</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <Label className="text-gray-400">Transmission Content</Label>
                                        <div className="flex flex-col items-end">
                                            <span className={`text-[10px] uppercase font-mono tracking-widest ${mana > 60 ? 'text-green-400' : mana > 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                Signal Strength: {mana > 60 ? 'OPTIMAL' : mana > 30 ? 'STABLE' : 'WEAK'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <div className={`absolute -inset-0.5 rounded-xl blur opacity-20 transition duration-500 group-hover:opacity-40 ${mana > 60 ? 'bg-green-500' : mana > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                        <Textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Initialize data transmission..."
                                            className="bg-black/40 border-white/10 text-white min-h-[150px] rounded-xl focus:ring-0 focus:border-white/30 resize-none z-10 relative font-mono text-sm leading-relaxed"
                                            maxLength={500}
                                            required
                                        />

                                        {/* HUD Elements */}
                                        <div className="absolute top-2 right-2 flex gap-1">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className={`w-1 h-1 rounded-full ${mana > 0 ? 'bg-white/50 animate-pulse' : 'bg-white/10'}`} />
                                            ))}
                                        </div>

                                        {/* Mana Bar Indicator */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-900/50 rounded-b-xl overflow-hidden flex">
                                            {/* Segmented Bar */}
                                            {Array.from({ length: 10 }).map((_, i) => (
                                                <div key={i} className="flex-1 border-r border-black/20 last:border-0 relative">
                                                    <div
                                                        className={`absolute inset-0 transition-all duration-300 ${(mana / 10) > i
                                                            ? (mana > 60 ? 'bg-green-500' : mana > 30 ? 'bg-yellow-500' : 'bg-red-500')
                                                            : 'bg-transparent'
                                                            } ${(mana / 10) > i ? 'opacity-100' : 'opacity-0'}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-600 font-mono pt-1">
                                        <span>BYTES: {formData.message.length}/500</span>
                                        <span>{(mana).toFixed(0)}% CHARGE</span>
                                    </div>
                                </div>

                                {/* reCAPTCHA */}
                                <div className="flex justify-center pt-2">
                                    <div className="rounded-xl overflow-hidden border border-white/10 glass p-1">
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={captchaSiteKey}
                                            onChange={(token) => setCaptchaToken(token)}
                                            theme="dark"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={emailSubmitting || isTransmitting}
                                    onMouseEnter={() => playHover()}
                                    onClick={() => playClick()}
                                    className={`w-full h-14 rounded-xl text-lg font-bold transition-all duration-500 relative overflow-hidden group ${emailSubmitting || isTransmitting ? 'bg-primary' : 'bg-white/5 hover:bg-white/10 border border-white/10'
                                        }`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`} />

                                    <span className="relative flex items-center justify-center gap-3">
                                        {emailSubmitting || isTransmitting ? (
                                            <>
                                                <span className="animate-pulse">TRANSMITTING...</span>
                                            </>
                                        ) : (
                                            <>
                                                INITIATE UPLINK <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                </Button>
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
                                <a href="https://instagram.com/durvish_sharma.22.23" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHover()} onClick={() => playClick()} className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:text-primary transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="https://x.com/durvishsharma01" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHover()} onClick={() => playClick()} className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:text-primary transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="https://www.linkedin.com/in/durvish-sharma-a936b93a5" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHover()} onClick={() => playClick()} className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:text-primary transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="https://github.com/amdarknova-dev" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHover()} onClick={() => playClick()} className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:text-primary transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Luxury FAQ Section (Anantara Style) */}
                <section className="mb-32">
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32">
                        {/* Left Column: Title & Intro */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-5xl md:text-6xl font-serif italic text-white tracking-tight">Questions</h2>
                            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-sm">
                                Have more specific queries? Feel free to reach out directly if your question isn't covered here.
                            </p>
                            <Button variant="link" className="text-primary p-0 h-auto text-lg group items-center gap-2">
                                Contact Support
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>

                        {/* Right Column: Numbered Accordions */}
                        <div className="space-y-px">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    number={String(index + 1).padStart(2, '0')}
                                    question={faq.question}
                                    answer={faq.answer}
                                />
                            ))}
                        </div>
                    </div>
                </section>
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
