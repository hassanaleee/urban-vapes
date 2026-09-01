import React from 'react';
import { motion } from 'framer-motion';
import { VaporCanvas } from '../canvas/VaporCanvas';
import { Moon } from 'lucide-react';

export const AtmosphereSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] py-32 bg-[#020202] flex items-center justify-center overflow-hidden border-t border-white/5">
      {/* Volumetric Vapor Simulation */}
      <VaporCanvas density={50} speed={0.25} accentGlow={true} />

      {/* Dramatic Top Light Beam Cutting Through Darkness */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[1000px] bg-gradient-to-b from-white/10 via-brand-accent/20 to-transparent blur-3xl pointer-events-none transform -rotate-12" />

      {/* Ambient Red Glow Halo */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-10">
        
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <Moon className="w-4 h-4 text-brand-accent" />
          <span className="text-xs font-mono tracking-widest text-white/80 uppercase">
            ATMOSPHERIC EXPERIENTIAL ENVIRONMENT
          </span>
        </motion.div>

        {/* Device Emergence Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative max-w-md mx-auto my-8"
        >
          <div className="relative z-10 p-4">
            <img
              src="/images/urban_x1.png"
              alt="Urban Vapes Device Emerging from Dark Vapor"
              className="w-auto h-[320px] sm:h-[420px] mx-auto object-contain filter drop-shadow-[0_40px_60px_rgba(229,9,20,0.4)] animate-float"
            />
          </div>

          {/* Emergence Floor Ring */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-radial-at-c from-brand-accent/40 via-red-950/20 to-transparent blur-xl rounded-full" />
        </motion.div>

        {/* Main Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="space-y-4 max-w-2xl mx-auto"
        >
          <h2 className="text-5xl sm:text-7xl font-sora font-extrabold text-white tracking-tighter">
            BUILT AFTER DARK<span className="text-brand-accent">.</span>
          </h2>
          <p className="text-lg sm:text-xl font-grotesk font-light text-brand-muted tracking-wide">
            A darker approach to modern hardware.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
