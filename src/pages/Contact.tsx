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
    Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const FAQItem = ({ number, question, answer }: { number: string; question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
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
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    access_key: 'a13b7359-c155-42a5-90bc-67fbd016acad',
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    from_name: "Durvish Portfolio",
                    subject: `New Snappy Contact from ${formData.firstName}`,
                }),
            });

            const result = await response.json();
            if (result.success) {
                toast({
                    title: "Message Sent Successfully!",
                    description: "I'll get back to you as soon as possible.",
                    duration: 5000,
                });
                setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: "Please try again or email me directly.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
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
        <div className="relative min-h-screen bg-background overflow-x-hidden pt-32">
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
                                        <Label className="text-gray-400">Last Name</Label>
                                        <Input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Doe"
                                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary/20"
                                            required
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
                                        className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary/20"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-400">Phone Number</Label>
                                    <Input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+91 00000 00000"
                                        className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label className="text-gray-400">Message</Label>
                                        <span className="text-xs text-gray-600">{formData.message.length}/500</span>
                                    </div>
                                    <Textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Tell me about your project..."
                                        className="bg-white/5 border-white/10 text-white min-h-[150px] rounded-xl focus:ring-primary/20 resize-none"
                                        maxLength={500}
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-xl text-lg font-bold transition-all duration-300 transform active:scale-95"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
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
                                <a href="https://instagram.com/durvish_sharma.22.23" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:text-primary transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="https://x.com/durvishsharma01" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:text-primary transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="https://www.linkedin.com/in/durvish-sharma-a936b93a5" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:text-primary transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="https://github.com/amdarknova-dev" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:text-primary transition-colors">
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
        </div >
    );
};

export default Contact;
