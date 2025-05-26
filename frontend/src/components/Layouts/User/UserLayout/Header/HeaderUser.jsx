import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HeaderUser.scss';
import logo from '../../../../../assets/images/headeruser/logo.png';

function HeaderUser() {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    loadUser(); // Load lần đầu khi component mount

    window.addEventListener("userLoggedIn", loadUser);

    return () => {
      window.removeEventListener("userLoggedIn", loadUser);
    };
  }, []);

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
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
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>

          <div className="header-icons">
            <a href="#" onClick={toggleSearch}><i className="fas fa-search"></i></a>
            <a href="/CartUser" className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">3</span>
            </a>
            {user ? (
              <div className="user-info">
               <Link to="/profileUser" className="hello-user">
  Hi {user.email}
</Link>
                <button className="logout-btn" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            ) : (
              <Link to="/login"><i className="far fa-user"></i></Link>
            )}
          </div>
        </div>
      </div>

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
