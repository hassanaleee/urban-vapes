import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenBag: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenBag, cartCount }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'DEVICES', href: '#featured' },
    { name: 'PODS', href: '#featured' },
    { name: 'DISPOSABLES', href: '#categories' },
    { name: 'BRANDS', href: '#brands' },
    { name: 'ACCESSORIES', href: '#accessories' },
    { name: 'ABOUT', href: '#brand-story' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-brand-darkest/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Wordmark */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-brand-accent flex items-center justify-center font-sora font-extrabold text-white text-sm shadow-[0_0_15px_rgba(229,9,20,0.6)] group-hover:scale-105 transition-transform duration-300">
              UV
            </div>
            <div className="flex flex-col">
              <span className="font-sora font-extrabold tracking-tighter text-xl sm:text-2xl text-white group-hover:text-brand-accent transition-colors duration-300">
                URBAN VAPES
              </span>
              <span className="text-[9px] tracking-[0.25em] font-mono text-brand-muted uppercase -mt-1">
                PREMIUM RETAIL DESTINATION
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono tracking-widest text-white/70 hover:text-white hover:text-brand-accent transition-colors duration-200 uppercase relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Prototype Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all duration-300"
              title="Search Catalog & Brands"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={onOpenBag}
              className="p-2.5 rounded-xl bg-brand-accent/20 border border-brand-accent/50 hover:bg-brand-accent text-white transition-all duration-300 flex items-center gap-2 relative"
              title="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-brand-accent group-hover:text-white" />
              <span className="hidden sm:inline text-xs font-mono font-bold">BAG</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-accent text-white font-mono text-[10px] font-bold flex items-center justify-center -top-1 -right-1 absolute shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070707]/95 border-b border-white/10 backdrop-blur-2xl px-6 py-6 space-y-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-xs font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>AUTHORIZED VAPE STORE PROTOTYPE</span>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-mono tracking-widest text-white/80 hover:text-brand-accent py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBag();
            }}
            className="w-full mt-4 py-3.5 rounded-xl bg-brand-accent text-white font-sora font-semibold text-xs tracking-wider flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            VIEW BAG ({cartCount})
          </button>
        </div>
      )}
    </header>
  );
};
