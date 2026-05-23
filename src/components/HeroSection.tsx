import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const roles = ['WEB DEVELOPER', 'UI ENGINEER', 'CREATIVE CODER', 'REACT SPECIALIST'];

const socials = [
  { icon: Github,        href: 'https://github.com/amdarknova-dev',                      label: 'GitHub'   },
  { icon: Linkedin,      href: 'https://www.linkedin.com/in/durvish-sharma-a936b93a5',   label: 'LinkedIn' },
  { icon: Twitter,       href: 'https://x.com/durvishsharma01',                          label: 'Twitter'  },
  { icon: MessageCircle, href: 'https://discord.com/users/darknova001.hd',               label: 'Discord'  },
];

const HeroSection = () => {
  const { playClick } = useSound();
  const sectionRef   = useRef<HTMLElement>(null);
  const headlineRef  = useRef<HTMLDivElement>(null);
  const subRef       = useRef<HTMLDivElement>(null);
  const mousePos     = useRef({ x: 0, y: 0 });
  const [roleIdx, setRoleIdx] = React.useState(0);

  // Role ticker
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIdx(i => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (headlineRef.current) {
        headlineRef.current.style.transform = `translate(${mousePos.current.x * -8}px, ${mousePos.current.y * -6}px)`;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // GSAP scroll-fade out
  useEffect(() => {
    if (!sectionRef.current || !subRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(subRef.current, {
        yPercent: -40,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: '#0b080c' }}
    >
      {/* ── Radial glow behind mesh ── */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(194,164,255,0.12) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* ── Main content (left) ── */}
      <div
        ref={subRef}
        className="relative max-w-7xl mx-auto w-full px-6 md:px-12 pt-24 pb-16"
        style={{ zIndex: 2 }}
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-2 mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-[0.3em] border"
            style={{
              borderColor: 'rgba(194,164,255,0.3)',
              background: 'rgba(194,164,255,0.06)',
              color: '#c2a4ff',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#c2a4ff' }}
            />
            Available for hire
          </span>
        </motion.div>

        {/* Giant editorial headline */}
        <div ref={headlineRef} className="transition-transform duration-100 ease-out">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="heading-xl md:max-w-[65%]"
            style={{ color: '#eae5ec', lineHeight: '0.88' }}
          >
            DURVISH
            <br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(234,229,236,0.2)' }}>
              SHARMA
            </span>
          </motion.h1>
        </div>

        {/* Role ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 mb-8 h-8 overflow-hidden"
        >
          <motion.div
            key={roleIdx}
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            exit={{   y: -32, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <div
              className="w-6 h-px"
              style={{ background: '#c2a4ff' }}
            />
            <span
              className="font-mono text-xs uppercase tracking-[0.4em]"
              style={{ color: '#c2a4ff' }}
            >
              {roles[roleIdx]}
            </span>
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-base md:text-lg leading-relaxed md:max-w-[45%] mb-10 font-light"
          style={{ color: 'rgba(234,229,236,0.5)' }}
        >
          I build <strong style={{ color: '#eae5ec', fontWeight: 600 }}>high-performance, beautiful web experiences</strong> that
          solve real problems — from React frontends to full-stack systems.
          Based in Haryana, India.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="flex flex-wrap items-center gap-4 mb-12"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="btn-primary"
          >
            View Projects
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="btn-ghost"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Socials strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex items-center gap-4"
        >
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 border"
              style={{
                borderColor: 'rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.02)',
                color: 'rgba(234,229,236,0.4)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(194,164,255,0.4)';
                (e.currentTarget as HTMLElement).style.color = '#c2a4ff';
                (e.currentTarget as HTMLElement).style.background = 'rgba(194,164,255,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLElement).style.color = 'rgba(234,229,236,0.4)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
              }}
            >
              <s.icon className="w-3.5 h-3.5" />
            </a>
          ))}
          <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <span
            className="text-[10px] font-mono"
            style={{ color: 'rgba(234,229,236,0.25)', letterSpacing: '0.2em' }}
          >
            @darknova001.hd
          </span>
        </motion.div>
      </div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative max-w-7xl mx-auto w-full px-6 md:px-12 pb-10"
        style={{ zIndex: 2 }}
      >
        <div
          className="grid grid-cols-3 gap-8 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { value: '24+',  label: 'Projects Built'     },
            { value: '3+',   label: 'Years Experience'   },
            { value: '100',  label: 'Lighthouse Score'   },
          ].map(s => (
            <div key={s.label} className="text-center md:text-left">
              <div
                className="text-2xl md:text-4xl font-bold tracking-tighter"
                style={{ color: '#eae5ec' }}
              >
                {s.value}
              </div>
              <div
                className="font-mono text-[10px] uppercase tracking-widest mt-1"
                style={{ color: 'rgba(234,229,236,0.3)' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 2 }}
      >
        <span
          className="font-mono text-[9px] uppercase tracking-[0.4em]"
          style={{ color: 'rgba(234,229,236,0.2)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5" style={{ color: 'rgba(234,229,236,0.2)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;