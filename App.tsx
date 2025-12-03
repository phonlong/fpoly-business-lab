import React, { useState, useMemo, useEffect } from 'react';
import { MENU_ITEMS } from './constants';
import { MenuItem, CartItem, Category } from './types';
import { MenuCard } from './components/MenuCard';
import { OrderModal } from './components/OrderModal';
import { AIChat } from './components/AIChat';
import { ShoppingBag, Search, Coffee } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, note: '' }];
    });
    // Optional: Show toast notification
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateNote = (id: string, note: string) => {
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, note } : i));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const categories = ['all', ...Object.values(Category)];
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-coffee-600 p-2 rounded-xl text-white">
              <Coffee size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-coffee-900 leading-none">Tiệm Cà Phê</h1>
              <span className="text-xs text-coffee-500 font-medium tracking-widest uppercase">Chill & Order</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative bg-white p-2 rounded-full text-coffee-800 hover:bg-coffee-50 transition-colors shadow-sm border border-coffee-100"
          >
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero / Banner */}
      <div className="pt-28 pb-6 px-4 container mx-auto">
        <div className="bg-coffee-800 rounded-3xl p-6 text-white mb-8 relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Hôm nay uống gì?</h2>
            <p className="text-coffee-200 mb-4 text-sm max-w-[60%]">Nhập mã <span className="font-bold text-white bg-coffee-600 px-1 rounded">CHILL50</span> để được giảm 50% cho đơn đầu tiên.</p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
            <Coffee size={120} />
          </div>
        </div>

        {/* Search & Filter */}
        <div className="sticky top-20 z-20 bg-[#fdf8f6]/95 backdrop-blur-sm py-2 -mx-4 px-4 sm:mx-0 sm:bg-transparent">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400" size={20} />
            <input 
              type="text" 
              placeholder="Tìm món ngon..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-coffee-400 outline-none text-coffee-900 bg-white"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-coffee-600 text-white shadow-md transform scale-105' 
                    : 'bg-white text-coffee-600 border border-coffee-100 hover:bg-coffee-50'
                }`}
              >
                {cat === 'all' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
          {filteredItems.map(item => (
            <MenuCard key={item.id} item={item} onAdd={addToCart} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-10 text-coffee-400">
            <p>Không tìm thấy món nào 😢</p>
          </div>
        )}
      </div>

      {/* Footer/CTA if cart has items */}
      {totalItems > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-20 animate-fade-in-up">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-coffee-800 text-white p-4 rounded-2xl shadow-xl flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div className="bg-coffee-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                {totalItems}
              </div>
              <span className="font-bold">Xem giỏ hàng</span>
            </div>
            <span className="font-bold text-lg">
              {(cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0) / 1000)}k
            </span>
          </button>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <OrderModal 
          items={cartItems} 
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onUpdateNote={updateNote}
          onClearCart={clearCart}
        />
      )}

      {/* AI Chat Assistant */}
      <AIChat />
    </div>
  );
}