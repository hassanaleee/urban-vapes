import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RETAIL_PRODUCTS } from '../data/products';
import type { RetailProduct } from '../data/products';
import { ArrowRight, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface CollectionProps {
  onSelectHardware: (item: RetailProduct) => void;
}

export const Collection: React.FC<CollectionProps> = ({ onSelectHardware }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="collection" className="relative py-28 bg-[#070707] overflow-hidden border-t border-white/5">
      
      {/* Background Ambient Crimson Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-brand-accent uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              <span>EDITORIAL CATALOG</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-sora font-extrabold text-white tracking-tighter">
              FEATURED CATALOG<span className="text-brand-accent">.</span>
            </h2>
            <p className="text-base sm:text-lg font-grotesk font-light text-brand-muted">
              DESIGNED FOR THE CITY.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-4 rounded-full bg-white/5 border border-white/10 hover:border-brand-accent/50 hover:bg-brand-accent/20 text-white transition-all duration-300"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-4 rounded-full bg-white/5 border border-white/10 hover:border-brand-accent/50 hover:bg-brand-accent/20 text-white transition-all duration-300"
              aria-label="Next product"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Gallery with 3D Depth Stacking */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar px-4 sm:px-8 lg:px-16 snap-x snap-mandatory py-6"
      >
        {RETAIL_PRODUCTS.map((item, index) => {
          const isHovered = hoveredId === item.id;
          const isOtherHovered = hoveredId !== null && !isHovered;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectHardware(item)}
              className={`flex-none w-[85vw] sm:w-[500px] lg:w-[560px] snap-center cursor-pointer transition-all duration-500 ${
                isOtherHovered ? 'scale-95 opacity-60' : 'scale-100 opacity-100'
              }`}
            >
              <div className="relative rounded-3xl bg-gradient-to-b from-[#121212] via-[#0a0a0a] to-[#040404] border border-white/10 p-8 sm:p-12 transition-all duration-500 hover:border-brand-accent/60 hover:shadow-[0_20px_50px_rgba(229,9,20,0.25)] overflow-hidden">
                
                {/* Product Edition Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="block text-[10px] font-mono tracking-[0.2em] text-brand-accent uppercase">
                      BRAND // {item.brand}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-sora font-extrabold text-white mt-1">
                      {item.name}
                    </h3>
                  </div>
                  <span className="text-2xl font-sora font-extrabold text-white font-mono">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Large Product Visual Moment with Depth Lift */}
                <div className="relative h-[320px] sm:h-[380px] my-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-radial-at-c from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`max-h-full max-w-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] transition-transform duration-700 ease-out ${
                      isHovered ? 'scale-110 -translate-y-4' : 'scale-100'
                    }`}
                  />
                </div>

                {/* Description & Action */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs font-grotesk font-light text-brand-muted max-w-xs leading-relaxed">
                    {item.shortDesc}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-brand-accent transition-colors duration-300">
                    <SlidersHorizontal className="w-4 h-4 text-brand-accent" />
                    <span className="tracking-widest uppercase">QUICK VIEW</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
