import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RETAIL_PRODUCTS } from '../data/products';
import type { RetailProduct } from '../data/products';
import { ShoppingBag, Star, Eye, Filter } from 'lucide-react';

interface FeaturedProductsProps {
  onQuickView: (product: RetailProduct) => void;
  onAddToCart: (product: RetailProduct, color: string, qty: number) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onQuickView,
  onAddToCart
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'DEVICES', 'PODS', 'ACCESSORIES'];

  const filteredProducts = activeCategory === 'ALL'
    ? RETAIL_PRODUCTS
    : RETAIL_PRODUCTS.filter(p => p.category.toUpperCase().includes(activeCategory));

  return (
    <section id="featured" className="relative py-28 bg-[#070707] border-t border-white/5 overflow-hidden">
      
      {/* Background Studio Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-brand-accent uppercase">
              <Filter className="w-3.5 h-3.5" />
              <span>CURATED CATALOG</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-sora font-extrabold text-white tracking-tighter">
              FEATURED HARDWARE<span className="text-brand-accent">.</span>
            </h2>
            <p className="text-base sm:text-lg font-grotesk font-light text-brand-muted">
              Top-tier pod kits, box mods, and accessories from OXVA, Vaporesso, Geekvape, and SMOK.
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-brand-accent text-white shadow-[0_0_20px_rgba(229,9,20,0.5)] border border-brand-accent'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Retail Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-3xl bg-gradient-to-b from-[#101014] via-[#09090b] to-[#040405] border border-white/10 p-6 sm:p-8 hover:border-brand-accent/60 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              <div>
                {/* Badge & Brand Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-brand-accent uppercase">
                    {product.brand}
                  </span>
                  {product.badge && (
                    <span className="px-2.5 py-0.5 rounded bg-white/10 border border-white/10 text-[9px] font-mono text-white uppercase">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product Image Stage */}
                <div
                  onClick={() => onQuickView(product)}
                  className="relative h-56 sm:h-64 my-4 flex items-center justify-center cursor-pointer group-hover:scale-105 transition-transform duration-500"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Title & Desc */}
                <div className="space-y-2 pt-2">
                  <h3
                    onClick={() => onQuickView(product)}
                    className="text-xl font-sora font-extrabold text-white cursor-pointer hover:text-brand-accent transition-colors line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs font-grotesk font-light text-brand-muted line-clamp-2 leading-relaxed">
                    {product.shortDesc}
                  </p>
                </div>
              </div>

              {/* Price, Rating & Action Buttons */}
              <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-sora font-extrabold text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs font-mono text-brand-muted line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onQuickView(product)}
                    className="py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-white text-xs font-sora font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-brand-muted" />
                    <span>DETAILS</span>
                  </button>

                  <button
                    onClick={() => onAddToCart(product, product.colors[0]?.name || 'Standard', 1)}
                    className="py-3 rounded-xl bg-brand-accent hover:bg-red-600 text-white text-xs font-sora font-semibold tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD TO BAG</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
