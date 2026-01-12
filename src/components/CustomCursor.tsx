
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    // Current mouse position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation for the main cursor
    const springConfig = { damping: 25, stiffness: 150 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Trail logic
    const TRAIL_LENGTH = 12;
    const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
    const historyRef = useRef<{ x: number, y: number }[]>([]);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Update main framer motion values
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Shift history
            historyRef.current.unshift({ x: e.clientX, y: e.clientY });
            // Keep history limited
            if (historyRef.current.length > TRAIL_LENGTH) {
                historyRef.current.pop();
            }

            // Update trail elements
            trailRefs.current.forEach((el, index) => {
                if (el && historyRef.current[index]) {
                    const point = historyRef.current[index];
                    el.style.transform = `translate(${point.x}px, ${point.y}px) scale(${1 - index / TRAIL_LENGTH})`;
                    el.style.opacity = `${1 - index / TRAIL_LENGTH}`;
                }
            });
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Main Cursor (White Dot) */}
            <motion.div
                className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            {/* Ghost Trail (Sparks) */}
            {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => { if (el) trailRefs.current[i] = el; }}
                    className="absolute top-0 left-0 w-2 h-2 rounded-full bg-primary/60 blur-[1px]"
                    style={{
                        transform: 'translate(-100px, -100px)', // Initial off-screen
                        transition: 'transform 0.05s linear', // Micro-transition for smoothness
                        marginLeft: '-4px', // Center offset
                        marginTop: '-4px'
                    }}
                />
            ))}

            {/* Large Glow Follower (Lazy) */}
            <motion.div
                className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
                style={{
                    x: cursorX, // No spring, just direct or lazier spring if you want
                    y: cursorY,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
                animate={{
                    x: cursorX.get() - 64,
                    y: cursorY.get() - 64
                }}
            />
        </div>
    );
};

export default CustomCursor;
