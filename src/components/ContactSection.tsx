import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle, Instagram, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Web3Forms API - Get your free access key from https://web3forms.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'a13b7359-c155-42a5-90bc-67fbd016acad', // Replace with your actual key
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: "Durvish Portfolio",
          subject: `New Contact Form Submission from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent! ✓",
          description: "Thank you for reaching out. I'll get back to you soon!",
          duration: 5000,
        });
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Web3Forms Error:', result);
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error: any) {
      console.error('Contact Form Error:', error);
      toast({
        title: "Oops! Something went wrong",
        description: error.message || "Please try again or email me directly at durvishsharma23221@gmail.com",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'durvishsharma23221@gmail.com',
      href: 'mailto:durvishsharma23221@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Haryana, India',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/durvish_sharma.22.23',
      color: 'hover:text-pink-400',
    },
   
    }, {
    icon: discord,
    label: 'discord',
    href: 'https://discord.com/darknova001.hd'
     color: 'hover:text-red-400',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61585366571097',
    color: 'hover:text-blue-500',
  },
  {
    icon: Twitter,
    label: 'X',
    href: 'https://x.com/durvishsharma01',
    color: 'hover:text-gray-300',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    color: 'hover:text-blue-400',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/amdarknova-dev',
    color: 'hover:text-gray-300',
  },
  ];

return (
  <section id="contact" ref={sectionRef} className="relative py-32 px-6 bg-gradient-to-b from-background to-primary/5">
    <div className="max-w-6xl mx-auto">
      {/* Section header */}
      <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-white">Get In</span> <span className="text-gradient">Touch</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
          Let's build something amazing together. Open for freelance projects, collaborations, and full-time opportunities.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <Card className={`glass p-8 border-white/10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white font-medium">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-primary/50 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-primary/50 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project..."
                rows={6}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-primary/50 focus:ring-primary/20 resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl transition-all duration-300 glow-primary hover:scale-[1.02] group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Contact Info */}
        <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>

            {contactInfo.map((info, index) => (
              <a
                key={info.label}
                href={info.href}
                className={`flex items-center space-x-4 p-4 rounded-xl glass border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{info.label}</p>
                  <p className="text-white font-medium select-text">{info.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Follow Me</h3>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-xl glass border-white/10 hover:border-primary/30 flex items-center justify-center transition-all duration-300 hover:scale-110 text-gray-400 ${social.color} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
    </div>
  </section>
);
};

export default ContactSection;