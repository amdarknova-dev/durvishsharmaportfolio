import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MarqueeStrip from './MarqueeStrip';

gsap.registerPlugin(ScrollTrigger);

const skillsList = [
  // Languages
  { name: 'TypeScript',    category: 'Language'  },
  { name: 'JavaScript',    category: 'Language'  },
  { name: 'Python',        category: 'Language'  },
  { name: 'Go',            category: 'Backend'   },
  { name: 'SQL',           category: 'Database'  },
  // Frontend
  { name: 'React',         category: 'Frontend'  },
  { name: 'Next.js',       category: 'Frontend'  },
  { name: 'Tailwind CSS',  category: 'Styling'   },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'GSAP',          category: 'Animation' },
  { name: 'Three.js',      category: '3D Web'    },
  // Backend
  { name: 'Node.js',       category: 'Backend'   },
  { name: 'GraphQL',       category: 'API'       },
  { name: 'REST APIs',     category: 'API'       },
  // Databases
  { name: 'PostgreSQL',    category: 'Database'  },
  { name: 'MongoDB',       category: 'Database'  },
  { name: 'Supabase',      category: 'BaaS'      },
  { name: 'Docker',        category: 'DevOps'    },
  // Tools
  { name: 'OpenAI SDK',    category: 'AI'        },
  { name: 'Git',           category: 'Tooling'   },
  { name: 'Figma',         category: 'Design'    },
  { name: 'Vite',          category: 'Tooling'   },
];

const row1 = skillsList.slice(0, 12).map(s => s.name);
const row2 = skillsList.slice(10).map(s => s.name);

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 });

  // GSAP scroll-pin title
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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ background: '#0b080c', borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Header */}
      <div ref={headRef} className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-20 md:mb-32">
        <span className="section-label">Capabilities</span>
        <h2
          className="heading-xl"
          style={{ color: '#eae5ec' }}
        >
          SKILL
          <br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(234,229,236,0.15)' }}>
            STACK
          </span>
        </h2>
        <p
          className="mt-6 text-base font-light max-w-md mx-auto leading-relaxed"
          style={{ color: 'rgba(234,229,236,0.4)' }}
        >
          Technologies I use to build fast, beautiful, and scalable web products.
        </p>
      </div>

      {/* Marquee rows */}
      <div className="space-y-6 mb-20">
        <MarqueeStrip items={row1} speed={40} />
        <MarqueeStrip items={row2} reverse speed={35} separator="◆" />
      </div>

      {/* Skills grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skillsList.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-500 cursor-default"
              style={{
                borderColor: 'rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(194,164,255,0.3)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(194,164,255,0.05)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
              }}
            >
              <span
                className="font-semibold text-[11px] tracking-wide mb-1 transition-colors duration-300 group-hover:text-[#c2a4ff]"
                style={{ color: 'rgba(234,229,236,0.8)' }}
              >
                {skill.name}
              </span>
              <span
                className="font-mono text-[9px] uppercase tracking-widest"
                style={{ color: 'rgba(234,229,236,0.2)' }}
              >
                {skill.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse, rgba(194,164,255,0.04) 0%, transparent 70%)' }}
      />
    </section>
  );
};

export default SkillsSection;
