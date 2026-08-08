import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Copy, CheckCircle2 } from 'lucide-react';
import { useSound } from '@/context/SoundContext';

interface DiscordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  servicePrice: string;
}

const DiscordPaymentModal: React.FC<DiscordPaymentModalProps> = ({ isOpen, onClose, serviceName, servicePrice }) => {
  const { playClick, playHover } = useSound();
  const [copied, setCopied] = useState(false);

  const discordUsername = 'darknova001.hd';
  const discordInvite = 'https://discord.gg/F39kaAf4z';

  const handleCopy = () => {
    playClick();
    navigator.clipboard.writeText(discordUsername);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md bg-[#0b080c] border border-[#c2a4ff]/20 shadow-2xl rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/[0.02]">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#5865F2]" />
                Secure Checkout
              </h3>
              <button onClick={handleClose} onMouseEnter={() => playHover()} className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#5865F2]/20 flex items-center justify-center border border-[#5865F2]/50 mb-6">
                <MessageCircle className="w-8 h-8 text-[#5865F2]" />
              </div>
              
              <h4 className="text-2xl font-bold text-white mb-2">{serviceName}</h4>
              <p className="text-[#c2a4ff] font-mono text-xl mb-6">{servicePrice}</p>
              
              <p className="text-white/60 text-sm mb-8 leading-relaxed">
                To guarantee the highest quality of service and security, all premium payments are processed securely via Discord. 
                Contact me directly to arrange payment and begin the onboarding process.
              </p>

              <div className="w-full space-y-4">
                <a 
                  href={discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                  className="w-full py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  Join Discord Server
                </a>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                  <div className="relative flex justify-center"><span className="bg-[#0b080c] px-4 text-[10px] uppercase tracking-widest text-white/40">OR MESSAGE DIRECTLY</span></div>
                </div>

                <button 
                  onClick={handleCopy}
                  onMouseEnter={() => playHover()}
                  className="w-full py-4 border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-mono text-sm rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied Username!' : discordUsername}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DiscordPaymentModal;
