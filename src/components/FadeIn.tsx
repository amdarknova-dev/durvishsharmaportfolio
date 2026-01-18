import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
    fullWidth?: boolean;
}

const FadeIn = ({
    children,
    delay = 0,
    duration = 0.8,
    className = "",
    direction = 'up',
    fullWidth = false
}: FadeInProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const getDirectionOffset = () => {
        switch (direction) {
            case 'up': return { y: 40, x: 0 };
            case 'down': return { y: -40, x: 0 };
            case 'left': return { x: 40, y: 0 };
            case 'right': return { x: -40, y: 0 };
            default: return { y: 40, x: 0 };
        }
    };

    const offset = getDirectionOffset();

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                x: offset.x,
                y: offset.y
            }}
            animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0
            } : {
                opacity: 0,
                x: offset.x,
                y: offset.y
            }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98] // Smooth ease-out-quart-ish
            }}
            className={className}
            style={{ width: fullWidth ? '100%' : 'auto' }}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
