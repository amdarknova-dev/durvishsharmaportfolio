import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Twitter, Linkedin, Facebook, Link, Check } from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
    title: string;
    description?: string;
    url?: string;
    className?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
    title,
    description = '',
    url,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const { playClick, playSuccess } = useSound();
    const { toast } = useToast();

    const shareUrl = url || window.location.href;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    };

    const handleShare = (platform: keyof typeof shareLinks) => {
        playClick();
        window.open(shareLinks[platform], '_blank', 'width=600,height=400');

        toast({
            title: "Sharing...",
            description: `Opening ${platform} share dialog`,
        });
    };

    const handleCopyLink = async () => {
        playClick();
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            playSuccess();
            toast({
                title: "Link Copied!",
                description: "Share link copied to clipboard",
                className: "bg-green-900 border-green-500 text-green-100",
            });

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Failed to copy",
                description: "Please try again",
            });
        }
    };

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    playClick();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 text-gray-400 hover:text-white transition-all group"
            >
                <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-medium">Share</span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute top-full right-0 mt-2 p-3 glass-dark border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] z-50 min-w-[200px]"
                    >
                        <div className="space-y-2">
                            <button
                                onClick={() => handleShare('twitter')}
                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-blue-500/20 text-gray-300 hover:text-blue-400 transition-all group"
                            >
                                <Twitter className="w-4 h-4" />
                                <span className="text-sm">Twitter</span>
                            </button>

                            <button
                                onClick={() => handleShare('linkedin')}
                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-blue-600/20 text-gray-300 hover:text-blue-500 transition-all group"
                            >
                                <Linkedin className="w-4 h-4" />
                                <span className="text-sm">LinkedIn</span>
                            </button>

                            <button
                                onClick={() => handleShare('facebook')}
                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-blue-700/20 text-gray-300 hover:text-blue-600 transition-all group"
                            >
                                <Facebook className="w-4 h-4" />
                                <span className="text-sm">Facebook</span>
                            </button>

                            <div className="h-px bg-white/10 my-2" />

                            <button
                                onClick={handleCopyLink}
                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-primary/20 text-gray-300 hover:text-primary transition-all group"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 text-primary" />
                                        <span className="text-sm text-primary">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Link className="w-4 h-4" />
                                        <span className="text-sm">Copy Link</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default ShareButtons;
