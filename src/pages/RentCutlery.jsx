import { Minus, Plus, ShoppingCart, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import '../styles/RentCutlery.scss';

// Mock Inventory Data matching your exact parameters
const CUTLERY_INVENTORY = [
  { id: 1, name: 'Imperial Gold Dessert Spoons', category: 'Spoons', quality: 'Premium', pricePerDay: 18, icon: '🥄' },
  { id: 2, name: 'Classic Stainless Dinner Forks', category: 'Forks', quality: 'Standard', pricePerDay: 6, icon: '🍴' },
  { id: 3, name: 'Premium Damascus Steak Knives', category: 'Knives', quality: 'Premium', pricePerDay: 22, icon: '🔪' },
  { id: 4, name: 'Silver Baroque Serving Set', category: 'Serving Sets', quality: 'Premium', pricePerDay: 45, icon: '✨' },
  { id: 5, name: 'Banquet Heavy-Duty Bulk Set', category: 'Luxury Sets', quality: 'Bulk Orders', pricePerDay: 120, icon: '⚜️' },
  { id: 6, name: 'Contemporary Matte Black Knives', category: 'Knives', quality: 'Standard', pricePerDay: 10, icon: '🔪' },
  { id: 7, name: 'Elegance Soup Spoons (Pack of 50)', category: 'Spoons', quality: 'Bulk Orders', pricePerDay: 75, icon: '🥄' },
  { id: 8, name: 'Rose Gold Luxury Banquet Collection', category: 'Luxury Sets', quality: 'Premium', pricePerDay: 200, icon: '👑' }
];

const categories = ['All', 'Spoons', 'Forks', 'Knives', 'Serving Sets', 'Luxury Sets'];
const qualityFilters = ['Premium', 'Standard', 'Bulk Orders'];

const RentCutlery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedQualities, setSelectedQualities] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Toggle Quality Filter
  const handleQualityChange = (quality) => {
    if (selectedQualities.includes(quality)) {
      setSelectedQualities(selectedQualities.filter(q => q !== quality));
    } else {
      setSelectedQualities([...selectedQualities, quality]);
    }
  };

  // Quantity Adjusters
  const updateQuantity = (id, delta) => {
    setQuantities(prev => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prev, [id]: newQty };
    });
  };

  // Filter Logic
  const filteredProducts = CUTLERY_INVENTORY.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuality = selectedQualities.length === 0 || selectedQualities.includes(item.quality);
    return matchesCategory && matchesQuality;
  });

  const handleAddToCart = (item) => {
    const qty = quantities[item.id] || 0;
    if (qty === 0) {
      alert("Please select a quantity greater than 0.");
      return;
    }
    alert(`Added ${qty} x ${item.name} to your cart!`);
  };

  return (
    <div className="cutlery-container">
      <div className="cutlery-header">
        <h1>Rent Premium Cutlery</h1>
        <p>Elevate your dining experience with pristine, polished collections.</p>
      </div>

      {/* Category Navigation Bar */}
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

      <div className="cutlery-layout">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filter-title">
            <SlidersHorizontal size={18} />
            <h3>Filter Inventory</h3>
          </div>
          
          <div className="filter-group">
            <h4>Quality Tier</h4>
            {qualityFilters.map(quality => (
              <label key={quality} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={selectedQualities.includes(quality)}
                  onChange={() => handleQualityChange(quality)}
                />
                {quality}
              </label>
            ))}
          </div>
        </aside>

        {/* Product Grid Layout */}
        <main className="product-grid">
          {filteredProducts.map(product => {
            const currentQty = quantities[product.id] || 0;
            return (
              <div className="product-card" key={product.id}>
                <div className="product-image-placeholder">
                  <span className="product-icon">{product.icon}</span>
                  <span className="badge">{product.quality}</span>
                </div>
                
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="category-tag">{product.category}</p>
                  <p className="price">₹{product.pricePerDay} <small>/ day</small></p>
                  
                  <div className="card-actions">
                    <div className="qty-selector">
                      <button onClick={() => updateQuantity(product.id, -1)} aria-label="Decrease quantity">
                        <Minus size={16} />
                      </button>
                      <span>{currentQty}</span>
                      <button onClick={() => updateQuantity(product.id, 1)} aria-label="Increase quantity">
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button 
                      className="btn-primary add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart size={16} /> Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredProducts.length === 0 && (
            <p className="no-results">No items found matching the selected filters.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default RentCutlery;