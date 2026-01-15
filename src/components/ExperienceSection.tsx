import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, useInView } from 'framer-motion';
import { Terminal, Calendar, MapPin, Zap, ChevronRight } from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import { useTranslation } from 'react-i18next';

const ExperienceSection = () => {
  const { t } = useTranslation();
  const { playHover, playClick } = useSound();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Freelance & Independent Projects',
      period: '2024 - PRESENT',
      location: 'REMOTE',
      status: 'ACTIVE',
      bullets: [
        'Developed high-performance landing pages and web applications using React, Next.js, and Tailwind CSS.',
        'Implemented advanced motion design and interface transitions with Framer Motion.',
        'Optimized site performance for core web vitals, achieving 90+ Lighthouse scores.',
        'Collaborated with clients to translate brand requirements into mobile-first solutions.'
      ],
      tech: ['React', 'Next.js', 'Framer Motion', 'Tailwind', 'Three.js'],
      color: 'from-primary to-accent'
    },
    {
      title: 'Creative Technologist',
      company: 'Personal Development',
      period: '2023 - 2024',
      location: 'HARYANA, IN',
      status: 'COMPLETED',
      bullets: [
        'Built immersive 3D web experiences using Three.js and React Three Fiber.',
        'Architected narrative-driven scroll animations using GSAP and ScrollTrigger.',
        'Designed a library of reusable, themeable UI components.',
        'Leveraged Supabase for real-time data handling and backend logic.'
      ],
      tech: ['GSAP', 'WebGL', 'Supabase', 'R3F', 'Figma'],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'UI Engineer (Intern)',
      company: 'Tech Ecosystem Collaboration',
      period: '2023 - 2023',
      location: 'DELHI-NCR, IN',
      status: 'ARCHIVED',
      bullets: [
        'Collaborated on responsive layouts and cross-browser compatible features.',
        'Refactored legacy CSS into modern Tailwind-based utility styles.',
        'Participated in unit testing and accessibility audits.',
        'Translated Figma designs into pixel-perfect React components.'
      ],
      tech: ['React', 'CSS Modules', 'TypeScript', 'Git', 'Redux'],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 px-6 bg-black overflow-hidden scroll-mt-24 md:scroll-mt-32">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] block">Operational Logs</span>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
              Mission <br />
              <span className="text-gradient">Experience</span>
            </h2>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 w-[1px] bg-gradient-to-b from-primary via-accent to-transparent z-0"
          />

          {/* Experience Entries */}
          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <ExperienceItem
                key={exp.title}
                exp={exp}
                index={index}
                isLeft={index % 2 === 0}
                playHover={playHover}
                playClick={playClick}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceItem = ({ exp, index, isLeft, playHover, playClick }: any) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={itemRef}
      className={`relative flex items-center justify-between md:justify-normal group ${isLeft ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Glow Node */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 z-10">
        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
        <div className="w-4 h-4 bg-black border-2 border-primary rounded-full relative z-10 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
        </div>
      </div>

      {/* Content Card container */}
      <div className={`flex-1 pl-16 md:pl-0 md:w-1/2 ${isLeft ? 'md:pr-24' : 'md:pl-24'}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          onMouseEnter={() => {
            setIsHovered(true);
            playHover();
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Card className={`glass-premium border-white/5 overflow-hidden transition-all duration-500 ${isHovered ? 'border-primary/30 -translate-y-2 shadow-[0_20px_40px_rgba(0,0,0,0.5)]' : ''}`}>
            {/* Header / Meta Info */}
            <div className={`h-1 w-full bg-gradient-to-r ${exp.color} opacity-30 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-500`} />

            <div className="p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-primary uppercase tracking-widest">
                    <Terminal className="w-3 h-3" />
                    <span>Log {String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{exp.title}</h3>
                </div>

                <div className="flex flex-col items-end">
                  <Badge variant="outline" className={`border-primary/20 text-primary bg-primary/5 text-[9px] font-mono tracking-widest mb-1`}>
                    STATUS: {exp.status}
                  </Badge>
                  <div className="flex items-center gap-2 text-gray-500 text-[10px] font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>{exp.company}</span>
                  <span className="text-gray-600 mx-2">|</span>
                  <div className="flex items-center gap-1 text-gray-400 font-normal">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{exp.location}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {exp.bullets.map((bullet: string, i: number) => (
                    <div key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed font-light">
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-primary/40 shrink-0" />
                      <p>{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expandable Tech Stack */}
              <div className="pt-6 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-500 font-mono hover:text-white hover:border-primary/50 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Cinematic Decor */}
            <div className="absolute right-0 bottom-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Terminal className="w-24 h-24" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Decorative Label for Desktop */}
      <div className={`hidden md:block w-1/2 font-mono text-[10px] text-gray-700 uppercase tracking-[0.5em] px-24 ${isLeft ? 'text-left' : 'text-right'}`}>
        Transmission Signal: 100%
      </div>
    </div>
  );
};

export default ExperienceSection;