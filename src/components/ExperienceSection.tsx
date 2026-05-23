import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Calendar, MapPin, Zap, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    num: '01',
    title: 'Full-Stack Developer',
    company: 'Freelance & Personal Projects',
    period: '2024 — PRESENT',
    location: 'Remote, India',
    status: 'ACTIVE',
    bullets: [
      'Architected and shipped a cinematic developer portfolio with Three.js WebGL scenes, GSAP scroll animations, and a custom AI chatbot achieving 100 Lighthouse performance score.',
      'Delivered 5+ full-stack production projects end-to-end — from schema design and REST/GraphQL APIs to pixel-perfect React frontends, CI/CD pipelines, and cloud deployments.',
      'Built a SaaS analytics dashboard with real-time WebSocket feeds, D3 visualisations, RBAC, and exportable reporting for a 50+ user enterprise client.',
      'Implemented GSAP & Framer Motion animation systems creating fluid, performant motion design patterns across multiple production applications.',
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Go', 'GraphQL', 'PostgreSQL', 'GSAP', 'Three.js'],
  },
  {
    num: '02',
    title: 'Frontend Engineer',
    company: 'Open Source & Community',
    period: '2022 — 2024',
    location: 'Remote',
    status: 'COMPLETED',
    bullets: [
      'Contributed to open-source React component libraries — improving accessibility, adding dark-mode tokens, and writing Storybook documentation.',
      'Built and published reusable UI packages on npm — a drag-and-drop Kanban library and a date-range picker — gaining 200+ weekly downloads.',
      'Mentored junior developers through code review, pair programming sessions, and technical writing on frontend architecture patterns.',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Rollup', 'Zustand'],
  },
];

const ExperienceItem = ({ exp, idx }: { exp: typeof experiences[0]; idx: number }) => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Top row */}
      <div
        className="flex flex-wrap items-start justify-between gap-4 pb-6 mb-6"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-start gap-5">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.4em] mt-1.5"
            style={{ color: 'rgba(194,164,255,0.4)' }}
          >
            {exp.num}
          </span>
          <div>
            <div
              className="font-mono text-[9px] uppercase tracking-[0.3em] mb-2"
              style={{ color: '#c2a4ff' }}
            >
              {exp.company}
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold uppercase tracking-tight"
              style={{ color: '#eae5ec' }}
            >
              {exp.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span
            className="font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border"
            style={{
              color: exp.status === 'ACTIVE' ? '#c2a4ff' : 'rgba(234,229,236,0.3)',
              borderColor: exp.status === 'ACTIVE' ? 'rgba(194,164,255,0.3)' : 'rgba(255,255,255,0.08)',
              background: exp.status === 'ACTIVE' ? 'rgba(194,164,255,0.06)' : 'transparent',
            }}
          >
            {exp.status}
          </span>
          <div
            className="flex items-center gap-2 font-mono text-[10px]"
            style={{ color: 'rgba(234,229,236,0.3)' }}
          >
            <Calendar className="w-3 h-3" />
            {exp.period}
          </div>
          <div
            className="flex items-center gap-2 font-mono text-[10px]"
            style={{ color: 'rgba(234,229,236,0.2)' }}
          >
            <MapPin className="w-3 h-3" />
            {exp.location}
          </div>
        </div>
      </div>

      {/* Bullets */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-3">
          {exp.bullets.map((b, i) => (
            <div key={i} className="flex gap-3 text-sm leading-relaxed font-light">
              <ChevronRight
                className="w-3.5 h-3.5 mt-1 shrink-0"
                style={{ color: '#c2a4ff', opacity: 0.5 }}
              />
              <p style={{ color: 'rgba(234,229,236,0.55)' }}>{b}</p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div>
          <p
            className="font-mono text-[9px] uppercase tracking-[0.4em] mb-4"
            style={{ color: 'rgba(194,164,255,0.4)' }}
          >
            Tech Used
          </p>
          <div className="flex flex-wrap gap-2">
            {exp.tech.map(t => (
              <span
                key={t}
                className="px-3 py-1 rounded-full border font-mono text-[10px] uppercase tracking-widest transition-colors duration-300"
                style={{
                  color: 'rgba(234,229,236,0.4)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!headRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { yPercent: 25, opacity: 0 },
        {
          yPercent: 0, opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ background: '#0d0a0f' }}
    >
      {/* Bg glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle, rgba(194,164,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headRef} className="mb-20 md:mb-32">
          <span className="section-label">Operational Logs</span>
          <h2 className="heading-xl" style={{ color: '#eae5ec' }}>
            MISSION
            <br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(234,229,236,0.15)' }}>
              HISTORY
            </span>
          </h2>
        </div>

        {/* Entries */}
        <div className="space-y-20">
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.num} exp={exp} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;