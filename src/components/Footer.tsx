import React from 'react';
import { Heart, Code, Coffee, Github, Linkedin, Twitter, Mail, ArrowUp, Zap, Terminal, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { useSound } from '@/context/SoundContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { playClick, playHover } = useSound();
  const navigate = useNavigate();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', path: '/', id: 'nav-home' },
    { label: 'About', path: '/about-me', id: 'nav-about' },
    { label: 'Projects', path: '/#projects', id: 'nav-projects' },
    { label: 'Beyond Work', path: '/beyond-work', id: 'nav-beyond' },
    { label: 'Blog', path: '/blog', id: 'nav-blog' },
    { label: 'Contact', path: '/contact', id: 'nav-contact' },
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
    <footer className="relative py-32 px-6 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-32">
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
                Durvish <span className="text-gradient">Sharma</span>
              </h3>
              <p className="text-gray-500 text-xl font-light leading-relaxed max-w-md">
                Synthesizing high-performance engineering with cinematic digital design to build the next generation of the web.
              </p>
            </div>

            <div className="inline-flex items-center gap-6 glass-premium px-8 py-5 rounded-[2rem] border-white/5">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <div className="absolute inset-0 w-2.5 h-2.5 bg-primary rounded-full animate-ping opacity-25" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-white uppercase tracking-widest">Active Status</p>
                <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">Available for elite projects</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-[10px] font-mono text-gray-700 uppercase tracking-[0.4em] font-black">Navigation</h4>
            <nav className="flex flex-col gap-5">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigation(link.path)}
                  onMouseEnter={() => playHover()}
                  className="text-gray-500 hover:text-white transition-colors duration-300 text-left font-bold uppercase tracking-widest text-xs"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="lg:col-span-4 space-y-10">
            <h4 className="text-[10px] font-mono text-gray-700 uppercase tracking-[0.4em] font-black">Social Uplink</h4>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="flex items-center gap-4 group h-16 px-6 glass-premium rounded-2xl border-white/5 hover:border-primary/20 transition-all duration-500"
                >
                  <social.icon className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                  <span className="text-[10px] text-gray-500 group-hover:text-white uppercase tracking-[0.2em] font-bold font-mono transition-colors">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 text-[10px] font-mono text-gray-700 uppercase tracking-[0.3em]">
          <div className="flex items-center gap-4">
            <span>© {currentYear} DS ECOSYSTEM</span>
            <span className="text-white/10 hidden md:inline">|</span>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-primary" />
              <span>Optimized 100%</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-gray-600 hover:text-white transition-colors"
            >
              Back to Surface
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;