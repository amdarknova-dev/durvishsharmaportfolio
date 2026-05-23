import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Project Data ─── */
const projects = [
  {
    id: '01',
    title: 'Cinematic Portfolio',
    subtitle: 'Creative Web Experience',
    description:
      'A next-generation developer portfolio with cinematic page transitions, WebGL 3D scenes, GSAP scroll animations, and a custom AI chatbot. Performance-first architecture scoring 100 on Lighthouse.',
    tech: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Framer Motion'],
    year: '2025',
    color: '#c2a4ff',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=900&auto=format&fit=crop&q=80',
    live: '#',
    github: 'https://github.com/amdarknova-dev',
  },
  {
    id: '02',
    title: 'SaaS Analytics Dashboard',
    subtitle: 'Data Visualization Platform',
    description:
      'Enterprise-grade analytics dashboard with real-time WebSocket feeds, interactive D3/Recharts visualisations, role-based access control, and exportable PDF/CSV reports.',
    tech: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Recharts'],
    year: '2024',
    color: '#9b6dff',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
    live: '#',
    github: 'https://github.com/amdarknova-dev',
  },
  {
    id: '03',
    title: 'Full-Stack E-Commerce',
    subtitle: 'Modern Commerce Platform',
    description:
      'End-to-end platform handling 10k+ monthly transactions — Stripe payments, headless CMS, real-time inventory sync, and SSR for SEO.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL', 'Tailwind'],
    year: '2024',
    color: '#a78bfa',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&auto=format&fit=crop&q=80',
    live: '#',
    github: 'https://github.com/amdarknova-dev',
  },
  {
    id: '04',
    title: 'Real-Estate Portal',
    subtitle: 'Property Search Platform',
    description:
      'Property discovery platform with Mapbox integration, advanced multi-parameter filtering, SEO-optimised listing pages, and an agent admin portal.',
    tech: ['React', 'Next.js', 'Mapbox', 'Prisma', 'PostgreSQL', 'Node.js'],
    year: '2023',
    color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=80',
    live: '#',
    github: 'https://github.com/amdarknova-dev',
  },
  {
    id: '05',
    title: 'Kanban Task Manager',
    subtitle: 'Collaborative Productivity',
    description:
      'Fluid drag-and-drop Kanban boards, real-time team collaboration via WebSockets, sprint velocity metrics, and task time-tracking.',
    tech: ['React', 'Framer Motion', 'Zustand', 'Supabase', 'TypeScript'],
    year: '2023',
    color: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=900&auto=format&fit=crop&q=80',
    live: '#',
    github: 'https://github.com/amdarknova-dev',
  },
];

/* ─── Single Project Card ─── */
const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 rounded-3xl overflow-hidden border select-none"
      style={{
        width: 'min(460px, 80vw)',
        height: 'min(580px, 80vh)',
        borderColor: hovered ? 'rgba(194,164,255,0.35)' : 'rgba(255,255,255,0.07)',
        background: '#0f0b11',
        transition: 'border-color 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
        transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${project.color}18`
          : '0 4px 24px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden" style={{ height: '52%' }}>
        <img
          src={project.image}
          alt={project.title}
          draggable={false}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(25%)',
            transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
          }}
          onMouseEnter={e => ((e.target as HTMLImageElement).style.filter = 'grayscale(0%)')}
          onMouseLeave={e => ((e.target as HTMLImageElement).style.filter = 'grayscale(25%)')}
        />
        {/* Gradient fade bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(15,11,17,0) 40%, rgba(15,11,17,1) 100%)',
          }}
        />
        {/* Project number */}
        <span
          className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.4em]"
          style={{ color: project.color, opacity: 0.9 }}
        >
          {project.id}
        </span>
        {/* Year */}
        <span
          className="absolute top-5 right-5 font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full"
          style={{
            color: 'rgba(234,229,236,0.5)',
            background: 'rgba(11,8,12,0.7)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {project.year}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="p-6 flex flex-col gap-3" style={{ height: '48%' }}>
        <div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.35em] mb-1"
            style={{ color: project.color }}
          >
            {project.subtitle}
          </p>
          <h3
            className="text-xl font-bold uppercase tracking-tight leading-tight"
            style={{ color: '#eae5ec' }}
          >
            {project.title}
          </h3>
        </div>

        <p
          className="text-[13px] leading-relaxed font-light"
          style={{
            color: 'rgba(234,229,236,0.45)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map(t => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-widest border"
              style={{
                color: 'rgba(234,229,236,0.35)',
                borderColor: 'rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span
              className="font-mono text-[9px] self-center"
              style={{ color: 'rgba(234,229,236,0.2)' }}
            >
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Links — slide up on hover */}
        <div
          className="flex items-center gap-4 mt-auto pt-3"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <a
            href={project.live}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest"
            style={{ color: project.color }}
            onClick={e => e.stopPropagation()}
          >
            <ExternalLink className="w-3 h-3" />
            Live
          </a>
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest"
            style={{ color: 'rgba(234,229,236,0.4)' }}
            onClick={e => e.stopPropagation()}
          >
            <Github className="w-3 h-3" />
            Source
          </a>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
const ProjectsSection = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const reelRef     = useRef<HTMLDivElement>(null);

  const inView = useInView(sectionRef, { once: true, amount: 0.05 });

  /* ── GSAP: title scrub-in ── */
  useEffect(() => {
    if (!headRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { yPercent: 25, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headRef.current,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 0.8,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  /* ── Mouse drag for horizontal scrolling ── */
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    if (!reelRef.current) return;
    dragState.current = { 
      active: true, 
      startX: e.clientX, 
      scrollLeft: reelRef.current.scrollLeft 
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.active || !reelRef.current) return;
    // Disable default behavior like text selection during drag
    e.preventDefault();
    const dx = e.clientX - dragState.current.startX;
    reelRef.current.scrollLeft = dragState.current.scrollLeft - dx;
  };

  const onPointerUp = () => {
    dragState.current.active = false;
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ background: '#0b080c', minHeight: '100vh' }}
    >
      {/* ── Header (above the reel) ── */}
      <div
        ref={headRef}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-40 pb-16"
        style={{ opacity: 0 }}
      >
        <span className="section-label">Selected Works</span>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            className="heading-xl"
            style={{ color: '#eae5ec' }}
          >
            MISSION
            <br />
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(234,229,236,0.15)',
              }}
            >
              HISTORY
            </span>
          </h2>
          <p
            className="text-sm font-light pb-2 max-w-xs"
            style={{ color: 'rgba(234,229,236,0.35)' }}
          >
            Drag ← → to explore, or just scroll.
          </p>
        </div>
      </div>

      {/* ── Horizontal reel ──
           Native CSS scrolling with mouse drag fallback for desktop.
           Provides a lag-free, Apple-like smooth horizontal scroll. */}
      <div
        ref={reelRef}
        className="flex gap-6 px-6 md:px-12 pb-20 snap-x snap-mandatory"
        style={{
          overflowX: 'auto',
          overflowY: 'visible',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
          cursor: 'grab',
          WebkitOverflowScrolling: 'touch',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <style>{`#projects [data-reel]::-webkit-scrollbar { display: none; } #projects .flex::-webkit-scrollbar { display: none; }`}</style>

        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="snap-center shrink-0"
          >
            <ProjectCard project={project} index={i} />
          </motion.div>
        ))}

        {/* ── End card ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="snap-center shrink-0 flex flex-col items-center justify-center rounded-3xl border text-center px-10"
          style={{
            width: 'min(320px, 70vw)',
            height: 'min(580px, 80vh)',
            borderColor: 'rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.015)',
          }}
        >
          <p
            className="font-mono text-[9px] uppercase tracking-[0.4em] mb-4"
            style={{ color: 'rgba(234,229,236,0.3)' }}
          >
            And More →
          </p>
          <h3
            className="text-2xl font-bold uppercase tracking-tight mb-8"
            style={{ color: '#eae5ec' }}
          >
            See All<br />on GitHub
          </h3>
          <a
            href="https://github.com/amdarknova-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border font-mono text-[10px] uppercase tracking-widest transition-all duration-300"
            style={{
              borderColor: 'rgba(194,164,255,0.3)',
              color: '#c2a4ff',
              background: 'rgba(194,164,255,0.05)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(194,164,255,0.12)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(194,164,255,0.05)';
            }}
          >
            <Github className="w-3.5 h-3.5" />
            GitHub Profile
          </a>
        </motion.div>

        {/* Right padding spacer */}
        <div className="flex-shrink-0 w-6 md:w-12" aria-hidden />
      </div>

      {/* ── Dot progress indicator ── */}
      <div className="flex justify-center gap-2 pb-12">
        {projects.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === 0 ? '20px' : '5px',
              height: '5px',
              background:
                i === 0 ? '#c2a4ff' : 'rgba(255,255,255,0.12)',
            }}
          />
        ))}
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10"
        style={{
          width: '80vw',
          height: '50vh',
          background:
            'radial-gradient(ellipse at center, rgba(194,164,255,0.03) 0%, transparent 65%)',
        }}
      />
    </section>
  );
};

export default ProjectsSection;