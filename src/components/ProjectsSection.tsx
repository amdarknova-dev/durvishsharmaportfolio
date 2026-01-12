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

const ProjectsSection = () => {
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
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

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
          <span className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4 block">Archive</span>
          <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter text-white">
            Selected <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-[1px] bg-white/20 mx-auto rounded-full" />
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-40">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-10%" }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
            >
              {/* Image Container */}
              <div
                onClick={() => setSelectedProject(project)}
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
                variants={contentVars}
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
                    View Case Study
                    <ArrowDown className="w-4 h-4 -rotate-90 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Section */}
        <div className="mt-60">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl font-mono tracking-[0.4em] uppercase text-gray-500 text-center mb-20"
          >
            Parallel Tracks
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer"
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
            ))}
          </div>
        </div>

        {/* Project Detail Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="glass border-white/10 max-w-3xl max-h-[90vh] overflow-y-auto text-white">
            {selectedProject && (
              <div className="space-y-6">
                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-primary text-white">
                    {selectedProject.category}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-3xl md:text-4xl font-bold text-gradient">
                        {selectedProject.title}
                      </DialogTitle>
                    </div>
                    <DialogDescription className="text-gray-300 text-lg leading-relaxed pt-2">
                      {selectedProject.longDescription || selectedProject.description}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 pt-4">
                    <h4 className="text-xl font-bold text-white flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" /> Key Features
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.features?.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h4 className="text-xl font-bold text-white">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech: string) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-white/5 text-white border-white/10 px-3 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-8">
                    <Button className="bg-primary hover:bg-primary/90 text-white flex-1 md:flex-none">
                      <Play className="w-4 h-4 mr-2" /> Live Demo
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 flex-1 md:flex-none">
                      <Github className="w-4 h-4 mr-2" /> View Code
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