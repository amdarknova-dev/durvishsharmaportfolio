import React, { useEffect, useRef, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

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
            question: "What services do you offer?",
            answer: "I specialize in frontend development, creating responsive web applications, interactive user interfaces, and immersive 3D web experiences using modern frameworks and motion tools."
        },
        {
            question: "Are you open to freelance or full-time opportunities?",
            answer: "Yes, I am currently available for freelance projects, contractual work, and full-time positions where I can contribute to building high-quality digital products."
        },
        {
            question: "What technologies do you specialize in?",
            answer: "My core expertise lies in React, Next.js, and TypeScript, combined with motion libraries like GSAP and Framer Motion, and 3D integration via React Three Fiber."
        },
        {
            question: "Can you collaborate with designers or teams?",
            answer: "I have significant experience working with Figma designs and collaborating closely with design teams to ensure pixel-perfect implementation and maintain visual consistency across platforms."
        },
        {
            question: "Do you take on small or short-term projects?",
            answer: "Yes, I am open to discussing projects of all sizes, including short-term landing pages, specific feature implementations, or UI/UX performance optimizations."
        },
        {
            question: "How do people usually contact you?",
            answer: "The best way to reach me is through the contact form on this website or by sending an email directly. I typically respond to all inquiries within 24 hours."
        },
        {
            question: "Are you open to learning new tools or stacks?",
            answer: "As a developer, I am committed to continuous learning and am always open to expanding my skill set to meet the specific technical requirements of a project or team."
        }
    ];

    return (
        <section id="faq" ref={sectionRef} className="relative py-32 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Section header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-white">Frequently Asked</span> <span className="text-gradient">Questions</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                </div>

                {/* FAQ Accordion */}
                <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="glass border-white/10 px-6 rounded-xl hover:border-primary/30 transition-all duration-300"
                            >
                                <AccordionTrigger className="text-left text-lg md:text-xl font-medium text-white hover:no-underline hover:text-primary transition-colors py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-400 text-lg leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Background decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg max-h-lg bg-primary/5 rounded-full blur-[120px] -z-10" />
            </div>
        </section>
    );
};

export default FAQSection;
