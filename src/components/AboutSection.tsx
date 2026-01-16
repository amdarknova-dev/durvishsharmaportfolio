import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Code, Palette, Zap, Heart } from 'lucide-react';
import { SplitParallaxText } from './ParallaxText';
import { motion, useInView, Variants } from 'framer-motion';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6 bg-[#0a0a0a] scroll-mt-24 md:scroll-mt-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Narrative content (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-black text-[#4f46e5] mb-12 tracking-tight uppercase font-serif italic">
                ABOUT ME
              </h2>

              <div className="space-y-8 max-w-xl">
                <p className="text-2xl text-gray-300 leading-[1.6] font-light">
                  I'm <span className="text-white font-bold">Durvish Sharma</span>, a creative developer focused on building digital experiences that feel great to use and solve real problems through strong craft and thoughtful interactions.
                </p>

                <p className="text-xl text-gray-500 leading-relaxed font-light">
                  Originally from Haryana, India, I work closely with founders and creative teams to turn ambitious ideas into intentional, well-engineered products that make everyday life simpler and more meaningful.
                </p>
              </div>
            </div>

            {/* High-Contrast Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-12 border-t border-white/5">
              {[
                { label: "Archived Projects", value: "24+" },
                { label: "Systems XP", value: "3+ Yrs" },
                { label: "Performance Score", value: "100" }
              ].map((stat) => (
                <div key={stat.label} className="group flex flex-col items-start space-y-2">
                  <div className="text-4xl font-black text-white group-hover:text-primary transition-colors tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image Content (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 glass-premium group">
              <img
                src="/images/durvish-profile.jpg"
                alt="Durvish Sharma"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;