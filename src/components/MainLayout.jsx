import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User } from 'lucide-react';
import '../styles/MainLayout.scss';

const MainLayout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">ChefNHost</Link>
        </div>
        <div className="nav-icons">
          <Link to="/wishlist"><Heart size={20} /></Link>
          <Link to="/cart"><ShoppingCart size={20} /></Link>
          <Link to="/login" className="login-btn"><User size={20} /> Login</Link>
        </div>
      </nav>
      
      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <p>&copy; 2026 ChefNHost. All rights reserved By Kurimilla Dinesh Goud.</p>
      </footer>
    </div>
  );
};

export default MainLayout;