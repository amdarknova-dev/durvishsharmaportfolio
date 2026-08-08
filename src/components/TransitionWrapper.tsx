import React from 'react';
import { motion } from 'framer-motion';

const glitchVariants = {
    initial: {
        opacity: 0,
        x: -50,
        skewX: 20,
        filter: 'blur(10px) contrast(200%) hue-rotate(90deg)',
    },
    enter: {
        opacity: 1,
        x: 0,
        skewX: 0,
        filter: 'blur(0px) contrast(100%) hue-rotate(0deg)',
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        }
    },
    exit: {
        opacity: 0,
        x: 50,
        skewX: -20,
        filter: 'blur(10px) contrast(200%) hue-rotate(-90deg)',
        transition: {
            duration: 0.4,
            ease: "easeIn"
        }
    }
};

const TransitionWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            variants={glitchVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="w-full h-full relative"
        >
            {/* Subtle RGB Split Effect Overlay during transition */}
            <motion.div 
                className="absolute inset-0 pointer-events-none mix-blend-screen z-50 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
                initial={{ opacity: 1, display: 'block' }}
                animate={{ opacity: 0, transitionEnd: { display: 'none' } }}
                transition={{ duration: 0.5 }}
            />
            {children}
        </motion.div>
    );
};

export default TransitionWrapper;
