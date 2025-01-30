import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import logo from '../assets/logo.png';
import './Pages.css';

const Connect = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(formData.email, formData.password);
      navigate('/dashboard'); // Navigate to dashboard after successful login
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo-container">
          <img src={logo} alt="Etheris" className="logo" />
          <h1 className="brand-title">Etheris</h1>
          <h2 className="brand-slogan">Connected Futures</h2>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Connecting...' : 'Connect'}
          </button>
          <p className="auth-switch">
            Don't have an account? <Link to="/access">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Connect; 