import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '@/context/SoundContext';

// Define SpeechRecognition types
interface IWindow extends Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
}

export const useNova = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const navigate = useNavigate();
    const { playHover, playClick } = useSound();

    // Use a ref to keep the recognition instance stable
    const recognitionRef = useRef<any>(null);

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    const processCommand = useCallback((command: string) => {
        const lowerCmd = command.toLowerCase();

        // Helper for navigation
        const navigateTo = (id: string, route: string, message: string) => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return message;
            } else {
                // If not found, navigate to the route
                navigate(route);
                return `Navigating to ${message}...`;
            }
        };

        // Navigation - Looser Matching
        if (lowerCmd.includes('home') || (lowerCmd.includes('top') && lowerCmd.includes('go'))) {
            return navigateTo('home', '/', "Home Base");
        }
        if (lowerCmd.includes('about')) {
            return navigateTo('about', '/#about', "Profile Data");
        }
        if (lowerCmd.includes('skill') || lowerCmd.includes('stack') || lowerCmd.includes('tech')) {
            return navigateTo('skills', '/#skills', "Technical Arsenal");
        }
        if (lowerCmd.includes('project') || lowerCmd.includes('work') || lowerCmd.includes('portfolio')) {
            return navigateTo('projects', '/#projects', "Project Archives");
        }
        if (lowerCmd.includes('experience') || lowerCmd.includes('history')) {
            return navigateTo('experience', '/#experience', "Mission History");
        }
        if (lowerCmd.includes('contact') || lowerCmd.includes('email') || lowerCmd.includes('reach')) {
            // Contact is on a separate page
            navigate('/contact');
            return "Opening Communication Channels.";
        }
        if (lowerCmd.includes('faq') || lowerCmd.includes('question')) {
            navigateTo('faq', '/#faq', "Knowledge Base");
        }
        if (lowerCmd.includes('game') || lowerCmd.includes('play') || lowerCmd.includes('arcade')) {
            navigate('/lab');
            return "Launching Game Interface.";
        }
        if (lowerCmd.includes('blog') || lowerCmd.includes('news')) {
            navigate('/blog');
            return "Opening News Feed.";
        }
        if (lowerCmd.includes('guestbook')) {
            navigate('/guestbook');
            return "Opening Guestbook.";
        }
        if (lowerCmd.includes('leaderboard') || lowerCmd.includes('rank') || lowerCmd.includes('fame')) {
            navigate('/leaderboard');
            return "Accessing Hall of Fame.";
        }
        if (lowerCmd.includes('log') || lowerCmd.includes('change')) {
            navigate('/changelog');
            return "Accessing System Logs.";
        }
        if (lowerCmd.includes('settings') || lowerCmd.includes('control') || lowerCmd.includes('panel')) {
            window.dispatchEvent(new CustomEvent('open-system-panel'));
            return "Opening Control Panel.";
        }
        if (lowerCmd.includes('music') || lowerCmd.includes('play') || lowerCmd.includes('song')) {
            window.dispatchEvent(new CustomEvent('open-music-player'));
            return "Accessing Audio Interface.";
        }
        if (lowerCmd.includes('nexus') || lowerCmd.includes('brain') || lowerCmd.includes('search')) {
            window.dispatchEvent(new CustomEvent('open-command-center'));
            return "Opening Neural Interface.";
        }

        // Theme Commands
        if (lowerCmd.includes('dark')) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            return "Dark mode engaged.";
        }
        if (lowerCmd.includes('light')) {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            return "Light mode active (Warning: High brightness).";
        }

        // System / Identity
        if (lowerCmd.includes('status') || lowerCmd.includes('system')) {
            return "System nominal. All systems online.";
        }
        if (lowerCmd.includes('who') || lowerCmd.includes('identify')) {
            return "I am Nova. Durvish's portfolio assistant.";
        }

        // Greetings
        if (['hi', 'hello', 'hey', 'greetings', 'nova', 'yo'].some(w => lowerCmd.includes(w))) {
            return "Online. Ready for command.";
        }

        // Stop
        if (lowerCmd.includes('stop') || lowerCmd.includes('bye') || lowerCmd.includes('exit')) {
            stopListening();
            return "Terminating voice link.";
        }

        return "Command unclear. Try 'Go to Projects' or 'Contact'.";
    }, []);

    const speak = (text: string) => {
        // Cancel any current speaking
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();

        // Try to find a female/futuristic voice if possible
        const preferredVoice = voices.find(v =>
            v.name.includes('Google US English') ||
            v.name.includes('Microsoft Zira') ||
            v.name.includes('Samantha')
        ) || voices[0];

        if (preferredVoice) utterance.voice = preferredVoice;
        utterance.lang = navigator.language || 'en-US';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    };

    const startListening = () => {
        if (isListening) {
            stopListening();
            return;
        }

        const windowObj = window as unknown as IWindow;
        const SpeechRecognition = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setResponse("Voice requires Chrome/Edge. Use Text Mode ⌨️");
            return;
        }

        // Initialize only if not already done (though we recreate on start to ensure fresh state/handlers)
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        recognition.continuous = false;
        // Use browser language if available (e.g. en-IN), otherwise default to en-US
        recognition.lang = navigator.language || 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
            playClick(); // SFX
            setResponse("Listening...");
        };

        recognition.onresult = (event: any) => {
            const last = event.results.length - 1;
            const text = event.results[last][0].transcript;
            setTranscript(text);

            // Process command
            const reply = processCommand(text);
            setResponse(reply);
            speak(reply);
        };

        recognition.onend = () => {
            setIsListening(false);
            // Optional: restart if we want continuous listening, but for now manual toggle is safer
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);

            if (event.error === 'not-allowed') {
                setResponse("Microphone blocked. Allow in settings.");
            } else if (event.error === 'no-speech') {
                setResponse("No speech detected.");
            } else if (event.error === 'network') {
                setResponse("Browser speech service offline. Restart Chrome.");
            } else {
                setResponse(`Error: ${event.error}`);
            }
        };

        try {
            recognition.start();
        } catch (e) {
            console.error("Recognition start failed", e);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const runCommand = (text: string) => {
        setTranscript(text);
        const reply = processCommand(text);
        setResponse(reply);
        speak(reply);
    };

    return {
        isListening,
        transcript,
        response,
        startListening, // Works as toggle now
        stopListening,
        processCommand,
        runCommand // Exporting for text fallback
    };
};
