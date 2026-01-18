import React from 'react';

interface RollingTextProps {
    text: string;
    className?: string;
}

const RollingText = ({ text, className = "" }: RollingTextProps) => {
    return (
        <div className={`relative overflow-hidden h-[1.3em] flex flex-col items-center justify-start ${className}`}>
            <span
                className="block h-full transition-transform duration-500 group-hover:-translate-y-full"
                style={{ transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
            >
                {text}
            </span>
            <span
                className="absolute top-full block h-full transition-transform duration-500 group-hover:-translate-y-full text-primary font-bold"
                style={{ transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
            >
                {text}
            </span>
        </div>
    );
};

export default RollingText;
