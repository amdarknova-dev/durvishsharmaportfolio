import React from 'react';
import { Heart, Code, Coffee } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          {/* Logo/Name */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gradient">Durvish Sharma</h3>
            <p className="text-gray-400">Creative Frontend Developer & UI Engineer</p>
          </div>

          {/* Made with love */}
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>and</span>
            <Code className="w-4 h-4 text-primary" />
            <span>and lots of</span>
            <Coffee className="w-4 h-4 text-amber-500" />
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-white/10">
            <p className="text-sm text-gray-500">
              © {currentYear} Durvish Sharma. All rights reserved.
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      </div>
    </footer>
  );
};

export default Footer;