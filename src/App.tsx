import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandsSection } from './components/BrandsSection';
import { CategorySection } from './components/CategorySection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { PinnedShowcase } from './components/PinnedShowcase';
import { MacroDetails } from './components/MacroDetails';
import { AtmosphereSection } from './components/AtmosphereSection';
import { BrandStory } from './components/BrandStory';
import { Philosophy } from './components/Philosophy';
import { FinalHero } from './components/FinalHero';
import { Footer } from './components/Footer';

import { ProductDetailModal } from './components/ProductDetailModal';
import { BagDrawer } from './components/BagDrawer';
import type { CartItem } from './components/BagDrawer';
import { PrototypeSearch } from './components/PrototypeSearch';

import { RETAIL_PRODUCTS } from './data/products';
import type { RetailProduct } from './data/products';

export function App() {
  const [quickViewProduct, setQuickViewProduct] = useState<RetailProduct | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const [bagOpen, setBagOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Initial cart sample item
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: RETAIL_PRODUCTS[0], color: 'Black Carbon', quantity: 1 }
  ]);

  const handleQuickView = (product: RetailProduct) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const handleAddToCart = (product: RetailProduct, color: string, qty: number) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.color === color);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      }
      return [...prev, { product, color, quantity: qty }];
    });
  };

  const handleUpdateQuantity = (id: string, color: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id, color);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.product.id === id && item.color === color ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string, color: string) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === id && item.color === color)));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-brand-accent selection:text-white font-grotesk">
      
      {/* Retail Navigation Bar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBag={() => setBagOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Main Experience Sections */}
      <main>
        {/* Retail Hero with 3D Digital Showroom */}
        <Hero onSelectProduct={handleQuickView} />

        {/* Brands We Stock Logo Wall */}
        <BrandsSection />

        {/* Shop By Category */}
        <CategorySection onSelectCategory={() => {
          const featuredEl = document.getElementById('featured');
          if (featuredEl) featuredEl.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* Featured Retail Products Grid */}
        <FeaturedProducts
          onQuickView={handleQuickView}
          onAddToCart={handleAddToCart}
        />

        {/* Interactive 3D Product Orbit Stage */}
        <PinnedShowcase onSelectHardware={(device) => {
          const found = RETAIL_PRODUCTS.find(p => p.name.includes(device.name.replace('URBAN ', '')));
          handleQuickView(found || RETAIL_PRODUCTS[0]);
        }} />

        {/* Macro Industrial Surface Details */}
        <MacroDetails />

        {/* Built After Dark Atmosphere */}
        <AtmosphereSection />

        {/* Brand Story Editorial */}
        <BrandStory />

        {/* Hardware Philosophy */}
        <Philosophy />

        {/* Final Retail Conclusion */}
        <FinalHero onOpenInspector={() => setBagOpen(true)} />
      </main>

      {/* Retail Statement Footer */}
      <Footer />

      {/* Product Detail / Quick View Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-Over Shopping Bag Drawer */}
      <BagDrawer
        isOpen={bagOpen}
        onClose={() => setBagOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Search Drawer */}
      <PrototypeSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectHardware={(item) => {
          const found = RETAIL_PRODUCTS.find(p => p.name.includes(item.name.replace('URBAN ', '')));
          handleQuickView(found || RETAIL_PRODUCTS[0]);
        }}
      />

    </div>
  );
}

export default App;
