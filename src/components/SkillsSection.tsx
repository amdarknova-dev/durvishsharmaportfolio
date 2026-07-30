import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Terminal, Code2, ShieldAlert, Layers } from 'lucide-react';
import MarqueeStrip from './MarqueeStrip';

gsap.registerPlugin(ScrollTrigger);

/* ── Technical Skill Data ── */
interface SkillNode {
  name: string;
  category: 'Systems' | 'Reverse Eng & Hacks' | 'Languages' | 'Web & Tools';
  level: number; // 0-100
  desc: string;
}

const skillCategories = [
  { id: 'all', label: 'All Modules', icon: Layers },
  { id: 'Systems', label: 'Systems & Kernel', icon: Cpu },
  { id: 'Reverse Eng & Hacks', label: 'Memory & Reverse Eng', icon: ShieldAlert },
  { id: 'Languages', label: 'Languages', icon: Code2 },
  { id: 'Web & Tools', label: 'Fullstack & Tools', icon: Terminal },
];

const skillNodes: SkillNode[] = [
  // Low-level & Memory Manipulation
  { name: 'C / C++', category: 'Systems', level: 98, desc: 'Pointer chains, manual memory alloc, PE format, Win32/NTAPI' },
  { name: 'Kernel Driver (.sys)', category: 'Systems', level: 92, desc: 'Ring-0 execution, IOCTL communications, DKOM, Filter Drivers' },
  { name: 'WinAPI / NTAPI', category: 'Systems', level: 95, desc: 'Undocumented APIs, PEB/TEB inspection, process manipulation' },
  { name: 'x86/x64 Assembly', category: 'Reverse Eng & Hacks', level: 90, desc: 'Inline assembly, disassembling PE binaries, shellcode craft' },
  { name: 'Memory Hooking', category: 'Reverse Eng & Hacks', level: 96, desc: 'Detour hooks, MinHook, VMT patching, IAT interception' },
  { name: 'AOB Scanning', category: 'Reverse Eng & Hacks', level: 94, desc: 'Pattern matching with masks, dynamic signature resolution' },
  { name: 'DLL Injection', category: 'Reverse Eng & Hacks', level: 92, desc: 'Manual Mapping, Reflective DLL, Thread Hijacking' },
  
  // Core Languages
  { name: 'TypeScript', category: 'Languages', level: 96, desc: 'Strict typing, AST transformations, generic design' },
  { name: 'Python', category: 'Languages', level: 92, desc: 'Automation, AI integration, exploit scripting, reverse tools' },
  { name: 'Go', category: 'Languages', level: 88, desc: 'Concurrent network agents, C2 prototypes, high-speed CLI tools' },
  { name: 'Rust', category: 'Languages', level: 85, desc: 'Memory-safe systems tooling, FFI bindings to C' },

  // Web & Architecture
  { name: 'React / Next.js', category: 'Web & Tools', level: 95, desc: 'SSR architecture, custom hooks, real-time UI state management' },
  { name: 'Three.js / WebGL', category: 'Web & Tools', level: 88, desc: 'Custom shaders, particle simulations, camera rigs' },
  { name: 'GSAP & Framer Motion', category: 'Web & Tools', level: 94, desc: 'Timeline scrolling, smooth physics spring animations' },
  { name: 'CMake & Build Tools', category: 'Web & Tools', level: 90, desc: 'Multi-platform C++ builds, vcpkg, MSVC toolchain' },
  { name: 'Docker & DevOps', category: 'Web & Tools', level: 86, desc: 'Containerization, Linux env setup, CI/CD pipelines' },
];

const marqueeSkills = skillNodes.map(s => s.name);

/* ── Interactive Skill Radar Chart ── */
const RadarChart = ({ selectedCategory }: { selectedCategory: string }) => {
  const radarCategories = [
    { label: 'Systems / Kernel', score: 96 },
    { label: 'Memory / Hooks', score: 98 },
    { label: 'Reverse Eng', score: 92 },
    { label: 'Languages', score: 95 },
    { label: 'Fullstack / WebGL', score: 90 },
    { label: 'Security & Exploits', score: 94 },
  ];

  const numSides = radarCategories.length;
  const radius = 120;
  const center = 160;

  // Compute polygon points
  const points = radarCategories.map((cat, i) => {
    const angle = (Math.PI * 2 / numSides) * i - Math.PI / 2;
    const r = (cat.score / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle, label: cat.label, score: cat.score };
  });

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center p-6 rounded-3xl border border-white/5 bg-white/[0.015] backdrop-blur-md">
      <div className="absolute top-4 left-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#c2a4ff] animate-ping" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#c2a4ff]">
          Capability Matrix
        </span>
      </div>

      <svg width="320" height="320" viewBox="0 0 320 320" className="overflow-visible mt-6">
        {/* Concentric grid rings */}
        {[0.25, 0.5, 0.75, 1].map((scale, idx) => (
          <polygon
            key={idx}
            points={radarCategories
              .map((_, i) => {
                const angle = (Math.PI * 2 / numSides) * i - Math.PI / 2;
                const r = radius * scale;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              })
              .join(' ')}
            fill="none"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeDasharray={idx === 3 ? 'none' : '3 3'}
          />
        ))}

        {/* Spokes */}
        {radarCategories.map((_, i) => {
          const angle = (Math.PI * 2 / numSides) * i - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.08)"
            />
          );
        })}

        {/* Dynamic Radar Area */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          points={polygonPath}
          fill="url(#radarGradient)"
          stroke="#c2a4ff"
          strokeWidth="2"
        />

        {/* Gradient definition */}
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7b3fff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c2a4ff" stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {/* Radar Nodes */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#c2a4ff" className="transition-all duration-300 hover:r-6" />
            <text
              x={center + (radius + 24) * Math.cos(p.angle)}
              y={center + (radius + 24) * Math.sin(p.angle)}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(234, 229, 236, 0.7)"
              className="font-mono text-[9px] uppercase tracking-widest"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ── Main Component ── */
const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(skillNodes[0]);

  useEffect(() => {
    if (!headRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { yPercent: 30, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const filteredNodes =
    activeCategory === 'all'
      ? skillNodes
      : skillNodes.filter(s => s.category === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ background: '#0b080c', borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Header */}
      <div ref={headRef} className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16 md:mb-24">
        <span className="section-label">Capabilities & Systems</span>
        <h2 className="heading-xl" style={{ color: '#eae5ec' }}>
          SKILL
          <br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(234,229,236,0.15)' }}>
            SYSTEMS
          </span>
        </h2>
        <p
          className="mt-6 text-base font-light max-w-md mx-auto leading-relaxed"
          style={{ color: 'rgba(234,229,236,0.4)' }}
        >
          Low-level systems architecture, memory manipulation, and full-stack web engineering.
        </p>
      </div>

      {/* Marquee ticker strip */}
      <div className="space-y-4 mb-16">
        <MarqueeStrip items={marqueeSkills.slice(0, 8)} speed={35} />
        <MarqueeStrip items={marqueeSkills.slice(8)} reverse speed={30} separator="⚡" />
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {skillCategories.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#c2a4ff]/15 text-[#c2a4ff] border border-[#c2a4ff]/40 shadow-lg shadow-[#c2a4ff]/10'
                    : 'bg-white/[0.02] text-white/50 border border-white/5 hover:text-white/80 hover:bg-white/[0.05]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Radar Chart + Skill Cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Radar Chart Visualizer (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <RadarChart selectedCategory={activeCategory} />
          
          {/* Active Skill Inspection Panel */}
          {activeSkill && (
            <motion.div
              key={activeSkill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl border border-[#c2a4ff]/30 bg-[#c2a4ff]/[0.03] backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#c2a4ff]">
                  {activeSkill.category}
                </span>
                <span className="font-mono text-[11px] text-white/70 font-semibold">
                  Proficiency: {activeSkill.level}%
                </span>
              </div>
              <h4 className="text-xl font-bold uppercase text-[#eae5ec] mb-2">{activeSkill.name}</h4>
              <p className="text-xs font-light text-white/60 leading-relaxed">{activeSkill.desc}</p>
            </motion.div>
          )}
        </div>

        {/* Skill Node Grid (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredNodes.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setActiveSkill(skill)}
              onMouseEnter={() => setActiveSkill(skill)}
              className={`group flex flex-col p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeSkill?.name === skill.name
                  ? 'border-[#c2a4ff]/40 bg-[#c2a4ff]/10 shadow-lg shadow-[#c2a4ff]/5'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 group-hover:text-[#c2a4ff]/70 transition-colors">
                  {skill.category}
                </span>
                <span className="font-mono text-[10px] text-[#c2a4ff]">
                  {skill.level}%
                </span>
              </div>

              <h3 className="font-bold text-sm text-[#eae5ec] mb-2 group-hover:text-[#c2a4ff] transition-colors">
                {skill.name}
              </h3>

              {/* Progress Bar */}
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-[#7b3fff] to-[#c2a4ff] rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse, rgba(194,164,255,0.04) 0%, transparent 70%)' }}
      />
    </section>
  );
};

export default SkillsSection;

