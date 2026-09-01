import React from 'react';
import { motion } from 'framer-motion';
import { RETAIL_PRODUCTS } from '../data/products';
import { Shield, Package, ArrowUpRight } from 'lucide-react';

interface AccessoriesProps {
  onOpenInspector: () => void;
}

export const Accessories: React.FC<AccessoriesProps> = ({ onOpenInspector }) => {
  const accessoriesList = RETAIL_PRODUCTS.filter(p => p.category === 'Accessories');

  return (
    <section id="accessories" className="relative py-28 bg-[#070707] border-t border-white/5 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand-accent uppercase">
              <Package className="w-3.5 h-3.5" />
              <span>HARDWARE ACCESSORY ECOSYSTEM</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-sora font-extrabold text-white tracking-tighter">
              HARDWARE ACCESSORIES<span className="text-brand-accent">.</span>
            </h2>
            <p className="text-base sm:text-lg font-grotesk text-brand-muted">
              Sculpted companion objects designed for armor protection, rapid desk docking, and seamless transit.
            </p>
          </div>

          <button
            onClick={onOpenInspector}
            className="self-start md:self-auto px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-accent/60 text-xs font-mono text-white tracking-widest uppercase hover:bg-brand-accent/20 transition-all duration-300 flex items-center gap-2"
          >
            <span>EXPLORE FULL CATALOG</span>
            <ArrowUpRight className="w-4 h-4 text-brand-accent" />
          </button>
        </div>

        {/* Luxury Object Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {accessoriesList.map((acc, idx) => (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative rounded-3xl bg-gradient-to-b from-[#101010] via-[#0a0a0a] to-[#040404] border border-white/10 p-8 sm:p-10 hover:border-brand-accent/50 transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-accent uppercase block">
                    BRAND // {acc.brand}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-sora font-extrabold text-white mt-1">
                    {acc.name}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                  <Shield className="w-4 h-4" />
                </div>
              </div>

              {/* Luxury Render Spot */}
              <div className="my-8 h-48 sm:h-56 flex items-center justify-center relative">
                <img
                  src={acc.image}
                  alt={acc.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="pt-6 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-brand-muted">RETAIL PRICE:</span>
                  <span className="text-white font-bold">${acc.price.toFixed(2)}</span>
                </div>
                <p className="text-xs font-grotesk text-white/70 leading-relaxed">
                  {acc.shortDesc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
