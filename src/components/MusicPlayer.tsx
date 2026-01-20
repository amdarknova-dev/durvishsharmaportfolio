import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, Play, Pause, SkipForward, SkipBack, Volume2, Music, X } from 'lucide-react';
import { useSound } from '@/context/SoundContext';

// Simulated Playlist
const PLAYLIST = [
    { id: 1, title: "Neon Nights", artist: "Cyber Dream", duration: "6:12", cover: "bg-purple-500", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { id: 2, title: "System Core", artist: "Mainframe", duration: "7:00", cover: "bg-green-500", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
    { id: 3, title: "Void Walker", artist: "Null Pointer", duration: "5:25", cover: "bg-blue-500", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" },
    { id: 4, title: "Data Stream", artist: "Bit Flow", duration: "4:00", cover: "bg-orange-500", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" },
];

const MusicPlayer = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-music-player', handleOpen);
        return () => window.removeEventListener('open-music-player', handleOpen);
    }, []);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [progress, setProgress] = useState(0);
    const { playClick, playHover } = useSound();

    // Real Audio Ref
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying, currentTrack]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            if (duration) {
                setProgress((current / duration) * 100);
            }
        }
    };

    const handleEnded = () => {
        nextTrack();
    };

    const togglePlay = () => {
        playClick();
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        playClick();
        setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        playClick();
        setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
        setIsPlaying(true);
    };

    const track = PLAYLIST[currentTrack];

    return (
        <>
            <audio
                ref={audioRef}
                src={track.src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />

            {/* Toggle Button (Visible when closed) */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { playClick(); setIsOpen(true); }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-lg group hover:border-primary/50 transition-all"
                    >
                        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-primary animate-pulse' : 'bg-gray-500'}`} />
                        <Music className="w-4 h-4 text-white" />
                        <span className="text-xs font-medium text-white max-w-[100px] truncate hidden md:block">
                            {isPlaying ? track.title : "Music Player"}
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Expanded Player */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%', top: '50%', left: '50%' }}
                        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%', top: '50%', left: '50%' }}
                        exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%', top: '50%', left: '50%' }}
                        className="fixed z-50 w-[90vw] max-w-sm"
                    >
                        <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden relative">
                            {/* Background Blur */}
                            <div className={`absolute top-0 left-0 w-full h-full opacity-20 blur-3xl transition-colors duration-1000 ${track.cover}`} />

                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="flex gap-4 items-center relative z-10">
                                {/* Album Art */}
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${track.cover}`}>
                                    <Disc className={`w-8 h-8 text-white/80 ${isPlaying ? 'animate-spin-slow' : ''}`} />
                                </div>

                                {/* Info */}
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="text-white font-bold truncate">{track.title}</h4>
                                    <p className="text-xs text-gray-400 truncate">{track.artist}</p>

                                    {/* Progress Bar (Real) */}
                                    <div className="mt-3 w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const clickX = e.clientX - rect.left;
                                        const width = rect.width;
                                        const percent = clickX / width;
                                        if (audioRef.current) {
                                            audioRef.current.currentTime = percent * audioRef.current.duration;
                                        }
                                    }}>
                                        <motion.div
                                            className="h-full bg-white relative"
                                            style={{ width: `${progress}%` }}
                                        >
                                            {isPlaying && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-between mt-4 px-2 relative z-10">
                                <button className="text-gray-400 hover:text-white" onClick={() => setVolume(v => Math.max(0, v - 0.1))}>
                                    <Volume2 className={`w-4 h-4 ${volume === 0 ? 'text-gray-600' : ''}`} />
                                </button>

                                <div className="flex items-center gap-4">
                                    <button onClick={prevTrack} className="text-white hover:text-primary transition-colors">
                                        <SkipBack className="w-5 h-5 fill-current" />
                                    </button>
                                    <button
                                        onClick={togglePlay}
                                        className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-5 h-5 fill-current" />
                                        ) : (
                                            <Play className="w-5 h-5 fill-current ml-0.5" />
                                        )}
                                    </button>
                                    <button onClick={nextTrack} className="text-white hover:text-primary transition-colors">
                                        <SkipForward className="w-5 h-5 fill-current" />
                                    </button>
                                </div>

                                <span className="text-xs text-gray-500 w-8 text-right font-mono">{track.duration}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MusicPlayer;
