import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { RetailProduct } from '../data/products';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export interface CartItem {
  product: RetailProduct;
  color: string;
  quantity: number;
}

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, color: string, qty: number) => void;
  onRemoveItem: (id: string, color: string) => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Slide-Over Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative z-10 w-full max-w-md bg-[#0a0a0d] border-l border-white/10 h-full flex flex-col justify-between p-6 shadow-2xl"
        >
          {/* Top Bar */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-brand-accent" />
                <h3 className="font-sora font-extrabold text-base text-white tracking-tight">
                  YOUR BAG ({items.reduce((s, i) => s + i.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-white/20 mx-auto" />
                  <p className="text-xs font-mono text-brand-muted uppercase">YOUR BAG IS CURRENTLY EMPTY</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.color}`}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 object-contain"
                    />
                    <div className="flex-1 space-y-1">
                      <span className="text-[9px] font-mono text-brand-accent uppercase block">
                        {item.product.brand}
                      </span>
                      <h4 className="text-xs font-sora font-bold text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <span className="text-[10px] font-mono text-brand-muted block">
                        Variant: {item.color}
                      </span>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-sora font-semibold text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        
                        {/* Qty controls */}
                        <div className="flex items-center border border-white/10 rounded bg-black/40 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.color, item.quantity - 1)}
                            className="px-2 text-white/70 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 font-mono font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.color, item.quantity + 1)}
                            className="px-2 text-white/70 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id, item.color)}
                      className="p-2 text-white/40 hover:text-brand-accent transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bottom Subtotal & Prototype Checkout */}
          {items.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-brand-muted">
                  <span>SUBTOTAL</span>
                  <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>ESTIMATED DISPATCH</span>
                  <span className="text-brand-accent font-bold">SAME DAY</span>
                </div>
              </div>

              <button
                onClick={() => alert("This is a visual prototype. Checkout flow is disabled.")}
                className="w-full py-4 rounded-xl bg-brand-accent text-white font-sora font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-red-600 shadow-[0_0_25px_rgba(229,9,20,0.5)] transition-all"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[10px] font-mono text-brand-muted justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                <span>NON-TRANSACTIONAL VISUAL DEMO</span>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
