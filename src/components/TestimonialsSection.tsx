
import React, { useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Product Manager at TechFlow",
        content: "Durvish delivered an exceptional website that exceeded our expectations. His attention to detail and ability to bring our vision to life was impressive. The cinematic feel he added to our landing page increased our conversion by 200%.",
        avatar: "S",
        rating: 5
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Founder, StartUp Inc",
        content: "Working with Durvish was a seamless experience. He is not just a developer but a creative partner. The 3D interactions he built are buttery smooth and truly world-class. Highly recommended for any premium web projects.",
        avatar: "M",
        rating: 5
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "Creative Director",
        content: "I've worked with many developers, but Durvish's eye for design makes him unique. He understands motion, timing, and aesthetics as well as he understands code. A rare find in the industry.",
        avatar: "E",
        rating: 5
    },
    {
        id: 4,
        name: "James Wilson",
        role: "CTO at FutureTech",
        content: "The level of polish in Durvish's code is outstanding. Scalable, maintainable, and remarkably fast. He optimized our heavy assets and improved our Core Web Vitals score to 99.",
        avatar: "J",
        rating: 5
    }
];

const TestimonialsSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.05 } // Lowered for better visibility
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="testimonials" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-0'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-white">Client</span> <span className="text-gradient">Stories</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Hear from the visionaries and leaders I've had the privilege to collaborate with.
                    </p>
                </div>

                {/* Carousel */}
                <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-0'}`}>
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 py-4">
                                    <div className="h-full">
                                        <div className="relative group h-full">
                                            {/* Holographic Card Effect */}
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                                            <Card className="relative h-full bg-black/40 backdrop-blur-xl border-white/10 overflow-hidden group-hover:bg-black/60 transition-colors duration-500">
                                                {/* Glowing corner accents */}
                                                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                <CardContent className="p-8 flex flex-col h-full">
                                                    <Quote className="w-10 h-10 text-primary/40 mb-6 group-hover:text-primary transition-colors duration-300 transform group-hover:-translate-y-2" />

                                                    <p className="text-gray-300 mb-8 flex-grow leading-relaxed italic z-10 relative">
                                                        "{testimonial.content}"
                                                    </p>

                                                    <div className="flex items-center gap-4 mt-auto">
                                                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                                                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.name}`} />
                                                            <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <h4 className="font-bold text-white group-hover:text-primary transition-colors">{testimonial.name}</h4>
                                                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                                                        </div>
                                                    </div>

                                                    {/* Rating Stars */}
                                                    <div className="absolute top-8 right-8 flex gap-0.5">
                                                        {[...Array(testimonial.rating)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/50 transition-colors"
                                onClick={() => emblaApi?.scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
