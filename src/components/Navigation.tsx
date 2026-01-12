import React, { useState, useEffect } from 'react';
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
    { id: 'projects', label: 'Portfolio' },
    { id: 'experience', label: 'Service' },
    { id: 'beyond-work', label: 'Beyond Work', path: '/beyond-work' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

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
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 hidden md:block ${isScrolled ? 'glass-dark' : 'glass'
        } rounded-2xl px-6 py-3`}>
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
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
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="glass border-white/10 text-white rounded-xl h-12 w-12">
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