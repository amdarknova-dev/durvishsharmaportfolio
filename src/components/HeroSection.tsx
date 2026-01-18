import CinematicText from '@/components/CinematicText';
import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useSound } from '@/context/SoundContext';
import { useTranslation } from 'react-i18next';
const ThreeScene = React.lazy(() => import('@/components/ThreeScene'));
import HeroTerminal from './HeroTerminal';
import Magnetic from '@/components/Magnetic';
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
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background py-20 pt-40 md:pt-48 scroll-mt-24">
        {/* Apple-style minimalist background - removing chaotic gradients */}

        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center relative z-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center w-full max-w-4xl space-y-8"
          >
            {/* Minimal Name */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-8xl font-semibold tracking-tight text-foreground mb-4">
                Durvish Sharma
              </h1>
            </motion.div>

            {/* Secondary Role Description */}
            <motion.div variants={itemVariants}>
              <p className="text-xl md:text-2xl text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed">
                Software Developer focused on performance, design, and clarity.
              </p>
            </motion.div>

            {/* Interactive Areas / Buttons */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-6 pt-8">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base font-medium bg-primary text-white hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                onClick={() => {
                  playClick();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 text-base font-medium border-border text-foreground hover:bg-secondary transition-all"
                onClick={() => {
                  playClick();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Me
              </Button>
            </motion.div>

            {/* Hero Terminal or Abstract Visual */}
            <motion.div variants={itemVariants} className="mt-16 relative w-full aspect-video max-w-4xl mx-auto rounded-[32px] overflow-hidden shadow-2xl border border-white/20 bg-black/5 dark:bg-white/5 backdrop-blur-3xl">
              {/* Placeholder for the 3D Animation/Video - using ThreeScene for now but cleaned up */}
              <div className="absolute inset-0">
                <Suspense fallback={null}>
                  <ThreeScene />
                </Suspense>
              </div>
              {/* Overlay content if needed, otherwise clean */}
            </motion.div>
          </motion.div>
        </div>
      </section>
      <LogoMarquee />
    </div>
  );
};

export default HeroSection;