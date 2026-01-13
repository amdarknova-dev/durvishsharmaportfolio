import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Paperclip, Mic, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useSound } from '@/context/SoundContext';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: string;
    senderName?: string;
}

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Greetings. I am Nexus, Durvish's AI assistant. How may I assist you in navigating this digital realm?",
            sender: 'ai',
            senderName: 'Nexus AI',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { playClick, playHover } = useSound();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen, isTyping]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        playClick();
        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "I've updated my internal protocols to process that request.",
                "Accessing neural pathways... interesting input.",
                "Durvish is currently unavailable, but I have logged your query.",
                "Visual systems optimized. Transmission received.",
                "That exceeds my current parameters, but I'm learning."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: 'ai',
                senderName: 'Nexus AI',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-24 right-6 w-80 md:w-[400px] z-50"
                    >
                        <Card className="bg-[#111827]/95 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[550px] rounded-[32px]">
                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 relative">
                                        <Bot className="w-5 h-5 text-primary" />
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111827]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-base">Nexus System</h3>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Quantum Assistant</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => { playClick(); setIsOpen(false); }}
                                    className="hover:bg-white/10 text-gray-400 hover:text-white rounded-full"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Messages Container */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide" ref={scrollRef}>
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                    >
                                        {/* Meta Data Row */}
                                        <div className={`flex items-center gap-2 mb-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            {msg.sender === 'ai' && (
                                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                                                    <Bot className="w-3 h-3 text-primary" />
                                                </div>
                                            )}
                                            <span className="text-xs font-bold text-white/90">{msg.sender === 'ai' ? msg.senderName : 'You'}</span>
                                            <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
                                            {msg.sender === 'user' && (
                                                <div className="flex items-center gap-1 ml-1 text-primary/60">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    <span className="text-[9px] uppercase tracking-tighter">via System</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bubble */}
                                        <div
                                            className={`max-w-[85%] px-5 py-4 text-sm leading-relaxed shadow-lg ${msg.sender === 'user'
                                                ? 'bg-primary text-white rounded-[24px] rounded-tr-none'
                                                : 'bg-white/5 text-gray-200 rounded-[24px] rounded-tl-none border border-white/5'
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                                                <Bot className="w-3 h-3 text-primary" />
                                            </div>
                                            <span className="text-xs font-bold text-white/90">Nexus AI</span>
                                        </div>
                                        <div className="bg-white/5 px-4 py-3 rounded-[24px] rounded-tl-none border border-white/5 flex gap-1.5 items-center">
                                            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Custom Input Bar */}
                            <div className="p-4 bg-white/[0.02] border-t border-white/5">
                                <div className="flex items-center gap-2 bg-white/[0.03] p-1.5 rounded-[28px] border border-white/5 focus-within:border-primary/50 transition-colors">
                                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                                        <Paperclip className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                                        <Mic className="w-5 h-5" />
                                    </button>
                                    <input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-transparent border-none text-white focus:ring-0 text-sm px-2 outline-none"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!inputValue.trim()}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${inputValue.trim()
                                                ? 'bg-primary text-white scale-100 shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                                                : 'bg-white/5 text-gray-600 scale-95'
                                            }`}
                                    >
                                        <Send className="w-4 h-4 ml-0.5" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { playClick(); setIsOpen(true); }}
                    className="fixed bottom-6 right-6 w-16 h-16 rounded-[24px] bg-primary shadow-[0_15px_30px_rgba(34,197,94,0.4)] flex items-center justify-center z-50 group transition-all"
                >
                    <div className="absolute inset-0 rounded-[24px] bg-white/20 animate-ping group-hover:scale-110" />
                    <MessageSquare className="w-7 h-7 text-white" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center border-2 border-[#050505]">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                </motion.button>
            )}
        </>
    );
};

export default AIChatbot;

