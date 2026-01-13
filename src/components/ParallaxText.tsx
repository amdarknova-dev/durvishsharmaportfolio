import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxTextProps {
    children: string;
    speed?: number;
    className?: string;
}

const ParallaxText = ({ children, speed = 0.5, className = "" }: ParallaxTextProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
    const ySmooth = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            ref={ref}
            style={{ y: ySmooth }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

interface SplitParallaxTextProps {
    text: string;
    className?: string;
}

export const SplitParallaxText = ({ text, className = "" }: SplitParallaxTextProps) => {
    const words = text.split(' ');
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    return (
        <div ref={ref} className={`flex flex-wrap justify-center gap-2 md:gap-4 ${className}`}>
            {words.map((word, index) => {
                // Different speeds for different words to create depth
                const baseSpeed = 0.3;
                const speedVariation = (index % 3) * 0.15; // 0, 0.15, 0.3
                const y = useTransform(
                    scrollYProgress,
                    [0, 1],
                    [100 * (baseSpeed + speedVariation), -100 * (baseSpeed + speedVariation)]
                );
                const ySmooth = useSpring(y, { stiffness: 100, damping: 30 });

                return (
                    <motion.span
                        key={index}
                        style={{ y: ySmooth }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                );
            })}
        </div>
    );
};

export default ParallaxText;
