
import React, { createContext, useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react';

interface SoundContextType {
    isPlaying: boolean;
    toggleSound: () => void;
    playHover: (x?: number) => void;
    playClick: (x?: number) => void;
    playWhoosh: () => void;
    playSuccess: () => void;
    playSpatial: (freq: number, dur: number, x: number) => void;
    playType: (x?: number) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        return {
            isPlaying: false,
            toggleSound: () => { },
            playHover: () => { },
            playClick: () => { },
            playWhoosh: () => { },
            playSuccess: () => { },
            playSpatial: () => { },
            playType: () => { },
        };
    }
    return context;
};


declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Sound priority: default to false for a clean portfolio experience
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const droneOscillatorRef = useRef<AudioBufferSourceNode | OscillatorNode | null>(null);
    const droneGainRef = useRef<GainNode | null>(null);

    // Initialize Audio Context on user interaction (browser policy)
    const initAudio = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    }, []);

    const startDrone = useCallback(() => {
        // Drone disabled for a standard portfolio experience
    }, []);

    const stopDrone = useCallback(() => {
        // Drone disabled
    }, []);

    const toggleSound = useCallback(() => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            initAudio();
            setIsPlaying(true);
        }
    }, [isPlaying, initAudio]);


    // SFX Generators
    const playSpatial = useCallback((freq: number, dur: number, x: number = 0) => {
        if (!isPlaying) return;
        if (!audioContextRef.current) initAudio();
        const ctx = audioContextRef.current;
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const panner = ctx.createPanner();

        panner.panningModel = 'equalpower';
        panner.setPosition(x, 0, 1 - Math.abs(x) / 2);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + dur);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);

        osc.connect(gain);
        gain.connect(panner);
        panner.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + dur);
    }, [isPlaying, initAudio]);

    const playHover = useCallback((x: number = 0) => {
        playSpatial(400, 0.05, x);
    }, [playSpatial]);

    const playClick = useCallback((x: number = 0) => {
        playSpatial(150, 0.1, x);
    }, [playSpatial]);

    const playWhoosh = useCallback(() => {
        if (!isPlaying) return;
        if (!audioContextRef.current) initAudio();

        const ctx = audioContextRef.current;
        if (!ctx) return;

        const bufferSize = ctx.sampleRate * 0.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, ctx.currentTime);
        filter.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.2);
        filter.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.5);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.2);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start();
    }, [isPlaying, initAudio]);

    const playSuccess = useCallback(() => {
        if (!isPlaying) return;
        if (!audioContextRef.current) initAudio();

        const ctx = audioContextRef.current;
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
        osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.6);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.8);

        const chime = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chime.type = 'sine';
        chime.frequency.setValueAtTime(800, ctx.currentTime);
        chime.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);

        chimeGain.gain.setValueAtTime(0, ctx.currentTime);
        chimeGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);

        chime.connect(chimeGain);
        chimeGain.connect(ctx.destination);
        chime.start();
        chime.stop(ctx.currentTime + 1.0);
    }, [isPlaying, initAudio]);

    const playType = useCallback((x: number = 0) => {
        playSpatial(800, 0.03, x);
    }, [playSpatial]);

    const contextValue = useMemo(() => ({
        isPlaying,
        toggleSound,
        playHover,
        playClick,
        playWhoosh,
        playSuccess,
        playSpatial,
        playType
    }), [isPlaying, toggleSound, playHover, playClick, playWhoosh, playSuccess, playSpatial, playType]);

    return (
        <SoundContext.Provider value={contextValue}>
            {children}
        </SoundContext.Provider>
    );
};
