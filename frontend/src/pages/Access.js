import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import logo from '../assets/logo.png';
import './Pages.css';


const Access = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    full_name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.register(formData);
      navigate('/dashboard'); // Navigate to dashboard after successful registration
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <PhoneInput
            country={'az'}
            value={formData.phone}
            onChange={handlePhoneChange}
            inputClass="auth-input"
            containerClass="phone-input-container"
            buttonClass="country-dropdown"
            dropdownClass="country-dropdown-list"
            enableSearch={true}
            disableSearchIcon={true}
            searchPlaceholder="Search country..."
            placeholder="Phone Number"
            disableDropdown={false}
            countryCodeEditable={true}
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
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p className="auth-switch">
            Already have an account? <Link to="/connect">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Access; 