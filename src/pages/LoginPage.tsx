import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHack } from '@/context/HackContext';
import { useSound } from '@/context/SoundContext';
import { useToast } from '@/hooks/use-toast';
import { Lock, Unlock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { isAdmin, setIsAdmin } = useHack();
    const { playClick, playHover, playWhoosh } = useSound();
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        if (isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        setIsLoading(true);

        // Simulation delay
        setTimeout(() => {
            if (username.toLowerCase() === 'admin' && password === 'skywork') {
                // Success
                setIsAdmin(true);
                toast({
                    title: "ACCESS GRANTED",
                    description: "Welcome back, Commander.",
                    className: "bg-green-900 border-green-500 text-green-100",
                });
                navigate('/');
            } else {
                // Failure
                setIsLoading(false);
                toast({
                    variant: "destructive",
                    title: "ACCESS DENIED",
                    description: "Invalid credentials. Incident reported.",
                });
                // Shake effect logic here if desired
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden font-mono">
            {/* Background Glitch Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 animate-pulse" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="z-10 w-full max-w-md p-8 bg-black/80 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                <Button
                    variant="ghost"
                    className="absolute top-4 left-4 text-gray-500 hover:text-white"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>

                <div className="text-center mb-8 mt-4">
                    <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-widest">SECURE_LOGIN</h1>
                    <p className="text-xs text-gray-500 mt-2">RESTRICTED AREA. AUTHORIZED PERSONNEL ONLY.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase tracking-widest">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-colors"
                            placeholder="Identify yourself..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase tracking-widest">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-primary hover:bg-primary/80 text-black font-bold tracking-widest transition-all duration-300 relative overflow-hidden group"
                    >
                        {isLoading ? (
                            <span className="animate-pulse">AUTHENTICATING...</span>
                        ) : (
                            <span className="flex items-center gap-2 justify-center">
                                UNLOCK SYSTEM <Unlock className="w-4 h-4" />
                            </span>
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-gray-600">
                        SYSTEM_ID: {Math.random().toString(36).substring(7).toUpperCase()} <br />
                        IP_LOGGED: 192.168.X.X
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
