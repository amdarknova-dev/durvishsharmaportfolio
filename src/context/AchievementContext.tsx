import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react';
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
    systemsExplored: number;
    totalSystems: number;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const useAchievements = () => {
    const context = useContext(AchievementContext);
    if (!context) {
        return {
            unlockedAchievements: [],
            unlockAchievement: () => { },
            progress: 0,
            globalPioneers: [],
            syncHandle: async () => { },
            systemsExplored: 0,
            totalSystems: TOTAL_SYSTEM_ROUTES
        };
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

const TOTAL_SYSTEM_ROUTES = 5; // Home, Projects, Contact, Beyond Work, Lab

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
    const [visitedRoutes, setVisitedRoutes] = useState<Set<string>>(new Set());
    const [globalPioneers, setGlobalPioneers] = useState<Pioneer[]>([]);
    const [clickCount, setClickCount] = useState(0);
    const location = useLocation();
    const { toast } = useToast();
    const toastRef = useRef(toast);
    toastRef.current = toast;

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('achievements');
        if (saved) {
            try {
                setUnlockedAchievements(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse achievements", e);
            }
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        if (unlockedAchievements.length > 0) {
            localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
        }
    }, [unlockedAchievements]);

    const unlockAchievement = useCallback((id: string) => {
        setUnlockedAchievements(prev => {
            if (prev.includes(id)) return prev;

            setTimeout(() => {
                toastRef.current({
                    title: "ACHIEVEMENT UNLOCKED",
                    description: id,
                    className: "bg-primary border-primary text-black font-bold",
                });
            }, 0);

            return [...prev, id];
        });
    }, []);

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

    useEffect(() => {
        setVisitedRoutes(prev => {
            if (prev.has(location.pathname)) return prev;
            const next = new Set(prev);
            next.add(location.pathname);
            return next;
        });
    }, [location.pathname]);

    useEffect(() => {
        if (location.pathname === '/' && !location.hash) {
            unlockAchievement('explorer');
        }
    }, [location.pathname, location.hash, unlockAchievement]);

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
            syncHandle,
            systemsExplored: visitedRoutes.size,
            totalSystems: TOTAL_SYSTEM_ROUTES
        }}>
            {children}
        </AchievementContext.Provider>
    );
};
