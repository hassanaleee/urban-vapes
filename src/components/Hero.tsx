import React from 'react';
import { motion } from 'framer-motion';
import { VaporCanvas } from '../canvas/VaporCanvas';
import { DigitalShowroom3D } from './3d/DigitalShowroom3D';
import type { RetailProduct } from '../data/products';
import { ArrowRight, Award, ShoppingBag } from 'lucide-react';

interface HeroProps {
  onSelectProduct?: (product: RetailProduct) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectProduct }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden bg-[#030303]">
      
      {/* 60fps Subtle Volumetric Vapor Simulation */}
      <VaporCanvas density={25} speed={0.2} accentGlow={false} />

      {/* Controlled Studio Crimson Spotlight behind Showroom */}
      <div className="absolute top-1/3 right-1/4 w-[460px] h-[460px] bg-brand-accent/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Fine Industrial Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Asymmetrical Retail Campaign Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left: Retail Messaging & Typography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 space-y-8"
          >
            {/* Store Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-white/80 uppercase">
                URBAN VAPES // AUTHORIZED RETAILER
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-sora font-extrabold text-white leading-[0.88] tracking-tighter">
                YOUR VAPE<span className="text-brand-accent">.</span>
              </h1>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-sora font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-brand-accent leading-[0.88] tracking-tighter pl-2 sm:pl-6">
                YOUR STYLE<span className="text-white">.</span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base font-grotesk font-light text-brand-muted max-w-md tracking-wide">
              Premium devices, pods, disposables and accessories — all in one place. Official stockist for OXVA, Vaporesso, Geekvape, and SMOK.
            </p>

            {/* Brand Proof Pills */}
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-white/70">
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 uppercase">OXVA</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 uppercase">VAPORESSO</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 uppercase">GEEKVAPE</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 uppercase">SMOK</span>
            </div>

            {/* Retail CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#featured"
                className="px-8 py-4 rounded-xl bg-brand-accent text-white font-sora font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(229,9,20,0.4)] hover:bg-red-600 hover:shadow-[0_0_45px_rgba(229,9,20,0.7)] transition-all duration-300 group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>SHOP DEVICES</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#brands"
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-white font-sora font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300"
              >
                <Award className="w-4 h-4 text-brand-muted" />
                <span>EXPLORE BRANDS</span>
              </a>
            </div>
          </motion.div>

          {/* Hero Right: 3D Digital Product Showroom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="lg:col-span-6 relative flex items-center justify-center -mr-4 sm:-mr-8"
          >
            <div className="w-full relative min-h-[480px] sm:min-h-[580px] flex items-center justify-center">
              
              {/* 3D Digital Product Showroom */}
              <DigitalShowroom3D onSelectProduct={onSelectProduct} />

              {/* Showroom Interactive Label Badge */}
              <div className="absolute bottom-4 right-6 z-20 hidden sm:block text-right">
                <span className="block text-[9px] font-mono text-brand-muted uppercase tracking-[0.25em]">
                  3D DIGITAL SHOWROOM
                </span>
                <span className="text-xs font-sora font-bold text-white uppercase tracking-wider">
                  CLICK PRODUCT TO INSPECT
                </span>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
