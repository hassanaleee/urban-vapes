import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RETAIL_PRODUCTS } from '../data/products';
import type { RetailProduct } from '../data/products';
import { Device3DCanvas } from './3d/Device3DCanvas';
import { Cpu, Eye, Flame, Layers } from 'lucide-react';

interface PinnedShowcaseProps {
  onSelectHardware: (item: RetailProduct) => void;
}

const STAGE_CONFIGS = [
  { rotX: 0.1, rotY: 0.4, rotZ: 0, scale: 1.2, tag: "OXVA XLIM PRO 2" },
  { rotX: 0.3, rotY: 1.8, rotZ: 0.1, scale: 1.25, tag: "VAPORESSO XROS 4" },
  { rotX: -0.2, rotY: -1.2, rotZ: -0.1, scale: 1.3, tag: "GEEKVAPE AEGIS LEGEND 3" },
  { rotX: 0, rotY: 3.14, rotZ: 0, scale: 1.15, tag: "SMOK NORD 5" }
];

export const PinnedShowcase: React.FC<PinnedShowcaseProps> = ({ onSelectHardware }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const showcaseItems = RETAIL_PRODUCTS.slice(0, 4);
  const activeDevice = showcaseItems[activeIndex];
  const activeConfig = STAGE_CONFIGS[activeIndex];

  return (
    <section id="showcase" className="relative py-28 bg-[#030303] border-t border-white/5 overflow-hidden">
      
      {/* Background Lighting Shift Effect */}
      <div
        className="absolute inset-0 transition-all duration-1000 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at ${25 + activeIndex * 20}% 50%, rgba(229, 9, 20, 0.3) 0%, transparent 60%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-brand-accent tracking-[0.2em] uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE 3D STAGE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-sora font-extrabold text-white tracking-tighter">
            HARDWARE SHOWCASE<span className="text-brand-accent">.</span>
          </h2>
          <p className="text-base sm:text-lg font-grotesk font-light text-brand-muted max-w-xl">
            Inspect flagship devices from OXVA, Vaporesso, Geekvape, and SMOK in real-time 3D space.
          </p>
        </div>

        {/* Stage Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {showcaseItems.map((device, idx) => (
            <button
              key={device.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-6 py-3 rounded-xl text-xs font-mono tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
                activeIndex === idx
                  ? 'bg-brand-accent text-white shadow-[0_0_25px_rgba(229,9,20,0.5)] border border-brand-accent'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeIndex === idx ? 'bg-white' : 'bg-brand-muted'}`} />
              {device.brand} {device.name.split(' ')[1] || ''}
            </button>
          ))}
        </div>

        {/* Main 3D Interactive Stage Container */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0a0a0a] via-[#070707] to-[#030303] border border-white/10 p-6 sm:p-12 lg:p-14 min-h-[580px] flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden shadow-2xl">
          
          {/* Stage Left: Technical Metadata */}
          <div className="w-full lg:w-5/12 space-y-8 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDevice.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Technical Eyebrow */}
                <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono tracking-[0.2em] text-brand-accent uppercase inline-block">
                  BRAND // {activeDevice.brand}
                </span>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-brand-muted uppercase tracking-widest block">
                    STAGE MODE // 0{activeIndex + 1}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-sora font-extrabold text-white">
                    {activeDevice.name}
                  </h3>
                  <p className="text-xs font-mono text-brand-accent uppercase tracking-wider">
                    ${activeDevice.price.toFixed(2)} — RETAIL PRICE
                  </p>
                </div>

                <p className="text-sm font-grotesk text-white/80 leading-relaxed font-light">
                  {activeDevice.fullDesc}
                </p>

                {/* Specs List */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs">
                  {activeDevice.specs.map((spec) => (
                    <div key={spec.label}>
                      <span className="block font-mono text-[10px] text-brand-muted uppercase">{spec.label}</span>
                      <span className="font-sora font-semibold text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onSelectHardware(activeDevice)}
                  className="w-full py-4 rounded-xl bg-white/10 border border-white/20 hover:border-brand-accent text-white font-sora font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-brand-accent transition-all duration-300"
                >
                  <Eye className="w-4 h-4 text-brand-accent group-hover:text-white" />
                  <span>VIEW PRODUCT DETAILS</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stage Right: Real 3D Camera Orbit Viewport */}
          <div className="w-full lg:w-7/12 relative min-h-[380px] sm:min-h-[480px] flex items-center justify-center order-1 lg:order-2">
            
            <Device3DCanvas
              rotationX={activeConfig.rotX}
              rotationY={activeConfig.rotY}
              rotationZ={activeConfig.rotZ}
              scale={activeConfig.scale}
              accentColor="#E50914"
              fallbackImage={activeDevice.image}
            />

            {/* Technical Orbit Indicator Badge */}
            <div className="absolute top-4 right-4 bg-black/80 border border-brand-accent/40 backdrop-blur-md px-3 py-1.5 rounded-md text-[10px] font-mono text-brand-accent flex items-center gap-1.5 shadow-lg">
              <Flame className="w-3 h-3 text-brand-accent" />
              <span>3D ORBIT ANGLE: ACTIVE</span>
            </div>

            <div className="absolute bottom-4 left-4 bg-black/80 border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-md text-[10px] font-mono text-white/80 flex items-center gap-1.5 shadow-lg">
              <Layers className="w-3 h-3 text-brand-muted" />
              <span>{activeDevice.brand} AUTHORIZED</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
