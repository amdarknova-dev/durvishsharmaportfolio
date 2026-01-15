import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useSound } from '@/context/SoundContext';
import { useHack } from '@/context/HackContext';
import { Terminal } from 'lucide-react';
import { useWeather } from '@/context/WeatherContext';
import { useAchievements } from '@/context/AchievementContext';

const HeroTerminal = () => {
    const { unlockAchievement } = useAchievements();
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>(['> Welcome to Durvish_OS v2.4. Type "help" to start.']);
    const { isAdmin, setIsAdmin } = useHack(); // Use global state
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { toast } = useToast();
    const { playClick, playWhoosh } = useSound();
    const { condition } = useWeather();

    const handleCommand = (cmd: string) => {
        const command = cmd.trim().toLowerCase();
        let output = '';

        // Check for specific multi-word commands first
        if (command === 'sudo su') {
            setIsAdmin(true);
            output = 'ACCESS GRANTED. Welcome back, Administrator.';
            toast({
                title: "ROOT ACCESS UNLOCKED 🔓",
                description: "You now have full system control.",
                className: "bg-red-900 border-red-500 text-white",
            });
            setHistory(prev => [...prev, `> ${cmd}`, output]);
            return;
        }

        switch (command) {
            case 'help':
                output = isAdmin
                    ? 'ROOT COMMANDS: dashboard, nuclear_launch, system_reset, exit_root'
                    : 'NAVIGATION: home, projects, about, contact, blog, lab, beyond\nSYSTEM: login, clear, sudo, whoami, date, ls, play';
                break;
            case 'home':
            case 'cd ~':
            case 'cd /':
                output = 'Returning to HOME...';
                playWhoosh();
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 500);
                break;
            case 'login':
                output = 'Initiating Secure Login Sequence...';
                setTimeout(() => navigate('/login'), 800);
                break;
            case 'projects':
                output = 'Navigating to Projects Section...';
                playWhoosh();
                setTimeout(() => {
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 800);
                break;
            case 'blog':
            case 'cd blog':
                output = 'Opening BLOG...';
                playWhoosh();
                setTimeout(() => navigate('/blog'), 800);
                break;
            case 'lab':
            case 'the lab':
            case 'cd lab':
                output = 'Entering THE LAB...';
                playWhoosh();
                setTimeout(() => navigate('/lab'), 800);
                break;
            case 'beyond':
            case 'beyond work':
            case 'cd beyond':
                output = 'Navigating to BEYOND WORK...';
                playWhoosh();
                setTimeout(() => navigate('/beyond-work'), 800);
                break;
            case 'dashboard':
                if (isAdmin) {
                    output = 'Opening Command Center...';
                    setTimeout(() => navigate('/dashboard'), 800);
                } else {
                    output = 'PERMISSION DENIED. Admin access required.';
                }
                break;
            case 'about':
                output = 'Redirecting to About Me...';
                playWhoosh();
                setTimeout(() => navigate('/about-me'), 800);
                break;
            case 'contact':
                output = 'Opening secure channel...';
                playWhoosh();
                setTimeout(() => navigate('/contact'), 800);
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'sudo':
                output = 'Usage: sudo [command]. Try "sudo su" to login as root.';
                break;
            case 'ghost':
                output = 'SEARCHING FOR GHOST... [FOUND]';
                console.log("%c 👻 GHOST IN THE MACHINE %c\n\n      .---. \n     /     \\ \n    | (O) (O) | \n    |   \\_/   | \n     \\  ___  / \n      '---' \n\n Achievement Unlocked: Found the hidden ASCII! ", "color: green; font-size: 20px; font-weight: bold;", "color: gray;");
                unlockAchievement('ghost-in-machine');
                break;
            case 'sudo override':
                if (isAdmin) {
                    output = 'OVERRIDING SYSTEM ACCENT... [COMPLETE]';
                    document.documentElement.style.setProperty('--primary', '0 100% 50%'); // Red override
                    toast({
                        title: "SYSTEM OVERRIDE",
                        description: "Accent color shifted to Crimson.",
                    });
                } else {
                    output = 'ROOT PRIVILEGES REQUIRED.';
                }
                break;
            case 'whoami':
                output = isAdmin ? 'root@durvish-portfolio: (superuser)' : 'user@guest-session: active';
                break;
            case 'date':
            case 'time':
                output = new Date().toLocaleString();
                break;
            case 'ls':
            case 'dir':
                output = 'Available pages:\n  /home\n  /projects\n  /about\n  /contact\n  /blog\n  /lab\n  /beyond-work\n  /dashboard (admin)';
                break;
            case 'exit_root':
                if (isAdmin) {
                    setIsAdmin(false);
                    output = 'Logged out of root session.';
                } else {
                    output = 'Command not found.';
                }
                break;
            case 'nuclear_launch':
                if (isAdmin) {
                    output = '⚠️ LAUNCH CODES REQUIRED. Just kidding. (Secret Achievement Unlocked!)';
                } else {
                    output = 'Permission denied.';
                }
                break;
            case 'play':
                output = 'Launching EASTER_EGG_GAME.exe... (Just kidding, try the Konami Code instead!)';
                break;
            case 'matrix':
                output = 'Wake up, Neo... The Matrix has you... 🐇';
                break;
            case 'credits':
                output = 'Built with ❤️ by Durvish Sharma\nStack: React + TypeScript + Three.js + Framer Motion';
                break;
            case 'weather':
                output = `Current condition: ${condition.toUpperCase()}`;
                break;
            default:
                output = `Command not found: "${command}". Type "help" for valid commands.`;
        }

        setHistory(prev => [...prev, `> ${cmd}`, output]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
            playClick();
        }
    };

    // Auto-scroll to bottom of terminal
    useEffect(() => {
        const terminalContent = document.getElementById('terminal-content');
        if (terminalContent) terminalContent.scrollTop = terminalContent.scrollHeight;
    }, [history]);

    return (
        <div
            className={`w-full max-w-lg mt-8 bg-black/80 border ${isAdmin ? 'border-red-500/30' : 'border-white/20'} rounded-lg p-3 md:p-4 font-mono text-xs md:text-sm shadow-2xl backdrop-blur-md relative overflow-hidden group cursor-text transition-colors duration-500 ${condition === 'storm' ? 'glitch-active' : ''}`}
            onClick={() => inputRef.current?.focus()}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2 text-gray-400">
                    <Terminal className={`w-4 h-4 ${isAdmin ? 'text-red-500' : ''}`} />
                    <span className={`text-xs ${isAdmin ? 'text-red-400 font-bold' : ''}`}>
                        {isAdmin ? 'root@durvish-portfolio:~' : 'guest@durvish-portfolio:~'}
                    </span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
            </div>

            {/* Output */}
            <div id="terminal-content" className={`h-32 overflow-y-auto space-y-1 mb-2 scrollbar-hide ${isAdmin ? 'text-red-400/90' : 'text-green-400/90'}`}>
                {history.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>

            {/* Input Line */}
            <div className={`flex items-center gap-2 ${isAdmin ? 'text-red-500' : 'text-primary'}`}>
                <span>{isAdmin ? '#' : '$'}</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-600 font-mono"
                    placeholder={isAdmin ? "Awaiting root command..." : "Type 'help'..."}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                />
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-20" />
        </div>
    );
};

export default HeroTerminal;
