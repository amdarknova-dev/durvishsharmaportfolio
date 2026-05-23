import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

// ============================================
// 📧 EMAILJS CONFIGURATION
// ============================================

const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_btjz197',          // ✅ Gmail service (DarkNova)
    TEMPLATE_ID: 'template_792ooto',        // ✅ Contact Us notification template
    AUTOREPLY_TEMPLATE: 'template_6jypu4g', // ✅ Auto-reply template
    PUBLIC_KEY: 'J_vbhCXcphPNiHFug',        // ✅ Public API key
};

// ✉️ Contact form notification inbox
const NOTIFICATION_EMAILS = [
    'amdarknova23221@gmail.com',
];

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
        jobTitle?: string;
        inquiryType: string;
        message: string;
    }) => {
        // ── Validation ────────────────────────────────────────────────────────
        if (!formData.firstName || !formData.email || !formData.message) {
            toast({
                title: "Missing Required Fields",
                description: "Please fill in name, email, and message.",
                variant: "destructive",
            });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address.",
                variant: "destructive",
            });
            return false;
        }

        if (formData.phone) {
            const cleanPhone = formData.phone.replace(/\D/g, '');
            if (cleanPhone.length < 10 || cleanPhone.length > 15) {
                toast({
                    title: "Invalid Phone Number",
                    description: "Please enter a valid phone number (10–15 digits).",
                    variant: "destructive",
                });
                return false;
            }
        }

        setIsSubmitting(true);

        try {
            // Shared variables passed to every template
            const baseParams = {
                from_name: `${formData.firstName} ${formData.lastName}`.trim(),
                from_email: formData.email,
                reply_to: formData.email,
                phone: formData.phone
                    ? `${formData.countryCode} ${formData.phone}`
                    : 'Not provided',
                job_title: formData.jobTitle || 'Not provided',
                inquiry_type:
                    formData.inquiryType === 'none'
                        ? 'General Inquiry'
                        : formData.inquiryType,
                message: formData.message,
                to_name: 'Durvish',
            };

            // ── Notify BOTH owner inboxes via the EmailJS REST API ────────────
            // The SDK always sends to the address hardcoded in the dashboard template.
            // The REST API lets us pass `to_email` as a real per-call recipient override.
            const notifyResults = await Promise.allSettled(
                NOTIFICATION_EMAILS.map((recipientEmail) =>
                    fetch('https://api.emailjs.com/api/v1.0/email/send', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            service_id: EMAILJS_CONFIG.SERVICE_ID,
                            template_id: EMAILJS_CONFIG.TEMPLATE_ID,
                            user_id: EMAILJS_CONFIG.PUBLIC_KEY,
                            template_params: {
                                ...baseParams,
                                to_email: recipientEmail,
                            },
                        }),
                    }).then(async (res) => {
                        if (!res.ok) {
                            const text = await res.text();
                            throw new Error(`EmailJS REST ${res.status}: ${text}`);
                        }
                        return res;
                    })
                )
            );

            notifyResults.forEach((result, i) => {
                if (result.status === 'rejected') {
                    console.warn(
                        `⚠️ Notification to ${NOTIFICATION_EMAILS[i]} failed:`,
                        result.reason
                    );
                } else {
                    console.log(`✅ Notification sent to ${NOTIFICATION_EMAILS[i]}`);
                }
            });

            const anySuccess = notifyResults.some((r) => r.status === 'fulfilled');
            if (!anySuccess) {
                throw new Error('All notification sends failed — check EmailJS credentials');
            }

            // ── Auto-reply confirmation to the sender ─────────────────────────
            try {
                await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.AUTOREPLY_TEMPLATE,
                    { ...baseParams, to_email: formData.email },
                    EMAILJS_CONFIG.PUBLIC_KEY
                );
                console.log(`✅ Auto-reply sent to ${formData.email}`);
            } catch (autoReplyError) {
                console.warn('⚠️ Auto-reply failed, but notification sent:', autoReplyError);
            }

            toast({
                title: "Message Transmitted! 🚀",
                description: "I'll get back to you within 24 hours. Check your email for confirmation!",
                duration: 6000,
            });

            return true;

        } catch (error: any) {
            console.error('EmailJS Error:', error);
            toast({
                title: "Transmission Failed",
                description: error.message || "Please try again or email me directly.",
                variant: "destructive",
            });
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
