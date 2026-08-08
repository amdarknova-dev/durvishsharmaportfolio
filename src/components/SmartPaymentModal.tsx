import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, CheckCircle2, AlertCircle, ScanLine, UploadCloud, FileWarning, DollarSign, Smartphone } from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import { sendPaymentVerificationEmail } from '@/lib/emailjs';
import { QRCodeSVG } from 'qrcode.react';
import { createWorker } from 'tesseract.js';

interface SmartPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  servicePrice: string;
}

const SmartPaymentModal: React.FC<SmartPaymentModalProps> = ({ isOpen, onClose, serviceName, servicePrice }) => {
  const { playClick, playHover } = useSound();
  
  // States
  const [orderId, setOrderId] = useState('');
  const [step, setStep] = useState<'checkout' | 'scanning' | 'success' | 'failed' | 'manual'>('checkout');
  const [progress, setProgress] = useState(0);
  const [scanResult, setScanResult] = useState<{ payee: boolean; amount: boolean; utr: string | null }>({ payee: false, amount: false, utr: null });
  const [errorMsg, setErrorMsg] = useState('');
  const [manualUtr, setManualUtr] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const PAYEE_NAME = "Suraj";
  const UPI_ID = "9817250790@fam";

  // Clean price for regex matching (e.g., "$2,500" -> "2500")
  const numericPrice = servicePrice.replace(/[^\d]/g, '');

  useEffect(() => {
    if (isOpen) {
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      setOrderId(`ORD-${date}-${random}`);
      setStep('checkout');
      setProgress(0);
    }
  }, [isOpen]);

  const handleClose = () => {
    playClick();
    onClose();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    playClick();
    setStep('scanning');
    setProgress(10);

    try {
      // 1. Initialize Tesseract
      setProgress(30);
      const worker = await createWorker('eng');
      
      setProgress(50);
      const ret = await worker.recognize(file);
      const text = ret.data.text;
      
      setProgress(80);
      await worker.terminate();

      // 2. Perform Regex Validation
      const payeeMatch = new RegExp(`${PAYEE_NAME}|${UPI_ID.replace('@', '\\@')}`, 'i').test(text);
      const amountMatch = new RegExp(`\\b${numericPrice}(\\.\\d{2})?\\b`).test(text);
      const utrMatchArray = text.match(/\b(\d{12})\b/);
      const utrMatch = utrMatchArray ? utrMatchArray[1] : null;

      setScanResult({ payee: payeeMatch, amount: amountMatch, utr: utrMatch });
      setProgress(100);

      // 3. Process Result
      if (payeeMatch && amountMatch && utrMatch) {
        await saveOrderToDB(utrMatch, 'PAID');
        setStep('success');
      } else {
        let err = [];
        if (!payeeMatch) err.push("Payee name mismatch.");
        if (!amountMatch) err.push(`Expected amount ${numericPrice} not found.`);
        if (!utrMatch) err.push("12-digit UTR not found.");
        setErrorMsg(err.join(" "));
        setStep('failed');
      }

    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to process image. Please try again or enter UTR manually.");
      setStep('failed');
    }
  };

  const saveOrderToDB = async (utr: string, status: string) => {
    try {
      // Save locally for admin portal simulation
      const existingOrders = JSON.parse(localStorage.getItem('admin_orders') || '[]');
      existingOrders.push({
        id: Math.random().toString(),
        created_at: new Date().toISOString(),
        order_id: orderId,
        service_name: serviceName,
        amount: numericPrice,
        status: status,
        utr_number: utr,
        customer_email: 'unknown'
      });
      localStorage.setItem('admin_orders', JSON.stringify(existingOrders));

      // Send actual email to admin
      await sendPaymentVerificationEmail({
        customerName: "Anonymous",
        customerEmail: "unknown@example.com",
        serviceName: serviceName,
        amount: numericPrice,
        utrNumber: utr,
        senderUpiId: "Unknown"
      });
    } catch (e) {
      console.warn("Save failed", e);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (manualUtr.length !== 12) {
      setErrorMsg("UTR must be exactly 12 digits.");
      return;
    }
    await saveOrderToDB(manualUtr, 'PENDING_VERIFICATION');
    setStep('manual');
  };

  // UPI Intent URI
  const upiIntent = `upi://pay?pa=${UPI_ID}&pn=${PAYEE_NAME}&am=${numericPrice}&cu=INR&tn=${orderId}`;

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
            className="relative w-full max-w-2xl bg-[#0b080c] border border-white/10 shadow-2xl rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/[0.02]">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ScanLine className="w-5 h-5 text-[#3b82f6]" />
                  AI Payment Gateway
                </h3>
                <p className="text-xs text-white/50 font-mono mt-1">Order: {orderId}</p>
              </div>
              <button onClick={handleClose} onMouseEnter={() => playHover()} className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 min-h-[400px] flex flex-col items-center justify-center relative">
              
              {/* STEP: CHECKOUT */}
              {step === 'checkout' && (
                <div className="w-full flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2 flex flex-col items-center text-center">
                    <div className="p-4 bg-white rounded-2xl mb-4">
                      <QRCodeSVG value={upiIntent} size={160} />
                    </div>
                    <p className="text-sm font-bold text-white">{serviceName}</p>
                    <p className="text-[#10b981] font-mono text-xl mt-1">₹{numericPrice}</p>
                  </div>
                  
                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <a href={`phonepe://pay?pa=${UPI_ID}&pn=${PAYEE_NAME}&am=${numericPrice}&cu=INR`} className="py-3 bg-[#5f259f]/20 hover:bg-[#5f259f]/40 border border-[#5f259f]/50 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
                        <Smartphone className="w-4 h-4" /> PhonePe
                      </a>
                      <a href={`tez://upi/pay?pa=${UPI_ID}&pn=${PAYEE_NAME}&am=${numericPrice}&cu=INR`} className="py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
                        <Smartphone className="w-4 h-4" /> GPay
                      </a>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                      <div className="relative flex justify-center"><span className="bg-[#0b080c] px-2 text-[10px] uppercase tracking-widest text-white/40">Then Verify</span></div>
                    </div>

                    <button 
                      onClick={() => { playClick(); fileInputRef.current?.click(); }}
                      onMouseEnter={() => playHover()}
                      className="w-full py-4 border-2 border-dashed border-[#3b82f6]/50 rounded-xl bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 text-[#3b82f6] font-bold text-sm flex items-center justify-center gap-2 transition-all"
                    >
                      <UploadCloud className="w-5 h-5" />
                      Upload Payment Screenshot
                    </button>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                    <p className="text-[10px] text-center text-white/40 uppercase tracking-widest mt-2">AI OCR will auto-verify instantly</p>
                  </div>
                </div>
              )}

              {/* STEP: SCANNING */}
              {step === 'scanning' && (
                <div className="w-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="relative">
                    <ScanLine className="w-16 h-16 text-[#3b82f6] animate-pulse" />
                    <motion.div 
                      className="absolute inset-0 border-b-2 border-[#10b981]"
                      animate={{ y: [0, 64, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI OCR Scanning in Progress...</h3>
                    <p className="text-sm text-white/50 mt-2">Extracting UTR and validating exact amount.</p>
                  </div>
                  <div className="w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#10b981]" animate={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              {/* STEP: SUCCESS */}
              {step === 'success' && (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#10b981]/20 flex items-center justify-center border border-[#10b981]/50">
                    <CheckCircle2 className="w-10 h-10 text-[#10b981]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Payment Verified!</h3>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full max-w-sm text-left font-mono text-sm space-y-2">
                    <p className="text-white/60">Status: <span className="text-[#10b981] float-right">PAID</span></p>
                    <p className="text-white/60">UTR: <span className="text-white float-right">{scanResult.utr}</span></p>
                    <p className="text-white/60">Amount: <span className="text-white float-right">₹{numericPrice}</span></p>
                  </div>
                  <button onClick={handleClose} className="mt-4 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all">Continue</button>
                </motion.div>
              )}

              {/* STEP: FAILED */}
              {step === 'failed' && (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex flex-col items-center text-center space-y-4 w-full max-w-sm">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50">
                    <FileWarning className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Verification Failed</h3>
                  <p className="text-sm text-red-400">{errorMsg}</p>
                  
                  <div className="w-full pt-4 border-t border-white/10 mt-4">
                    <p className="text-xs text-white/50 mb-3">Enter UTR manually for admin review:</p>
                    <form onSubmit={handleManualSubmit} className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="12-Digit UTR" 
                        value={manualUtr}
                        onChange={(e) => setManualUtr(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3b82f6]"
                      />
                      <button type="submit" className="px-4 py-2 bg-[#3b82f6] text-white font-bold rounded-lg hover:bg-[#2563eb]">Submit</button>
                    </form>
                  </div>
                  <button onClick={() => setStep('checkout')} className="text-xs text-white/40 hover:text-white mt-4 underline">Try uploading again</button>
                </motion.div>
              )}

              {/* STEP: MANUAL PENDING */}
              {step === 'manual' && (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50">
                    <AlertCircle className="w-10 h-10 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Pending Verification</h3>
                  <p className="text-sm text-white/60 max-w-sm">
                    Your UTR has been submitted. Manual reconciliation takes up to 2 hours. You will receive an email once approved.
                  </p>
                  <button onClick={handleClose} className="mt-4 px-8 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all">Got it</button>
                </motion.div>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmartPaymentModal;
