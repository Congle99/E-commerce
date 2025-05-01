import React, { useState } from 'react';
import './HeaderUser.scss';
import logo from '../../../../assets/images/headeruser/logo.png';

function HeaderUser() {
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  return (
    <header className="header-user">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Logo" />
              <span className="shop-name">E-Commerce Shop</span>
            </a>
          </div>

          <nav className="main-nav">
            <ul>
              <li><a href="/user">Home</a></li>
              <li><a href="/ShopUser">Shop</a></li>
              <li><a href="/ProductUser">Products</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>

          <div className="header-icons">
            <a href="#" onClick={toggleSearch}><i className="fas fa-search"></i></a>
            <a href="/login"><i className="far fa-user"></i></a>
            <a href="/CartUser" className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">3</span>
            </a>
          </div>
        </div>
      </div>

      {/* Search overlay modal */}
      {isSearchOpen && (
        <div className="search-overlay">
          <div className="search-content">
            <button className="close-btn" onClick={closeSearch}>×</button>
            <input type="text" placeholder="Search products..." />
          </div>
        </div>
      )}
    </header>
  );
}

export default HeaderUser;
