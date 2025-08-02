import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-text">Mark the Marketer</Link>
      </div>
      <div className="navbar-links">
        <Link to="/onboarding" className="nav-link">Onboarding Guide</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-btn primary">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
