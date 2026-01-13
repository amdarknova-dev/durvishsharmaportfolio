import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

// ============================================
// 📧 EMAILJS CONFIGURATION
// ============================================
// Replace these with your actual EmailJS credentials after setup
// See docs/EMAILJS_SETUP.md for complete setup instructions

const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_zygykx8',        // ✅ Gmail service
    TEMPLATE_ID: 'template_00i05gm',      // ✅ Contact notification template
    AUTOREPLY_TEMPLATE: 'template_dwsplvb', // ✅ Auto-reply template
    PUBLIC_KEY: 'Em0CXojYf_aiUSfbN',      // ✅ Public API key
};

// ============================================
// 📧 EMAIL SENDING HOOK
// ============================================

export const useEmailJS = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const sendEmail = async (formData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        countryCode: string;
        inquiryType: string;
        message: string;
    }) => {
        // Validation
        if (!formData.firstName || !formData.email || !formData.message) {
            toast({
                title: "Missing Required Fields",
                description: "Please fill in name, email, and message.",
                variant: "destructive",
            });
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address.",
                variant: "destructive",
            });
            return false;
        }

        // Phone validation (if provided)
        if (formData.phone) {
            const cleanPhone = formData.phone.replace(/\D/g, '');
            if (cleanPhone.length !== 10) {
                toast({
                    title: "Invalid Phone Number",
                    description: "Please enter a valid 10-digit phone number.",
                    variant: "destructive",
                });
                return false;
            }
        }

        setIsSubmitting(true);

        try {
            // Prepare template parameters
            const templateParams = {
                from_name: `${formData.firstName} ${formData.lastName}`.trim(),
                from_email: formData.email,
                phone: formData.phone ? `${formData.countryCode} ${formData.phone}` : 'Not provided',
                inquiry_type: formData.inquiryType === 'none' ? 'General Inquiry' : formData.inquiryType,
                message: formData.message,
                to_name: 'Durvish', // Your name
            };

            // Send email to you (notification)
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                EMAILJS_CONFIG.PUBLIC_KEY
            );

            if (response.status === 200) {
                // Send auto-reply to user
                try {
                    await emailjs.send(
                        EMAILJS_CONFIG.SERVICE_ID,
                        EMAILJS_CONFIG.AUTOREPLY_TEMPLATE,
                        templateParams,
                        EMAILJS_CONFIG.PUBLIC_KEY
                    );
                } catch (autoReplyError) {
                    console.warn('Auto-reply failed, but main email sent:', autoReplyError);
                }

                toast({
                    title: "Message Transmitted! 🚀",
                    description: "I'll get back to you within 24 hours. Check your email for confirmation!",
                    duration: 6000,
                });

                return true;
            }

            throw new Error('Failed to send');
        } catch (error: any) {
            console.error('EmailJS Error:', error);

            // Check if credentials are configured
            if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
                toast({
                    title: "EmailJS Not Configured",
                    description: "Please set up EmailJS credentials. See docs/EMAILJS_SETUP.md",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Transmission Failed",
                    description: error.text || "Please try again or email me directly.",
                    variant: "destructive",
                });
            }

            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return { sendEmail, isSubmitting };
};

// ============================================
// 📝 USAGE EXAMPLE
// ============================================
/*

import { useEmailJS } from '@/lib/emailjs';

const ContactForm = () => {
  const { sendEmail, isSubmitting } = useEmailJS();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = await sendEmail({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      countryCode: '+91',
      inquiryType: 'website',
      message: 'Hello!',
    });
    
    if (success) {
      // Clear form
      setFormData({ ... });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

*/
