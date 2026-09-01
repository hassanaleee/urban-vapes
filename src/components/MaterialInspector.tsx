import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RETAIL_PRODUCTS } from '../data/products';
import type { RetailProduct, ProductColor } from '../data/products';
import { X, Sliders, Check } from 'lucide-react';

interface MaterialInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedHardware?: RetailProduct | null;
}

export const MaterialInspector: React.FC<MaterialInspectorProps> = ({
  isOpen,
  onClose,
  selectedHardware
}) => {
  const [activeDevice, setActiveDevice] = useState<RetailProduct>(
    selectedHardware || RETAIL_PRODUCTS[0]
  );

  const [activeColor, setActiveColor] = useState<ProductColor>(
    (selectedHardware || RETAIL_PRODUCTS[0]).colors[0] || { name: 'Standard', hex: '#0a0a0c' }
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Smoked Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full max-w-5xl rounded-3xl bg-[#09090b] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden my-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-brand-accent flex items-center justify-center text-white">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-sora font-bold text-sm text-white uppercase tracking-wider">
                  PRODUCT MATERIAL & VARIANT INSPECTOR
                </h3>
                <span className="text-[10px] font-mono text-brand-muted uppercase">
                  AUTHORIZED {activeDevice.brand} CATALOG
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Hardware Render Stage */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-b from-[#141414] to-[#050505] border border-white/10">
              
              <div className="relative z-10 h-[300px] sm:h-[380px] flex items-center justify-center">
                <img
                  src={activeDevice.image}
                  alt={activeDevice.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] transition-all duration-500"
                />
              </div>

              {/* Finish Badge */}
              <div className="relative z-10 mt-4 px-4 py-1.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-md text-xs font-mono text-white flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full border border-white/30"
                  style={{ backgroundColor: activeColor.hex }}
                />
                <span>VARIANT: {activeColor.name.toUpperCase()}</span>
              </div>
            </div>

            {/* Right Configuration & Specs Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Hardware Model Switcher */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-brand-muted uppercase tracking-widest">
                  SELECT MODEL CONCEPT
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {RETAIL_PRODUCTS.slice(0, 6).map((dev) => (
                    <button
                      key={dev.id}
                      onClick={() => {
                        setActiveDevice(dev);
                        setActiveColor(dev.colors[0] || { name: 'Standard', hex: '#0a0a0c' });
                      }}
                      className={`py-2 px-1 rounded-lg text-[10px] font-mono tracking-wider transition-all border truncate ${
                        activeDevice.id === dev.id
                          ? 'bg-brand-accent text-white border-brand-accent font-bold'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {dev.brand} {dev.name.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model Header */}
              <div className="border-t border-white/10 pt-4 space-y-1">
                <h4 className="text-3xl font-sora font-extrabold text-white">
                  {activeDevice.name}
                </h4>
                <p className="text-xs font-mono text-brand-accent uppercase tracking-widest">
                  AUTHORIZED {activeDevice.brand} PRODUCT — ${activeDevice.price.toFixed(2)}
                </p>
              </div>

              {/* Color Selector Swatches */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-brand-muted uppercase tracking-widest">
                  AVAILABLE COLORS
                </span>
                <div className="space-y-2">
                  {activeDevice.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setActiveColor(c)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                        activeColor.name === c.name
                          ? 'bg-white/10 border-brand-accent text-white'
                          : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-5 h-5 rounded-full border border-white/30 shadow-inner"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-xs font-sora font-semibold">{c.name}</span>
                      </div>
                      {activeColor.name === c.name && (
                        <Check className="w-4 h-4 text-brand-accent" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Sheet */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <span className="text-[11px] font-mono text-brand-muted uppercase tracking-widest block">
                  TECHNICAL SPECIFICATIONS
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {activeDevice.specs.map((spec) => (
                    <div key={spec.label} className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <span className="block font-mono text-[10px] text-brand-muted uppercase">{spec.label}</span>
                      <span className="font-sora font-semibold text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
