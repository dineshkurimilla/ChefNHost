import { Minus, Plus, Shield, ShieldCheck, CalendarClock, ShoppingBag } from 'lucide-react';
import { useState, useMemo } from 'react';
import '../styles/RentCrockery.scss';

// Mock Crockery Inventory
const CROCKERY_INVENTORY = [
  { id: 1, name: 'Bone China Dinner Plates', category: 'Plates', pricePerDay: 15, image: '🍽️' },
  { id: 2, name: 'Ceramic Soup Bowls', category: 'Bowls', pricePerDay: 8, image: '🥣' },
  { id: 3, name: 'Crystal Wine Glasses', category: 'Cups', pricePerDay: 20, image: '🍷' },
  { id: 4, name: 'Gold-Rimmed Teacups', category: 'Cups', pricePerDay: 12, image: '☕' },
  { id: 5, name: 'Marble Serving Tray', category: 'Serving Trays', pricePerDay: 35, image: '🍱' },
  { id: 6, name: 'Designer Artisan Platters', category: 'Designer Crockery', pricePerDay: 50, image: '✨' },
  { id: 7, name: 'Porcelain Dessert Plates', category: 'Plates', pricePerDay: 10, image: '🍰' },
  { id: 8, name: 'Large Salad Bowls', category: 'Bowls', pricePerDay: 18, image: '🥗' },
];

const categories = ['All', 'Plates', 'Bowls', 'Cups', 'Serving Trays', 'Designer Crockery'];

const RentCrockery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [quantities, setQuantities] = useState({});
  const [durationDays, setDurationDays] = useState(1);
  const [hasDamageProtection, setHasDamageProtection] = useState(false);

  // Quantity Handlers
  const updateQuantity = (id, delta) => {
    setQuantities(prev => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prev, [id]: newQty };
    });
  };

  // Derived State (Calculations)
  const filteredProducts = CROCKERY_INVENTORY.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  const { subtotal, totalItems } = useMemo(() => {
    let sub = 0;
    let items = 0;
    Object.entries(quantities).forEach(([id, qty]) => {
      const product = CROCKERY_INVENTORY.find(p => p.id === parseInt(id));
      if (product) {
        sub += product.pricePerDay * qty;
        items += qty;
      }
    });
    return { subtotal: sub, totalItems: items };
  }, [quantities]);

  const durationTotal = subtotal * durationDays;
  const protectionFee = hasDamageProtection ? durationTotal * 0.15 : 0; // 15% fee
  const grandTotal = durationTotal + protectionFee;

  return (
    <div className="crockery-container">
      {/* Animated Luxury Showcase Hero */}
      <div className="crockery-hero-showcase">
        <div className="showcase-content">
          <h1>Exquisite Crockery Rentals</h1>
          <p>Curated designer collections for unforgettable dining experiences.</p>
        </div>
        <div className="animated-sparkles"></div>
      </div>

      <div className="crockery-layout">
        
        {/* Main Content (Tabs + Grid) */}
        <main className="main-catalog">
          <div className="category-tabs">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="crockery-grid">
            {filteredProducts.map(product => {
              const currentQty = quantities[product.id] || 0;
              return (
                <div className="crockery-card" key={product.id}>
                  <div className="card-img-placeholder">
                    <span className="emoji-icon">{product.image}</span>
                  </div>
                  <div className="card-info">
                    <h3>{product.name}</h3>
                    <p className="category">{product.category}</p>
                    <div className="price-row">
                      <span className="price">₹{product.pricePerDay} <small>/ day</small></span>
                      <div className="qty-controls">
                        <button onClick={() => updateQuantity(product.id, -1)}><Minus size={14}/></button>
                        <span>{currentQty}</span>
                        <button onClick={() => updateQuantity(product.id, 1)}><Plus size={14}/></button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Floating Rental Settings & Summary Sidebar */}
        <aside className="rental-settings-sidebar">
          <div className="settings-card">
            <h3>Rental Settings</h3>
            
            <div className="setting-group">
              <label className="setting-label">
                <CalendarClock size={18} /> Duration: {durationDays} Day{durationDays > 1 ? 's' : ''}
              </label>
              <input 
                type="range" 
                min="1" 
                max="14" 
                value={durationDays} 
                onChange={(e) => setDurationDays(parseInt(e.target.value))}
                className="duration-slider"
              />
              <div className="slider-marks">
                <span>1D</span>
                <span>7D</span>
                <span>14D</span>
              </div>
            </div>

            <div className={`protection-toggle ${hasDamageProtection ? 'active' : ''}`} onClick={() => setHasDamageProtection(!hasDamageProtection)}>
              <div className="icon-wrapper">
                {hasDamageProtection ? <ShieldCheck size={24} color="#d84315" /> : <Shield size={24} color="#666" />}
              </div>
              <div className="toggle-text">
                <h4>Damage Protection</h4>
                <p>Waive fees for accidental breakage (15% surcharge)</p>
              </div>
              <div className={`switch ${hasDamageProtection ? 'on' : 'off'}`}></div>
            </div>

            <div className="summary-breakdown">
              <div className="summary-row">
                <span>Selected Items ({totalItems})</span>
                <span>₹{subtotal} / day</span>
              </div>
              <div className="summary-row">
                <span>Duration ({durationDays} Days)</span>
                <span>₹{durationTotal.toFixed(0)}</span>
              </div>
              {hasDamageProtection && (
                <div className="summary-row protection-fee">
                  <span>Protection Fee (15%)</span>
                  <span>+ ₹{protectionFee.toFixed(0)}</span>
                </div>
              )}
              <div className="summary-total">
                <span>Total Estimate</span>
                <span>₹{grandTotal.toFixed(0)}</span>
              </div>
              
              <button className="btn-primary checkout-btn" disabled={totalItems === 0}>
                <ShoppingBag size={18} /> Add to Order
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default RentCrockery;