import { useState } from 'react';
import { Minus, Plus, ShoppingCart, CalendarDays, Wrench, Smartphone } from 'lucide-react';
import '../styles/EventRentals.scss';

// Mock Inventory Data
const RENTALS_INVENTORY = [
  { id: 1, name: 'Premium Banquet Chairs', category: 'Chairs', pricePerDay: 80, setupCharge: 10, image: '🪑', hasAR: false },
  { id: 2, name: 'Round Dining Tables (8 Seater)', category: 'Tables', pricePerDay: 350, setupCharge: 50, image: '🍽️', hasAR: false },
  { id: 3, name: 'Rustic Wooden Bar Counter', category: 'Bar Counters', pricePerDay: 2500, setupCharge: 500, image: '🍷', hasAR: true },
  { id: 4, name: 'RGB LED Glow Counter', category: 'LED Counters', pricePerDay: 3500, setupCharge: 800, image: '💡', hasAR: true },
  { id: 5, name: 'Modular Stage Setup (8x8 ft)', category: 'Stage Setup', pricePerDay: 5000, setupCharge: 1500, image: '🏗️', hasAR: true },
  { id: 6, name: 'Warm Fairy Lighting (Per 100ft)', category: 'Lighting', pricePerDay: 400, setupCharge: 200, image: '✨', hasAR: false },
  { id: 7, name: 'Luxury Arabian Tent Setup', category: 'Tent Setup', pricePerDay: 12000, setupCharge: 3000, image: '⛺', hasAR: true },
];

const categories = ['All', 'Chairs', 'Tables', 'Bar Counters', 'LED Counters', 'Stage Setup', 'Lighting', 'Tent Setup'];

const EventRentals = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [quantities, setQuantities] = useState({});
  const [rentalDuration, setRentalDuration] = useState(1);

  // Filter Logic
  const filteredItems = RENTALS_INVENTORY.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  // Quantity Handlers
  const updateQuantity = (id, delta) => {
    setQuantities(prev => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const handleAddToCart = (item) => {
    const qty = quantities[item.id] || 0;
    if (qty === 0) {
      alert("Please select a quantity greater than 0.");
      return;
    }
    const totalRental = (item.pricePerDay * rentalDuration * qty) + (item.setupCharge * qty);
    alert(`Added ${qty}x ${item.name} for ${rentalDuration} days. Total estimate: ₹${totalRental}`);
  };

  const handleARPreview = (itemName) => {
    alert(`Opening AR Camera preview for ${itemName}... Please point your phone at the floor.`);
  };

  return (
    <div className="rentals-container">
      <header className="rentals-header">
        <h1>Heavy Event Rentals & Setup</h1>
        <p>From seating to stages, rent professional-grade equipment for your venue.</p>
        
        {/* Global Event Duration Controller */}
        <div className="duration-controller">
          <CalendarDays size={20} className="icon" />
          <label>Event Duration:</label>
          <div className="duration-stepper">
            <button onClick={() => setRentalDuration(Math.max(1, rentalDuration - 1))}>-</button>
            <span>{rentalDuration} Day{rentalDuration > 1 ? 's' : ''}</span>
            <button onClick={() => setRentalDuration(rentalDuration + 1)}>+</button>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
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

      {/* Products Grid */}
      <div className="rentals-grid">
        {filteredItems.map(item => {
          const currentQty = quantities[item.id] || 0;
          // Calculate dynamic totals for the UI
          const itemRentalTotal = item.pricePerDay * rentalDuration;
          const itemSetupTotal = item.setupCharge;

          return (
            <div className="rental-card" key={item.id}>
              <div className="image-container">
                <span className="product-icon">{item.image}</span>
                {item.hasAR && (
                  <button className="ar-badge" onClick={() => handleARPreview(item.name)}>
                    <Smartphone size={14} /> AR Preview
                  </button>
                )}
              </div>

              <div className="card-content">
                <p className="category-tag">{item.category}</p>
                <h3>{item.name}</h3>

                <div className="pricing-breakdown">
                  <div className="price-row">
                    <span>Rental ({rentalDuration} Day{rentalDuration > 1 ? 's' : ''}):</span>
                    <strong>₹{itemRentalTotal}</strong>
                  </div>
                  <div className="price-row setup-fee">
                    <span><Wrench size={12} /> Setup Charge:</span>
                    <strong>₹{itemSetupTotal} <small>/ unit</small></strong>
                  </div>
                </div>

                <div className="action-row">
                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}><Minus size={16} /></button>
                    <span>{currentQty}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}><Plus size={16} /></button>
                  </div>
                  
                  <button 
                    className="btn-primary add-cart-btn"
                    onClick={() => handleAddToCart(item)}
                    disabled={currentQty === 0}
                  >
                    <ShoppingCart size={18} /> Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventRentals;