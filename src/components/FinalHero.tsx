import React from 'react';
import { motion } from 'framer-motion';
import { VaporCanvas } from '../canvas/VaporCanvas';
import { ArrowRight } from 'lucide-react';

interface FinalHeroProps {
  onOpenInspector: () => void;
}

export const FinalHero: React.FC<FinalHeroProps> = ({ onOpenInspector }) => {
  return (
    <section className="relative min-h-screen py-32 bg-[#020202] flex items-center justify-center overflow-hidden border-t border-white/5">
      {/* Vapor Canvas Simulation */}
      <VaporCanvas density={45} speed={0.2} accentGlow={true} />

      {/* Deep Crimson Spotlight Halo */}
      <div className="absolute inset-0 bg-radial-at-c from-brand-accent/25 via-transparent to-transparent pointer-events-none blur-3xl animate-pulse-slow" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-12">
        
        {/* Large Device Render in Darkness */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative max-w-lg mx-auto"
        >
          <img
            src="/images/urban_x1.png"
            alt="URBAN VAPES Flagship Hardware in Darkness"
            className="w-auto h-[340px] sm:h-[460px] mx-auto object-contain filter drop-shadow-[0_40px_80px_rgba(229,9,20,0.5)] animate-float"
          />
        </motion.div>

        {/* Huge Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-6xl sm:text-8xl lg:text-9xl font-sora font-extrabold text-white tracking-tighter leading-none">
            OWN THE<br />
            <span className="text-brand-accent">NIGHT.</span>
          </h2>

          <h3 className="text-2xl sm:text-4xl font-sora font-extrabold text-white/40 tracking-widest pt-2 uppercase">
            URBAN VAPES
          </h3>
        </motion.div>

        {/* Minimal Outlined Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-4"
        >
          <button
            onClick={onOpenInspector}
            className="px-10 py-5 rounded-2xl border border-white/20 hover:border-brand-accent bg-black/60 backdrop-blur-md text-white font-sora font-bold text-sm sm:text-base tracking-widest uppercase inline-flex items-center gap-3 hover:bg-brand-accent hover:shadow-[0_0_50px_rgba(229,9,20,0.6)] transition-all duration-500 group"
          >
            <span>EXPLORE URBAN VAPES</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
