
import React, { useEffect, useRef, useState } from 'react';
import SkillConstellation from './SkillConstellation';
import { useCommentary } from '@/context/CommentaryContext';
import Hotspot from './DirectorMode/Hotspot';
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
    const { isCommentaryOpen } = useCommentary();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="relative py-20 px-6 min-h-[80vh] flex flex-col justify-center items-center overflow-hidden">
            {/* Direct Comment Hotspot */}
            <div className="absolute top-10 right-10 z-30">
                <Hotspot
                    title="3D Force Graph"
                    description="Instead of a standard word cloud, I built a custom 3D constellation. Nodes are positioned using a partial force-directed layout logic to cluster related technologies together."
                    codeSnippet={`const connections = [\n  ['react', 'next'],\n  ['three', 'gsap']\n]; // Graph edges`}
                    placement="left"
                />
            </div>

            {/* Header */}
            <div className={`text-center mb-10 transition-all duration-1000 z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                    <span className="text-white">{t('skills.title_prefix')}</span> <span className="text-gradient">{t('skills.title_suffix')}</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
                    {t('skills.description')}
                </p>
            </div>

            {/* 3D Canvas or Mobile Grid */}
            <div className={`w-full max-w-5xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
                {isMobile ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4 py-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                        {skillsList.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex flex-col items-center p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-primary/30 transition-colors"
                            >
                                <div
                                    className="w-2 h-2 rounded-full mb-3 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    style={{ backgroundColor: skill.color }}
                                />
                                <span className="text-white font-medium text-center text-sm">{skill.name}</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{skill.category}</span>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <SkillConstellation />
                )}
            </div>

            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        </section>
    );
};

export default SkillsSection;
