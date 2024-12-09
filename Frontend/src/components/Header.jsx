import React from 'react';
import { Link } from 'react-router-dom';  // Using react-router-dom for routing
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>BookStore</h1> {/* You can replace this with an image/logo */}
      </div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/home" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/wishlist" className="nav-link">Wishlist</Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link">Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
