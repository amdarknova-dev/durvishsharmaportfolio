import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import { useEmailJS } from '@/lib/emailjs';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  servicePrice: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, serviceName, servicePrice }) => {
  const { playClick, playHover } = useSound();
  const { sendEmail, isSubmitting } = useEmailJS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    upiId: '',
    utr: '',
    amount: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    // Format the message for EmailJS
    const message = `
🔔 NEW PAYMENT VERIFICATION REQUEST 🔔
Service: ${serviceName}
Amount Paid: ${formData.amount}
Sender UPI ID: ${formData.upiId}
UTR Number: ${formData.utr}
    `;

    const success = await sendEmail({
      firstName: formData.name,
      lastName: '(UPI Buyer)',
      email: formData.email,
      phone: '',
      countryCode: '',
      inquiryType: `Payment: ${serviceName}`,
      message: message,
    });

    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ name: '', email: '', upiId: '', utr: '', amount: '' });
      }, 4000);
    }
  };

  const handleClose = () => {
    playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={handleClose}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0b080c] shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                onMouseEnter={() => playHover()}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Payment Info */}
              <div className="w-full md:w-5/12 bg-white/[0.02] border-b md:border-b-0 md:border-r border-white/5 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none opacity-50"
                  style={{ background: 'radial-gradient(circle at 0% 0%, #c2a4ff15 0%, transparent 60%)' }}
                />
                
                <div className="relative z-10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#c2a4ff] mb-2 block">
                    Secure Checkout
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                    {serviceName}
                  </h3>
                  <p className="text-sm font-light text-white/50 mb-8">
                    {servicePrice}
                  </p>

                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 text-center">
                    <QrCode className="w-12 h-12 text-[#c2a4ff] mx-auto mb-4" />
                    <p className="text-xs text-white/50 mb-2 uppercase tracking-widest">Pay via UPI to</p>
                    <p className="text-xl font-bold text-white select-all">9017250790@fam</p>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-[#c2a4ff]/10 border border-[#c2a4ff]/20">
                    <AlertCircle className="w-5 h-5 text-[#c2a4ff] shrink-0 mt-0.5" />
                    <p className="text-xs font-light text-white/70 leading-relaxed">
                      Please make the payment first, then fill out the form with your 12-digit UTR number to verify the transaction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Verification Form */}
              <div className="w-full md:w-7/12 p-8 md:p-10 relative">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#0b080c] z-20"
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#10b981] mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-2">Verification Sent</h3>
                    <p className="text-sm text-white/50 font-light max-w-xs">
                      I have received your payment details. I will verify the UTR and get back to you shortly!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col h-full relative z-10">
                    <h4 className="text-lg font-bold text-white mb-6">Payment Verification</h4>
                    
                    <div className="space-y-5 flex-grow">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono ml-2">Full Name</label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#c2a4ff]/50 focus:bg-white/[0.05] transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono ml-2">Email Address</label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#c2a4ff]/50 focus:bg-white/[0.05] transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono ml-2">Sender UPI ID</label>
                          <input
                            required
                            type="text"
                            value={formData.upiId}
                            onChange={(e) => setFormData({...formData, upiId: e.target.value})}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#c2a4ff]/50 focus:bg-white/[0.05] transition-all"
                            placeholder="yourname@okicici"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono ml-2">Amount Paid</label>
                          <input
                            required
                            type="text"
                            value={formData.amount}
                            onChange={(e) => setFormData({...formData, amount: e.target.value})}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#c2a4ff]/50 focus:bg-white/[0.05] transition-all"
                            placeholder="$5,000"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono ml-2">12-Digit UTR Number</label>
                        <input
                          required
                          type="text"
                          value={formData.utr}
                          onChange={(e) => setFormData({...formData, utr: e.target.value})}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#c2a4ff]/50 focus:bg-white/[0.05] transition-all"
                          placeholder="e.g. 312345678901"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={() => playHover()}
                      className="mt-8 w-full py-4 rounded-xl bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#c2a4ff] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Verifying...' : 'Submit Payment Details'}
                    </button>
                    
                    <a 
                      href="https://discord.gg/F39kaAf4z" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-center block text-[10px] uppercase tracking-widest text-white/40 hover:text-[#5865F2] transition-colors"
                    >
                      Prefer to DM darknova001.hd directly? Click here.
                    </a>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
