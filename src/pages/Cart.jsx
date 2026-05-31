import { useState } from 'react';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, CalendarDays, Wrench } from 'lucide-react';
import '../styles/Cart.scss';

// Mock Cart Data combining different product types
const INITIAL_CART = [
  {
    id: 'c1',
    type: 'rental',
    name: 'Premium Banquet Chairs',
    category: 'Chairs',
    price: 80, // per day
    setupCharge: 10,
    duration: 2,
    quantity: 50,
    image: '🪑'
  },
  {
    id: 'c2',
    type: 'disposable',
    name: 'Areca Palm Leaf Plates',
    category: 'Eco-Friendly Options',
    price: 200, // Bulk pricing applied
    setupCharge: 0,
    duration: null,
    quantity: 5,
    image: '🍃'
  },
  {
    id: 'c3',
    type: 'service',
    name: 'Live Counter Specialists',
    category: 'Chef Team',
    price: 15000, // flat rate
    setupCharge: 0,
    duration: 1, // Event
    quantity: 1,
    image: '👨‍🍳'
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  // Cart Handlers
  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculations
  const calculateItemTotal = (item) => {
    if (item.type === 'rental') {
      return (item.price * item.duration * item.quantity) + (item.setupCharge * item.quantity);
    }
    return item.price * item.quantity;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const calculateSetupFees = () => {
    return cartItems.reduce((total, item) => total + (item.setupCharge * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const setupFees = calculateSetupFees();
  const tax = subtotal * 0.18; // 18% GST
  const grandTotal = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-state">
        <ShoppingBag size={64} className="empty-icon" />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any services or rentals yet.</p>
        <button className="btn-primary continue-shopping-btn">Explore Services</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <header className="cart-header">
        <h1>Review Your Order</h1>
        <p>You have {cartItems.length} items in your cart.</p>
      </header>

      <div className="cart-layout">
        {/* Cart Items List */}
        <div className="cart-items-section">
          {cartItems.map((item) => (
            <div className="cart-item-card" key={item.id}>
              <div className="item-icon-wrapper">
                <span className="item-icon">{item.image}</span>
              </div>
              
              <div className="item-details">
                <span className="item-type-badge">{item.type}</span>
                <h3>{item.name}</h3>
                
                <div className="item-meta">
                  {item.type === 'rental' && (
                    <span className="meta-tag"><CalendarDays size={14} /> {item.duration} Days</span>
                  )}
                  {item.setupCharge > 0 && (
                    <span className="meta-tag"><Wrench size={14} /> ₹{item.setupCharge}/unit setup</span>
                  )}
                </div>
              </div>

              <div className="item-controls">
                <div className="qty-stepper">
                  <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                </div>
              </div>

              <div className="item-price">
                <strong>₹{calculateItemTotal(item).toLocaleString('en-IN')}</strong>
                <button className="remove-btn" onClick={() => removeItem(item.id)} title="Remove Item">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Checkout CTA */}
        <div className="cart-summary-section">
          <div className="summary-card">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Items Subtotal</span>
              <span>₹{(subtotal - setupFees).toLocaleString('en-IN')}</span>
            </div>
            
            <div className="summary-row">
              <span>Total Setup Charges</span>
              <span>₹{setupFees.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="summary-row tax">
              <span>Estimated GST (18%)</span>
              <span>₹{tax.toLocaleString('en-IN')}</span>
            </div>
            
            <hr />
            
            <div className="summary-row grand-total">
              <span>Total Estimate</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            <button className="btn-primary checkout-cta">
              Proceed to Checkout <ArrowRight size={20} />
            </button>

            <p className="summary-note">
              Final dates, delivery times, and venue details will be confirmed during checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;