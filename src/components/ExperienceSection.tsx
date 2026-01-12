import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Code2, Cpu, Globe, Rocket, Terminal } from 'lucide-react';

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
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

  const skillDetails: Record<string, any> = {
    'HTML5': {
      level: 'Advanced',
      description: 'Expertise in semantic markup, SEO best practices, and building accessible document structures.',
      built: ['Content-rich platforms', 'SEO-optimized landing pages', 'Complex web architectures'],
      related: ['SEO', 'Accessibility', 'Schema.org']
    },
    'CSS3': {
      level: 'Advanced',
      description: 'Advanced layout techniques including Flexbox, Grid, and custom animation properties.',
      built: ['Responsive design systems', 'Complex grid layouts', 'Custom animation libraries'],
      related: ['Sass', 'CSS Modules', 'PostCSS']
    },
    'JavaScript (ES6+)': {
      level: 'Advanced',
      description: 'Deep understanding of asynchronous programming, functional patterns, and modern DOM manipulation.',
      built: ['Custom interaction layers', 'Dynamic data visualization', 'Complex business logic'],
      related: ['TypeScript', 'Node.js', 'Functional Programming']
    },
    'React': {
      level: 'Advanced',
      description: 'Building large-scale applications with hooks, context API, and optimized rendering strategies.',
      built: ['Interactive dashboards', 'E-commerce frontends', 'Saas applications'],
      related: ['Redux', 'Zustand', 'React Query']
    },
    'Next.js': {
      level: 'Advanced',
      description: 'Proficiency in server-side rendering, static site generation, and performance optimization.',
      built: ['High-performance blogs', 'E-commerce sites', 'Marketing platforms'],
      related: ['SSR', 'ISR', 'Vercel']
    },
    'Tailwind CSS': {
      level: 'Advanced',
      description: 'Rapid prototyping and production styling using utility-first principles and custom configurations.',
      built: ['Design systems', 'Responsive UI components', 'Themed applications'],
      related: ['PostCSS', 'Radix UI', 'shadcn/ui']
    },
    'Framer Motion': {
      level: 'Intermediate',
      description: 'Implementing fluid component transitions and complex layout animations in React.',
      built: ['Interactive portfolios', 'Animated marketing pages', 'Page transitions'],
      related: ['React', 'SVG Animations', 'Gestures']
    },
    'GSAP': {
      level: 'Intermediate',
      description: 'Professional timeline orchestration and scroll-based storytelling animations.',
      built: ['Cinematic landing pages', 'Scroll-triggered reveals', 'SVG motion paths'],
      related: ['ScrollTrigger', 'TimelineMax', 'SplitText']
    },
    'CSS Animations': {
      level: 'Advanced',
      description: 'High-performance micro-interactions and entrance effects using keyframes and transitions.',
      built: ['UI feedback loops', 'Loading sequences', 'Decorative backgrounds'],
      related: ['Keyframes', 'Performance Optimization', 'GPU Acceleration']
    },
    'Three.js': {
      level: 'Intermediate',
      description: 'Creating 3D scenes, custom shaders, and interactive WebGL environments.',
      built: ['3D solar system explorers', 'Interactive background elements', 'Product visualizers'],
      related: ['WebGL', 'GLSL', 'Scene Graph']
    },
    'React Three Fiber': {
      level: 'Intermediate',
      description: 'Declarative 3D development within the React ecosystem using reusable components.',
      built: ['3D landing pages', 'Interactive data models', 'Virtual galleries'],
      related: ['React', 'Three.js', 'Drei']
    },
    'Figma': {
      level: 'Intermediate',
      description: 'Translating high-fidelity designs and prototypes into pixel-perfect implementation.',
      built: ['UI component libraries', 'Responsive design mockups', 'Interaction prototypes'],
      related: ['Auto Layout', 'Design Systems', 'Prototyping']
    },
    'Git & GitHub': {
      level: 'Intermediate',
      description: 'Version control proficiency and collaborative development workflows.',
      built: ['Team-based repositories', 'Open-source contributions', 'CI/CD pipelines'],
      related: ['Branching Strategy', 'Code Review', 'GitFlow']
    }
  };

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'Next.js', 'Tailwind CSS'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Animation & Interactions',
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
      skills: ['Framer Motion', 'GSAP', 'CSS Animations', 'Scroll-based Animations'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: '3D & Visuals',
      icon: <Cpu className="w-6 h-6 text-orange-400" />,
      skills: ['Three.js', 'React Three Fiber', 'WebGL (Basic/Intermediate)'],
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Tools & Workflow',
      icon: <Terminal className="w-6 h-6 text-green-400" />,
      skills: ['Git & GitHub', 'Vite', 'Figma', 'npm / pnpm', 'ESLint & Prettier'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Backend & APIs',
      icon: <Code2 className="w-6 h-6 text-yellow-400" />,
      skills: ['REST APIs', 'Firebase', 'Supabase', 'Basic Auth & Data Handling'],
      color: 'from-yellow-500 to-orange-500',
    }
  ];

  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Freelance & Independent Projects',
      period: '2024 - Present',
      bullets: [
        'Developed high-performance landing pages and web applications using React, Next.js, and Tailwind CSS.',
        'Implemented advanced motion design and interface transitions with Framer Motion to increase user retention.',
        'Optimized site performance for core web vitals, consistently achieving 90+ Lighthouse scores.',
        'Collaborated with clients to translate diverse brand requirements into accessible and mobile-first digital solutions.'
      ],
    },
    {
      title: 'Creative Technologist',
      company: 'Personal Development & Technical Analysis',
      period: '2023 - 2024',
      bullets: [
        'Built immersive 3D web experiences and interactive product showcases using Three.js and React Three Fiber.',
        'Architected narrative-driven scroll animations using GSAP and ScrollTrigger for complex visual storytelling.',
        'Designed and documented a library of reusable, themeable UI components to improve project consistency.',
        'Leveraged Supabase and RESTful APIs to implement lightweight backend features and real-time data handling.'
      ],
    },
    {
      title: 'UI Engineer (Intern)',
      company: 'Tech Ecosystem Collaboration',
      period: '2023 - 2023',
      bullets: [
        'Collaborated on the implementation of responsive layouts and cross-browser compatible frontend features.',
        'Assisted in refactoring legacy CSS into modern Tailwind-based utility styles to reduce bundle overhead.',
        'Participated in unit testing and accessibility audits to ensure high-quality software delivery standards.',
        'Translated complex Figma design specifications into functional, pixel-perfect React components.'
      ],
    }
  ];

  const handleSkillClick = (skillName: string) => {
    const details = skillDetails[skillName] || {
      level: 'Intermediate',
      description: `Proficient in ${skillName} with experience in building responsive and interactive features.`,
      built: ['Production-ready components', 'Scalable UI elements'],
      related: ['Modern Web Tech', 'Industry Best Practices']
    };
    setSelectedSkill({ name: skillName, ...details });
  };

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 px-6 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Experience &</span> <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="mb-20">
          <h3 className={`text-3xl font-bold text-white mb-12 text-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            Technical Skills
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {skillCategories.map((category, index) => (
              <Card
                key={category.title}
                className={`glass p-6 border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-[1.03] group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="space-y-4">
                  {/* Category header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-primary/30 transition-colors">
                      {category.icon}
                    </div>
                    <h4 className="font-bold text-white text-lg tracking-tight leading-tight">{category.title}</h4>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSkillClick(skill);
                        }}
                        className="bg-white/5 text-gray-300 border-white/5 hover:bg-primary/20 hover:text-white hover:border-primary/40 transition-all duration-300 cursor-pointer py-1 px-3 text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Gradient line */}
                  <div className={`h-1 bg-gradient-to-r ${category.color} rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-300 mt-4`} />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div>
          <h3 className={`text-3xl font-bold text-white mb-12 text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            Professional Experience
          </h3>

          <div className="space-y-8 max-w-5xl mx-auto">
            {experiences.map((exp, index) => (
              <Card
                key={exp.title}
                className={`glass p-8 border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-[1.01] group ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                style={{ transitionDelay: `${500 + index * 150}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">{exp.title}</h4>
                    <p className="text-lg text-primary font-semibold">{exp.company}</p>
                  </div>
                  <Badge variant="outline" className="border-accent/50 text-accent w-fit mt-2 md:mt-0 px-4 py-1 text-sm bg-accent/5">
                    {exp.period}
                  </Badge>
                </div>

                <ul className="space-y-3">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-lg leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover effect line */}
                <div className="h-0.5 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full mt-8 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </Card>
            ))}
          </div>
        </div>

        {/* Skill Detail Dialog */}
        <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
          <DialogContent className="glass border-white/10 max-w-lg text-white">
            {selectedSkill && (
              <div className="space-y-6">
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-3xl font-bold text-gradient">
                      {selectedSkill.name}
                    </DialogTitle>
                    <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4">
                      {selectedSkill.level}
                    </Badge>
                  </div>
                  <DialogDescription className="text-gray-300 text-lg leading-relaxed pt-4">
                    {selectedSkill.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-accent" /> Key Contributions
                  </h4>
                  <ul className="space-y-3">
                    {selectedSkill.built.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                        <span className="text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-lg font-bold text-white">Associated Workflow</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.related.map((item: string) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="bg-white/5 text-gray-300 border-white/10 px-3"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Background decorations */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
      </div>
    </section>
  );
};

export default ExperienceSection;