import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useHack } from '@/context/HackContext';
import { useSound } from '@/context/SoundContext';
import { useToast } from '@/hooks/use-toast';
import { Lock, Unlock, ArrowLeft, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
    const [loginType, setLoginType] = useState<'admin' | 'user' | null>(null);
    const [username, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { isAdmin, setIsAdmin, setUserType, setUsername, userType } = useHack();
    const { playClick, playHover, playSuccess } = useSound();
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        if (userType !== 'guest') {
            navigate('/');
        }
    }, [userType, navigate]);

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        setIsLoading(true);

        setTimeout(() => {
            if (username.toLowerCase() === 'admin' && password === 'skywork') {
                setIsAdmin(true);
                setUserType('admin');
                setUsername(username);
                playSuccess();
                toast({
                    title: "ADMIN ACCESS GRANTED",
                    description: "Welcome back, Commander. Full system access enabled.",
                    className: "bg-green-900 border-green-500 text-green-100",
                });
                navigate('/');
            } else {
                setIsLoading(false);
                toast({
                    variant: "destructive",
                    title: "ACCESS DENIED",
                    description: "Invalid admin credentials. Incident logged.",
                });
            }
        }, 1500);
    };

    const handleUserLogin = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        setIsLoading(true);

        setTimeout(() => {
            if (username.trim().length >= 3) {
                setUserType('user');
                setUsername(username);
                playSuccess();
                toast({
                    title: "USER ACCESS GRANTED",
                    description: `Welcome, ${username}! You can now add your name to the Hall of Fame.`,
                    className: "bg-blue-900 border-blue-500 text-blue-100",
                });
                navigate('/#leaderboard');
            } else {
                setIsLoading(false);
                toast({
                    variant: "destructive",
                    title: "INVALID USERNAME",
                    description: "Username must be at least 3 characters long.",
                });
            }
        }, 1000);
    };

    if (!loginType) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden font-mono">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 animate-pulse" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="z-10 w-full max-w-2xl p-8"
                >
                    <Button
                        variant="ghost"
                        className="absolute top-4 left-4 text-gray-500 hover:text-white"
                        onClick={() => navigate('/')}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>

                    <div className="text-center mb-12">
                        <div className="mx-auto w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold text-white tracking-widest mb-2">SELECT ACCESS TYPE</h1>
                        <p className="text-xs text-gray-500">CHOOSE YOUR AUTHENTICATION METHOD</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Admin Login Card */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -5 }}
                            onClick={() => {
                                playClick();
                                setLoginType('admin');
                            }}
                            className="cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-red-500/20 transition-colors">
                                <Shield className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white text-center mb-2">ADMIN ACCESS</h3>
                            <p className="text-xs text-gray-400 text-center">Full system control and configuration</p>
                            <div className="mt-6 text-center">
                                <span className="text-[10px] text-red-500 font-mono">RESTRICTED</span>
                            </div>
                        </motion.div>

                        {/* User Login Card */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -5 }}
                            onClick={() => {
                                playClick();
                                setLoginType('user');
                            }}
                            className="cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                                <User className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-white text-center mb-2">USER ACCESS</h3>
                            <p className="text-xs text-gray-400 text-center">Join the Hall of Fame and explore</p>
                            <div className="mt-6 text-center">
                                <span className="text-[10px] text-primary font-mono">PUBLIC</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden font-mono">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 animate-pulse" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={loginType}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="z-10 w-full max-w-md p-8 bg-black/80 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                    <Button
                        variant="ghost"
                        className="absolute top-4 left-4 text-gray-500 hover:text-white"
                        onClick={() => setLoginType(null)}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>

                    <div className="text-center mb-8 mt-4">
                        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 border ${loginType === 'admin'
                            ? 'bg-red-500/10 border-red-500/20'
                            : 'bg-primary/10 border-primary/20'
                            }`}>
                            {loginType === 'admin' ? (
                                <Shield className="w-6 h-6 text-red-500" />
                            ) : (
                                <User className="w-6 h-6 text-primary" />
                            )}
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-widest">
                            {loginType === 'admin' ? 'ADMIN LOGIN' : 'USER LOGIN'}
                        </h1>
                        <p className="text-xs text-gray-500 mt-2">
                            {loginType === 'admin'
                                ? 'RESTRICTED AREA. AUTHORIZED PERSONNEL ONLY.'
                                : 'ENTER YOUR USERNAME TO CONTINUE'}
                        </p>
                    </div>

                    <form onSubmit={loginType === 'admin' ? handleAdminLogin : handleUserLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 uppercase tracking-widest">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsernameInput(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-colors"
                                placeholder={loginType === 'admin' ? 'Admin username...' : 'Choose your username...'}
                                required
                                minLength={3}
                            />
                        </div>

                        {loginType === 'admin' && (
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
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full h-12 font-bold tracking-widest transition-all duration-300 relative overflow-hidden group ${loginType === 'admin'
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-primary hover:bg-primary/80 text-black'
                                }`}
                        >
                            {isLoading ? (
                                <span className="animate-pulse">AUTHENTICATING...</span>
                            ) : (
                                <span className="flex items-center gap-2 justify-center">
                                    {loginType === 'admin' ? 'UNLOCK ADMIN' : 'JOIN HALL OF FAME'} <Unlock className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-gray-600">
                            SYSTEM_ID: {Math.random().toString(36).substring(7).toUpperCase()} <br />
                            ACCESS_TYPE: {loginType.toUpperCase()}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default LoginPage;
