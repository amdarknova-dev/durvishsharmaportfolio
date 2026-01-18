import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useSound } from '@/context/SoundContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import {
    Mail,
    Github,
    Chrome,
    Shield,
    Terminal as TerminalIcon,
    Activity,
    User,
    Lock,
    ArrowRight,
    Command,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [step, setStep] = useState<'login' | 'otp' | 'username' | 'admin'>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [terminalInput, setTerminalInput] = useState('');
    const [terminalLines, setTerminalLines] = useState<string[]>(['PORTFOLIO OS v2.0.4', 'Type help for commands...']);

    const { user, profile, loading, refreshProfile, setAsAdmin, loginWithMock } = useAuth();
    const { playClick, playHover, playSuccess } = useSound();
    const navigate = useNavigate();
    const { toast } = useToast();
    const terminalInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!loading && user) {
            // Check if we are mocking or real
            if (!profile?.username && !user.user_metadata?.full_name) {
                setStep('username');
            } else {
                navigate('/');
            }
        }
    }, [user, profile, loading, navigate]);

    // ... (rest of code omitted for this replaced block, assume standard hooks) ...

    // OMITTED: Terminal logic...

    // (Assume we are inside the component body, need to reach handleEmailLogin)
    // Wait, replace_file_content replaces a CONTIGUOUS BLOCK. I need to span from the useAuth call down to handleVerifyOTP potentially? That's too big.
    // I should do it in chunks.

    // Chunk 1: Update useAuth destructuring
    // Chunk 2: Update handleEmailLogin
    // Chunk 3: Update handleVerifyOTP

    // I will return the updated useAuth line first.



    // Handle terminal toggle with keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '`') {
                e.preventDefault();
                setTerminalOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (terminalOpen && terminalInputRef.current) {
            terminalInputRef.current.focus();
        }
    }, [terminalOpen]);

    const handleTerminalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = terminalInput.trim().toLowerCase();
        setTerminalLines(prev => [...prev, `> ${terminalInput}`]);

        if (cmd === 'sudo su') {
            setTerminalLines(prev => [...prev, 'ELEVATING PRIVILEGES...', 'ROOT ACCESS GRANTED.', 'OPENING ADMIN TERMINAL...']);
            setTimeout(() => {
                setStep('admin');
                setTerminalOpen(false);
                playSuccess();
            }, 1000);
        } else if (cmd === 'help') {
            setTerminalLines(prev => [...prev,
                'Available commands:',
                '',
                '  NAVIGATION:',
                '    home      - Go to home page',
                '    contact   - Go to contact page',
                '    blog      - Go to blog page',
                '    lab       - Go to The Lab',
                '    beyond    - Go to Beyond Work',
                '    dashboard - Go to Admin Dashboard',
                '',
                '  SYSTEM:',
                '    login     - Return to login form',
                '    sudo su   - Elevate to root access',
                '    clear     - Clear terminal',
                '    whoami    - Display current user',
                '    date      - Display current date/time',
                '    matrix    - ???',
                ''
            ]);
        } else if (cmd === 'clear') {
            setTerminalLines([]);
        } else if (cmd === 'login') {
            setStep('login');
        } else if (cmd === 'home' || cmd === 'cd ~' || cmd === 'cd /') {
            setTerminalLines(prev => [...prev, 'Navigating to HOME...']);
            setTimeout(() => navigate('/'), 500);
        } else if (cmd === 'contact' || cmd === 'cd contact') {
            setTerminalLines(prev => [...prev, 'Navigating to CONTACT...']);
            setTimeout(() => navigate('/contact'), 500);
        } else if (cmd === 'blog' || cmd === 'cd blog') {
            setTerminalLines(prev => [...prev, 'Navigating to BLOG...']);
            setTimeout(() => navigate('/blog'), 500);
        } else if (cmd === 'lab' || cmd === 'cd lab' || cmd === 'the lab') {
            setTerminalLines(prev => [...prev, 'Entering THE LAB...']);
            setTimeout(() => navigate('/lab'), 500);
        } else if (cmd === 'beyond' || cmd === 'beyond work' || cmd === 'cd beyond') {
            setTerminalLines(prev => [...prev, 'Navigating to BEYOND WORK...']);
            setTimeout(() => navigate('/beyond-work'), 500);
        } else if (cmd === 'dashboard' || cmd === 'admin' || cmd === 'cd dashboard') {
            setTerminalLines(prev => [...prev, 'Opening ADMIN DASHBOARD...']);
            setTimeout(() => navigate('/dashboard'), 500);
        } else if (cmd === 'whoami') {
            const username = profile?.username || user?.email || 'guest';
            setTerminalLines(prev => [...prev, `User: ${username}`, `Role: ${user ? 'authenticated' : 'guest'}`]);
        } else if (cmd === 'date' || cmd === 'time') {
            setTerminalLines(prev => [...prev, new Date().toLocaleString()]);
        } else if (cmd === 'matrix') {
            setTerminalLines(prev => [...prev,
                '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
                '⠀⠀⠀⠀⠀⢀⣠⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣄⡀⠀⠀⠀⠀⠀',
                '⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀',
                '  Wake up, Neo...',
                '  The Matrix has you...',
                ''
            ]);
        } else if (cmd === 'ls' || cmd === 'dir') {
            setTerminalLines(prev => [...prev,
                'Available routes:',
                '  /           (home)',
                '  /contact    (contact)',
                '  /blog       (blog)',
                '  /the-lab    (lab)',
                '  /beyond-work (beyond)',
                '  /dashboard  (admin)',
                '  /login      (login)'
            ]);
        } else if (cmd === 'exit' || cmd === 'quit') {
            setTerminalOpen(false);
        } else {
            setTerminalLines(prev => [...prev, `Command not found: ${cmd}`, 'Type "help" for available commands.']);
        }

        setTerminalInput('');
    };

    const handleSocialLogin = async (provider: 'google' | 'github') => {
        playClick();
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: { redirectTo: window.location.origin }
            });

            if (error) {
                // Fallback to mock if real auth fails
                console.warn("Social auth failed, using mock:", error);
                toast({ title: "DEMO MODE", description: `Simulating ${provider} login...` });
                setTimeout(async () => {
                    await loginWithMock(`${provider}_user@demo.com`);
                    playSuccess();
                    navigate('/');
                }, 1500);
            }
        } catch (err) {
            // Fallback for any other errors (e.g. adblocker, network)
            console.warn("Social auth crashed, using mock:", err);
            toast({ title: "DEMO MODE", description: `Simulating ${provider} login...` });
            setTimeout(async () => {
                await loginWithMock(`${provider}_user@demo.com`);
                playSuccess();
                navigate('/');
            }, 1500);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        playClick();

        if (email.toLowerCase() === 'admin') {
            setStep('admin');
            return;
        }

        setIsLoading(true);

        try {
            // This handles both signup and login via Magic Link as per user request for "send code"
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: { emailRedirectTo: window.location.origin }
            });

            if (error) {
                console.warn("Auth error, falling back to demo mode:", error);
                toast({ title: "DEMO MODE ENABLED", description: "Auth service unreachable. Proceeding with simulation." });
                setStep('otp');
                setIsLoading(false);
            } else {
                toast({ title: "VERIFICATION SENT", description: "Check your email for the access code." });
                setStep('otp');
                setIsLoading(false);
            }
        } catch (err) {
            console.error("Login error:", err);
            toast({ title: "DEMO MODE ENABLED", description: "Service unreachable. Proceeding with simulation." });
            setStep('otp');
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        setIsLoading(true);

        if (otp === '123456') {
            await loginWithMock(email);
            playSuccess();
            return;
        }

        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: 'magiclink'
        });

        if (error) {
            toast({ variant: "destructive", title: "INVALID CODE", description: error.message });
            setIsLoading(false);
        } else {
            playSuccess();
            // If new user, step moves to 'username' via useEffect
        }
    };

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        setIsLoading(true);

        // Legacy admin logic for "sudo su" flow
        setTimeout(() => {
            if (email.toLowerCase() === 'admin' && password === 'skywork') {
                setAsAdmin(true);
                navigate('/dashboard');
                playSuccess();
                toast({ title: "ROOT ACCESS GRANTED", description: "Welcome back, Commander." });
            } else {
                toast({ variant: "destructive", title: "ACCESS DENIED", description: "Invalid root credentials." });
                setIsLoading(false);
            }
        }, 1500);
    };

    const handleSetUsername = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newUsername.length < 3) return;
        playClick();
        setIsLoading(true);

        const { error } = await supabase
            .from('profiles')
            .upsert({ id: user?.id, username: newUsername, updated_at: new Date() });

        if (error) {
            toast({ variant: "destructive", title: "ERROR", description: "Username might be taken." });
            setIsLoading(false);
        } else {
            await refreshProfile();
            playSuccess();
            navigate('/');
        }
    };

    if (loading) return null;

    return (
        <div className="min-h-screen relative flex items-center justify-center font-outfit overflow-hidden bg-[#f0f2f5]">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00c6ff] via-[#0072ff] to-[#7f00ff] opacity-90" />
                {/* Animated Particles or Shapes */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="z-10 w-full max-w-[420px] bg-white rounded-[40px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden relative"
            >
                <div className="p-10">
                    <div className="text-center mb-10">
                        <h1 className="text-[42px] font-black text-[#333] tracking-tight">Login</h1>
                    </div>

                    <AnimatePresence mode="wait">
                        {(step === 'login' || step === 'admin') && (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#555] px-1">{step === 'admin' ? 'Root ID' : 'Username'}</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ccc] group-focus-within:text-[#0072ff] transition-colors" />
                                            <input
                                                type={step === 'admin' ? 'text' : 'email'}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={step === 'admin' ? 'Type admin name...' : 'Type your email...'}
                                                className="w-full h-[56px] bg-white border-b-2 border-[#eee] focus:border-[#0072ff] pl-12 pr-4 text-[#333] transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    {step === 'admin' && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-[#555] px-1">Password</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ccc] group-focus-within:text-[#0072ff] transition-colors" />
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Type your password..."
                                                    className="w-full h-[56px] bg-white border-b-2 border-[#eee] focus:border-[#0072ff] pl-12 pr-4 text-[#333] transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="text-right">
                                    <button
                                        onClick={() => toast({ title: "NO PASSWORD NEEDED", description: "Just enter your email and hit Login. We'll send you a magic link!" })}
                                        className="text-sm text-[#777] hover:text-[#333] transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <Button
                                    onClick={step === 'admin' ? handleAdminLogin : handleEmailLogin}
                                    disabled={isLoading}
                                    className="w-full h-[56px] rounded-full bg-gradient-to-r from-[#00c6ff] to-[#7f00ff] text-white font-bold text-lg uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    {isLoading ? 'AUTHENTICATING...' : 'LOGIN'}
                                </Button>

                                {step === 'login' && (
                                    <>
                                        <div className="text-center pt-8">
                                            <span className="text-sm text-[#777] uppercase tracking-widest font-bold">Or Sign Up Using</span>
                                        </div>

                                        <div className="flex justify-center gap-4 pt-4">
                                            <button
                                                onClick={() => handleSocialLogin('google')}
                                                className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                                            >
                                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
                                            </button>
                                            <button
                                                onClick={() => handleSocialLogin('github')}
                                                className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                                            >
                                                <Github className="w-6 h-6 text-[#333]" />
                                            </button>
                                        </div>

                                        <div className="text-center pt-10 space-y-2">
                                            <p className="text-sm text-[#777] uppercase font-bold">Or Sign Up Using</p>
                                            <button
                                                onClick={() => {
                                                    document.querySelector('input[type="email"]')?.parentElement?.classList.add('ring-2', 'ring-primary');
                                                    setTimeout(() => document.querySelector('input[type="email"]')?.parentElement?.classList.remove('ring-2', 'ring-primary'), 1000);
                                                    document.querySelector('input[type="email"]')?.focus();
                                                    toast({ title: "JOIN US", description: "Enter your email above to create a new account automatically." });
                                                }}
                                                className="text-sm text-[#333] font-black uppercase tracking-widest hover:text-[#0072ff]"
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </>
                                )}

                                {step === 'admin' && (
                                    <div className="text-center pt-4">
                                        <button
                                            onClick={() => setStep('login')}
                                            className="text-xs text-[#777] uppercase tracking-widest hover:text-red-500 transition-colors"
                                        >
                                            Return to User Access
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {step === 'otp' && (
                            <motion.div
                                key="otp"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center space-y-2">
                                    <p className="text-sm text-[#555]">Enter code sent to {email}</p>
                                    <p className="text-xs text-gray-400"> (Use 123456 for Demo)</p>
                                </div>
                                <div className="relative group">
                                    <Command className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ccc] group-focus-within:text-[#0072ff] transition-colors" />
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter code (123456)..."
                                        className="w-full h-[56px] bg-white border-b-2 border-[#eee] focus:border-[#0072ff] pl-12 pr-4 text-center text-2xl font-black tracking-[0.5em] text-[#333] outline-none"
                                    />
                                </div>
                                <Button
                                    onClick={handleVerifyOTP}
                                    disabled={isLoading}
                                    className="w-full h-[56px] rounded-full bg-[#333] text-white font-bold"
                                >
                                    VERIFY ACCESS
                                </Button>
                                <button onClick={() => setStep('login')} className="w-full text-xs text-[#777] uppercase tracking-widest">Back to Login</button>
                            </motion.div>
                        )}

                        {step === 'username' && (
                            <motion.div
                                key="username"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-[#333]">Choose Your Identity</h3>
                                    <p className="text-xs text-[#777] mt-1">This will be shown in the Hall of Fame.</p>
                                </div>
                                <div className="relative group">
                                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ccc] group-focus-within:text-[#0072ff] transition-colors" />
                                    <input
                                        type="text"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        placeholder="Enter username..."
                                        className="w-full h-[56px] bg-white border-b-2 border-[#eee] focus:border-[#0072ff] pl-12 pr-4 text-[#333] outline-none"
                                    />
                                </div>
                                <Button
                                    onClick={handleSetUsername}
                                    disabled={isLoading}
                                    className="w-full h-[56px] rounded-full bg-gradient-to-r from-[#00c6ff] to-[#7f00ff] text-white font-bold"
                                >
                                    FINALIZE IDENTITY
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Hidden Terminal Overlay */}
            <AnimatePresence>
                {terminalOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setTerminalOpen(false)}
                    >
                        <motion.div
                            className="w-full max-w-2xl bg-black border border-white/20 rounded-xl overflow-hidden shadow-2xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Terminal Header */}
                            <div className="flex items-center justify-between px-4 py-2 bg-white/10 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <TerminalIcon className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-mono text-white/50 tracking-widest uppercase">System Terminal</span>
                                </div>
                                <button onClick={() => setTerminalOpen(false)}>
                                    <X className="w-4 h-4 text-white/50 hover:text-white transition-colors" />
                                </button>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-6 h-[400px] overflow-y-auto font-mono text-sm space-y-2 scrollbar-hide bg-black/40">
                                {terminalLines.map((line, i) => (
                                    <div key={i} className={line.startsWith('>') ? 'text-primary' : 'text-green-500'}>
                                        {line}
                                    </div>
                                ))}
                                <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2">
                                    <span className="text-primary font-bold">{">"}</span>
                                    <input
                                        ref={terminalInputRef}
                                        type="text"
                                        value={terminalInput}
                                        onChange={(e) => setTerminalInput(e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none text-white caret-primary"
                                        placeholder="Type command..."
                                    />
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Terminal Trigger Hint */}
            <div className="fixed bottom-6 right-6 opacity-0 hover:opacity-100 transition-opacity">
                <button
                    onClick={() => setTerminalOpen(true)}
                    className="p-3 bg-white/10 rounded-full border border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-all"
                >
                    <TerminalIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
