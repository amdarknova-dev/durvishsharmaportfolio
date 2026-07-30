import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, X, Cpu, Layers, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Extended Project Interface & Data ─── */
interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Systems' | 'Web' | 'Fullstack';
  architecture: string[];
  features: string[];
  tech: string[];
  year: string;
  color: string;
  image: string;
  live: string;
  github: string;
}

const projects: ProjectItem[] = [
  {
    id: '01',
    title: 'Obsidian Framework (ProjectX)',
    subtitle: '17-Game Cheat Ecosystem & Platform',
    category: 'Systems',
    description:
      'High-performance C++ monorepo comprising a 17-game cheat framework (CS2, Valorant, Apex, etc.), ring-0 kernel driver (.sys), ring-3 loader, HWID spoofer, Jarvis AI voice assistant (Python), and Next.js storefront.',
    architecture: [
      'Ring-0 Kernel Driver (.sys) handling physical memory reading & DKOM process hiding',
      'Ring-3 C++ Loader with VMT & MinHook detour inline hooks',
      'Python Jarvis AI overlay voice agent communicating via local WebSockets',
      'Next.js 14 E-commerce storefront with license key generation & auth'
    ],
    features: [
      'Pattern Scanning (AOB with dynamic mask resolution)',
      'HWID Spoofer bypassing Ring-0 anti-cheats (Vanguard, EAC, BE)',
      'ImGui Direct3D11 overlay renderer running at 240 FPS'
    ],
    tech: ['C++', 'Kernel Driver', 'WinAPI', 'Python', 'Next.js', 'CMake', 'ImGui'],
    year: '2026',
    color: '#9333ea',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&auto=format&fit=crop&q=80',
    live: '#',
    github: 'https://github.com/amdarknova-dev/ProjectX',
  },
  {
    id: '02',
    title: 'Cinematic Portfolio',
    subtitle: 'Creative Web Experience',
    category: 'Web',
    description:
      'A next-generation developer portfolio with cinematic page transitions, WebGL 3D scenes, GSAP scroll animations, and a custom AI chatbot. Performance-first architecture scoring 100 on Lighthouse.',
    architecture: [
      'React-Three-Fiber WebGL Canvas rendering 3D shader particles',
      'GSAP ScrollTrigger timeline sequence management',
      'Framer Motion layout transitions & responsive state handling'
    ],
    features: [
      'Interactive 3D particle repulsion engine',
      'Capability Radar Matrix visualization for systems engineering',
      'Nova Voice AI assistant & Nexus Command Center'
    ],
    tech: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Framer Motion'],
    year: '2025',
    color: '#c2a4ff',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=900&auto=format&fit=crop&q=80',
    live: '#',
    github: 'https://github.com/amdarknova-dev',
  },
  {
    id: '03',
    title: 'SaaS Analytics Dashboard',
    subtitle: 'Data Visualization Platform',
    category: 'Fullstack',
    description:
      'Enterprise-grade analytics dashboard with real-time WebSocket feeds, interactive D3/Recharts visualisations, role-based access control, and exportable PDF/CSV reports.',
    architecture: [
      'Node.js & GraphQL API microservices',
      'PostgreSQL data pipeline with Prisma ORM indexing',
      'WebSocket server for real-time telemetry streaming'
    ],
    features: [
      'Interactive D3 dynamic heatmaps',
      'Role-based Access Control (RBAC)',
      'Automated PDF report generator'
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Recharts'],
    year: '2024',
    color: '#9b6dff',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
    live: '#',
    github: 'https://github.com/amdarknova-dev',
  },
  {
    id: '04',
    title: 'Full-Stack E-Commerce',
    subtitle: 'Modern Commerce Platform',
    category: 'Fullstack',
    description:
      'End-to-end platform handling 10k+ monthly transactions — Stripe payments, headless CMS, real-time inventory sync, and SSR for SEO.',
    architecture: [
      'Next.js SSR App Router',
      'Stripe Webhooks & Checkout workflow',
      'Prisma ORM with PostgreSQL database'
    ],
    features: [
      'Sub-second search & filter responsiveness',
      'Cart synchronization across devices',
      'Automated inventory webhook triggers'
    ],
    tech: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL', 'Tailwind'],
    year: '2024',
    color: '#a78bfa',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&auto=format&fit=crop&q=80',
    live: '#',
    github: 'https://github.com/amdarknova-dev',
  },
  {
    id: '05',
    title: 'Real-Estate Portal',
    subtitle: 'Property Search Platform',
    category: 'Web',
    description:
      'Property discovery platform with Mapbox integration, advanced multi-parameter filtering, SEO-optimised listing pages, and an agent admin portal.',
    architecture: [
      'Mapbox GL JS custom tile renderer',
      'Node.js REST API service',
      'PostgreSQL GIS spatial coordinates database'
    ],
    features: [
      'Geospatial cluster map markers',
      'Mortgage breakdown calculator',
      'Saved searches & real-time email alerts'
    ],
    tech: ['React', 'Next.js', 'Mapbox', 'Prisma', 'PostgreSQL', 'Node.js'],
    year: '2023',
    color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=80',
    live: '#',
    github: 'https://github.com/amdarknova-dev',
  },
  {
    id: '06',
    title: 'Kanban Task Manager',
    subtitle: 'Collaborative Productivity',
    category: 'Web',
    description:
      'Fluid drag-and-drop Kanban boards, real-time team collaboration via WebSockets, sprint velocity metrics, and task time-tracking.',
    architecture: [
      'Framer Motion drag-and-drop reordering engine',
      'Zustand lightweight reactive state manager',
      'Supabase Realtime subscriptions'
    ],
    features: [
      'Multi-user live board cursor sync',
      'Burndown chart metrics',
      'Keyboard shortcuts for ultra-fast task management'
    ],
    tech: ['React', 'Framer Motion', 'Zustand', 'Supabase', 'TypeScript'],
    year: '2023',
    color: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=900&auto=format&fit=crop&q=80',
    live: '#',
    github: 'https://github.com/amdarknova-dev',
  },
];

/* ─── Case Study Modal ─── */
const CaseStudyModal = ({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0f0b11] p-6 md:p-10 shadow-2xl text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero banner */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-white/5">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0b11] via-[#0f0b11]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.4em] px-3 py-1 rounded-full border"
              style={{
                color: project.color,
                borderColor: `${project.color}40`,
                background: 'rgba(15,11,17,0.8)',
              }}
            >
              {project.category} Architecture • {project.year}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase text-[#eae5ec] mt-3">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#c2a4ff]">
              Executive Overview
            </h3>
            <p className="text-sm font-light leading-relaxed text-white/70">
              {project.description}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-widest border border-white/10 bg-white/5 text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] uppercase tracking-widest text-white hover:bg-white/10 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                Source Code
              </a>
            </div>
          </div>
        </div>

        {/* Technical Architecture Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.015]">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-[#c2a4ff]" />
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#eae5ec]">
                System Architecture
              </h4>
            </div>
            <ul className="space-y-2.5">
              {project.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-light text-white/60">
                  <span className="text-[#c2a4ff] font-mono text-[10px] mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.015]">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-[#c2a4ff]" />
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#eae5ec]">
                Key Capabilities
              </h4>
            </div>
            <ul className="space-y-2.5">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-light text-white/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c2a4ff] shrink-0 mt-0.5" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Single Project Card ─── */
const ProjectCard = ({
  project,
  onSelect,
}: {
  project: ProjectItem;
  onSelect: (p: ProjectItem) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onSelect(project)}
      className="relative flex-shrink-0 rounded-3xl overflow-hidden border select-none cursor-pointer group"
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
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(15,11,17,0) 40%, rgba(15,11,17,1) 100%)',
          }}
        />
        <span
          className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.4em]"
          style={{ color: project.color, opacity: 0.9 }}
        >
          {project.id}
        </span>
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
            className="text-xl font-bold uppercase tracking-tight leading-tight group-hover:text-[#c2a4ff] transition-colors"
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
        </div>

        {/* Links — View Case Study Action */}
        <div
          className="flex items-center justify-between mt-auto pt-3 border-t border-white/5"
        >
          <span
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest group-hover:text-[#c2a4ff] transition-colors"
            style={{ color: project.color }}
          >
            Case Study Specs
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </span>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full border border-white/5 bg-white/5 text-white/40 hover:text-white transition-colors"
            onClick={e => e.stopPropagation()}
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.05 });

  const [activeCategory, setActiveCategory] = useState<'All' | 'Systems' | 'Web' | 'Fullstack'>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter(p => p.category === activeCategory);

  /* ── GSAP title scroll ── */
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

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ background: '#0b080c', minHeight: '100vh' }}
    >
      {/* ── Header ── */}
      <div
        ref={headRef}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-40 pb-12"
        style={{ opacity: 0 }}
      >
        <span className="section-label">Selected Works</span>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h2 className="heading-xl" style={{ color: '#eae5ec' }}>
            MISSION
            <br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(234,229,236,0.15)' }}>
              HISTORY
            </span>
          </h2>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Systems', 'Web', 'Fullstack'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'border-[#c2a4ff] bg-[#c2a4ff]/10 text-[#c2a4ff]'
                    : 'border-white/5 bg-white/[0.02] text-white/40 hover:text-white/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Horizontal reel ── */}
      <div
        ref={reelRef}
        className="flex gap-6 px-6 md:px-12 pb-20 snap-x snap-mandatory"
        style={{
          overflowX: 'auto',
          overflowY: 'visible',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <style>{`#projects .flex::-webkit-scrollbar { display: none; }`}</style>

        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="snap-center shrink-0"
          >
            <ProjectCard project={project} onSelect={p => setSelectedProject(p)} />
          </motion.div>
        ))}
      </div>

      {/* ── Case Study Modal Popup ── */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;