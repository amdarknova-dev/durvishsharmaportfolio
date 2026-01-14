import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '@/context/SoundContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Clapperboard } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import TrophyCase from './TrophyCase';
import { useCommentary } from '@/context/CommentaryContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useMobile } from '@/hooks/useMobile';
import { Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import UserMenu from './UserMenu';

const Navigation = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { isCommentaryOpen, toggleCommentary } = useCommentary();
  const [blobPosition, setBlobPosition] = useState({ left: 0, width: 0 });
  const navItemsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'experience', label: t('nav.services') },
    { id: 'leaderboard', label: 'Hall of Fame' },
    { id: 'beyond-work', label: 'Beyond Work', path: '/beyond-work' },
    { id: 'blog', label: 'Blog', path: '/blog' },
    { id: 'contact', label: t('nav.contact'), path: '/contact' },
  ];

  const { playHover, playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only update active section on the home page
      if (location.pathname === '/') {
        // Find elements and filter out those that don't exist
        const scrollSections = navItems
          .filter(i => !i.path)
          .map(item => ({ id: item.id, element: document.getElementById(item.id) }))
          .filter(item => item.element !== null);

        const scrollPosition = window.scrollY + 150;

        // Find the current active section based on scroll
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
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Update blob position when active section changes
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
  }, [activeSection]);

  const handleNavClick = (item: typeof navItems[0]) => {
    playClick();
    if (item.path) {
      navigate(item.path);
      setIsOpen(false);
      return;
    }

    if (location.pathname !== '/') {
      // Use window.location.hash to trigger scroll on Index page load
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
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 hidden md:flex items-center gap-4 ${isScrolled ? 'glass-dark' : 'glass'
        } rounded-2xl px-6 py-3`}>
        <div className="flex items-center space-x-1 relative">
          {/* Liquid Blob Background */}
          <motion.div
            className="absolute inset-y-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-xl -z-10 glow-primary"
            initial={false}
            animate={{
              left: blobPosition.left,
              width: blobPosition.width
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30,
              mass: 0.5
            }}
            style={{
              filter: 'url(#goo)'
            }}
          />

          {/* SVG Filter for Gooey Effect */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>

          {navItems.map((item) => (
            <Button
              key={item.id}
              ref={(el) => { navItemsRef.current[item.id] = el; }}
              variant="ghost"
              size="sm"
              onMouseEnter={() => playHover()}
              onClick={() => handleNavClick(item)}
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${activeSection === item.id
                ? 'text-white'
                : 'text-gray-300 hover:text-white'
                }`}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-white/10 mx-2" />

        {/* Director's Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => { playClick(); toggleCommentary(); }}
          className={`relative text-gray-400 hover:text-white transition-colors ${isCommentaryOpen ? 'text-red-500 hover:text-red-400' : ''}`}
          title="Director's Mode"
        >
          <Clapperboard className="w-5 h-5" />
          {isCommentaryOpen && (
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          )}
        </Button>

        {/* Trophy Case */}
        <TrophyCase />

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* User Menu */}
        <UserMenu />

      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-6 right-6 z-50 flex gap-2 items-center">
        <LanguageSwitcher />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="glass border-white/10 text-white rounded-xl h-12 w-12 active:scale-90 transition-transform" onClick={() => playClick()}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="glass-dark border-white/10 text-white pt-20 flex flex-col justify-between">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-3 mb-8 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
                <Clapperboard className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-bold text-white leading-none">Cinematic</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-1">Portfolio</p>
                </div>
              </div>

              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => handleNavClick(item)}
                    className={`w-full justify-start text-xl py-8 rounded-2xl transition-all duration-300 active:bg-primary/30 h-auto ${activeSection === item.id
                      ? 'text-white bg-primary/20 border border-primary/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="pb-8 space-y-6">
              <div className="flex justify-center gap-6">
                {[
                  { icon: <Github />, label: 'Github' },
                  { icon: <Linkedin />, label: 'LinkedIn' },
                  { icon: <Twitter />, label: 'Twitter' },
                  { icon: <MessageSquare />, label: 'Contact' }
                ].map((social, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="w-12 h-12 rounded-2xl glass border-white/10 flex items-center justify-center text-gray-400 active:text-primary active:border-primary/50 active:scale-90 transition-all"
                  >
                    {React.cloneElement(social.icon as React.ReactElement<any>, { size: 20 })}
                  </motion.button>
                ))}
              </div>
              <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest">
                Designed & Built with ❤️
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Navigation;