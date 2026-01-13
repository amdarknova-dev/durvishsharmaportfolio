import React from 'react';
import { Heart, Code, Coffee, Github, Linkedin, Twitter, Mail, ArrowUp, Zap, Terminal, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { useSound } from '@/context/SoundContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Hotspot from './DirectorMode/Hotspot';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { playClick, playHover } = useSound();
  const navigate = useNavigate();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about-me' },
    { label: 'Projects', path: '/#projects' },
    { label: 'Beyond Work', path: '/beyond-work' },
    { label: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/amdarknova-dev', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/durvish-sharma', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/durvishsharma01', label: 'Twitter' },
    { icon: Mail, href: 'mailto:durvishsharma01@gmail.com', label: 'Email' },
    { icon: MessageSquare, href: 'https://discord.gg/N33AErabrg', label: 'Discord' },
  ];

  const handleNavigation = (path: string) => {
    playClick();
    if (path.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = path.substring(2);
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="relative py-20 px-6 border-t border-white/10 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-gradient flex items-center gap-2">
                Durvish Sharma
                <Terminal className="w-6 h-6 text-primary animate-pulse" />
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Crafting beautiful, performant web experiences with modern technologies and creative problem-solving.
              </p>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 glass px-4 py-3 rounded-xl border border-primary/20">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Available for Work</p>
                <p className="text-xs text-gray-400">Open to new opportunities</p>
              </div>
            </div>

            {/* Director Hotspot */}
            <div className="relative pt-4">
              <Hotspot
                title="Footer with Purpose"
                description="This footer isn't just decoration. It provides quick navigation, social proof, and a clear CTA. The 'Available for Work' badge creates urgency and converts visitors into leads."
                placement="top"
                className="absolute -top-2 left-0"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Quick Links
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  onMouseEnter={() => playHover()}
                  className="block text-gray-400 hover:text-primary transition-colors duration-200 text-left"
                >
                  → {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">Let's Connect</h4>
            <div className="space-y-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                    <social.icon className="w-5 h-5" />
                  </div>
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider with Animation */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Made with love */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>and</span>
            <Code className="w-4 h-4 text-primary" />
            <span>and lots of</span>
            <Coffee className="w-4 h-4 text-amber-500" />
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500 text-center md:text-left">
            <p>© {currentYear} Durvish Sharma. All rights reserved.</p>
          </div>

          {/* Back to Top Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            onMouseEnter={() => playHover()}
            className="glass border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 group"
            title="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>

        {/* Animated Background */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl -z-10" />
      </div>
    </footer>
  );
};

export default Footer;