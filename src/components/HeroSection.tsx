import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;
      heroRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/amdarknova-dev' },
    { icon: Linkedin, href: 'https://linkedin.com/in/durvish-sharma' },
    { icon: Twitter, href: 'https://x.com/durvishsharma01' },
    { icon: Youtube, href: '#' },
  ];

  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#11161d] pt-20">
      {/* Background radial glow */}
      <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[140px]" />
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-20">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10 text-center lg:text-left"
        >
          <div className="space-y-6">
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight leading-tight">
              Durvish Sharma
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              I'm a <span className="text-primary">Frontend Developer</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed font-light">
              Designing and developing high-performance, beautiful, and interactive web digital experiences.
              Focused on performance and modern design systems.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 items-center justify-center lg:justify-start">


            <div className="flex gap-5">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full border-2 border-primary/40 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Content - Visual Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]">
            {/* Glowing Ring Animation */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-white/10"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="48%"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="120 1000"
                className="text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.9)]"
                animate={{ strokeDashoffset: [0, -1000] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="40 320"
                className="text-primary/30"
              />
            </svg>

            {/* Profile Image Clip */}
            <div className="absolute inset-[8%] rounded-full overflow-hidden border-[6px] border-[#11161d] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div ref={heroRef} className="w-full h-full rounded-full overflow-hidden bg-slate-900 shadow-inner group transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?w=800&auto=format&fit=crop&q=80"
                  alt="Durvish Sharma"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] hover:grayscale-0"
                />
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-[15%] right-[10%] w-5 h-5 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,1)]" />
            <div className="absolute bottom-[20%] left-[5%] w-3 h-3 bg-white/20 rounded-full" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;