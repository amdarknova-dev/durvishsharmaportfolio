import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '@/context/SoundContext';

const ContactCTA = () => {
  const ref      = useRef<HTMLDivElement>(null);
  const inView   = useInView(ref, { once: true, amount: 0.3 });
  const navigate = useNavigate();
  const { playClick } = useSound();
  const [btnHover, setBtnHover] = useState(false);

  const handleContact = () => {
    playClick();
    navigate('/contact');
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ background: '#0b080c' }}
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse, rgba(194,164,255,0.08) 0%, transparent 65%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Label */}
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Get In Touch
        </motion.span>

        {/* Giant CTA Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="heading-xl mx-auto mb-8"
          style={{ color: '#eae5ec', maxWidth: '900px' }}
        >
          LET'S WORK<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(234,229,236,0.2)' }}>
            TOGETHER
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-lg font-light max-w-lg mx-auto mb-12 leading-relaxed"
          style={{ color: 'rgba(234,229,236,0.45)' }}
        >
          Available for freelance projects, full-time roles, and collaborations.
          Let's build something great.
        </motion.p>

        {/* Magnetic email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary button */}
          <button
            onClick={handleContact}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-500"
            style={{
              background: btnHover ? '#c2a4ff' : 'rgba(194,164,255,0.1)',
              color: btnHover ? '#0b080c' : '#c2a4ff',
              border: '1px solid rgba(194,164,255,0.4)',
              boxShadow: btnHover ? '0 0 40px rgba(194,164,255,0.4)' : 'none',
              transform: btnHover ? 'translateY(-3px)' : 'translateY(0)',
            }}
          >
            <Mail className="w-4 h-4" />
            Start a Conversation
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-300"
              style={{ transform: btnHover ? 'translate(2px, -2px)' : 'translate(0,0)' }}
            />
          </button>

          {/* Direct email link */}
          <a
            href="mailto:amdarknova23221@gmail.com"
            className="font-mono text-xs uppercase tracking-widest transition-colors duration-300 px-6 py-4"
            style={{ color: 'rgba(234,229,236,0.35)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#c2a4ff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(234,229,236,0.35)')}
          >
            amdarknova23221@gmail.com
          </a>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 h-px origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(194,164,255,0.3), transparent)' }}
        />
      </div>
    </section>
  );
};

export default ContactCTA;
