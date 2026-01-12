
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface SoundContextType {
    isPlaying: boolean;
    toggleSound: () => void;
    playHover: () => void;
    playClick: () => void;
    playWhoosh: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const droneOscillatorRef = useRef<OscillatorNode | null>(null);
    const droneGainRef = useRef<GainNode | null>(null);

    // Initialize Audio Context on user interaction (browser policy)
    const initAudio = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };

    const startDrone = () => {
        if (!audioContextRef.current) initAudio();
        const ctx = audioContextRef.current!;

        // Create Brown Noise for "Space Rumble"
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // (roughly) compensate for gain
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        // Lowpass filter to make it a deep drone
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 120; // Deep rumble

        const gain = ctx.createGain();
        gain.gain.value = 0.15; // Increased volume

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start();

        // Store references to stop later (we're cheating a bit by not using the refs perfectly for the noise node itself in this simple implementation, but gain is enough to mute)
        // Actually, let's store the noise node to stop it properly if we wanted, but standard "stop" is usually just gain=0 or disconnect. 
        // For specific toggling, let's keep it simple: we recreate on start, stop on stop.
        // Ideally we track the source node.
        (noise as any).stopNode = noise;
        droneGainRef.current = gain;
        droneOscillatorRef.current = noise as any;
    };

    const stopDrone = () => {
        if (droneGainRef.current) {
            // Fade out
            const ctx = audioContextRef.current;
            if (ctx) {
                droneGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
                setTimeout(() => {
                    if (droneOscillatorRef.current) {
                        (droneOscillatorRef.current as any).stopNode?.stop();
                        droneOscillatorRef.current = null;
                    }
                }, 500);
            }
        }
    };

    const toggleSound = () => {
        if (isPlaying) {
            stopDrone();
            setIsPlaying(false);
        } else {
            initAudio();
            startDrone();
            setIsPlaying(true);
        }
    };

    // SFX Generators
    const playHover = () => {
        if (!isPlaying || !audioContextRef.current) return;
        const ctx = audioContextRef.current;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    };

    const playClick = () => {
        if (!isPlaying || !audioContextRef.current) return;
        const ctx = audioContextRef.current;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    };

    const playWhoosh = () => {
        if (!isPlaying || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        // White noise burst for "whoosh"
        const bufferSize = ctx.sampleRate * 0.5; // 0.5 seconds
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
    };

    return (
        <SoundContext.Provider value={{ isPlaying, toggleSound, playHover, playClick, playWhoosh }}>
            {children}
        </SoundContext.Provider>
    );
};
