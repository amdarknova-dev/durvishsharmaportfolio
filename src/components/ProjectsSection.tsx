import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Play, X, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

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
      image: 'https://images.unsplash.com/photo-1633436245198-44bc17f86b89?w=600&auto=format&fit=crop&q=80',
      tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
      category: 'Landing Page',
      featured: true,
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
      image: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=600&auto=format&fit=crop&q=80',
      tech: ['React', 'Recharts', 'shadcn/ui', 'Tailwind CSS'],
      category: 'Dashboard',
      featured: true,
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
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80',
      tech: ['React', 'Context API', 'Tailwind CSS', 'Vite'],
      category: 'E-commerce',
      featured: false,
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
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
      tech: ['React Three Fiber', 'Three.js', 'GSAP'],
      category: '3D Web Experience',
      featured: false,
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
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      tech: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
      category: 'SaaS Marketing',
      featured: false,
    },
    {
      title: 'Pulse Mini Game',
      description: 'A rhythm-based web game testing user reaction times and precision.',
      longDescription: 'Pulse is an experimental web game that synchronizes visual elements with audio beats, providing a challenging and addictive gameplay experience.',
      features: [
        'Audio-visual synchronization using Web Audio API',
        'Global high score tracking simulation',
        'Mobile-responsive touch controls'
      ],
      image: 'https://images.unsplash.com/photo-1550745679-33d01608216a?w=600&auto=format&fit=crop&q=80',
      tech: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
      category: 'Web Game',
      featured: false,
    },
    {
      title: 'Nova Portfolio v1',
      description: 'My initial personal portfolio transition from vanilla JavaScript to React.',
      longDescription: 'The first iteration of my professional portfolio, focusing on clean grid layouts and efficient project filtering.',
      features: [
        'Project archiving and category filtering',
        'Contact form integration and validation logic',
        'Minimalist grid-based project layout'
      ],
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
      tech: ['React', 'CSS Modules', 'Vite'],
      category: 'Portfolio',
      featured: false,
    },
    {
      title: 'Stellar Startup Concept',
      description: 'A landing page mockup for a fintech startup focusing on visual hierarchy.',
      longDescription: 'A modern design exploration for a financial technology company, featuring glassmorphism and interactive data components.',
      features: [
        'Parallax background effects and typography reveals',
        'Interactive credit card visualizer',
        'Modern glassmorphism UI elements'
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?w=600&auto=format&fit=crop&q=80',
      tech: ['React', 'GSAP', 'Tailwind CSS'],
      category: 'Startup Website',
      featured: false,
    },
    {
      title: 'Atlas Blog Platform',
      description: 'A content-heavy platform optimized for readability and fast loading.',
      longDescription: 'Atlas is built for creators, providing a distraction-free reading experience with fast performance and dynamic content management.',
      features: [
        'Dynamic routing for article pages',
        'Search functionality and tag cloud filtering',
        'Reading time estimator and social sharing hooks'
      ],
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80',
      tech: ['Next.js', 'Markdown', 'Tailwind CSS'],
      category: 'Content Platform',
      featured: false,
    },
    {
      title: 'Zenith App Landing Page',
      description: 'A promotional page for a mobile application showcasing app features and downloads.',
      longDescription: 'Zenith uses high-fidelity device mockups and scroll-triggered animations to demonstrate mobile app functionality on the web.',
      features: [
        'Device mockups with animated screen transitions',
        'App Store and Play Store CTA sections',
        'User review slider and feature grid'
      ],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80',
      tech: ['React', 'Framer Motion', 'Tailwind CSS'],
      category: 'Landing Page',
      featured: false,
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Featured</span> <span className="text-white">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
            A showcase of my latest work in web development, 3D graphics, and interactive experiences.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.title}
                onClick={() => setSelectedProject(project)}
                className={`group glass border-white/10 hover:border-primary/30 transition-all duration-700 hover:scale-[1.02] overflow-hidden cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${200 + index * 200}ms` }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Overlay icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Category badge */}
                  <Badge className="absolute top-4 left-4 bg-primary/90 text-white">
                    {project.category}
                  </Badge>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed line-clamp-2">{project.description}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-white/10 text-white border-white/20 hover:bg-primary/20 transition-colors duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Projects Grid */}
        <div>
          <h3 className={`text-3xl font-bold text-white mb-12 text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            More Projects
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <Card
                key={project.title}
                onClick={() => setSelectedProject(project)}
                className={`group glass border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 overflow-hidden cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category badge */}
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-white text-xs">
                    {project.category}
                  </Badge>
                </div>

                {/* Project Content */}
                <div className="p-5 space-y-3">
                  <h4 className="text-lg font-bold text-white group-hover:text-gradient transition-all duration-300">
                    {project.title}
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">{project.description}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-white/10 text-white border-white/20 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
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
                    <ul className="grid md:grid-cols-2 gap-3">
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