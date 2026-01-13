import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSound } from '@/context/SoundContext';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const { playHover, playClick } = useSound();

    const changeLanguage = (lng: string) => {
        playClick();
        i18n.changeLanguage(lng);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                    onMouseEnter={() => playHover()}
                >
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="sr-only">Switch Language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 border-white/10 text-white backdrop-blur-xl">
                <DropdownMenuItem
                    onClick={() => changeLanguage('en')}
                    className="hover:bg-primary/20 focus:bg-primary/20 cursor-pointer"
                >
                    English
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => changeLanguage('hi')}
                    className="hover:bg-primary/20 focus:bg-primary/20 cursor-pointer"
                >
                    हिन्दी (Hindi)
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => changeLanguage('de')}
                    className="hover:bg-primary/20 focus:bg-primary/20 cursor-pointer"
                >
                    Deutsch (German)
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => changeLanguage('fr')}
                    className="hover:bg-primary/20 focus:bg-primary/20 cursor-pointer"
                >
                    Français (French)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSwitcher;
