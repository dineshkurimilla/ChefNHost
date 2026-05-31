import { useState, useMemo } from 'react';
import { Users, Clock, ChefHat, Utensils, Calculator, CheckCircle2 } from 'lucide-react';
import '../styles/GroupChefs.scss';

// Pre-defined Chef Packages
const CHEF_PACKAGES = [
  {
    id: 'small_party',
    title: 'Small Party Team',
    chefs: 2,
    maxGuests: 40,
    baseDuration: 4,
    cuisines: '1-2 Cuisines',
    price: 8000,
    features: ['Menu Planning', 'Grocery Shopping List', 'Basic Cleanup']
  },
  {
    id: 'live_counter',
    title: 'Live Counter Specialists',
    chefs: 3,
    maxGuests: 80,
    baseDuration: 5,
    cuisines: 'Specialty (Pasta, Chaat, BBQ)',
    price: 15000,
    features: ['Interactive Cooking', 'Specialty Equipment Handling', 'Live Plating']
  },
  {
    id: 'corporate',
    title: 'Corporate Event Team',
    chefs: 6,
    maxGuests: 150,
    baseDuration: 6,
    cuisines: 'Multi-Cuisine Buffet',
    price: 35000,
    features: ['High-volume prep', 'Buffet Management', 'Strict Timing']
  },
  {
    id: 'wedding',
    title: 'Wedding Catering Team',
    chefs: 15,
    maxGuests: 500,
    baseDuration: 8,
    cuisines: 'Unlimited (Global Menu)',
    price: 120000,
    features: ['Full Kitchen Takeover', 'Premium Plating', 'Dedicated Head Chef']
  }
];

const GroupChefs = () => {
  // Calculator State
  const [guestCount, setGuestCount] = useState(50);
  const [duration, setDuration] = useState(4);
  const [cuisineType, setCuisineType] = useState('Multi-Cuisine');

  // Recommendation Engine Logic
  const recommendedPackage = useMemo(() => {
    if (guestCount <= 40) return CHEF_PACKAGES[0]; // Small Party
    if (guestCount > 40 && guestCount <= 100 && duration <= 5) return CHEF_PACKAGES[1]; // Live Counter / Mid
    if (guestCount <= 150) return CHEF_PACKAGES[2]; // Corporate
    return CHEF_PACKAGES[3]; // Wedding
  }, [guestCount, duration]);

  // Dynamically calculate estimated cost based on extra hours
  const estimatedCost = useMemo(() => {
    const base = recommendedPackage.price;
    const extraHours = Math.max(0, duration - recommendedPackage.baseDuration);
    const hourlyRatePerChef = 500; 
    const extraTimeCost = extraHours * recommendedPackage.chefs * hourlyRatePerChef;
    return base + extraTimeCost;
  }, [recommendedPackage, duration]);

  return (
    <div className="group-chefs-container">
      {/* Hero Section */}
      <header className="group-hero">
        <h1>Hire Teams of Professional Chefs</h1>
        <p>From intimate house parties to grand wedding banquets, we have the perfect culinary team for you.</p>
      </header>

      {/* Interactive Event Size Calculator */}
      <section className="calculator-section">
        <div className="calculator-header">
          <Calculator size={24} className="calc-icon" />
          <h2>Event Size Calculator</h2>
          <p>Not sure what you need? Tell us about your event and we'll recommend the ideal setup.</p>
        </div>

        <div className="calculator-layout">
          {/* Input Controls */}
          <div className="calc-inputs">
            <div className="input-group">
              <label><Users size={18}/> Guest Count: {guestCount}</label>
              <input 
                type="range" min="10" max="500" step="10"
                value={guestCount} onChange={(e) => setGuestCount(parseInt(e.target.value))}
              />
              <div className="range-labels"><span>10</span><span>500+</span></div>
            </div>

            <div className="input-group">
              <label><Clock size={18}/> Event Duration: {duration} Hours</label>
              <input 
                type="range" min="2" max="12" step="1"
                value={duration} onChange={(e) => setDuration(parseInt(e.target.value))}
              />
              <div className="range-labels"><span>2 hrs</span><span>12 hrs</span></div>
            </div>

            <div className="input-group">
              <label><Utensils size={18}/> Cuisine Preference</label>
              <select value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} className="cuisine-select">
                <option>Multi-Cuisine</option>
                <option>North Indian & Mughlai</option>
                <option>Italian & Continental</option>
                <option>Pan Asian</option>
                <option>South Indian Traditional</option>
              </select>
            </div>
          </div>

          {/* Dynamic Recommendation Output */}
          <div className="calc-recommendation">
            <div className="recommendation-badge">Recommended for You</div>
            <h3>{recommendedPackage.title}</h3>
            
            <div className="rec-stats">
              <div className="stat"><ChefHat size={18}/> <span>{recommendedPackage.chefs} Chefs</span></div>
              <div className="stat"><Users size={18}/> <span>Up to {recommendedPackage.maxGuests} Guests</span></div>
            </div>

            <div className="rec-price">
              <span className="label">Estimated Package Cost:</span>
              <span className="amount">₹{estimatedCost.toLocaleString('en-IN')}</span>
              {duration > recommendedPackage.baseDuration && (
                <small className="overtime-note">Includes extra time charges</small>
              )}
            </div>

            <button className="btn-primary book-rec-btn">Book This Team</button>
          </div>
        </div>
      </section>

      {/* Static Package Grid */}
      <section className="all-packages">
        <h2 className="section-title">All Catering Packages</h2>
        <div className="packages-grid">
          {CHEF_PACKAGES.map((pkg) => (
            <div className="package-card" key={pkg.id}>
              <div className="card-header">
                <h3>{pkg.title}</h3>
                <span className="price">₹{pkg.price.toLocaleString('en-IN')} <small>base</small></span>
              </div>
              <div className="card-body">
                <p><ChefHat size={16}/> {pkg.chefs} Professional Chefs</p>
                <p><Users size={16}/> Up to {pkg.maxGuests} Guests</p>
                <p><Clock size={16}/> {pkg.baseDuration} Hours Service</p>
                <p><Utensils size={16}/> {pkg.cuisines}</p>
                
                <ul className="feature-list">
                  {pkg.features.map((feature, i) => (
                    <li key={i}><CheckCircle2 size={14} color="#d84315"/> {feature}</li>
                  ))}
                </ul>
              </div>
              <div className="card-footer">
                <button className="btn-outline">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GroupChefs;