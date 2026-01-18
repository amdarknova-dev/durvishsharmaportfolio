import React from 'react';
import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import FloatingShapes from '@/components/FloatingShapes';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import Testimonials from '@/components/Testimonials';
import ProjectsSection from '@/components/ProjectsSection';
import FAQSection from '@/components/FAQSection';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';
import ProjectGlobe from '@/components/ProjectGlobe';
import GithubStats from "@/components/GithubStats";
import Leaderboard from "@/components/Leaderboard";

import { useLocation } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';

const Index = () => {
  const { hash } = useLocation();



  React.useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Cinematic Intro */}


      {/* Background Elements */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      />
      <div className="fixed inset-0 z-0 bg-black/80" /> {/* Dark Overlay for readability */}
      <ParticleBackground />
      <FloatingShapes />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />

        <FadeIn delay={0.2}>
          <AboutSection />
        </FadeIn>

        <FadeIn delay={0.1}>
          <SkillsSection />
        </FadeIn>

        <FadeIn>
          <ProjectsSection />
        </FadeIn>

        {/* Global Impact Section */}
        <section className="py-24 px-6">
          <FadeIn className="max-w-7xl mx-auto">
            <ProjectGlobe />
          </FadeIn>
        </section>

        <section className="scroll-mt-32">
          <FadeIn>
            <GithubStats />
          </FadeIn>
        </section>

        <FadeIn>
          <ExperienceSection />
        </FadeIn>

        <div className="hidden lg:block">
          <FadeIn>
            <Leaderboard />
          </FadeIn>
        </div>

        <FadeIn>
          <Testimonials />
        </FadeIn>

        <FadeIn>
          <FAQSection />
        </FadeIn>

        <FadeIn>
          <ContactCTA />
        </FadeIn>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
