
import React, { useEffect, useRef, useState } from 'react';
import SkillConstellation from './SkillConstellation';
import { useTranslation } from 'react-i18next';
import { useMobile } from '@/hooks/useMobile';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';

const skillsList = [
    { name: 'JavaScript', category: 'Frontend', color: '#F7DF1E' },
    { name: 'TypeScript', category: 'Frontend', color: '#3178C6' },
    { name: 'React', category: 'Frontend', color: '#61DAFB' },
    { name: 'Next.js', category: 'Frontend', color: '#FFFFFF' },
    { name: 'Three.js', category: 'Creative', color: '#FFFFFF' },
    { name: 'GSAP', category: 'Creative', color: '#88CE02' },
    { name: 'Framer Motion', category: 'Creative', color: '#0055FF' },
    { name: 'Tailwind CSS', category: 'Frontend', color: '#38B2AC' },
    { name: 'Node.js', category: 'Backend', color: '#339933' },
    { name: 'SQL', category: 'Backend', color: '#4479A1' },
    { name: 'Git', category: 'Tools', color: '#F05032' },
    { name: 'Figma', category: 'Tools', color: '#F24E1E' },
];

const SkillsSection = () => {
    const { t } = useTranslation();
    const isMobile = useMobile();
    const [isVisible, setIsVisible] = useState(false);
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

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="relative py-48 px-6 bg-[#050505] min-h-[90vh] flex flex-col items-center overflow-hidden scroll-mt-24 md:scroll-mt-32">
            {/* Minimal Header */}
            <div className={`text-center mb-32 transition-all duration-1000 z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] mb-6 block">Capabilities</span>
                <h2 className="text-6xl md:text-[8rem] font-black mb-8 tracking-tighter text-white uppercase leading-none">
                    Tech <br />
                    <span className="text-gradient">Arsenal</span>
                </h2>
                <p className="mt-8 text-gray-500 text-lg max-w-xl mx-auto font-light leading-relaxed">
                    {t('skills.description')}
                </p>
            </div>

            {/* Cinematic Container */}
            <div className={`w-full max-w-6xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
                {isMobile ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 py-12 glass-premium rounded-[3rem] border border-white/5">
                        {skillsList.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="flex flex-col items-center group"
                            >
                                <div className="w-20 h-20 rounded-full glass-premium border border-white/10 flex items-center justify-center mb-4 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                    <div
                                        className="w-3 h-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                        style={{ backgroundColor: skill.color }}
                                    />
                                </div>
                                <span className="text-white font-bold text-center text-xs tracking-widest uppercase mb-1">{skill.name}</span>
                                <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-mono">{skill.category}</span>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="relative h-[600px] flex items-center justify-center">
                        <div className="absolute inset-0 -z-10 opacity-60">
                            <SkillConstellation />
                        </div>
                        {/* Centered HUD Element */}
                        <div className="glass-premium p-10 rounded-[2.5rem] border border-white/5 text-center space-y-4 max-w-sm backdrop-blur-3xl">
                            <h4 className="text-white font-black text-2xl uppercase tracking-tighter italic leading-none">Multiplex <br /> Environment</h4>
                            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Hover nodes to reveal transmission details</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Visual Depth */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.03),transparent_70%)] -z-10 pointer-events-none" />
        </section>
    );
};

export default SkillsSection;
