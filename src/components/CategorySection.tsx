import React from 'react';
import { motion } from 'framer-motion';
import { RETAIL_CATEGORIES } from '../data/products';
import { LayoutGrid, ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory?: (category: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="relative py-28 bg-[#030303] border-t border-white/5 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-brand-accent uppercase">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>STORE ARCHITECTURE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-sora font-extrabold text-white tracking-tighter">
            SHOP BY CATEGORY<span className="text-brand-accent">.</span>
          </h2>
          <p className="text-base sm:text-lg font-grotesk font-light text-brand-muted">
            Explore curated departments across advanced devices, pod systems, disposables, e-liquids, and hardware accessories.
          </p>
        </div>

        {/* Category Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RETAIL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              onClick={() => onSelectCategory && onSelectCategory(cat.name)}
              className="group relative rounded-3xl bg-gradient-to-b from-[#0e0e12] via-[#09090b] to-[#040405] border border-white/10 p-8 hover:border-brand-accent/60 transition-all duration-500 min-h-[300px] flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Background Render */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover opacity-25 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 filter saturate-150 contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040405] via-[#040405]/70 to-transparent" />
              </div>

              {/* Card Top */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded bg-black/80 border border-white/10 text-[10px] font-mono tracking-widest text-brand-accent uppercase backdrop-blur-md">
                  {cat.count}
                </span>
                <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-brand-accent group-hover:translate-x-2 transition-all duration-300" />
              </div>

              {/* Card Bottom */}
              <div className="relative z-10 space-y-2 pt-12">
                <h3 className="text-2xl sm:text-3xl font-sora font-extrabold text-white">
                  {cat.name}
                </h3>
                <p className="text-xs font-grotesk font-light text-white/70">
                  {cat.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
