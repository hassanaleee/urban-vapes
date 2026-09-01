import React from 'react';
import { ShieldCheck, Globe, Share2, ExternalLink, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#020202] border-t border-white/10 text-white pt-24 pb-16 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-brand-accent flex items-center justify-center font-sora font-extrabold text-white text-base shadow-[0_0_15px_rgba(229,9,20,0.6)]">
                UV
              </div>
              <span className="font-sora font-extrabold text-3xl tracking-tighter text-white">
                URBAN VAPES
              </span>
            </div>

            <p className="text-sm font-grotesk text-brand-muted max-w-sm font-light leading-relaxed">
              Futuristic dark hardware concept brand prototype. Precision aerospace engineering, dark chrome, and atmospheric industrial design.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-brand-muted">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span>NON-TRANSACTIONAL VISUAL PROTOTYPE</span>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.25em] block">
              HARDWARE ARCHIVE
            </span>
            <ul className="space-y-2.5 text-xs font-mono text-white/70">
              <li><a href="#hero" className="hover:text-brand-accent transition-colors">URBAN X1 — OBSIDIAN</a></li>
              <li><a href="#collection" className="hover:text-brand-accent transition-colors">URBAN ARC — GRAPHITE</a></li>
              <li><a href="#showcase" className="hover:text-brand-accent transition-colors">URBAN V2 — CHROME</a></li>
              <li><a href="#collection" className="hover:text-brand-accent transition-colors">URBAN MINI — MIDNIGHT</a></li>
              <li><a href="#accessories" className="hover:text-brand-accent transition-colors">HARDWARE ACCESSORIES</a></li>
              <li><a href="#brand-story" className="hover:text-brand-accent transition-colors">BRAND MANIFESTO</a></li>
            </ul>
          </div>

          {/* Nav Col 2 & Social */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.25em] block">
              CONCEPT TRANSMISSIONS
            </span>
            <p className="text-xs font-grotesk text-brand-muted">
              Connect with our industrial design laboratory for hardware updates.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#hero" className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-accent hover:bg-brand-accent/20 text-white/80 hover:text-white transition-all" title="Global Network">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#collection" className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-accent hover:bg-brand-accent/20 text-white/80 hover:text-white transition-all" title="Share Transmission">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#showcase" className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-accent hover:bg-brand-accent/20 text-white/80 hover:text-white transition-all" title="Telemetry Feed">
                <Zap className="w-4 h-4" />
              </a>
              <a href="#accessories" className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-accent hover:bg-brand-accent/20 text-white/80 hover:text-white transition-all" title="External Portal">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Enormous Statement Banner */}
        <div className="py-8 text-center border-b border-white/10">
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-sora font-extrabold text-white/90 tracking-tighter uppercase leading-tight">
            DESIGNED FOR THE <br className="hidden sm:inline" />
            <span className="text-brand-accent">URBAN NIGHT.</span>
          </h2>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/40">
          <p>© {new Date().getFullYear()} URBAN VAPES. ALL RIGHTS RESERVED.</p>
          <p className="text-center sm:text-right">
            THIS IS A NON-TRANSACTIONAL VISUAL PRODUCT-BRAND PROTOTYPE.
          </p>
        </div>

      </div>
    </footer>
  );
};
