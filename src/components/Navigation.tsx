import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '@/context/SoundContext';
import { Button } from '@/components/ui/button';
import { Menu, Clapperboard, Home, User, Briefcase, Rocket, Star, MessageSquare, BookOpen, LayoutGrid, FlaskConical, Cpu, Database, Globe } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import TrophyCase from './TrophyCase';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useMobile } from '@/hooks/useMobile';
import UserMenu from './UserMenu';
import Magnetic from './Magnetic';
import RollingText from './RollingText';

const Navigation = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [blobPosition, setBlobPosition] = useState({ left: 0, width: 0 });
  const navItemsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const navItems = React.useMemo(() => [
    { id: 'home', labelKey: 'nav.home', icon: Home, path: undefined },
    { id: 'about', labelKey: 'nav.about', icon: User, path: undefined },
    { id: 'skills', labelKey: 'nav.skills', icon: Cpu, path: undefined },
    { id: 'projects', labelKey: 'nav.projects', icon: Briefcase, path: undefined },
    { id: 'experience', labelKey: 'nav.experience', icon: Star, path: undefined },
    { id: 'contact', labelKey: 'nav.contact', icon: MessageSquare, path: '/contact' },
  ], []);

  const { playHover, playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (location.pathname === '/') {
        const scrollSections = navItems
          .filter(i => !i.path)
          .map(item => ({ id: item.id, element: document.getElementById(item.id) }))
          .filter(item => item.element !== null);

        const scrollPosition = window.scrollY + 150;

        for (let i = scrollSections.length - 1; i >= 0; i--) {
          const section = scrollSections[i].element;
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(scrollSections[i].id);
            break;
          }
        }
      } else {
        const currentItem = navItems.find(i => i.path === location.pathname);
        if (currentItem) setActiveSection(currentItem.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, navItems]);

  useEffect(() => {
    const activeElement = navItemsRef.current[activeSection];
    if (activeElement) {
      const rect = activeElement.getBoundingClientRect();
      const navRect = activeElement.parentElement?.getBoundingClientRect();
      if (navRect) {
        setBlobPosition({
          left: rect.left - navRect.left,
          width: rect.width
        });
      }
    }
  }, [activeSection, isMobile]);

  const handleNavClick = (item: typeof navItems[0]) => {
    playClick();
    if (item.path) {
      navigate(item.path);
      setIsOpen(false);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/#' + item.id);
    } else {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.div
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-8 left-1/2 z-50 hidden md:block"
      >
        <div className={`flex items-center gap-2 p-1.5 transition-all duration-700 ${isScrolled
          ? 'bg-black/90 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)]'
          : 'bg-white/5 backdrop-blur-2xl'
          } rounded-full border border-white/10`}>

          <div className="flex items-center space-x-1 relative px-2">
            {/* Liquid Blob Background */}
            <motion.div
              className="absolute inset-y-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full -z-10"
              initial={false}
              animate={{
                left: blobPosition.left,
                width: blobPosition.width
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 35,
                mass: 0.8
              }}
              style={{ filter: 'url(#goo)' }}
            />

            <svg width="0" height="0" className="absolute">
              <defs>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>
            </svg>

            {navItems.map((item) => (
              <Magnetic key={item.id} intensity={0.3}>
                <Button
                  ref={(el) => { navItemsRef.current[item.id] = el; }}
                  variant="ghost"
                  size="sm"
                  onMouseEnter={() => playHover()}
                  onClick={() => handleNavClick(item)}
                  className={`group relative px-4 py-2.5 rounded-full transition-all duration-500 h-10 ${activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <span className="relative z-10 text-[13px] font-medium tracking-wide">
                    <RollingText text={t(item.labelKey)} />
                  </span>
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="activeDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                  {item.id === 'contact' && activeSection !== 'contact' && (
                    <span className="absolute top-3 right-2 flex h-1.5 w-1.5 pointer-events-none">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                  )}
                </Button>
              </Magnetic>
            ))}
          </div>

          <div className="w-px h-6 bg-white/10 mx-2" />

          <div className="flex items-center gap-1 pr-2">
            <LanguageSwitcher />
            <UserMenu />
          </div>
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-6 right-6 z-50 flex gap-3 items-center">
        <LanguageSwitcher />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => playClick()}
              className="w-12 h-12 flex items-center justify-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white shadow-xl"
            >
              <Menu className="h-5 w-5" />
            </motion.button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black/95 border-l border-white/10 text-white pt-20 flex flex-col p-0">
            <div className="flex-1 overflow-y-auto px-6">
              <div className="flex items-center gap-4 mb-12 p-4 bg-white/5 rounded-3xl border border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Clapperboard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight uppercase tracking-tighter">Durvish</h3>
                  <p className="text-[10px] text-primary font-mono uppercase tracking-[0.2em]">{t('hero.sub_role')}</p>
                </div>
              </div>

              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${activeSection === item.id
                        ? 'bg-primary/10 text-white border border-primary/20'
                        : 'text-gray-400 hover:text-white'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-primary' : 'text-gray-500'}`} />
                        <span className="text-lg font-medium tracking-tight">{t(item.labelKey)}</span>
                      </div>
                      {activeSection === item.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                      )}
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="p-8 bg-white/5 border-t border-white/5">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Connect</span>
                  <div className="flex gap-4">
                    <UserMenu />
                  </div>
                </div>
                <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest font-mono">
                  Data Transmission: Secure
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Navigation;