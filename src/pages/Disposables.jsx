import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Truck, Leaf } from 'lucide-react';
import '../styles/Disposables.scss';

// Mock Disposables Inventory
const DISPOSABLES_INVENTORY = [
  { id: 1, name: 'Areca Palm Leaf Plates (Set of 25)', category: 'Eco-Friendly Options', price: 250, bulkPrice: 200, bulkThreshold: 5, image: '🍃', sameDay: true },
  { id: 2, name: 'Premium Paper Cups 250ml (Pack of 100)', category: 'Cups', price: 150, bulkPrice: 120, bulkThreshold: 10, image: '🥤', sameDay: true },
  { id: 3, name: '3-Compartment Food Containers (Pack of 50)', category: 'Food Containers', price: 400, bulkPrice: 340, bulkThreshold: 5, image: '🍱', sameDay: false },
  { id: 4, name: 'Luxury 2-Ply Tissue Packs (Pack of 500)', category: 'Tissue Packs', price: 180, bulkPrice: 140, bulkThreshold: 10, image: '🧻', sameDay: true },
  { id: 5, name: 'Heavy-Duty Buffet Plates (Set of 50)', category: 'Plates', price: 300, bulkPrice: 260, bulkThreshold: 4, image: '🍽️', sameDay: true },
  { id: 6, name: 'Biodegradable Wooden Spoons (Pack of 100)', category: 'Eco-Friendly Options', price: 120, bulkPrice: 90, bulkThreshold: 15, image: '🥄', sameDay: false },
];

const categories = ['All', 'Plates', 'Cups', 'Tissue Packs', 'Food Containers', 'Eco-Friendly Options'];

const Disposables = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [quantities, setQuantities] = useState({});

  // Filter Logic
  const filteredItems = DISPOSABLES_INVENTORY.filter(item => 
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
    alert(`Added ${qty} pack(s) of ${item.name} to cart.`);
  };

  return (
    <div className="disposables-container">
      <header className="page-header">
        <h1>Event Disposables & Essentials</h1>
        <p>High-quality, reliable, and eco-friendly disposable supplies for events of any scale.</p>
      </header>

      {/* Category Navigation */}
      <div className="category-tabs">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'Eco-Friendly Options' && <Leaf size={16} className="eco-icon" />}
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="disposables-grid">
        {filteredItems.map(item => {
          const currentQty = quantities[item.id] || 0;
          const isBulk = currentQty >= item.bulkThreshold;
          const currentPrice = isBulk ? item.bulkPrice : item.price;

          return (
            <div className={`disposable-card ${item.category === 'Eco-Friendly Options' ? 'eco-card' : ''}`} key={item.id}>
              
              <div className="image-container">
                {item.sameDay && (
                  <span className="badge same-day"><Truck size={12} /> Same-Day Delivery</span>
                )}
                <span className="product-icon">{item.image}</span>
              </div>

              <div className="card-content">
                <p className="category-tag">{item.category}</p>
                <h3>{item.name}</h3>

                <div className="pricing-section">
                  <div className="price-display">
                    <span className="current-price">₹{currentPrice}</span>
                    {isBulk && <span className="original-price strike">₹{item.price}</span>}
                  </div>
                  <p className={`bulk-notice ${isBulk ? 'success' : ''}`}>
                    {isBulk 
                      ? "✓ Bulk pricing applied!" 
                      : `Buy ${item.bulkThreshold}+ packs for ₹${item.bulkPrice}/ea`}
                  </p>
                </div>

                <div className="action-row">
                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease"><Minus size={16} /></button>
                    <input 
                      type="number" 
                      value={currentQty} 
                      readOnly 
                    />
                    <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase"><Plus size={16} /></button>
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

export default Disposables;