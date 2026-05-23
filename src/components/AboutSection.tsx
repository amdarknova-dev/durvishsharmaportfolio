import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Globe, Gamepad2, Code2, Cpu, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Zap,
    title: 'Performance First',
    desc: 'Every project scores 100 on Lighthouse. I optimise at every layer — lazy loading, code splitting, tree shaking, and CDN caching.',
  },
  {
    icon: Globe,
    title: 'Full-Stack Ready',
    desc: 'From pixel-perfect React UIs to Node.js and Go backends. I own the entire product lifecycle from DB schema to deployment.',
  },
  {
    icon: Code2,
    title: 'Clean Architecture',
    desc: 'TypeScript-strict, component-driven, and well-documented. I write code that\'s a pleasure for the next engineer to maintain.',
  },
  {
    icon: Layers,
    title: 'Design-Aware',
    desc: 'Trained eye for spacing, typography, and motion. I bridge the gap between Figma mockups and production-ready interfaces.',
  },
  {
    icon: Cpu,
    title: 'AI Integration',
    desc: 'Hands-on experience with OpenAI APIs, LangChain, and building real-time AI features into production web applications.',
  },
  {
    icon: Gamepad2,
    title: 'Valorant Grinder',
    desc: 'Away from the keyboard I\'m grinding ranked. Strategic thinking that carries over into debugging and problem solving.',
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 });

  // GSAP scrub text reveal
  useEffect(() => {
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      const words = textRef.current!.querySelectorAll('.reveal-word');
      gsap.fromTo(
        words,
        { opacity: 0.12, y: 0 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 1.2,
          },
        }
      );

      // Pillars stagger in
      if (pillarsRef.current) {
        const cards = pillarsRef.current.querySelectorAll('.pillar-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 0.6,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Word-split helper
  const splitWords = (text: string) =>
    text.split(' ').map((w, i) => (
      <span key={i} className="reveal-word inline-block mr-[0.3em]" style={{ opacity: 0.12 }}>
        {w}
      </span>
    ));

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ background: '#0b080c' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Top: label + big headline ── */}
        <div className="mb-20 md:mb-32">
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.span>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Headline */}
            <motion.h2
              className="heading-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: '#eae5ec' }}
            >
              A DEVELOPER<br />
              WHO GIVES<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(234,229,236,0.25)' }}>
                A DAMN
              </span>
            </motion.h2>

            {/* Bio text — GSAP word reveal */}
            <div ref={textRef} className="space-y-6 pt-4">
              <p
                className="text-xl md:text-2xl font-light leading-relaxed"
                style={{ color: '#eae5ec' }}
              >
                {splitWords("I'm Durvish Sharma — a web developer from Haryana, India, obsessed with building fast, beautiful, and intentional web products.")}
              </p>
              <p
                className="text-base md:text-lg font-light leading-relaxed"
                style={{ color: 'rgba(234,229,236,0.55)' }}
              >
                {splitWords("I work closely with founders and teams to turn ambitious ideas into polished digital products — writing clean code, shipping on time, and caring about every pixel. My work spans the full stack from pixel-perfect React frontends to scalable Go and Node.js backends.")}
              </p>

              {/* Discord badge */}
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border font-mono text-sm"
                style={{
                  borderColor: 'rgba(194,164,255,0.2)',
                  background: 'rgba(194,164,255,0.04)',
                  color: 'rgba(234,229,236,0.7)',
                }}
              >
                <span style={{ color: '#c2a4ff' }}>DISCORD</span>
                <span className="text-[rgba(234,229,236,0.3)]">/</span>
                <span className="select-text cursor-text text-[rgba(234,229,236,0.9)]">darknova001.hd</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Pillars grid ── */}
        <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="pillar-card group flex gap-4 p-6 rounded-2xl border transition-all duration-500"
              style={{
                borderColor: 'rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                opacity: 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(194,164,255,0.25)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(194,164,255,0.04)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                style={{ background: 'rgba(194,164,255,0.08)', border: '1px solid rgba(194,164,255,0.15)' }}
              >
                <p.icon className="w-4 h-4" style={{ color: '#c2a4ff' }} />
              </div>
              <div>
                <h3
                  className="font-semibold text-sm mb-1.5 uppercase tracking-wide"
                  style={{ color: '#eae5ec' }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm leading-relaxed font-light"
                  style={{ color: 'rgba(234,229,236,0.45)' }}
                >
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 mt-20 pt-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { value: '24+', label: 'Projects Shipped' },
            { value: '3+',  label: 'Years Building'   },
            { value: '100', label: 'Perf Score'       },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div
                className="text-3xl md:text-5xl font-bold tracking-tighter mb-1"
                style={{ color: '#eae5ec' }}
              >
                {s.value}
              </div>
              <div
                className="font-mono text-[9px] uppercase tracking-[0.4em]"
                style={{ color: 'rgba(234,229,236,0.25)' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bg glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle, rgba(194,164,255,0.05) 0%, transparent 70%)' }}
      />
    </section>
  );
};

export default AboutSection;