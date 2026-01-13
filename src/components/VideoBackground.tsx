import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoBackgroundProps {
    videoSrc: string;
    fallbackImage: string;
    opacity?: number;
    className?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
    videoSrc,
    fallbackImage,
    opacity = 0.3,
    className = '',
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleCanPlay = () => {
            setIsLoaded(true);
            video.play().catch((err) => {
                console.warn('Video autoplay failed:', err);
                setHasError(true);
            });
        };

        const handleError = () => {
            console.warn('Video failed to load');
            setHasError(true);
        };

        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('error', handleError);

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('error', handleError);
        };
    }, []);

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {/* Fallback Image */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: hasError || !isLoaded ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${fallbackImage})` }}
            />

            {/* Video Background */}
            <motion.video
                ref={videoRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded && !hasError ? opacity : 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="auto"
            >
                <source src={videoSrc} type="video/webm" />
                <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
            </motion.video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black pointer-events-none" />

            {/* Vignette Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />
        </div>
    );
};

export default VideoBackground;
