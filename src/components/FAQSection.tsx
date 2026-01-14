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
            question: "What kind of developer are you?",
            answer: "I’m a frontend-focused developer who enjoys building clean, modern, and interactive web experiences. I mainly work on responsive UI, animations, and performance-focused interfaces."
        },
        {
            question: "What technologies do you work with?",
            answer: "I primarily use HTML, CSS, JavaScript, React, and Tailwind CSS. For animations and visuals, I work with Framer Motion, GSAP, and occasionally Three.js for 3D interactions."
        },
        {
            question: "Are you open to freelance or full-time opportunities?",
            answer: "Yes. I’m open to freelance projects, internships, contract work, and full-time opportunities where I can grow, contribute, and work on meaningful products."
        },
        {
            question: "What type of projects do you usually take on?",
            answer: "I enjoy working on portfolio websites, landing pages, dashboards, interactive web experiences, and small web-based games. I’m also open to collaborating on early-stage product ideas."
        },
        {
            question: "Can you work with designers or teams?",
            answer: "Yes. I’m comfortable collaborating with designers, developers, and product teams. I can translate design files into clean, responsive, and accessible code."
        },
        {
            question: "Do you only work on frontend?",
            answer: "My main focus is frontend development, but I have basic experience working with APIs, authentication, and backend services like Firebase or Supabase when required."
        },
        {
            question: "Are you willing to learn new technologies?",
            answer: "Absolutely. I enjoy learning new tools and frameworks when a project requires it. I believe adaptability and continuous learning are essential in modern development."
        },
        {
            question: "How can someone contact you?",
            answer: "You can reach me directly through the contact form below. I usually respond within a short time."
        },
        {
            question: "Are your projects personal or client-based?",
            answer: "Most projects showcased here are personal, freelance, or concept-based projects created to explore real-world problems, design systems, and modern web technologies."
        },
        {
            question: "What are you currently focused on improving?",
            answer: "I’m currently improving my skills in advanced React patterns, motion design, performance optimization, and creating more interactive web experiences."
        },
        {
            question: "Are you available for collaboration?",
            answer: "Yes. I’m always open to collaborating with like-minded developers, designers, and creators on interesting ideas and projects."
        }
    ];

    return (
        <section id="faq" ref={sectionRef} className="relative py-32 px-6 scroll-mt-24 md:scroll-mt-32">
            <div className="max-w-4xl mx-auto">
                {/* Section header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-0'
                    }`}>
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-white">Frequently Asked</span> <span className="text-gradient">Questions</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                </div>

                {/* FAQ Accordion */}
                <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-0'
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
