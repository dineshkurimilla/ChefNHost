import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.scss';

// Layout Component (Contains Navbar and Footer)
import MainLayout from './components/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import RentAChef from './pages/RentAChef';
import RentCutlery from './pages/RentCutlery';
import RentCrockery from './pages/RentCrockery';
import GroupChefs from './pages/GroupChefs';
import Disposables from './pages/Disposables';
import EventRentals from './pages/EventRentals';
import Cart from './pages/Cart';
// Import other pages...

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
          <Route path="/rent-a-chef" element={<RentAChef />} />
          <Route path="/rent-cutlery" element={<RentCutlery />} />
          <Route path="/rent-crockery" element={<RentCrockery />} />
          <Route path="/group-chefs" element={<GroupChefs />} />
          <Route path="/disposables" element={<Disposables />} />
          <Route path="/event-rentals" element={<EventRentals />} />
          <Route path="/cart" element={<Cart />} />
          {/* Add remaining routes here */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
