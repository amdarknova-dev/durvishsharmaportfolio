import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Globe, Gamepad2, Cpu, Palette, ArrowRight } from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import Magnetic from './Magnetic';
import PaymentModal from './PaymentModal';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'web',
    title: 'Enterprise Web Engineering',
    price: 'Starting at $5,000',
    desc: 'High-performance, cinematic web applications with flawless animations.',
    features: ['Full-stack Next.js/React architecture', 'Advanced GSAP/Framer animations', 'Database & API integration', 'SEO & Performance optimization', 'Custom 3D WebGL elements'],
    icon: Globe,
    color: '#3b82f6', // blue
  },
  {
    id: 'game',
    title: 'Game Dev & 3D Experiences',
    price: 'Starting at $7,500',
    desc: 'Immersive Three.js, WebGL, or Unity interactive experiences bridging the gap between web and gaming.',
    features: ['Complete game loop architecture', 'Custom GLSL shaders', 'Complex physics integration', 'High-fidelity WebGL/Unity rendering', 'Multiplayer networking support'],
    icon: Gamepad2,
    color: '#8b5cf6', // purple
  },
  {
    id: 'systems',
    title: 'Kernel & Systems Engineering',
    price: 'Starting at $15,000',
    desc: 'Ring-0 drivers, memory manipulation, and C/C++ systems engineering for performance-critical architectures.',
    features: ['Custom Ring-0 (.sys) drivers', 'Undocumented API hooking', 'Advanced memory manipulation', 'Manual Mapping & DLL Injection', 'AOB Scanning & Bypass Dev'],
    icon: Cpu,
    color: '#ef4444', // red
  },
  {
    id: 'design',
    title: 'Premium UI/UX Architecture',
    price: 'Starting at $2,000',
    desc: 'Premium dark-mode aesthetics and pixel-perfect prototype mockups for your next big product.',
    features: ['Premium dark-mode aesthetics', 'High-fidelity Figma prototypes', 'Micro-interaction planning', 'Comprehensive design systems', 'Developer handoff documentation'],
    icon: Palette,
    color: '#10b981', // green
  }
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { playClick, playHover } = useSound();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{name: string, price: string} | null>(null);

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

  const handlePurchase = (serviceName: string, servicePrice: string) => {
    playClick();
    setSelectedService({ name: serviceName, price: servicePrice });
    setIsModalOpen(true);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ background: '#0b080c', borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 60%)' }}
      />

      {/* Header */}
      <div ref={headRef} className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16 md:mb-24">
        <span className="section-label">Commissions</span>
        <h2 className="heading-xl" style={{ color: '#eae5ec' }}>
          OUR
          <br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(234,229,236,0.15)' }}>
            SERVICES
          </span>
        </h2>
        <p
          className="mt-6 text-base font-light max-w-md mx-auto leading-relaxed"
          style={{ color: 'rgba(234,229,236,0.4)' }}
        >
          Elevate your project with elite engineering. Browse my offerings and proceed to Discord for secure inquiries and payments.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
            >
              {/* Card Glow Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 100% 0%, ${service.color}15 0%, transparent 50%)`,
                }}
              />
              
              <div className="flex items-start justify-between mb-8">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${service.color}20 0%, transparent 100%)`, border: `1px solid ${service.color}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
                <div className="px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#eae5ec]">
                    {service.price}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#eae5ec] mb-4 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed font-light mb-6">
                {service.desc}
              </p>

              <ul className="space-y-3 mb-10 flex-grow">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: service.color }} />
                    <span className="text-sm text-white/70 font-light">{feature}</span>
                  </li>
                ))}
              </ul>

              <Magnetic intensity={0.2}>
                <button
                  onClick={() => handlePurchase(service.title, service.price)}
                  onMouseEnter={() => playHover()}
                  className="w-full flex flex-col items-center justify-center px-6 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 gap-3"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-[#eae5ec]">
                      Pay via UPI
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#10b981] group-hover:scale-110 transition-all duration-300 shrink-0">
                      <ShoppingCart className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#10b981]/80 group-hover:text-[#10b981]">
                    9017250790@fam
                  </span>
                </button>
              </Magnetic>
            </motion.div>
          );
        })}
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService?.name || ''}
        servicePrice={selectedService?.price || ''}
      />
    </section>
  );
};

export default ServicesSection;
