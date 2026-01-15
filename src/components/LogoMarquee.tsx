import React from 'react';
import { motion } from 'framer-motion';

const logos = [
    { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Tailwind', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg' },
    { name: 'Three.js', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Three.js_Icon.svg' },
    { name: 'Framer', url: 'https://www.vectorlogo.zone/logos/framer/framer-icon.svg' },
    { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];

const LogoMarquee = () => {
    return (
        <div className="relative w-full overflow-hidden bg-black/20 py-10 border-y border-white/5 backdrop-blur-sm">
            <div className="flex w-fit">
                <motion.div
                    animate={{
                        x: [0, -1000],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        },
                    }}
                    className="flex whitespace-nowrap gap-20 items-center px-10"
                >
                    {/* Duplicate the logos to create the infinite effect */}
                    {[...logos, ...logos, ...logos].map((logo, index) => (
                        <div
                            key={`${logo.name}-${index}`}
                            className="flex items-center gap-4 group transition-all duration-300"
                        >
                            <div className="w-12 h-12 relative flex items-center justify-center grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                                <img
                                    src={logo.url}
                                    alt={logo.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="text-gray-600 font-mono text-sm tracking-widest uppercase group-hover:text-white transition-colors">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Gradient overlays for smooth fade edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#11161d] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#11161d] to-transparent z-10" />
        </div>
    );
};

export default LogoMarquee;
