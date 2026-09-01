import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Maximize2, Shield, Radio, Cpu } from 'lucide-react';

const MACRO_HIGHLIGHTS = [
  {
    title: "Brushed Metal Surface",
    subtitle: "AEROSPACE ALLOY METALLURGY",
    description: "Multi-directional satin brush pattern engineered for tactile friction and thermal isolation.",
    icon: Shield,
    image: "/images/urban_macro.png",
    gridClass: "col-span-1 md:col-span-2 lg:col-span-2"
  },
  {
    title: "Diamond-Cut Bevels",
    subtitle: "45° CHROME CONTOURS",
    description: "Laser-milled edge geometry that catches dark urban streetlights with razor precision.",
    icon: Sparkles,
    image: "/images/urban_v2.png",
    gridClass: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    title: "Machined Intake Ports",
    subtitle: "AERODYNAMIC INTENTION",
    description: "Micro-perforated airflow gills etched with sub-millimeter tolerances for silent draw dynamics.",
    icon: Radio,
    image: "/images/urban_x1.png",
    gridClass: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    title: "Flush OLED Telemetry",
    subtitle: "SMOKED GLASS INTERFACE",
    description: "Seamless dark glass panel presenting real-time draw metrics and battery reserve.",
    icon: Cpu,
    image: "/images/urban_arc.png",
    gridClass: "col-span-1 md:col-span-2 lg:col-span-2"
  }
];

export const MacroDetails: React.FC = () => {
  return (
    <section id="macro" className="relative py-28 bg-[#070707] border-t border-white/5 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-brand-accent uppercase">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>INDUSTRIAL MATERIAL PRINCIPLES</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-sora font-extrabold text-white tracking-tighter leading-tight">
            EVERY SURFACE <br />
            HAS A PURPOSE<span className="text-brand-accent">.</span>
          </h2>
          <p className="text-base sm:text-lg font-grotesk font-light text-brand-muted max-w-xl">
            Architectural exploration of aerospace alloys, mirror-finished bevels, and micro-machined heat dispersion.
          </p>
        </div>

        {/* Macro Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MACRO_HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`group relative rounded-3xl bg-[#0d0d0d] border border-white/10 overflow-hidden hover:border-brand-accent/60 transition-all duration-500 min-h-[360px] flex flex-col justify-between p-8 ${item.gridClass}`}
              >
                {/* Background Visual Container */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-35 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700 filter saturate-150 contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />
                </div>

                {/* Card Top Label */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded bg-black/80 border border-white/10 text-[10px] font-mono tracking-[0.2em] text-brand-accent uppercase backdrop-blur-md">
                    {item.subtitle}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Bottom Text */}
                <div className="relative z-10 space-y-2 pt-12">
                  <h3 className="text-2xl sm:text-3xl font-sora font-extrabold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs font-grotesk font-light text-white/70 max-w-md leading-relaxed">
                    {item.description}
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
