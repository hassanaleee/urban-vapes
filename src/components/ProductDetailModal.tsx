import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { RetailProduct } from '../data/products';
import { X, ShoppingBag, Star, Check, ShieldCheck } from 'lucide-react';

interface ProductDetailModalProps {
  product: RetailProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: RetailProduct, color: string, qty: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedColor || product.colors[0]?.name || 'Standard', quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 800);
  };

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
          className="relative z-10 w-full max-w-4xl rounded-3xl bg-[#0a0a0d] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-muted">
              <span className="text-brand-accent font-bold uppercase">{product.brand}</span>
              <span>// {product.category.toUpperCase()}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Product Visual */}
            <div className="lg:col-span-6 relative flex items-center justify-center p-8 rounded-2xl bg-gradient-to-b from-[#141418] to-[#060608] border border-white/10">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[320px] object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded bg-brand-accent text-white text-[10px] font-mono font-bold tracking-widest uppercase">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Right Product Details */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest text-brand-accent uppercase block">
                  AUTHORIZED {product.brand} RETAILER
                </span>
                <h3 className="text-3xl font-sora font-extrabold text-white">
                  {product.name}
                </h3>
                
                {/* Price & Rating */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-sora font-extrabold text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm font-mono text-brand-muted line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-brand-muted">({product.reviewsCount})</span>
                  </div>
                </div>
              </div>

              <p className="text-xs font-grotesk text-white/80 leading-relaxed font-light">
                {product.fullDesc}
              </p>

              {/* Color Selector */}
              {product.colors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest block">
                    COLOR VARIANT: {selectedColor || product.colors[0].name}
                  </span>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          (selectedColor || product.colors[0].name) === c.name
                            ? 'border-brand-accent scale-110'
                            : 'border-white/20 hover:border-white/50'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Bag CTA */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-white/10 rounded-xl bg-white/5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-white/70 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-mono font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-white/70 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-3.5 rounded-xl font-sora font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
                      addedAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-brand-accent text-white hover:bg-red-600 shadow-[0_0_25px_rgba(229,9,20,0.5)]'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADD TO BAG — ${(product.price * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-brand-muted justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                  <span>AUTHENTIC RETAIL GUARANTEE & RAPID DISPATCH</span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
