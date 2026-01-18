import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Play, X, Info, ArrowDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './ui/SpotlightCard';
import { useTranslation } from 'react-i18next';
import { useSound } from '@/context/SoundContext';
import ShareButtons from './ShareButtons';
import HolographicProjectGallery from './HolographicProjectGallery';
import Magnetic from '@/components/Magnetic';
const ProjectsSection = () => {
  const { t } = useTranslation();
  const { playHover, playClick } = useSound();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  interface Project {
    title: string;
    description: string;
    longDescription?: string;
    features?: string[];
    image: string;
    tech: string[];
    category: string;
    featured: boolean;
    year: string;
    caseStudyId?: string;
  }
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSpatialInteraction = (e: React.MouseEvent, type: 'hover' | 'click') => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    if (type === 'hover') playHover(x);
    else playClick(x);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'Eclipse: Thunderfall',
      description: 'A third-person anime-style action RPG prototype focused on fast lightning-based combat and boss fights.',
      longDescription: 'Eclipse: Thunderfall is an anime-inspired action RPG prototype featuring fast-paced lightning-based combat, cinematic camera work, and challenging boss fights. Built in Unreal Engine 5 with a focus on AAA-feel gameplay at indie scale.',
      features: [
        'Lightning-based combat system with combo chains',
        'Cinematic camera work and slow-motion impact frames',
        'Enemy AI using Behavior Trees for challenging encounters'
      ],
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
      tech: ['Unreal Engine 5', 'Blueprints', 'Blender', 'Niagara VFX', 'FMOD'],
      category: 'Game Prototype',
      featured: true,
      year: '2024',
      caseStudyId: 'eclipse-thunderfall'
    },
    {
      title: 'Eclipse: Fallen Sky',
      description: 'A Demon Slayer–inspired anime cinematic short with stylized combat and emotional storytelling.',
      longDescription: 'A cinematic short film rendered entirely in Unreal Engine 5, combining anime-style visuals with 3D environments. Features stylized combat sequences, emotional character moments, and Demon Slayer–inspired aesthetics.',
      features: [
        'Hybrid 3D + anime visual workflow',
        'Stylized lightning and aura VFX',
        'Emotional storytelling through camera and timing'
      ],
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      tech: ['Unreal Engine 5', 'Sequencer', 'Blender', 'Clip Studio Paint', 'DaVinci Resolve'],
      category: 'Anime Cinematic',
      featured: true,
      year: '2024',
      caseStudyId: 'eclipse-fallen-sky'
    },
    {
      title: 'NeoCity Interactive World',
      description: 'A Cyberpunk-inspired open-world urban environment prototype focusing on lighting and atmosphere.',
      longDescription: 'NeoCity is a small open-world urban environment prototype inspired by Cyberpunk aesthetics. Built to showcase Lumen global illumination, Nanite geometry, and atmospheric exploration.',
      features: [
        'Lumen-powered global illumination',
        'Nanite-enabled high-detail geometry',
        'Atmospheric exploration with day/night cycle'
      ],
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop&q=80',
      tech: ['Unreal Engine 5', 'Lumen', 'Nanite', 'Blender', 'Substance Painter'],
      category: '3D Environment',
      featured: false,
      year: '2024'
    },
    {
      title: 'Creator Portfolio Platform',
      description: 'A full-stack portfolio website showcasing game demos, cinematics, and technical projects.',
      longDescription: 'A high-performance portfolio platform built with modern web technologies. Features cinematic UI design, smooth animations, 3D elements, and a complete backend for content management.',
      features: [
        'Cinematic preloader and page transitions',
        '3D WebGL scenes with Three.js',
        'Full-stack architecture with Next.js and MongoDB'
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
      category: 'Web Platform',
      featured: false,
      year: '2024'
    },
    {
      title: 'Combat System Sandbox',
      description: 'A modular combat testing environment for experimenting with AI, animations, and skill systems.',
      longDescription: 'A sandbox environment used to prototype and test combat mechanics, enemy AI behavior trees, animation blueprints, and skill-based attack systems. Designed for rapid iteration and modular expansion.',
      features: [
        'Modular combat framework with hot-swappable skills',
        'Enemy AI behavior trees for varied encounters',
        'Animation blueprint integration for fluid combat'
      ],
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
      tech: ['Unreal Engine 5', 'Behavior Trees', 'Animation Blueprints', 'C++'],
      category: 'Game Systems',
      featured: false,
      year: '2024'
    }
  ];


  const categories = ['All', ...Array.from(new Set(projects.flatMap(p => p.tech)))].slice(0, 8);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tech.includes(activeFilter));

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  const cardVariants: import('framer-motion').Variants = {
    initial: { scale: 1.1, opacity: 0, y: 50 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const contentVars: import('framer-motion').Variants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="relative py-48 px-6 bg-[#050505] scroll-mt-24 md:scroll-mt-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Minimal Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-40"
        >
          <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] mb-6 block">Selected Works</span>
          <h2 className="text-6xl md:text-[8rem] font-black mb-8 tracking-tighter text-white uppercase leading-none">
            Archived <br />
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto font-light leading-relaxed">
            A curation of digital experiences, interactive systems, and technical explorations.
          </p>
        </motion.div>

        {/* Filter Bar - Minimal Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4 mb-32 max-w-4xl mx-auto"
        >
          {categories.map((cat) => (
            <Magnetic key={cat} intensity={0.2}>
              <button
                onClick={() => setActiveFilter(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-mono tracking-[0.2em] transition-all duration-500 border ${activeFilter === cat
                  ? 'bg-primary border-primary text-white shadow-[0_0_25px_rgba(34,197,94,0.4)] scale-105'
                  : 'bg-white/[0.02] border-white/5 text-gray-500 hover:text-white hover:border-white/20'
                  }`}
                onMouseEnter={(e) => handleSpatialInteraction(e, 'hover')}
              >
                {cat.toUpperCase()}
              </button>
            </Magnetic>
          ))}
        </motion.div>

        {/* Featured Projects - Holographic Gallery */}
        <div className="mb-48">
          <HolographicProjectGallery
            projects={featuredProjects}
            onSelectFn={setSelectedProject}
          />
        </div>

        {/* Other Projects Section - Minimal Grid */}
        <div className="mt-80">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center space-y-4 mb-24"
          >
            <div className="w-px h-24 bg-gradient-to-b from-primary/50 to-transparent" />
            <h3 className="text-xs font-mono tracking-[0.8em] uppercase text-gray-500">
              Parallel Tracks
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {otherProjects.map((project, index) => (
                <SpotlightCard key={project.title} className="h-full">
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    onMouseEnter={(e) => handleSpatialInteraction(e, 'hover')}
                    onClick={(e) => {
                      handleSpatialInteraction(e, 'click');
                      setSelectedProject(project);
                    }}
                    className="group relative cursor-pointer h-full glass-premium p-8 border border-white/5 transition-all duration-700 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)] hover:-translate-y-3 rounded-[2.5rem]"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-[1.5rem] mb-8">
                      <img src={project.image} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-primary/60 tracking-widest uppercase">{project.category}</span>
                        <span className="text-[10px] font-mono text-gray-600 uppercase">{project.year}</span>
                      </div>
                      <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors tracking-tight uppercase leading-tight">{project.title}</h4>
                      <p className="text-gray-500 text-sm font-light line-clamp-2 leading-relaxed">{project.description}</p>
                    </div>
                  </motion.div>
                </SpotlightCard>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Project Detail Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}>
          <DialogContent className="glass-premium border-white/5 max-w-5xl max-h-[95vh] overflow-y-auto text-white p-0 rounded-[3rem]">
            {selectedProject && (
              <div className="flex flex-col">
                {/* Visual Header */}
                <div className="relative h-[50vh] overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />

                  <div className="absolute top-10 left-10 flex gap-3">
                    <div className="glass-premium px-6 py-2 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-widest">
                      {selectedProject.category}
                    </div>
                    <div className="glass-premium px-6 py-2 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-widest text-primary/80">
                      {selectedProject.year}
                    </div>
                  </div>
                </div>

                <div className="p-12 md:p-20 space-y-16">
                  <DialogHeader className="space-y-6">
                    <DialogTitle className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription className="text-gray-400 text-xl font-light leading-relaxed max-w-3xl">
                      {selectedProject.longDescription || selectedProject.description}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid lg:grid-cols-2 gap-20">
                    <div className="space-y-8">
                      <h4 className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/40">Core Features</h4>
                      <div className="grid gap-4">
                        {selectedProject.features?.map((f, i) => (
                          <div key={i} className="flex items-start gap-4 p-6 glass-premium rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all">
                            <span className="text-[10px] font-mono text-gray-700 mt-1">0{i + 1}</span>
                            <p className="text-gray-300 text-sm font-light leading-relaxed">{f}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-12">
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/40">Technical Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map(t => (
                            <span key={t} className="px-5 py-2 glass-premium rounded-full border border-white/5 text-[11px] text-gray-400 uppercase tracking-widest">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 pt-8 border-t border-white/5">
                        <Magnetic intensity={0.4}>
                          <Button className="w-full h-16 bg-primary hover:bg-primary/95 text-white rounded-full font-bold uppercase tracking-widest glow-primary text-xs">
                            Launch Application
                          </Button>
                        </Magnetic>
                        {selectedProject.caseStudyId && (
                          <Magnetic intensity={0.4}>
                            <Button
                              variant="outline"
                              className="w-full h-16 glass-premium border-primary/30 text-primary hover:bg-primary/10 rounded-full font-bold uppercase tracking-widest text-xs"
                              onClick={() => {
                                setSelectedProject(null);
                                navigate(`/case-study/${selectedProject.caseStudyId}`);
                              }}
                            >
                              View Case Study
                            </Button>
                          </Magnetic>
                        )}
                        <Magnetic intensity={0.4}>
                          <Button variant="outline" className="w-full h-16 glass-premium border-white/10 text-white hover:bg-white/5 rounded-full font-bold uppercase tracking-widest text-xs">
                            Explore Source
                          </Button>
                        </Magnetic>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Refined Background Elements */}
        <div className="absolute top-1/2 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.03),transparent_70%)] -z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default ProjectsSection;