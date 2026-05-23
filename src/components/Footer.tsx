import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MessageSquare, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '@/context/SoundContext';

const socialLinks = [
  { icon: Github,       href: 'https://github.com/amdarknova-dev',                     label: 'GH'  },
  { icon: Linkedin,     href: 'https://www.linkedin.com/in/durvish-sharma-a936b93a5',  label: 'LI'  },
  { icon: Twitter,      href: 'https://x.com/durvishsharma01',                         label: 'TW'  },
  { icon: Mail,         href: 'mailto:durvishsharma01@gmail.com',                      label: 'EM'  },
  { icon: MessageSquare,href: 'https://discord.gg/N33AErabrg',                         label: 'DC'  },
];

const quickLinks = [
  { label: 'Home',       id: 'home'       },
  { label: 'About',      id: 'about'      },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Experience', id: 'experience' },
];

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate     = useNavigate();
  const { playClick } = useSound();
  const year = new Date().getFullYear();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });
  const y       = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ background: '#080608' }}
    >
      {/* Top accent line */}
      <div
        className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(194,164,255,0.2), transparent)' }}
      />

      <motion.div style={{ y, opacity }} className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">

          {/* Top row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            {/* Brand */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h3
                  className="text-3xl font-bold uppercase tracking-tighter mb-4"
                  style={{ color: '#eae5ec' }}
                >
                  Durvish{' '}
                  <span style={{ color: '#c2a4ff' }}>Sharma</span>
                </h3>
                <p
                  className="text-base font-light leading-relaxed max-w-sm"
                  style={{ color: 'rgba(234,229,236,0.4)' }}
                >
                  Building high-performance, beautiful web experiences. Clean code, modern design, things that matter.
                </p>
              </div>

              {/* Status pill */}
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border"
                style={{
                  borderColor: 'rgba(194,164,255,0.15)',
                  background: 'rgba(194,164,255,0.04)',
                }}
              >
                <div className="relative">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#c2a4ff' }}
                  />
                  <div
                    className="absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-40"
                    style={{ background: '#c2a4ff' }}
                  />
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: '#eae5ec' }}
                  >
                    Available
                  </p>
                  <p
                    className="font-mono text-[9px] uppercase tracking-widest"
                    style={{ color: 'rgba(234,229,236,0.3)' }}
                  >
                    Open to elite projects
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-3">
              <h4
                className="font-mono text-[9px] uppercase tracking-[0.4em] mb-6"
                style={{ color: 'rgba(234,229,236,0.2)' }}
              >
                Navigation
              </h4>
              <nav className="flex flex-col gap-3">
                {quickLinks.map(l => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="text-left font-mono text-xs uppercase tracking-widest transition-colors duration-300 w-fit"
                    style={{ color: 'rgba(234,229,236,0.35)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c2a4ff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(234,229,236,0.35)')}
                  >
                    {l.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Socials */}
            <div className="lg:col-span-4">
              <h4
                className="font-mono text-[9px] uppercase tracking-[0.4em] mb-6"
                style={{ color: 'rgba(234,229,236,0.2)' }}
              >
                Social Uplink
              </h4>
              <div className="flex flex-col gap-3">
                {socialLinks.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 transition-all duration-300 w-fit"
                    style={{ color: 'rgba(234,229,236,0.3)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c2a4ff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(234,229,236,0.3)')}
                  >
                    <s.icon className="w-3.5 h-3.5" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Massive background typography */}
          <div className="overflow-hidden py-8">
            <motion.h1
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-black uppercase tracking-tighter text-center select-none pointer-events-none whitespace-nowrap"
              style={{
                fontSize: 'clamp(3rem, 12vw, 10rem)',
                lineHeight: 0.85,
                color: 'rgba(255,255,255,0.03)',
                letterSpacing: '-0.03em',
              }}
            >
              DURVISH SHARMA
            </motion.h1>
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div
              className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: 'rgba(234,229,236,0.2)' }}
            >
              <span>© {year} DS Ecosystem</span>
              <span style={{ color: 'rgba(255,255,255,0.08)' }}>|</span>
              <span>Built with React + Three.js</span>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-colors duration-300"
              style={{ color: 'rgba(234,229,236,0.25)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c2a4ff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(234,229,236,0.25)')}
            >
              Back to Top
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;