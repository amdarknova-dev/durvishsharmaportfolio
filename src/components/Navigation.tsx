import React, { useState, useEffect } from 'react';
import { useSound } from '@/context/SoundContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about-me', label: 'About', path: '/about-me' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Portfolio' },
    { id: 'experience', label: 'Service' },
    { id: 'beyond-work', label: 'Beyond Work', path: '/beyond-work' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  const { isPlaying, toggleSound, playHover, playClick } = useSound();

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
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onMouseEnter={() => playHover()}
              onClick={() => handleNavClick(item)}
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${activeSection === item.id
                ? 'text-white bg-primary/20 glow-primary'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
            >
              {item.label}
              {activeSection === item.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-xl -z-10" />
              )}
            </Button>
          ))}
        </div>

        {/* Sound Toggle */}
        <div className="w-px h-6 bg-white/10 mx-2" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => { playClick(); toggleSound(); }}
          className={`rounded-xl transition-all duration-300 ${isPlaying ? 'text-primary glow-primary bg-primary/10' : 'text-gray-400 hover:text-white'}`}
          title={isPlaying ? "Mute Ambient Sound" : "Enable Ambient Sound"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" x2="17" y1="9" y2="15" /><line x1="17" x2="23" y1="9" y2="15" /></svg>
          )}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-6 right-6 z-50 flex gap-2">
        {/* Mobile Sound Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => { playClick(); toggleSound(); }}
          className={`glass border-white/10 rounded-xl h-12 w-12 ${isPlaying ? 'text-primary glow-primary' : 'text-white'}`}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" x2="17" y1="9" y2="15" /><line x1="17" x2="23" y1="9" y2="15" /></svg>
          )}
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="glass border-white/10 text-white rounded-xl h-12 w-12" onClick={() => playClick()}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="glass-dark border-white/10 text-white pt-20">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavClick(item)}
                  className={`w-full justify-start text-lg py-6 rounded-xl transition-all duration-300 ${activeSection === item.id
                    ? 'text-white bg-primary/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Navigation;