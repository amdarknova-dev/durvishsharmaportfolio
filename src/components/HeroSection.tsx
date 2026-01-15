import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useSound } from '@/context/SoundContext';
import { useTranslation } from 'react-i18next';
import ThreeScene from '@/components/ThreeScene';
import HeroTerminal from './HeroTerminal';
import { useMobile } from '@/hooks/useMobile';
import StatusBadge from './StatusBadge';
import LogoMarquee from './LogoMarquee';

const HeroSection = () => {
  const { t } = useTranslation();
  const isMobile = useMobile();

  const { playClick } = useSound();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="relative">
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] py-20 pt-40 md:pt-48 scroll-mt-24">
        {/* Refined Radial Glows */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 rounded-full blur-[160px] -z-10"
        />

        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center relative z-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center w-full max-w-5xl space-y-12"
          >
            {/* Status Badge Centered */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <StatusBadge />
            </motion.div>

            {/* Large Cinematic Title */}
            <div className="relative">
              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-[10rem] font-black text-white tracking-tighter leading-[0.85] uppercase mb-4"
              >
                Durvish <br />
                <span className="text-gradient">Sharma</span>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="absolute -top-12 -right-8 hidden lg:block"
              >
                <div className="glass-premium px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.4em] text-primary animate-pulse">
                  Transmission Active
                </div>
              </motion.div>
            </div>

            <motion.h2
              variants={itemVariants}
              className="text-xl md:text-3xl font-light text-gray-400 tracking-[0.2em] uppercase max-w-2xl mx-auto"
            >
              Building <span className="text-white border-b-2 border-primary/40">Cinematic</span> Digital Worlds
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed font-light italic">
              "Crafting high-performance web experiences & immersive games with a heartbeat."
            </motion.p>

            {/* Hero Interactive Area */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-10">
              <div className="flex flex-wrap items-center gap-6 justify-center">
                <Button
                  size="lg"
                  onClick={() => {
                    playClick();
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-primary hover:bg-primary/95 text-white px-10 rounded-full h-16 text-sm uppercase tracking-widest font-bold glow-primary transition-all hover:scale-105"
                >
                  Contact Me
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="glass-premium border-white/10 text-white px-10 rounded-full h-16 text-sm uppercase tracking-widest font-bold hover:bg-white/5 transition-all hover:scale-105"
                  onClick={() => {
                    playClick();
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Archive
                </Button>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl pt-12 border-t border-white/5">
                {[
                  { label: "Projects Built", value: "24+" },
                  { label: "Experience", value: "3+ Yrs" },
                  { label: "Open Source", value: "100+" },
                  { label: "Satisfied Clients", value: "15+" }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className="flex flex-col items-center space-y-1"
                  >
                    <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">{stat.value}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Terminal Integrated */}
            <motion.div variants={itemVariants} className="mt-20 pt-10 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <HeroTerminal />
            </motion.div>
          </motion.div>

          {/* 3D Scene - Floating Background or Accent */}
          <div className="absolute inset-0 -z-20 opacity-40">
            {!isMobile && <ThreeScene />}
          </div>
        </div>
      </section>
      <LogoMarquee />
    </div>
  );
};

export default HeroSection;