import { Star } from 'lucide-react';
import '../styles/RentAChef.scss';

// Mock Data
const CHEF_DATA = [
  { id: 1, name: "Chef Gordon", specialty: "Italian Cuisine", rating: 4.9, price: "₹5000", image: "https://via.placeholder.com/150", type: "Non-Veg", available: "Available Today" },
  { id: 2, name: "Chef Sanjeev", specialty: "North Indian", rating: 4.8, price: "₹4000", image: "https://via.placeholder.com/150", type: "Veg", available: "Available Tomorrow" },
  { id: 3, name: "Chef Mei", specialty: "Pan Asian", rating: 4.7, price: "₹4500", image: "https://via.placeholder.com/150", type: "Non-Veg", available: "Available 24th Oct" },
];

const RentAChef = () => {
  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h1>Find Your Perfect Chef</h1>
        <p>Expert culinary artists for your home and events.</p>
      </div>

      <div className="marketplace-layout">
        {/* FILTERS SIDEBAR */}
        <aside className="filters-sidebar">
          <h3>Filters</h3>
          
          <div className="filter-group">
            <h4>Cuisine</h4>
            <label><input type="checkbox" /> North Indian</label>
            <label><input type="checkbox" /> Italian</label>
            <label><input type="checkbox" /> Continental</label>
            <label><input type="checkbox" /> Pan Asian</label>
          </div>

          <div className="filter-group">
            <h4>Veg/Non-Veg</h4>
            <label><input type="radio" name="diet" /> Pure Veg</label>
            <label><input type="radio" name="diet" /> Non-Veg</label>
            <label><input type="radio" name="diet" /> Both</label>
          </div>

          <div className="filter-group">
            <h4>Budget (Per Event)</h4>
            <input type="range" min="2000" max="15000" className="budget-slider" />
          </div>
        </aside>

        {/* CHEF GRID */}
        <div className="chef-grid">
          {CHEF_DATA.map((chef) => (
            <div className="chef-card" key={chef.id}>
              <img src={chef.image} alt={chef.name} />
              <div className="chef-info">
                <div className="card-header">
                  <h3>{chef.name}</h3>
                  <span className="rating"><Star size={16} fill="#d4af37" color="#d4af37"/> {chef.rating}</span>
                </div>
                <p className="specialty">{chef.specialty} • {chef.type}</p>
                <p className="available">{chef.available}</p>
                <div className="card-footer">
                  <span className="price">{chef.price} <small>/ event</small></span>
                  <button className="btn-primary">Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentAChef;