import React from 'react';
import { motion } from 'framer-motion';

const variants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: 'blur(10px)',
        scale: 0.98
    },
    enter: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        filter: 'blur(10px)',
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

const TransitionWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
};

export default TransitionWrapper;
