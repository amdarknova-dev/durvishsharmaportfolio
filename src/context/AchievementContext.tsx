import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useHack } from './HackContext';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    hint: string;
}

export interface Pioneer {
    handle: string;
    points: number;
    achievements: number;
    last_active: string;
}

interface AchievementContextType {
    unlockedAchievements: string[];
    unlockAchievement: (id: string) => void;
    progress: number;
    globalPioneers: Pioneer[];
    syncHandle: (handle: string) => Promise<void>;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const useAchievements = () => {
    const context = useContext(AchievementContext);
    if (!context) {
        throw new Error('useAchievements must be used within an AchievementProvider');
    }
    return context;
};

export const ACHIEVEMENTS: Achievement[] = [
    { id: 'Systems Explorer', title: 'Systems Explorer', description: 'Visited 3 unique routes.', hint: 'Explore more of the site.' },
    { id: 'Hyper-Navigator', title: 'Hyper-Navigator', description: 'Visited projects, contact, and beyond-work.', hint: 'Visit the key sections.' },
    { id: 'Achievement Hunter', title: 'Achievement Hunter', description: 'Unlocked 5 achievements.', hint: 'Keep collecting.' },
    { id: 'combo-breaker', title: 'Combo Breaker', description: 'Clicked 5 times rapidly.', hint: 'Try clicking things fast.' },
    { id: 'explorer', title: 'Early Explorer', description: 'First time visiting the portfolio.', hint: 'Just show up!' }
];

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
    const [visitedRoutes, setVisitedRoutes] = useState<Set<string>>(new Set());
    const [globalPioneers, setGlobalPioneers] = useState<Pioneer[]>([]);
    const [clickCount, setClickCount] = useState(0);
    const location = useLocation();
    const { toast } = useToast();
    const { username } = useHack();

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('achievements');
        if (saved) {
            setUnlockedAchievements(JSON.parse(saved));
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
    }, [unlockedAchievements]);

    const unlockAchievement = useCallback((id: string) => {
        if (!unlockedAchievements.includes(id)) {
            setUnlockedAchievements(prev => [...prev, id]);
            toast({
                title: "ACHIEVEMENT UNLOCKED",
                description: id,
                className: "bg-primary border-primary text-black font-bold",
            });
        }
    }, [unlockedAchievements, toast]);

    const fetchGlobalStats = useCallback(async () => {
        const { data, error } = await supabase
            .from('pioneers')
            .select('*')
            .order('points', { ascending: false })
            .limit(10);

        if (!error && data) {
            setGlobalPioneers(data as Pioneer[]);
        }
    }, []);

    const syncHandle = useCallback(async (handle: string) => {
        const points = unlockedAchievements.length * 100;
        const { error } = await supabase
            .from('pioneers')
            .upsert({
                handle,
                points,
                achievements: unlockedAchievements.length,
                last_active: new Date().toISOString()
            });

        if (!error) {
            fetchGlobalStats();
        }
    }, [unlockedAchievements.length, fetchGlobalStats]);

    // Track page visits
    useEffect(() => {
        setVisitedRoutes(prev => {
            const next = new Set(prev);
            next.add(location.pathname);
            return next;
        });

        if (location.pathname === '/' && !location.hash) {
            if (!unlockedAchievements.includes('explorer')) {
                unlockAchievement('explorer');
            }
        }
    }, [location.pathname, location.hash, unlockedAchievements, unlockAchievement]);

    useEffect(() => {
        if (visitedRoutes.size >= 3) {
            unlockAchievement('Systems Explorer');
        }
    }, [visitedRoutes.size, unlockAchievement]);

    useEffect(() => {
        if (visitedRoutes.has('/projects') && visitedRoutes.has('/contact') && visitedRoutes.has('/beyond-work')) {
            unlockAchievement('Hyper-Navigator');
        }
    }, [visitedRoutes, unlockAchievement]);

    useEffect(() => {
        if (unlockedAchievements.length >= 5) {
            unlockAchievement('Achievement Hunter');
        }
    }, [unlockedAchievements.length, unlockAchievement]);

    // Combo Breaker Check
    useEffect(() => {
        if (clickCount >= 5) {
            unlockAchievement('combo-breaker');
            setClickCount(0);
        }
        const timer = setTimeout(() => setClickCount(0), 1000);
        return () => clearTimeout(timer);
    }, [clickCount, unlockAchievement]);

    useEffect(() => {
        fetchGlobalStats();
        const channel = supabase
            .channel('public:pioneers')
            .on('postgres_changes' as never, { event: '*', table: 'pioneers' }, fetchGlobalStats)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchGlobalStats]);

    const progress = useMemo(() => (unlockedAchievements.length / ACHIEVEMENTS.length) * 100, [unlockedAchievements.length]);

    return (
        <AchievementContext.Provider value={{
            unlockedAchievements,
            unlockAchievement,
            progress,
            globalPioneers,
            syncHandle
        }}>
            {children}
        </AchievementContext.Provider>
    );
};
