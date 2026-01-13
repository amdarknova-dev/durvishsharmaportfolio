import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

type CommentaryContextType = {
    isCommentaryOpen: boolean;
    activeMessage: string | null;
    toggleCommentary: () => void;
    playCommentary: (message: string) => void;
};

const CommentaryContext = createContext<CommentaryContextType | undefined>(undefined);

export const useCommentary = () => {
    const context = useContext(CommentaryContext);
    if (!context) {
        throw new Error('useCommentary must be used within a CommentaryProvider');
    }
    return context;
};

export const CommentaryProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCommentaryOpen, setIsCommentaryOpen] = useState(false);
    const [activeMessage, setActiveMessage] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const toggleCommentary = useCallback(() => {
        setIsCommentaryOpen(prev => !prev);
    }, []);

    const playCommentary = useCallback((message: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        setActiveMessage(message);
        setIsCommentaryOpen(true);

        // Auto hide after 8 seconds
        timeoutRef.current = setTimeout(() => {
            setIsCommentaryOpen(false);
            setActiveMessage(null);
        }, 8000);
    }, []);

    return (
        <CommentaryContext.Provider value={{ isCommentaryOpen, activeMessage, toggleCommentary, playCommentary }}>
            {children}
        </CommentaryContext.Provider>
    );
};
