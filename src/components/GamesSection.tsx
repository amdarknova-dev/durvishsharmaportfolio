import React, { useEffect, useRef, useState } from 'react';
import { useGames } from '@/context/GameContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Play, Trophy, Info, ExternalLink, Rocket, RotateCcw, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK AD COMPONENT ---
const MockAd = ({ position }: { position: 'top' | 'bottom' | 'side' }) => (
    <div className={`relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 group ${position === 'side' ? 'h-full flex flex-col justify-center' : 'w-full my-4'
        }`}>
        <Badge className="absolute top-2 right-2 bg-yellow-500/80 text-black text-[10px] font-bold">AD</Badge>
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <div>
                <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">Premium Hosting v2</h4>
                <p className="text-xs text-gray-400">Deploy your apps in seconds. Fast, secure, reliable.</p>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto text-[10px] text-gray-500 hover:text-white">
                Visit <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
        </div>
    </div>
);

// --- GAME 1: NEBULA PONG ---
const NebulaPong = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState({ player: 0, ai: 0 });
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle');

    useEffect(() => {
        if (gameState !== 'playing') return;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;

        let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4, radius: 8 };
        let player = { y: canvas.height / 2 - 40, height: 80, width: 10 };
        let ai = { y: canvas.height / 2 - 40, height: 80, width: 10 };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseY = e.clientY - rect.top;
            player.y = Math.max(0, Math.min(canvas.height - player.height, mouseY - player.height / 2));
        };

        canvas.addEventListener('mousemove', handleMouseMove);

        const update = () => {
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Wall collision
            if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.dy *= -1;

            // AI Logic
            const aiCenter = ai.y + ai.height / 2;
            if (aiCenter < ball.y - 10) ai.y += 3.5;
            else if (aiCenter > ball.y + 10) ai.y -= 3.5;
            ai.y = Math.max(0, Math.min(canvas.height - ai.height, ai.y));

            // Paddle collision
            if (ball.dx < 0 && ball.x - ball.radius < player.width + 10 && ball.y > player.y && ball.y < player.y + player.height) {
                ball.dx *= -1.1; // Speed up
                ball.x = player.width + 10 + ball.radius;
            }

            if (ball.dx > 0 && ball.x + ball.radius > canvas.width - (ai.width + 10) && ball.y > ai.y && ball.y < ai.y + ai.height) {
                ball.dx *= -1.1;
                ball.x = canvas.width - (ai.width + 10) - ball.radius;
            }

            // Score
            if (ball.x < 0) {
                setScore(s => ({ ...s, ai: s.ai + 1 }));
                resetBall();
            } else if (ball.x > canvas.width) {
                setScore(s => ({ ...s, player: s.player + 1 }));
                resetBall();
            }
        };

        const resetBall = () => {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.dx = (Math.random() > 0.5 ? 4 : -4);
            ball.dy = (Math.random() * 8 - 4);
        };

        const draw = () => {
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Net
            ctx.setLineDash([10, 10]);
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.stroke();

            // Ball
            ctx.fillStyle = '#6366f1';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#6366f1';
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();

            // Paddles
            ctx.fillStyle = '#fff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#fff';
            ctx.fillRect(10, player.y, player.width, player.height);
            ctx.fillRect(canvas.width - ai.width - 10, ai.y, ai.width, ai.height);
        };

        let animationId: number;
        const render = () => {
            update();
            draw();
            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            cancelAnimationFrame(animationId);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, [gameState]);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex justify-between items-center w-full max-w-[600px] px-4 font-mono text-xl text-primary">
                <span>PLAYER: {score.player}</span>
                {gameState === 'playing' && (
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => { setScore({ player: 0, ai: 0 }); }}
                            className="h-8 px-3 text-[10px] uppercase tracking-wider border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
                        >
                            <RotateCcw className="w-3 h-3 mr-1" /> Reset
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGameState('idle')}
                            className="h-8 px-3 text-[10px] uppercase tracking-wider border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400"
                        >
                            <Square className="w-3 h-3 mr-1" /> Stop
                        </Button>
                    </div>
                )}
                <span>AI: {score.ai}</span>
            </div>
            <div className="relative border border-primary/20 rounded-xl overflow-hidden shadow-2xl shadow-primary/10">
                <canvas ref={canvasRef} width={600} height={400} className="max-w-full bg-black cursor-none" />
                {gameState !== 'playing' && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                        <h3 className="text-3xl font-bold text-white mb-2">NEBULA PONG</h3>
                        <p className="text-gray-400 mb-6">Use your mouse to move the paddle. First to 10 wins.</p>
                        <Button onClick={() => setGameState('playing')} className="bg-primary hover:bg-primary/90 text-white">
                            <Play className="w-4 h-4 mr-2" /> Start Game
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- GAME 2: QUANTUM STACK ---
const GlitchStack = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
    const [highScore, setHighScore] = useState(0);

    // Game state refs to avoid closure issues in the loop
    const stateRef = useRef({
        blocks: [] as { x: number, y: number, w: number, h: number, color: string }[],
        currentBlock: { x: 0, y: 0, w: 100, h: 20, speed: 3, dir: 1 },
        cameraY: 0,
    });

    const resetGame = () => {
        stateRef.current = {
            blocks: [{ x: 50, y: 380, w: 200, h: 20, color: '#ec4899' }],
            currentBlock: { x: 0, y: 360, w: 200, h: 20, speed: 3, dir: 1 },
            cameraY: 0,
        };
        setScore(0);
        setGameState('playing');
    };

    const handleAction = () => {
        if (gameState === 'idle' || gameState === 'gameOver') {
            resetGame();
            return;
        }

        const state = stateRef.current;
        const lastBlock = state.blocks[state.blocks.length - 1];

        // Calculate overlap
        const x1 = Math.max(state.currentBlock.x, lastBlock.x);
        const x2 = Math.min(state.currentBlock.x + state.currentBlock.w, lastBlock.x + lastBlock.w);
        const overlap = x2 - x1;

        if (overlap > 0) {
            // Success: add block to stack
            state.blocks.push({
                x: x1,
                y: state.currentBlock.y,
                w: overlap,
                h: 20,
                color: `hsl(${280 + state.blocks.length * 5}, 70%, 60%)`
            });

            // Update score
            const newScore = score + 1;
            setScore(newScore);
            if (newScore > highScore) setHighScore(newScore);

            // Setup next block
            state.currentBlock = {
                x: state.currentBlock.dir > 0 ? 0 : 300 - overlap,
                y: state.currentBlock.y - 20,
                w: overlap,
                h: 20,
                speed: 3 + (state.blocks.length * 0.1),
                dir: state.currentBlock.dir
            };

            // Scroll camera if needed
            if (state.blocks.length > 5) {
                state.cameraY += 20;
            }
        } else {
            // Fail: game over
            setGameState('gameOver');
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        let animationId: number;

        const render = () => {
            if (gameState === 'playing') {
                const state = stateRef.current;

                // Update current block position
                state.currentBlock.x += state.currentBlock.speed * state.currentBlock.dir;
                if (state.currentBlock.x + state.currentBlock.w > 300 || state.currentBlock.x < 0) {
                    state.currentBlock.dir *= -1;
                }

                // Draw
                ctx.clearRect(0, 0, 300, 400);

                ctx.save();
                ctx.translate(0, state.cameraY);

                // Draw stack
                state.blocks.forEach(b => {
                    ctx.fillStyle = b.color;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = b.color;
                    ctx.fillRect(b.x, b.y, b.w, b.h);
                });

                // Draw current moving block
                ctx.fillStyle = '#fff';
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#fff';
                ctx.fillRect(state.currentBlock.x, state.currentBlock.y, state.currentBlock.w, state.currentBlock.h);

                ctx.restore();
            }
            animationId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationId);
    }, [gameState]);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-between w-[300px] px-2">
                <div className="text-xl font-bold text-accent">SCORE: {score}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">BEST: {highScore}</div>
            </div>

            <div
                className="relative border border-accent/20 rounded-xl overflow-hidden w-[300px] h-[400px] bg-black cursor-pointer shadow-2xl shadow-accent/5"
                onClick={handleAction}
            >
                <canvas ref={canvasRef} width={300} height={400} className="w-full h-full" />

                {gameState !== 'playing' && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                        {gameState === 'idle' ? (
                            <>
                                <Trophy className="w-12 h-12 text-accent mb-4 animate-bounce" />
                                <h3 className="text-2xl font-bold text-white mb-2">QUANTUM STACK</h3>
                                <p className="text-gray-400 text-sm mb-6">Click/Tap to stack the blocks. Don't miss the edge!</p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-3xl font-bold text-red-500 mb-2">SYSTEM CRASH</h3>
                                <p className="text-gray-300 mb-6">Final Score: {score}</p>
                            </>
                        )}
                        <Button onClick={(e) => { e.stopPropagation(); resetGame(); }} className="bg-accent hover:bg-accent/90 text-white">
                            <Play className="w-4 h-4 mr-2" /> {gameState === 'idle' ? 'Start Game' : 'Reboot'}
                        </Button>
                    </div>
                )}
            </div>

            {gameState === 'playing' && (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setScore(0)}
                        className="h-8 px-4 text-[10px] uppercase border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors"
                    >
                        <RotateCcw className="w-3 h-3 mr-1" /> Reset Run
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGameState('idle')}
                        className="h-8 px-4 text-[10px] uppercase border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400"
                    >
                        <Square className="w-3 h-3 mr-1" /> Terminate
                    </Button>
                </div>
            )}
        </div>
    );
};

const GamesSection = () => {
    const { isUnlocked } = useGames();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="games" ref={sectionRef} className="relative py-32 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-20 transition-all duration-1000">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-gradient">Secret</span> <span className="text-white">Arcade</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                    <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
                        Interactive experiments and games built with modern web tech.
                        {!isUnlocked && " Hidden until first contact."}
                    </p>
                </div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        {!isUnlocked ? (
                            <motion.div
                                key="locked"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="max-w-2xl mx-auto p-12 glass border-white/10 rounded-3xl text-center space-y-8"
                            >
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
                                    <Lock className="w-10 h-10 text-primary animate-pulse" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-bold text-white">Games Locked</h3>
                                    <p className="text-gray-400 text-lg">
                                        The arcade is reserved for collaborators and clients.
                                        Send a message via the <a href="#contact" className="text-primary hover:underline">contact form</a> to unlock instant access to these interactive experiments.
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-4 opacity-50 grayscale">
                                    <Badge variant="outline" className="px-4 py-2 border-white/10">Nebula Pong</Badge>
                                    <Badge variant="outline" className="px-4 py-2 border-white/10">Quantum Stack</Badge>
                                    <Badge variant="outline" className="px-4 py-2 border-white/10">Logic Gates</Badge>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="unlocked"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-12"
                            >
                                <MockAd position="top" />

                                <div className="grid lg:grid-cols-2 gap-12">
                                    <Card className="glass p-8 border-white/10 hover:border-primary/20 transition-all">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-2xl font-bold text-white">Nebula Pong</h3>
                                            <Badge className="bg-primary/20 text-primary border-primary/20">RETRO-TECH</Badge>
                                        </div>
                                        <NebulaPong />
                                        <div className="mt-8 space-y-2">
                                            <p className="text-sm text-gray-400">A physics-based reconstruction of the original arcade game with canvas-level performance and smooth AI logic.</p>
                                            <div className="flex gap-2">
                                                <Badge variant="secondary" className="text-[10px] bg-white/5">Canvas API</Badge>
                                                <Badge variant="secondary" className="text-[10px] bg-white/5">AI Logic</Badge>
                                                <Badge variant="secondary" className="text-[10px] bg-white/5">Physics</Badge>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="glass p-8 border-white/10 hover:border-accent/20 transition-all">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-2xl font-bold text-white">Quantum Stack</h3>
                                            <Badge className="bg-accent/20 text-accent border-accent/20">RHYTHM</Badge>
                                        </div>
                                        <GlitchStack />
                                        <div className="mt-8 space-y-2">
                                            <p className="text-sm text-gray-400">A rhythm-based precision experiment exploring high-frequency timing and visual feedback loops.</p>
                                            <div className="flex gap-2">
                                                <Badge variant="secondary" className="text-[10px] bg-white/5">Rhythm Logic</Badge>
                                                <Badge variant="secondary" className="text-[10px] bg-white/5">Timing</Badge>
                                                <Badge variant="secondary" className="text-[10px] bg-white/5">UI-Motion</Badge>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                <MockAd position="bottom" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Background decorations */}
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10" />
            </div>
        </section>
    );
};

export default GamesSection;
