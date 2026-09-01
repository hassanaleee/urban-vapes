import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RETAIL_PRODUCTS, RETAIL_BRANDS } from '../data/products';
import type { RetailProduct } from '../data/products';
import { Search, X, ArrowRight, ShoppingBag } from 'lucide-react';

interface PrototypeSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHardware: (item: RetailProduct) => void;
}

export const PrototypeSearch: React.FC<PrototypeSearchProps> = ({
  isOpen,
  onClose,
  onSelectHardware
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = RETAIL_PRODUCTS.filter(
    p => p.name.toLowerCase().includes(query.toLowerCase()) ||
         p.brand.toLowerCase().includes(query.toLowerCase()) ||
         p.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredBrands = RETAIL_BRANDS.filter(
    b => b.name.toLowerCase().includes(query.toLowerCase()) ||
         b.tagline.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Drawer Window */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className="relative z-10 w-full max-w-3xl rounded-2xl bg-[#0a0a0c] border border-white/15 p-6 shadow-2xl space-y-6"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <Search className="w-5 h-5 text-brand-accent" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands (e.g. OXVA, Vaporesso, XROS 4, Pods)..."
              className="w-full bg-transparent text-white font-sora placeholder:text-white/30 text-lg outline-none"
            />
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto space-y-6 pr-2">
            
            {/* Products Section */}
            {filteredProducts.length > 0 && (
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-brand-accent tracking-widest uppercase block">
                  PRODUCTS FOUND ({filteredProducts.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectHardware(product);
                        onClose();
                      }}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-accent/50 cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                        <div>
                          <span className="block text-[9px] font-mono text-brand-accent uppercase">{product.brand}</span>
                          <span className="block font-sora font-bold text-xs text-white">{product.name}</span>
                          <span className="block text-xs font-mono font-semibold text-white/90">${product.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-accent group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Brands Section */}
            {filteredBrands.length > 0 && (
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-brand-accent tracking-widest uppercase block">
                  OFFICIAL BRANDS ({filteredBrands.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredBrands.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between"
                    >
                      <div>
                        <span className="block font-sora font-extrabold text-sm text-white">{b.name}</span>
                        <span className="block text-[10px] font-mono text-brand-muted">{b.tagline}</span>
                      </div>
                      <ShoppingBag className="w-4 h-4 text-brand-muted" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredProducts.length === 0 && filteredBrands.length === 0 && (
              <div className="text-center py-12 text-brand-muted font-mono text-xs">
                NO PRODUCTS OR BRANDS FOUND MATCHING "{query.toUpperCase()}"
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
