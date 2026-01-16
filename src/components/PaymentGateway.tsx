
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, QrCode, Smartphone, X, CheckCircle, ShieldCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PaymentGatewayProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    amount: number;
    itemName: string;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ isOpen, onClose, onSuccess, amount, itemName }) => {
    const [processing, setProcessing] = useState(false);
    const [complete, setComplete] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [formData, setFormData] = useState({
        upiId: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
        cardholderName: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Luhn Algorithm for Card Validation
    const luhnCheck = (val: string) => {
        let checksum = 0;
        let j = 1;
        for (let i = val.length - 1; i >= 0; i--) {
            let calc = 0;
            calc = Number(val.charAt(i)) * j;
            if (calc > 9) {
                checksum = checksum + 1;
                calc = calc - 10;
            }
            checksum = checksum + calc;
            if (j == 1) {
                j = 2;
            } else {
                j = 1;
            }
        }
        return (checksum % 10) == 0;
    };

    // Form Validation
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (paymentMethod === 'upi') {
            const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
            if (!formData.upiId) {
                newErrors.upiId = 'UPI ID is required';
            } else if (!upiRegex.test(formData.upiId)) {
                newErrors.upiId = 'Invalid UPI ID format (e.g. user@bank)';
            }
        } else {
            const cleanCardNum = formData.cardNumber.replace(/\s/g, '');
            if (!formData.cardNumber) {
                newErrors.cardNumber = 'Card number is required';
            } else if (cleanCardNum.length !== 16) {
                newErrors.cardNumber = 'Card number must be 16 digits';
            } else if (!luhnCheck(cleanCardNum)) {
                newErrors.cardNumber = 'Invalid card number';
            }

            if (!formData.expiry) {
                newErrors.expiry = 'Expiry date is required';
            } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
                newErrors.expiry = 'Invalid format (MM/YY)';
            } else {
                const [month, year] = formData.expiry.split('/').map(Number);
                const currentYear = new Date().getFullYear() % 100;
                const currentMonth = new Date().getMonth() + 1;

                if (year < currentYear || (year === currentYear && month < currentMonth)) {
                    newErrors.expiry = 'Card has expired';
                }
            }

            if (!formData.cvc) {
                newErrors.cvc = 'CVC is required';
            } else if (formData.cvc.length !== 3) {
                newErrors.cvc = 'CVC must be 3 digits';
            }

            if (!formData.cardholderName) {
                newErrors.cardholderName = 'Cardholder name is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Mock Transaction Handler
    const handleTransaction = () => {
        if (!validateForm()) return;

        setProcessing(true);
        // Simulate network request
        setTimeout(() => {
            setProcessing(false);
            setComplete(true);
            setTimeout(() => {
                onSuccess();
            }, 2000);
        }, 3000);
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
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
                        className="fixed z-[101] w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 top-1/2 left-1/2"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                            <div>
                                <h3 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                    Secure Gateway
                                </h3>
                                <p className="text-[10px] text-gray-500 font-mono mt-1">
                                    AES-256 ENCRYPTED CONNECTION
                                </p>
                            </div>
                            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {complete ? (
                                <div className="py-12 flex flex-col items-center text-center space-y-4">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary"
                                    >
                                        <CheckCircle className="w-10 h-10" />
                                    </motion.div>
                                    <h4 className="text-2xl font-black text-white uppercase tracking-tight">Access Granted</h4>
                                    <p className="text-sm text-gray-400">Transaction verified. Redirecting to secure asset...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8 p-4 bg-primary/5 rounded-xl border border-primary/20 flex justify-between items-center">
                                        <div>
                                            <span className="block text-[10px] text-primary uppercase tracking-widest mb-1">Total Amount</span>
                                            <span className="text-2xl font-bold text-white">₹{amount}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Item</span>
                                            <span className="text-sm text-gray-300 font-medium">{itemName}</span>
                                        </div>
                                    </div>

                                    <Tabs defaultValue="upi" className="w-full" onValueChange={(value) => setPaymentMethod(value)}>
                                        <TabsList className="grid w-full grid-cols-2 bg-white/5 mb-6">
                                            <TabsTrigger value="upi" className="data-[state=active]:bg-primary data-[state=active]:text-black font-bold uppercase text-[10px] tracking-widest">
                                                <Smartphone className="w-3 h-3 mr-2" /> UPI / QR
                                            </TabsTrigger>
                                            <TabsTrigger value="card" className="data-[state=active]:bg-primary data-[state=active]:text-black font-bold uppercase text-[10px] tracking-widest">
                                                <CreditCard className="w-3 h-3 mr-2" /> Card
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="upi" className="space-y-4">
                                            <div className="bg-white rounded-xl p-4 aspect-square max-w-[200px] mx-auto flex items-center justify-center overflow-hidden">
                                                <img
                                                    src="/assets/upi-qr.png"
                                                    alt="UPI QR Code"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="text-center text-xs text-gray-500 font-mono uppercase tracking-widest">
                                                Scan to Pay with Any App
                                            </div>
                                            <div className="relative">
                                                <div className="absolute inset-0 flex items-center">
                                                    <span className="w-full border-t border-white/10" />
                                                </div>
                                                <div className="relative flex justify-center text-xs uppercase">
                                                    <span className="bg-[#0a0a0a] px-2 text-gray-500">Or Pay via ID</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Input
                                                    placeholder="username@upi"
                                                    className="bg-white/5 border-white/10 text-white font-mono"
                                                    value={formData.upiId}
                                                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                                                />
                                                {errors.upiId && <p className="text-red-500 text-xs">{errors.upiId}</p>}
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="card" className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs uppercase text-gray-500 tracking-widest">Card Number</Label>
                                                <div className="relative">
                                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <Input
                                                        placeholder="0000 0000 0000 0000"
                                                        className="pl-10 bg-white/5 border-white/10 text-white font-mono"
                                                        value={formData.cardNumber}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                                                            setFormData({ ...formData, cardNumber: value });
                                                        }}
                                                        maxLength={19}
                                                    />
                                                </div>
                                                {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-xs uppercase text-gray-500 tracking-widest">Expiry</Label>
                                                    <Input
                                                        placeholder="MM/YY"
                                                        className="bg-white/5 border-white/10 text-white font-mono"
                                                        value={formData.expiry}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/\D/g, '');
                                                            if (value.length <= 4) {
                                                                const formatted = value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
                                                                setFormData({ ...formData, expiry: formatted });
                                                            }
                                                        }}
                                                        maxLength={5}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs uppercase text-gray-500 tracking-widest">CVC</Label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                                                        <Input
                                                            type="password"
                                                            placeholder="..."
                                                            className="pl-8 bg-white/5 border-white/10 text-white font-mono"
                                                            value={formData.cvc}
                                                            onChange={(e) => {
                                                                const value = e.target.value.replace(/\D/g, '');
                                                                if (value.length <= 3) {
                                                                    setFormData({ ...formData, cvc: value });
                                                                }
                                                            }}
                                                            maxLength={3}
                                                        />
                                                    </div>
                                                    {errors.cvc && <p className="text-red-500 text-xs">{errors.cvc}</p>}
                                                </div>
                                            </div>
                                            {errors.expiry && <p className="text-red-500 text-xs">{errors.expiry}</p>}
                                            <div className="space-y-2">
                                                <Label className="text-xs uppercase text-gray-500 tracking-widest">Cardholder Name</Label>
                                                <Input
                                                    placeholder="JOHN DOE"
                                                    className="bg-white/5 border-white/10 text-white font-mono uppercase"
                                                    value={formData.cardholderName}
                                                    onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value.toUpperCase() })}
                                                />
                                            </div>
                                            {errors.cardholderName && <p className="text-red-500 text-xs">{errors.cardholderName}</p>}
                                        </TabsContent>
                                    </Tabs>

                                    <Button
                                        onClick={handleTransaction}
                                        disabled={processing}
                                        className="w-full mt-8 bg-primary hover:bg-primary/90 text-black font-bold h-12 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <span className="flex items-center gap-2 animate-pulse">
                                                Processing <span className="text-xs">...</span>
                                            </span>
                                        ) : (
                                            "Confirm Payment"
                                        )}
                                    </Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PaymentGateway;
