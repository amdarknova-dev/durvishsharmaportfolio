import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import { useMobile } from '@/hooks/useMobile';

const navItems = [
  { id: 'home',       label: 'Home'       },
  { id: 'about',      label: 'About'      },
  { id: 'skills',     label: 'Skills'     },
  { id: 'projects',   label: 'Projects'   },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact',   path: '/contact' },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const isMobile  = useMobile();
  const location  = useLocation();
  const navigate  = useNavigate();
  const { playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      if (location.pathname !== '/') return;
      const scrollPos = window.scrollY + 180;
      const ids = navItems.filter(i => !i.path).map(i => i.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= scrollPos) { setActiveSection(ids[i]); break; }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNav = (item: typeof navItems[0]) => {
    playClick();
    setMobileOpen(false);
    if (item.path) { navigate(item.path); return; }
    if (location.pathname !== '/') { navigate('/#' + item.id); return; }
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ─── Desktop Nav ─── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'backdrop-blur-2xl border-b'
            : ''
        }`}
        style={{
          backgroundColor: isScrolled ? 'rgba(11,8,12,0.85)' : 'transparent',
          borderColor: isScrolled ? 'rgba(255,255,255,0.06)' : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav(navItems[0])}
            className="group flex items-center gap-2"
          >
            <span
              className="font-bold text-sm tracking-widest uppercase transition-colors duration-300 group-hover:opacity-100"
              style={{ color: 'rgba(234,229,236,0.7)' }}
            >
              Durvish
              <span style={{ color: '#c2a4ff' }}>.</span>
            </span>
          </button>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-0">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNav(item)}
                className="relative px-5 py-2 group overflow-hidden"
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: activeSection === item.id ? '#c2a4ff' : 'rgba(234,229,236,0.45)',
                  transition: 'color 0.3s ease',
                  fontWeight: activeSection === item.id ? 600 : 400,
                }}
              >
                {/* Sliding underline */}
                <span
                  className="absolute bottom-1 left-5 right-5 h-px origin-left transition-transform duration-300"
                  style={{
                    background: '#c2a4ff',
                    transform: activeSection === item.id ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
                {/* Hover underline */}
                <span
                  className="absolute bottom-1 left-5 right-5 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background: 'rgba(194,164,255,0.4)' }}
                />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(p => !p)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border transition-all"
            style={{
              borderColor: 'rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.03)',
              color: 'rgba(234,229,236,0.7)',
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.header>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(11,8,12,0.85)', backdropFilter: 'blur(10px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-72 z-50 flex flex-col p-8 md:hidden"
              style={{ background: '#0f0b11', borderLeft: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between mb-12">
                <span
                  className="font-bold tracking-widest uppercase text-xs"
                  style={{ color: '#c2a4ff' }}
                >
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ color: 'rgba(234,229,236,0.4)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => handleNav(item)}
                    className="w-full text-left px-4 py-4 rounded-xl text-sm font-medium transition-all duration-300"
                    style={{
                      color: activeSection === item.id ? '#c2a4ff' : 'rgba(234,229,236,0.5)',
                      background: activeSection === item.id ? 'rgba(194,164,255,0.08)' : 'transparent',
                      border: activeSection === item.id ? '1px solid rgba(194,164,255,0.2)' : '1px solid transparent',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontSize: '0.7rem',
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
              <div
                className="pt-8 text-center"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: 'rgba(234,229,236,0.2)' }}
                >
                  amdarknova-dev
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;