import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
    children: React.ReactElement;
    intensity?: number; // How strong the magnet is (default 0.5)
    active?: boolean;
}

const Magnetic = ({ children, intensity = 0.5, active = true }: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!active || !ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        setPosition({
            x: distanceX * intensity,
            y: distanceY * intensity
        });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            data-magnetic="true"
            className="inline-block"
        >
            {/* Clone element to attach mouse events if needed, but wrapper is safer */}
            {children}
        </motion.div>
    );
};

export default Magnetic;
