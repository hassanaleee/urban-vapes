import React from 'react';
import { motion } from 'framer-motion';
import { RETAIL_BRANDS } from '../data/products';
import { Award, ArrowRight } from 'lucide-react';

export const BrandsSection: React.FC = () => {
  return (
    <section id="brands" className="relative py-24 bg-[#050507] border-t border-white/5 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-brand-accent uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>AUTHORIZED DISTRIBUTOR</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-sora font-extrabold text-white tracking-tighter">
              BRANDS WE STOCK<span className="text-brand-accent">.</span>
            </h2>
            <p className="text-base sm:text-lg font-grotesk font-light text-brand-muted">
              Official stockist for world-leading vape device manufacturers. Guaranteed authentic hardware.
            </p>
          </div>

          <a
            href="#featured"
            className="self-start md:self-auto px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-accent text-xs font-mono text-white tracking-widest uppercase hover:bg-brand-accent/20 transition-all duration-300 flex items-center gap-2"
          >
            <span>VIEW ALL BRAND PRODUCTS</span>
            <ArrowRight className="w-4 h-4 text-brand-accent" />
          </a>
        </div>

        {/* Monochrome Luxury Brand Logo Wall */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {RETAIL_BRANDS.map((brand, index) => (
            <motion.a
              key={brand.id}
              href="#featured"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-accent/60 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-3"
            >
              <span className="font-sora font-extrabold text-xl sm:text-2xl text-white/80 group-hover:text-white group-hover:scale-105 transition-all duration-300 tracking-widest">
                {brand.name}
              </span>
              <span className="text-[9px] font-mono text-brand-muted uppercase tracking-wider">
                {brand.productsCount} PRODUCTS
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};
