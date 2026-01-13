import React, { useEffect, useRef, useState } from 'react';
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
import { useCommentary } from '@/context/CommentaryContext';
import { useSound } from '@/context/SoundContext';

const COMMENTARIES: Record<string, string> = {
  'NexusAI Landing Page': 'NexusAI was an experiment in high-speed motion design. I wanted to see if we could achieve 60FPS while running complex SVG path morphing.',
  'Horizon Dashboard': 'The challenge here was data density. I focused on building a design system that scales without feeling cluttered.',
  'Aura E-commerce': 'Minimalism is harder than it looks. Every pixel had to earn its place to maintain that high-end fashion aesthetic.',
  'Solaris 3D Experience': 'This is my favorite project. I spent weeks optimizing the shaders to run smoothly on older mobile devices.',
};

const ProjectsSection = () => {
  const { t } = useTranslation();
  const { playCommentary } = useCommentary();
  const { playHover, playClick } = useSound();
  const [isVisible, setIsVisible] = useState(false);
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
      title: 'NexusAI Landing Page',
      description: 'A high-conversion landing page for an artificial intelligence startup featuring dark mode aesthetics.',
      longDescription: 'NexuxAI is a cutting-edge landing page designed to capture leads for AI startups. It features complex reveal animations, a dynamic pricing system, and parralax effects that provide a premium, futuristic feel.',
      features: [
        'Interactive hero section with reveal animations',
        'Dynamic pricing toggle and feature comparison grid',
        'Smooth scroll navigation and scroll-triggered reveals'
      ],
      image: 'https://images.unsplash.com/photo-1633436245198-44bc17f86b89?w=800&auto=format&fit=crop&q=80',
      tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
      category: 'Landing Page',
      featured: true,
      year: '2024'
    },
    {
      title: 'Horizon Dashboard',
      description: 'A comprehensive admin panel for data visualization and resource management.',
      longDescription: 'A robust administrative interface built for scalability. It provides real-time data monitoring through simulated API hooks and beautiful data visualizations using Recharts.',
      features: [
        'Real-time data updates via simulated API hooks',
        'Interactive charts and customizable data tables',
        'Role-based view simulation and sidebar navigation'
      ],
      image: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=800&auto=format&fit=crop&q=80',
      tech: ['React', 'Recharts', 'shadcn/ui', 'Tailwind CSS'],
      category: 'Dashboard',
      featured: true,
      year: '2023'
    },
    {
      title: 'Aura E-commerce',
      description: 'A minimalist lifestyle brand storefront with a focus on high-quality typography.',
      longDescription: 'Aura is a proof-of-concept e-commerce store that emphasizes brand identity through minimalist design. It features a fully functional shopping cart and product filtering system.',
      features: [
        'Product filtering and category management',
        'Persistent shopping cart using browser storage',
        'Multi-step checkout flow simulation'
      ],
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80',
      tech: ['React', 'Context API', 'Tailwind CSS', 'Vite'],
      category: 'E-commerce',
      featured: false,
      year: '2023'
    },
    {
      title: 'Solaris 3D Experience',
      description: 'An interactive 3D solar system explorer built for educational purposes.',
      longDescription: 'Solaris brings the solar system to the browser using WebGL. Users can navigate between planets, view detailed 3D models, and learn astronomical facts in an immersive environment.',
      features: [
        'Controllable 3D camera and planet orbits',
        'Texture mapping and dynamic lighting effects',
        'Informational overlays for each celestial body'
      ],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      tech: ['React Three Fiber', 'Three.js', 'GSAP'],
      category: '3D Web Experience',
      featured: false,
      year: '2024'
    },
    {
      title: 'Vanguard SaaS Website',
      description: 'A marketing site for a project management tool with interactive feature walkthroughs.',
      longDescription: 'Vanguard showcases complex SaaS features through interactive SVG animations and smooth transitions, designed to convert visitors into users.',
      features: [
        'Animated SVG illustrations and process diagrams',
        'Customer testimonial carousel and FAQ section',
        'Responsive lead generation forms'
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      tech: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
      category: 'SaaS Marketing',
      featured: false,
      year: '2023'
    }
  ];

  const categories = ['All', ...Array.from(new Set(projects.flatMap(p => p.tech)))].slice(0, 8);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tech.includes(activeFilter));

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  const cardVariants = {
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
  } as any;

  const contentVars = {
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
  } as any;

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 px-6 bg-[#050505] scroll-mt-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-32"
        >
          <span className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4 block">{t('projects.archive')}</span>
          <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter text-white">
            {t('projects.title_prefix')} <span className="text-gradient">{t('projects.title_suffix')}</span>
          </h2>
          <div className="w-24 h-[1px] bg-white/20 mx-auto rounded-full" />
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 mb-24 max-w-4xl mx-auto"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-mono tracking-widest transition-all duration-300 border ${activeFilter === cat
                ? 'bg-primary border-primary text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/20'
                }`}
              onMouseEnter={(e) => handleSpatialInteraction(e, 'hover')}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-40">
          <AnimatePresence mode="popLayout">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
              >
                {/* Image Container */}
                <div
                  onMouseEnter={(e) => handleSpatialInteraction(e, 'hover')}
                  onClick={(e) => {
                    handleSpatialInteraction(e, 'click');
                    setSelectedProject(project);
                    if (COMMENTARIES[project.title]) {
                      playCommentary(COMMENTARIES[project.title]);
                    }
                  }}
                  className="relative lg:w-3/5 aspect-[16/10] overflow-hidden rounded-3xl cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10" />
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Floating Category Badge */}
                  <div className="absolute top-8 left-8 z-20 overflow-hidden">
                    <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ delay: 0.8 }} className="glass px-4 py-2 rounded-full border-white/10 text-xs tracking-widest uppercase text-white">
                      {project.category}
                    </motion.div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <div className="w-16 h-16 rounded-full glass border-white/20 flex items-center justify-center">
                      <Info className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <motion.div
                  className="lg:w-2/5 space-y-6"
                >
                  <div className="flex items-center gap-4 text-xs tracking-[0.3em] uppercase text-gray-500 font-mono">
                    <span>{project.year}</span>
                    <div className="w-8 h-[1px] bg-gray-800" />
                    <span className="text-primary">{project.category}</span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-xl text-gray-400 font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-6 flex flex-wrap gap-4">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs font-mono text-gray-600 border border-gray-800 px-3 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-8">
                    <Button
                      variant="link"
                      onClick={() => setSelectedProject(project)}
                      className="text-white hover:text-primary p-0 h-auto text-lg group items-center gap-2"
                    >
                      {t('projects.view_case_study')}
                      <ArrowDown className="w-4 h-4 -rotate-90 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Other Projects Section */}
        <div className="mt-60">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl font-mono tracking-[0.4em] uppercase text-gray-500 text-center mb-20"
          >
            {t('projects.parallel_tracks')}
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {otherProjects.map((project, index) => (
                <SpotlightCard key={project.title} className="h-full">
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onMouseEnter={(e) => handleSpatialInteraction(e, 'hover')}
                    onClick={(e) => {
                      handleSpatialInteraction(e, 'click');
                      setSelectedProject(project);
                    }}
                    className="group relative cursor-pointer h-full glass p-6 border border-white/10"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-2xl mb-6">
                      <img src={project.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h4>
                      <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">{project.category} / {project.year || '2023'}</div>
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
          if (open && selectedProject && COMMENTARIES[selectedProject.title]) {
            playCommentary(COMMENTARIES[selectedProject.title]);
          }
        }}>
          <DialogContent className="glass border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto text-white p-0">
            {selectedProject && (
              <div className="flex flex-col">
                {/* Visual Header */}
                <div className="relative h-80 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key="media"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full"
                    >
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Simulator Overlay Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                      <div className="absolute top-6 left-6 flex gap-2">
                        <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-md">
                          {selectedProject.category}
                        </Badge>
                        <Badge className="bg-white/5 text-gray-400 border-white/10 backdrop-blur-md">
                          {selectedProject.year}
                        </Badge>
                      </div>

                      {/* Simulation HUD */}
                      <div className="absolute bottom-6 right-6 text-right font-mono pointer-events-none">
                        <p className="text-[10px] text-primary/60 uppercase tracking-widest mb-1">Status: Operational</p>
                        <p className="text-[8px] text-gray-600">Sync: 100% | Uplink: Active</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="p-8 md:p-12 space-y-10">
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-4xl md:text-5xl font-bold tracking-tighter">
                        {selectedProject.title}
                      </DialogTitle>
                    </div>
                    <DialogDescription className="text-gray-400 text-lg leading-relaxed pt-4 max-w-2xl">
                      {selectedProject.longDescription || selectedProject.description}
                    </DialogDescription>
                  </DialogHeader>

                  {/* Feature Simulation Grid */}
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-primary/60 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Core Architecture
                      </h4>
                      <div className="space-y-4">
                        {selectedProject.features?.map((feature: string, i: number) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all"
                          >
                            <span className="text-xs font-mono text-gray-600 mt-1">0{i + 1}</span>
                            <span className="text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-primary/60">Molecular Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:border-primary/30 transition-all cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Simulated Metric */}
                      <div className="mt-8 p-6 rounded-3xl bg-primary/5 border border-primary/10">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">Node Performance</span>
                          <span className="text-[10px] font-mono text-primary">60 FPS / 12ms</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "94%" }}
                            className="h-full bg-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-10 border-t border-white/5">
                    <Button className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold flex-1 md:flex-none glow-primary">
                      <Play className="w-4 h-4 mr-2" /> Launch Simulation
                    </Button>
                    <Button variant="outline" className="h-14 px-8 border-white/10 text-white hover:bg-white/5 rounded-2xl flex-1 md:flex-none">
                      <Github className="w-4 h-4 mr-2" /> Source Code
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Background decorations */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
};

export default ProjectsSection;