import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
}

const SpotlightCard = ({ children, className = "" }: SpotlightCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        const card = cardRef.current;
        if (card) {
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseenter', () => setIsHovered(true));
            card.addEventListener('mouseleave', () => setIsHovered(false));
        }

        return () => {
            if (card) {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseenter', () => setIsHovered(true));
                card.removeEventListener('mouseleave', () => setIsHovered(false));
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`relative overflow-hidden rounded-2xl group ${className}`}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 197, 94, 0.15), transparent 40%)`
                }}
            />

            {/* Glowing Border */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                style={{
                    maskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 70%)`,
                    WebkitMaskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 70%)`
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default SpotlightCard;
