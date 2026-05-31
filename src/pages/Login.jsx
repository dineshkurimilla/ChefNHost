import { useState } from 'react';
import '../styles/Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with', email, password);
    // Add auth logic here
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back to ChefNHost</h2>
        <p>Sign in to manage your bookings and rentals.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="btn-primary login-submit">Login</button>
        </form>
        <p className="signup-link">Don't have an account? <span>Sign up</span></p>
      </div>
    </div>
  );
};

export default Login;