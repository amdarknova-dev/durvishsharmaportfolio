import React from 'react';

const CinematicOverlay = () => {
    return (
        <div className="fixed inset-0 z-[9998] pointer-events-none mix-blend-overlay">
            {/* Film Grain */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise_overlay.png')] animate-grain" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

            {/* Scanlines (very subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_4px,3px_100%]" />
        </div>
    );
};

export default CinematicOverlay;
