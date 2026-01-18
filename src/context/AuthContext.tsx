import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: any | null;
    loading: boolean;
    isAdmin: boolean;
    isEditMode: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
    toggleEditMode: () => void;
    setAsAdmin: (val: boolean) => void;
    loginWithMock: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
    const [isEditMode, setIsEditMode] = useState(false);

    const toggleEditMode = () => setIsEditMode(prev => !prev);
    const setAsAdmin = (val: boolean) => {
        setIsAdmin(val);
        localStorage.setItem('isAdmin', val ? 'true' : 'false');
    };

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    setProfile(null);
                } else {
                    console.error('Error fetching profile:', error);
                }
            } else {
                setProfile(data);
                // Also check if profile has admin role if you have a role column
                if (data.role === 'admin') setIsAdmin(true);
            }
        } catch (err) {
            console.error('Unexpected error fetching profile:', err);
        }
    };

    const refreshProfile = async () => {
        if (user) await fetchProfile(user.id);
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) fetchProfile(session.user.id);
            setLoading(false);
        }).catch(err => {
            console.error("Supabase auth error:", err);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
                setIsAdmin(localStorage.getItem('isAdmin') === 'true');
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('isAdmin');
        setIsAdmin(false);
        setIsEditMode(false);
    };

    const loginWithMock = async (email: string) => {
        const fakeUser: User = {
            id: 'mock-user-id-' + Math.random().toString(36).substr(2, 9),
            app_metadata: { provider: 'email' },
            user_metadata: { full_name: email.split('@')[0] },
            aud: 'authenticated',
            created_at: new Date().toISOString(),
            email: email,
            phone: '',
            role: 'authenticated',
            updated_at: new Date().toISOString()
        } as User;

        setUser(fakeUser);
        setSession({
            access_token: 'mock-token',
            refresh_token: 'mock-refresh',
            expires_in: 3600,
            token_type: 'bearer',
            user: fakeUser
        });
        setProfile({ username: email.split('@')[0], role: 'user' });
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, session, profile, loading, isAdmin, isEditMode, signOut, refreshProfile, toggleEditMode, setAsAdmin, loginWithMock }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
