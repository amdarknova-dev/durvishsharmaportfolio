import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Achievement = {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
};

type AchievementContextType = {
    unlocked: string[];
    unlockAchievement: (id: string) => void;
    systemsExplored: number;
    totalSystems: number;
    globalPioneers: any[];
    syncHandle: (handle: string) => Promise<void>;
};

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const useAchievements = () => {
    const context = useContext(AchievementContext);
    if (!context) {
        throw new Error('useAchievements must be used within an AchievementProvider');
    }
    return context;
};

export const AchievementProvider = ({ children }: { children: React.ReactNode }) => {
    const [unlocked, setUnlocked] = useState<string[]>(() => {
        const saved = localStorage.getItem('nexus_achievements');
        return saved ? JSON.parse(saved) : [];
    });
    const { toast } = useToast();
    const location = useLocation();
    const [visitedRoutes, setVisitedRoutes] = useState<Set<string>>(() => {
        const saved = localStorage.getItem('nexus_visited_routes');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [clickCount, setClickCount] = useState(0);
    const [globalPioneers, setGlobalPioneers] = useState<any[]>([]);
    const totalSystems = 12; // Adjusted to include sections + pages

    const achievements: Record<string, Achievement> = {
        'night-owl': {
            id: 'night-owl',
            title: 'Night Owl',
            description: 'Visited the site late at night (10 PM - 4 AM).',
            icon: <Trophy className="w-5 h-5 text-yellow-400" />,
        },
        'explorer': {
            id: 'explorer',
            title: 'Explorer',
            description: 'Visited all main pages.',
            icon: <Trophy className="w-5 h-5 text-blue-400" />,
        },
        'combo-breaker': {
            id: 'combo-breaker',
            title: 'Combo Breaker',
            description: 'Clicked 5 times in rapid succession!',
            icon: <Trophy className="w-5 h-5 text-red-500" />,
        },
        'ghost-in-machine': {
            id: 'ghost-in-machine',
            title: 'Ghost in the Machine',
            description: 'Discovered the hidden ghost command.',
            icon: <Trophy className="w-5 h-5 text-green-400" />,
        },
    };

    const unlockAchievement = (id: string) => {
        if (!unlocked.includes(id)) {
            const newUnlocked = [...unlocked, id];
            setUnlocked(newUnlocked);
            localStorage.setItem('nexus_achievements', JSON.stringify(newUnlocked));

            const achievement = achievements[id];
            toast({
                title: "Achievement Unlocked! 🏆",
                description: `${achievement.title}: ${achievement.description}`,
                className: "border-primary/50 bg-black/90 text-white",
                duration: 4000,
            });
        }
    };

    // Night Owl Check
    const hasCheckedOwl = React.useRef(false); // Ref to ensure we run this once per session/mount

    useEffect(() => {
        if (hasCheckedOwl.current) return;

        const hours = new Date().getHours();
        if (hours >= 22 || hours <= 4) {
            unlockAchievement('night-owl');
        }
        hasCheckedOwl.current = true;
    }, []); // Run once on mount

    // Explorer Check
    useEffect(() => {
        const currentPath = location.pathname + (location.hash || '');
        if (!visitedRoutes.has(currentPath)) {
            const newVisited = new Set(visitedRoutes);
            newVisited.add(currentPath);
            setVisitedRoutes(newVisited);
            localStorage.setItem('nexus_visited_routes', JSON.stringify(Array.from(newVisited)));

            const mainSystems = [
                '/', '/about-me', '/skills', '/projects', '/experience', '/beyond-work', '/contact', '/blog',
                '#skills', '#projects', '#experience', '#contact'
            ];

            const visitedCount = mainSystems.filter(sys =>
                Array.from(newVisited).some(v => v.includes(sys))
            ).length;

            if (visitedCount >= 8) {
                unlockAchievement('explorer');
            }
        }
    }, [location.pathname, location.hash]);

    // Combo Breaker Check
    useEffect(() => {
        const handleClick = () => {
            setClickCount(c => c + 1);

            // Reset count if no click for 1 second
            if (window.clickTimeout) clearTimeout(window.clickTimeout);
            window.clickTimeout = setTimeout(() => setClickCount(0), 1000);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    useEffect(() => {
        if (clickCount >= 5) {
            unlockAchievement('combo-breaker');
            setClickCount(0); // Reset to avoid spamming
        }
    }, [clickCount]);

    // Global Sync Logic
    useEffect(() => {
        const fetchGlobalStats = async () => {
            const { data, error } = await supabase
                .from('pioneers')
                .select('*')
                .order('systems_explored', { ascending: false })
                .limit(5);

            if (!error && data) {
                setGlobalPioneers(data);
            }
        };

        fetchGlobalStats();
        // Set up real-time subscription
        const channel = supabase
            .channel('public:pioneers')
            .on('postgres_changes' as any, { event: '*', table: 'pioneers' }, fetchGlobalStats)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const syncHandle = async (handle: string) => {
        const { error } = await supabase
            .from('pioneers')
            .upsert({
                handle: handle,
                systems_explored: visitedRoutes.size,
                achievements_count: unlocked.length,
                last_active: new Date().toISOString()
            }, { onConflict: 'handle' });

        if (error) {
            toast({
                title: "Sync Error",
                description: "Failed to upload your progress to the Nexus.",
                variant: "destructive"
            });
        }
    };

    return (
        <AchievementContext.Provider value={{
            unlocked,
            unlockAchievement,
            systemsExplored: visitedRoutes.size,
            totalSystems,
            globalPioneers,
            syncHandle
        }}>
            {children}
        </AchievementContext.Provider>
    );
};

// Add type for custom timeout on window
declare global {
    interface Window {
        clickTimeout: NodeJS.Timeout;
    }
}
