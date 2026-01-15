import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle, Instagram, Facebook, MessageSquare, X, FileText, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
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

    setIsSubmitting(true);

    try {
      // Using Web3Forms API - Get your free access key from https://web3forms.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'a13b7359-c155-42a5-90bc-67fbd016acad', // Replace with your actual key
          name: formData.name,
          email: formData.email,
          job_title: formData.jobTitle || 'Not provided',
          message: formData.message,
          from_name: "Durvish Portfolio",
          subject: `New Contact Form Submission from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent! ✓",
          description: "Thank you for reaching out. I'll get back to you soon!",
          duration: 5000,
        });
        // Reset form
        setFormData({ name: '', email: '', phone: '', jobTitle: '', message: '' });
        setErrors({ email: '', phone: '' });
      } else {
        console.error('Web3Forms Error:', result);
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      const err = error as Error;
      console.error('Contact Form Error:', error);
      toast({
        title: "Oops! Something went wrong",
        description: err.message || "Please try again or email me directly at durvishsharma23221@gmail.com",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'durvishsharma23221@gmail.com',
      href: 'mailto:durvishsharma23221@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Haryana, India',
      href: '#',
    },
    {
      icon: MessageSquare,
      label: 'Discord',
      value: 'darknova001.hd',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/durvish_sharma.22.23',
      color: 'hover:text-pink-400',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61585366571097',
      color: 'hover:text-blue-500',
    },
    {
      icon: Twitter,
      label: 'X',
      href: 'https://x.com/durvishsharma01',
      color: 'hover:text-gray-300',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/durvish-sharma-a936b93a5',
      color: 'hover:text-blue-400',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/amdarknova-dev',
      color: 'hover:text-gray-300',
    },
  ];

  // Popup Modal Component
  const PolicyModal = ({ isOpen, onClose, title, icon: Icon, children }: { isOpen: boolean; onClose: () => void; title: string; icon: any; children: React.ReactNode }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl max-h-[80vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar text-gray-300 space-y-4">
              {children}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/5">
              <Button onClick={onClose} className="w-full bg-white text-black hover:bg-white/90 rounded-xl h-12 font-bold">
                I Understand
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>,
      document.body
    );
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6 bg-gradient-to-b from-background to-primary/5 scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Get In</span> <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
            Let's build something amazing together. Open for freelance projects, collaborations, and full-time opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <Card className={`glass p-10 border-white/5 transition-all duration-1000 delay-200 overflow-hidden relative group ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-700" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Input */}
                <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                  <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Your Name</label>
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none p-0 text-white focus:outline-none focus:ring-0 text-lg font-light placeholder:text-gray-700"
                    placeholder="Durvish Sharma"
                  />
                </div>

                {/* Email Input */}
                <div className={`bg-[#1a1a1a] border rounded-2xl p-5 focus-within:ring-1 focus-within:ring-primary/30 transition-all ${errors.email ? 'border-red-500/30' : 'border-white/5'}`}>
                  <label className={`block text-[10px] font-mono uppercase tracking-widest mb-1 ${errors.email ? 'text-red-400' : 'text-gray-500'}`}>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none p-0 text-white focus:outline-none focus:ring-0 text-lg font-light placeholder:text-gray-700"
                    placeholder="durvishsharma23221@gmail.com"
                  />
                  {errors.email && <p className="mt-2 text-[10px] text-red-400 uppercase tracking-tight font-mono">{errors.email}</p>}
                </div>

                {/* Phone Input */}
                <div className={`bg-[#1a1a1a] border rounded-2xl p-5 focus-within:ring-1 focus-within:ring-primary/30 transition-all ${errors.phone ? 'border-red-500/30' : 'border-white/5'}`}>
                  <label className={`block text-[10px] font-mono uppercase tracking-widest mb-1 ${errors.phone ? 'text-red-400' : 'text-gray-500'}`}>Phone Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none p-0 text-white focus:outline-none focus:ring-0 text-lg font-light placeholder:text-gray-700"
                    placeholder="+91 00000 00000"
                  />
                  {errors.phone && <p className="mt-2 text-[10px] text-red-400 uppercase tracking-tight font-mono">{errors.phone}</p>}
                </div>

                {/* Job Category Select */}
                <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus-within:ring-1 focus-within:ring-primary/30 transition-all relative">
                  <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Project Type *</label>
                  <div className="relative">
                    <select
                      name="jobTitle"
                      required
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full bg-[#1a1a1a] border-none p-0 pr-8 text-white focus:outline-none focus:ring-0 text-lg font-light cursor-pointer"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                    >
                      <option value="" disabled>Select a category</option>
                      <option value="Game Development">🎮 Game Development</option>
                      <option value="Web Development">🌐 Web Development</option>
                      <option value="Mobile Development">📱 Mobile Development</option>
                      <option value="Anime Project">🎬 Anime Project</option>
                      <option value="Full Stack">⚡ Full Stack</option>
                      <option value="Other">💼 Other</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Textarea */}
              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Your Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-none p-0 text-white focus:outline-none focus:ring-0 text-lg font-light resize-none placeholder:text-gray-700"
                  placeholder="Describe your vision..."
                />
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 bg-white hover:bg-white/90 text-black rounded-full text-lg font-bold transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </div>
                  ) : (
                    "Send contact request"
                  )}
                </Button>

                {/* Terms & Privacy Links */}
                <p className="text-center text-xs text-gray-500 mt-4">
                  By submitting, you agree to our{' '}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-primary hover:underline"
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    onClick={() => setShowPrivacy(true)}
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </button>
                </p>
              </div>
            </form>
          </Card>

          {/* Contact Info - Hidden on Mobile */}
          <div className={`hidden lg:block space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
            {/* Contact Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>

              {contactInfo.map((info, index) => (
                <a
                  key={info.label}
                  href={info.href}
                  className={`flex items-center space-x-4 p-4 rounded-xl glass border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{info.label}</p>
                    <p className="text-white font-medium select-text">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Follow Me</h3>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl glass border-white/10 hover:border-primary/30 flex items-center justify-center transition-all duration-300 hover:scale-110 text-gray-400 ${social.color} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                      }`}
                    style={{ transitionDelay: `${700 + index * 100}ms` }}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
      </div>

      {/* Terms of Service Modal */}
      <PolicyModal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Terms of Service" icon={FileText}>
        <h4 className="text-lg font-bold text-white">1. Acceptance of Terms</h4>
        <p>By accessing and using this portfolio website, you accept and agree to be bound by the terms and provisions of this agreement.</p>

        <h4 className="text-lg font-bold text-white mt-6">2. Use License</h4>
        <p>Permission is granted to temporarily view the materials (information or software) on this website for personal, non-commercial transitory viewing only.</p>

        <h4 className="text-lg font-bold text-white mt-6">3. Contact Form Usage</h4>
        <p>When you submit information through the contact form, you agree to provide accurate and complete information. Your submission will be used solely for the purpose of responding to your inquiry.</p>

        <h4 className="text-lg font-bold text-white mt-6">4. Intellectual Property</h4>
        <p>All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of the website owner and is protected by intellectual property laws.</p>

        <h4 className="text-lg font-bold text-white mt-6">5. Disclaimer</h4>
        <p>The materials on this website are provided on an 'as is' basis. The website owner makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>

        <h4 className="text-lg font-bold text-white mt-6">6. Limitations</h4>
        <p>In no event shall the website owner be liable for any damages arising out of the use or inability to use the materials on this website.</p>

        <h4 className="text-lg font-bold text-white mt-6">7. Modifications</h4>
        <p>The website owner may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms.</p>
      </PolicyModal>

      {/* Privacy Policy Modal */}
      <PolicyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy" icon={Shield}>
        <h4 className="text-lg font-bold text-white">1. Information We Collect</h4>
        <p>When you use our contact form, we collect the information you provide, including your name, email address, phone number (optional), job title, and message content.</p>

        <h4 className="text-lg font-bold text-white mt-6">2. How We Use Your Information</h4>
        <p>We use the information collected through the contact form solely to respond to your inquiries and communicate with you about potential projects or opportunities.</p>

        <h4 className="text-lg font-bold text-white mt-6">3. Data Storage</h4>
        <p>Your contact form submissions are processed through Web3Forms and may be stored securely for follow-up purposes. We do not sell, trade, or otherwise transfer your personal information to outside parties.</p>

        <h4 className="text-lg font-bold text-white mt-6">4. Cookies & Analytics</h4>
        <p>This website may use cookies to enhance user experience and collect anonymous analytics data to understand how visitors interact with the site.</p>

        <h4 className="text-lg font-bold text-white mt-6">5. Third-Party Services</h4>
        <p>We may use third-party services for form processing (Web3Forms), analytics, and hosting. These services have their own privacy policies governing the use of your information.</p>

        <h4 className="text-lg font-bold text-white mt-6">6. Your Rights</h4>
        <p>You have the right to request access to, correction of, or deletion of your personal data. Contact us at durvishsharma23221@gmail.com for any privacy-related requests.</p>

        <h4 className="text-lg font-bold text-white mt-6">7. Changes to This Policy</h4>
        <p>We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated revision date.</p>

        <p className="text-xs text-gray-500 mt-8 pt-4 border-t border-white/10">Last updated: January 2026</p>
      </PolicyModal>
    </section>
  );
};

export default ContactSection;