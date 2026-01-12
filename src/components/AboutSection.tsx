import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Code, Palette, Zap, Heart } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code following industry best practices and modern patterns.',
    },
    {
      icon: Palette,
      title: 'UI/UX Focus',
      description: 'Translating Figma designs into pixel-perfect, responsive React components.',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing for speed with code splitting, lazy loading, and efficient rendering.',
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Building accessible, inclusive interfaces that provide excellent user experiences.',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">About</span> <span className="text-white">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm a creative frontend developer based in Haryana, India, passionate about building beautiful,
                functional web experiences. With expertise in React, TypeScript, and modern animation libraries,
                I specialize in creating interfaces that not only look great but perform exceptionally well.
              </p>

              <p className="text-lg text-gray-400 leading-relaxed">
                My journey in web development started with a curiosity for how things work on the web,
                which quickly evolved into a passion for creating them. I love the challenge of translating
                complex designs into clean, efficient code and the satisfaction of seeing users interact with what I've built.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">15+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">2+</div>
                <div className="text-sm text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">90+</div>
                <div className="text-sm text-gray-400">Lighthouse</div>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className={`glass p-6 border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:glow-primary group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
};

export default AboutSection;