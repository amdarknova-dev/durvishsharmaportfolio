import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';

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

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main content */}
      <div ref={heroRef} className="relative z-20 text-center px-6 transition-transform duration-300 ease-out">
        {/* Sparkle icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Sparkles className="w-12 h-12 text-primary animate-pulse" />
            <div className="absolute inset-0 w-12 h-12 bg-primary/20 rounded-full blur-xl" />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
          <span className="block text-gradient">Hi, I'm Durvish Sharma</span>
          <span className="block text-white text-4xl md:text-6xl mt-4">Creative Frontend Developer</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Building immersive digital experiences with modern web technologies
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            onClick={scrollToAbout}
            className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl transition-all duration-300 glow-primary hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2 text-lg font-semibold">
              Explore Work
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-white/20 text-white hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-105 hover:border-primary/50"
          >
            <span className="text-lg font-semibold">Get In Touch</span>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-ping" />
      <div className="absolute top-40 right-32 w-1 h-1 bg-accent rounded-full animate-ping delay-500" />
      <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-primary rounded-full animate-ping delay-1000" />
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-accent rounded-full animate-ping delay-1500" />
    </section>
  );
};

export default HeroSection;