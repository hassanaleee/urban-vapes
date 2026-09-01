import React from 'react';
import { motion } from 'framer-motion';
import { Box } from 'lucide-react';

const RETAIL_PHILOSOPHY = [
  {
    title: "FORM",
    subtitle: "Industrial Proportions & Comfort",
    content: "Minimalist unibody profiles engineered for seamless everyday carry. Compact footprints that feel natural in hand.",
    image: "/images/urban_x1.png"
  },
  {
    title: "MATERIAL",
    subtitle: "Aerospace Alloys & Leather Grips",
    content: "Zinc alloy chassis, brushed titanium rails, and precision leather inlays. Every surface is chosen for durability and tactile balance.",
    image: "/images/urban_v2.png"
  },
  {
    title: "DETAIL",
    subtitle: "HD Displays & Smart Chipsets",
    content: "Intuitive OLED telemetry, stepless airflow sliders, and sub-millisecond rapid ignition chipsets.",
    image: "/images/urban_macro.png"
  }
];

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="relative py-28 bg-[#030303] border-t border-white/5 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-brand-accent uppercase">
            <Box className="w-3.5 h-3.5" />
            <span>RETAIL SELECTION PHILOSOPHY</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-sora font-extrabold text-white tracking-tighter">
            CURATION STANDARDS<span className="text-brand-accent">.</span>
          </h2>
          <p className="text-base sm:text-lg font-grotesk text-brand-muted">
            Three architectural pillars guiding every hardware brand we stock.
          </p>
        </div>

        {/* Three Oversized Feature Breakdowns */}
        <div className="space-y-24">
          {RETAIL_PHILOSOPHY.map((pillar, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Visual Card Column */}
                <div className={`lg:col-span-6 relative ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <div className="relative rounded-3xl bg-gradient-to-b from-[#141414] to-[#070707] border border-white/10 p-8 sm:p-12 overflow-hidden group hover:border-brand-accent/50 transition-all duration-500 shadow-2xl">
                    
                    <div className="relative z-10 h-[320px] sm:h-[400px] flex items-center justify-center">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_30px_40px_rgba(0,0,0,0.9)] transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="absolute top-6 left-6 px-3 py-1 rounded bg-black/80 border border-white/10 text-[11px] font-mono text-brand-accent uppercase backdrop-blur-md">
                      PILLAR 0{idx + 1} // {pillar.title}
                    </div>
                  </div>
                </div>

                {/* Typography Column */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                  <span className="text-6xl sm:text-8xl font-sora font-extrabold text-white/10 font-mono block">
                    0{idx + 1}
                  </span>

                  <h3 className="text-4xl sm:text-6xl font-sora font-extrabold text-white tracking-tight -mt-8">
                    {pillar.title}
                  </h3>

                  <h4 className="text-sm font-mono text-brand-accent tracking-wider uppercase">
                    {pillar.subtitle}
                  </h4>

                  <p className="text-base sm:text-lg font-grotesk text-white/80 leading-relaxed font-light">
                    {pillar.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
