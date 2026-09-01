import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="brand-story" className="relative py-32 bg-[#050505] border-t border-white/5 overflow-hidden">
      
      {/* Fine Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Editorial Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#08080a] p-2">
              <img
                src="/images/urban_macro.png"
                alt="Urban Vapes Industrial Craftsmanship"
                className="w-full h-[460px] object-cover rounded-2xl filter saturate-125 contrast-125 hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                <span className="block text-[10px] font-mono text-brand-accent tracking-widest uppercase">
                  MANIFESTO // 001
                </span>
                <p className="text-xs font-grotesk text-white/90 mt-1">
                  Engineered in darkness. Refined for structural perfection across night cityscapes.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-brand-accent uppercase">
                <Terminal className="w-3.5 h-3.5" />
                <span>BRAND MANIFESTO</span>
              </div>

              <h2 className="text-5xl sm:text-7xl font-sora font-extrabold text-white tracking-tighter leading-[0.95]">
                CITY LIGHTS.<br />
                <span className="text-brand-accent">DARK MATTER.</span>
              </h2>

              <h3 className="text-3xl sm:text-4xl font-sora font-extrabold text-white/25 tracking-tight pt-2">
                URBAN VAPES
              </h3>
            </div>

            <div className="space-y-4 text-sm sm:text-base font-grotesk font-light text-white/80 leading-relaxed">
              <p>
                We believe modern hardware should feel like a physical extension of architectural nightlife. No compromise. No excessive ornament. Only cold aerospace alloys, black chrome reflections, and surgical haptic feedback.
              </p>
              <p>
                <strong>URBAN VAPES</strong> was conceived at the intersection of luxury automotive design and futuristic streetwear aesthetics. Every device in our collection is an exercise in monolithic form and thermal isolation.
              </p>
            </div>

            {/* Pillar Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10 font-mono">
              <div>
                <span className="block text-2xl font-sora font-extrabold text-white">7075</span>
                <span className="text-[10px] text-brand-muted uppercase tracking-wider">Aerospace Alloy Standard</span>
              </div>
              <div>
                <span className="block text-2xl font-sora font-extrabold text-brand-accent">0.1ms</span>
                <span className="text-[10px] text-brand-muted uppercase tracking-wider">Haptic Telemetry Response</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
