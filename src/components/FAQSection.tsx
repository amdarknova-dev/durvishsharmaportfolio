import React, { useEffect, useRef, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';

const FAQSection = () => {
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

    const faqs = [
        {
            question: "What kind of developer are you?",
            answer: "I’m a creative technologist focused on crafting clean, modern, and highly interactive digital experiences. I specialize in bridging the gap between design and high-performance engineering."
        },
        {
            question: "What technologies do you work with?",
            answer: "I primarily architect with React, TypeScript, and Tailwind CSS. My creative suite includes Framer Motion, GSAP, and Three.js for immersive 3D interactions."
        },
        {
            question: "Are you open to freelance or full-time opportunities?",
            answer: "Yes. I’m currently accepting freelance projects and exploring significant full-time opportunities with forward-thinking product teams."
        },
        {
            question: "Can you collaborate with design teams?",
            answer: "Absolutely. I thrive in multidisciplinary teams and pride myself on translating complex Figma architectures into pixel-perfect, accessible code."
        }
    ];

    return (
        <section id="faq" ref={sectionRef} className="relative py-48 px-6 bg-[#050505] scroll-mt-24 md:scroll-mt-32 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                {/* Centered Minimal Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-32"
                >
                    <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] mb-6 block">Intelligence</span>
                    <h2 className="text-6xl md:text-[8rem] font-black mb-8 tracking-tighter text-white uppercase leading-none">
                        Common <br />
                        <span className="text-gradient">Queries</span>
                    </h2>
                    <p className="mt-8 text-gray-500 text-lg max-w-xl mx-auto font-light leading-relaxed">
                        Technical intelligence and procedural information.
                    </p>
                </motion.div>

                {/* Refined Accordion */}
                <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="glass-premium border border-white/5 px-8 rounded-[2rem] hover:border-primary/30 transition-all duration-500 overflow-hidden"
                            >
                                <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-white hover:no-underline hover:text-primary transition-colors py-10 uppercase tracking-tight">
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-mono text-gray-600 tracking-widest">0{index + 1}</span>
                                        {faq.question}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-400 text-lg leading-relaxed pb-8 pl-14 max-w-3xl font-light">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.02),transparent_70%)] -z-10 pointer-events-none" />
            </div>
        </section>
    );
};

export default FAQSection;
