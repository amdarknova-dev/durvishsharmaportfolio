import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Youtube, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSound } from '@/context/SoundContext';
import { useTranslation } from 'react-i18next';
import ThreeScene from '@/components/ThreeScene';
import HeroTerminal from './HeroTerminal';
import Hotspot from './DirectorMode/Hotspot';
import { useMobile } from '@/hooks/useMobile';
import StatusBadge from './StatusBadge';
import { useCommentary } from '@/context/CommentaryContext';

const HeroSection = () => {
  const { t } = useTranslation();
  const isMobile = useMobile();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/amdarknova-dev' },
    { icon: Linkedin, href: 'https://linkedin.com/in/durvish-sharma' },
    { icon: Twitter, href: 'https://x.com/durvishsharma01' },
    { icon: Youtube, href: '#' },
  ];

  const navigate = useNavigate();
  const { playHover, playClick } = useSound();
  const { playCommentary } = useCommentary();

  React.useEffect(() => {
    // Welcome message after 2 seconds
    const timer = setTimeout(() => {
      playCommentary("Welcome to my cinematic portfolio. I'm Durvish Sharma, and you've just entered an interactive experience where design meets innovation. Click the Director Mode icon to unlock behind-the-scenes insights, or dive into the terminal below to discover hidden easter eggs and achievements. Every element here tells a story.");
    }, 2000);
    return () => clearTimeout(timer);
  }, [playCommentary]);

  return (
    <section id="home" className="relative min-h-screen lg:h-screen flex items-start justify-center overflow-hidden bg-[#11161d] py-20 lg:py-0 pt-56 md:pt-64 scroll-mt-24">
      {/* Background radial glow */}
      <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[140px]" />
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-20">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10 text-center lg:text-left"
        >
          <div className="flex justify-center lg:justify-start">
            <StatusBadge />
          </div>
          <div className="space-y-6 mt-4 md:mt-8">
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              Durvish Sharma
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              {t('hero.greeting')} <span className="text-primary">{t('hero.sub_role')}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed font-light">
              {t('hero.description')}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 font-mono bg-white/5 p-3 rounded-lg border border-white/5 max-w-md relative group">
            <Hotspot
              title="Gamified Onboarding"
              description="This mission panel isn't just decoration. It teaches the user how to interact with the hidden layers of the site (Konami code, terminal, etc.) without a boring tutorial."
              placement="right"
              className="absolute -right-3 -top-3"
            />
            <div className="flex flex-col gap-1">
              <p className="flex items-center gap-2">
                <span className="text-primary">{t('hero.mission_title')}</span>
                <span className="text-white">{t('hero.mission_desc')}</span>
              </p>
              <p>
                [1] Click the <span className="text-white border px-1 rounded border-white/20">Terminal Icon {`>_`}</span> (bottom-right)
              </p>
              <p>
                [2] Complete tasks like <span className="text-accent">"Combo Breaker"</span> or input the <span className="text-accent">Konami Code</span> to hack the system.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              onClick={() => {
                playClick();
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary hover:bg-primary/90 text-white px-8 rounded-xl h-14 text-lg font-bold glow-primary transition-all hover:scale-105"
            >
              {t('projects.title_prefix')} {t('projects.title_suffix')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass border-white/10 text-white px-8 rounded-xl h-14 text-lg font-bold hover:bg-white/10 transition-all hover:scale-105"
              onClick={() => {
                playClick();
                // Replace with actual resume link
                window.open('https://example.com/durvish_sharma_resume.pdf', '_blank');
              }}
            >
              <Download className="w-5 h-5 mr-2" /> Download CV
            </Button>
          </div>

          <br />
          <HeroTerminal />
        </motion.div>

        {/* Right Content - Visual Portrait */}
        {/* Right Content - Visual Portrait with 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]">
            {/* 3D Scene Background (Replaces Ring) */}
            {!isMobile && (
              <div className="absolute inset-[-20%] z-0">
                <ThreeScene />
              </div>
            )}

            {/* Profile Image Clip */}
            <div className="absolute inset-[15%] rounded-full overflow-hidden border-[6px] border-[#11161d] shadow-[0_0_50px_rgba(34,197,94,0.3)] z-10 glass">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 shadow-inner group transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?w=800&auto=format&fit=crop&q=80"
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] hover:grayscale-0"
                />
              </div>
            </div>

            {/* Tech Overlay Elements */}
            <div className="absolute top-[10%] right-[10%] w-3 h-3 bg-white rounded-full animate-ping z-20" />
          </div>
        </motion.div>

      </div >
    </section >
  );
};

export default HeroSection;