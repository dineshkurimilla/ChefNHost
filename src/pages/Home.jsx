import { useNavigate } from 'react-router-dom';
import { ChefHat, Utensils, Coffee, Users, Trash2, CalendarCheck, Package } from 'lucide-react';
import '../styles/Home.scss';

const categories = [
  { name: 'Rent a Chef', path: '/rent-a-chef', icon: <ChefHat size={40} /> },
  { name: 'Rent Cutlery', path: '/rent-cutlery', icon: <Utensils size={40} /> },
  { name: 'Rent Crockery', path: '/rent-crockery', icon: <Coffee size={40} /> },
  { name: 'Group Chefs', path: '/group-chefs', icon: <Users size={40} /> },
  { name: 'Disposable Items', path: '/disposables', icon: <Trash2 size={40} /> },
  { name: 'Event Managers', path: '/event-managers', icon: <CalendarCheck size={40} /> },
  { name: 'Event Rentals', path: '/event-rentals', icon: <Package size={40} /> },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-hero">
        <h1>Welcome to ChefNHost</h1>
        <p>Your premium event and hospitality marketplace.</p>
      </header>

      <section className="categories-grid">
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className="category-card" 
            onClick={() => navigate(cat.path)}
          >
            <div className="icon-wrapper">{cat.icon}</div>
            <h3>{cat.name}</h3>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;