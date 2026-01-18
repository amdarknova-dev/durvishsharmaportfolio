import React from 'react';
import { motion } from 'framer-motion';

interface CinematicTextProps {
    text: string;
    className?: string;
    delay?: number;
}

const CinematicText = ({ text, className = "", delay = 0 }: CinematicTextProps) => {
    // Split text into words, then characters for granular control
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: -20,
            y: 10,
            scale: 1.5,
            filter: "blur(10px)",
        },
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    style={{ marginRight: "0.25em", display: "inline-block" }}
                >
                    {word.split("").map((character, index) => (
                        <motion.span
                            style={{ display: "inline-block" }}
                            variants={child}
                            key={index}
                        >
                            {character}
                        </motion.span>
                    ))}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default CinematicText;
