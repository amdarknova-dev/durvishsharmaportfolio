import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import { useLocation } from 'react-router-dom';
import Preloader from '@/components/Preloader';
import { AnimatePresence } from 'framer-motion';

const SkillsSection    = React.lazy(() => import('@/components/SkillsSection'));
const ProjectsSection  = React.lazy(() => import('@/components/ProjectsSection'));
const ExperienceSection = React.lazy(() => import('@/components/ExperienceSection'));
const ContactCTA       = React.lazy(() => import('@/components/ContactCTA'));
const Footer           = React.lazy(() => import('@/components/Footer'));

const Index = () => {
  const { hash } = useLocation();
  const [loading, setLoading] = useState(true);

  // Disable scrolling during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  useEffect(() => {
    if (!loading && hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [hash, loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ background: '#0b080c', color: '#eae5ec' }}
      >
        <React.Suspense fallback={null}>
          <Navigation />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactCTA />
          </main>
          <Footer />
        </React.Suspense>
      </div>
    </>
  );
};

export default Index;
