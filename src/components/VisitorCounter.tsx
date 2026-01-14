import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const VisitorCounter = () => {
    const [totalVisitors, setTotalVisitors] = useState(0);
    const [currentVisitor, setCurrentVisitor] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initializeVisitor();
    }, []);

    const initializeVisitor = async () => {
        try {
            // Check if visitor has been counted before
            const hasVisited = localStorage.getItem('portfolio_visited');

            if (!hasVisited) {
                // Increment visitor count
                await incrementVisitorCount();
                localStorage.setItem('portfolio_visited', 'true');
            } else {
                // Just fetch current count
                await fetchVisitorCount();
            }
        } catch (error) {
            console.error('Error initializing visitor:', error);
            setIsLoading(false);
        }
    };

    const incrementVisitorCount = async () => {
        try {
            // Get current count
            const { data: currentData } = await supabase
                .from('visitor_stats')
                .select('total_visitors')
                .eq('id', 'main')
                .single();

            const newCount = (currentData?.total_visitors || 0) + 1;

            // Update count
            const { error } = await supabase
                .from('visitor_stats')
                .upsert({
                    id: 'main',
                    total_visitors: newCount,
                    last_updated: new Date().toISOString()
                });

            if (!error) {
                setTotalVisitors(newCount);
                setCurrentVisitor(newCount);
            }
        } catch (error) {
            console.error('Error incrementing visitor count:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchVisitorCount = async () => {
        try {
            const { data } = await supabase
                .from('visitor_stats')
                .select('total_visitors')
                .eq('id', 'main')
                .single();

            if (data) {
                setTotalVisitors(data.total_visitors);
            }
        } catch (error) {
            console.error('Error fetching visitor count:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatNumber = (num: number) => {
        return num.toLocaleString();
    };

    return (
        <div className="flex items-center gap-6">
            {/* Total Visitors */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
            >
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                        Total Visitors
                    </p>
                    <p className="text-lg font-bold text-white font-mono">
                        {isLoading ? (
                            <span className="animate-pulse">...</span>
                        ) : (
                            formatNumber(totalVisitors)
                        )}
                    </p>
                </div>
            </motion.div>

            {/* Current Visitor Number */}
            {currentVisitor > 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20"
                >
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <p className="text-sm text-primary font-mono">
                        You are visitor <span className="font-bold">#{formatNumber(currentVisitor)}</span>
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default VisitorCounter;
