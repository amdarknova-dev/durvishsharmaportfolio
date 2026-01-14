import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

import { supabase } from '@/lib/supabase';

interface SystemStatus {
    is_available: boolean;
    status_message: string;
}

const StatusBadge = () => {
    const navigate = useNavigate();
    const [status, setStatus] = React.useState({
        isAvailable: true,
        message: 'Available for Hire'
    });
    const [time, setTime] = React.useState(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }));

    React.useEffect(() => {
        // 1. Initial Fetch
        const fetchStatus = async () => {
            const { data, error } = await supabase
                .from('system_status')
                .select('*')
                .eq('id', 'current_status')
                .single();

            if (!error && data) {
                setStatus({
                    isAvailable: data.is_available,
                    message: data.status_message
                });
            }
        };

        fetchStatus();

        // 2. Real-time Subscription
        const channel = supabase
            .channel('status_sync')
            .on(
                'postgres_changes' as never,
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'system_status',
                    filter: 'id=eq.current_status'
                },
                (payload: { new: SystemStatus }) => {
                    setStatus({
                        isAvailable: payload.new.is_available,
                        message: payload.new.status_message
                    });
                }
            )
            .subscribe();

        // 3. Clock Timer
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }));
        }, 1000);

        return () => {
            clearInterval(timer);
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col sm:flex-row items-center gap-4 p-2 pl-4 pr-6 border rounded-full backdrop-blur-md transition-colors duration-500 ${status.isAvailable
                ? 'bg-white/[0.03] border-white/10'
                : 'bg-red-500/10 border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                }`}
        >
            <div className="flex items-center gap-2">
                <div className="relative">
                    <div className={`w-2.5 h-2.5 rounded-full ${status.isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div className={`absolute inset-0 w-2.5 h-2.5 rounded-full animate-ping ${status.isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
                <span className={`text-xs font-mono uppercase tracking-widest whitespace-nowrap ${status.isAvailable ? 'text-gray-300' : 'text-red-400 font-bold'}`}>
                    {status.message}
                </span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/10" />

            <div className="flex items-center gap-4 overflow-hidden">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin size={12} className={status.isAvailable ? 'text-primary' : 'text-red-500'} />
                    <span className="whitespace-nowrap">Haryana, India</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock size={12} className={status.isAvailable ? 'text-primary' : 'text-red-500'} />
                    <span className="whitespace-nowrap font-mono">{time}</span>
                </div>
            </div>

            <button
                onClick={() => {
                    if (status.isAvailable) {
                        navigate('/contact');
                    } else {
                        window.open('https://calendly.com/durvishsharma01', '_blank');
                    }
                }}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tighter transition-all active:scale-95 whitespace-nowrap ${status.isAvailable
                    ? 'bg-primary text-black hover:bg-white'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                    }`}
            >
                <Calendar size={12} />
                {status.isAvailable ? 'Contact' : 'Check Schedule'}
            </button>
        </motion.div>
    );
};

export default StatusBadge;
