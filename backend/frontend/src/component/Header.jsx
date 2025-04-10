import React from 'react';
import logo from '../asset/img/logo/logo.png';
import { Link } from 'react-router-dom';
import '../asset/css/bootstrap.min.css';
import '../asset/css/owl.carousel.min.css';
import '../asset/css/animate.min.css';
import '../asset/css/magnific-popup.css';
import '../asset/css/fontawesome-all.min.css';
import '../asset/css/flaticon.css';
import '../asset/css/meanmenu.css';
import '../asset/css/slick.css';
import '../asset/css/default.css';
import '../asset/css/style.css';
import '../asset/css/responsive.css';
import pro1 from '../asset/img/product/pro1.jpg';
import pro2 from '../asset/img/product/pro2.jpg';
import pro3 from '../asset/img/product/pro3.jpg';

const Header = () => {
  return (
    <>
      {/* Header */}
      <header>
        <div id="header-sticky" className="header-area box-90">
          <div className="container-fluid">
            <div className="row align-items-center">
              {/* Logo + Category */}
              <div className="col-xl-2 col-lg-6 col-md-6 col-7 col-sm-5 d-flex align-items-center pos-relative">
                <div className="basic-bar cat-toggle">
                  <span className="bar1"></span>
                  <span className="bar2"></span>
                  <span className="bar3"></span>
                </div>
                <div className="logo">
                 <Link to="Shop.jsx">
                    <img src={logo} alt="logo" />
                  </Link>
                </div>
                <div className="category-menu">
                  <h4>Category</h4>
                  <ul>
                    <li><a href="/shop"><i className="flaticon-shopping-cart-1"></i> Table lamp</a></li>
                    <li><a href="/shop"><i className="flaticon-shopping-cart-1"></i> Furniture</a></li>
                    <li><a href="/shop"><i className="flaticon-shopping-cart-1"></i> Chair</a></li>
                    <li><a href="/shop"><i className="flaticon-shopping-cart-1"></i> Men</a></li>
                    <li><a href="/shop"><i className="flaticon-shopping-cart-1"></i> Women</a></li>
                    <li><a href="/shop"><i className="flaticon-shopping-cart-1"></i> Cloth</a></li>
                    <li><a href="/shop"><i className="flaticon-shopping-cart-1"></i> Trend</a></li>
                  </ul>
                </div>
              </div>

              {/* Main Menu */}
              <div className="col-xl-8 col-lg-6 col-md-8 col-8 d-none d-xl-block">
                <div className="main-menu text-center">
                  <nav id="mobile-menu">
                    <ul>
                      <li>
                      <li>
                        <Link to="/Home.jsx">Home</Link>  {/* Update Home link to use Link */}
                      </li>
                        <ul className="submenu">
                          <li><a href="/">Home Style 1</a></li>
                          <li><a href="/">Home Style 2</a></li>
                          <li><a href="/">Home Style 3</a></li>
                          <li><a href="/">Home Style 4</a></li>
                          <li><a href="/">Home Style 5</a></li>
                        </ul>
                      </li>
                      <li className="mega-menu">
                      <li>
                        <Link to="/Shop.jsx">Shop</Link>  {/* Update Home link to use Link */}
                      </li>
                        <ul className="submenu">
                          <li>
                            <a href="#">Category View</a>
                            <ul className="submenu level-1">
                              <li><a href="/shop">Shop 2 Column</a></li>
                              <li><a href="/shop-filter">Shop Filter Style</a></li>
                              <li><a href="/shop-full">Shop Full</a></li>
                              <li><a href="/shop-3-col">Shop 3 Column</a></li>
                              <li><a href="/shop-list">List View</a></li>
                            </ul>
                          </li>
                          <li>
                            <a href="#">Category View</a>
                            <ul className="submenu">
                              <li><a href="/shop-left-sidebar">Sidebar Left</a></li>
                              <li><a href="/shop-sidebar-right">Sidebar Right</a></li>
                              <li><a href="/cart">Shopping Cart</a></li>
                              <li><a href="/checkout">Checkout</a></li>
                              <li><a href="/wishlist">My Wishlist</a></li>
                            </ul>
                          </li>
                          <li>
                            <a href="#">Products Types</a>
                            <ul className="submenu">
                              <li><a href="/product-simple">Simple Product</a></li>
                              <li><a href="/product-variable">Variable Product</a></li>
                              <li><a href="/product-upcoming">Product Upcoming</a></li>
                              <li><a href="/product-up-thumb">Thumb Top Product</a></li>
                              <li><a href="/product-sidebar">Product Sidebar</a></li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li><a href="/shop-filter">Products</a></li>
                      <li>
                        <a href="/blog">Blog</a>
                        <ul className="submenu">
                          <li><a href="/blog-2-col">Blog 2 Column</a></li>
                          <li><a href="/blog-2-col-mas">Blog 2 Col Masonry</a></li>
                          <li><a href="/blog-3-col">Blog 3 Column</a></li>
                          <li><a href="/blog-3-col-mas">Blog 3 Col Masonry</a></li>
                          <li><a href="/blog-details">Blog Details</a></li>
                          <li><a href="/blog-details-audio">Blog Details Audio</a></li>
                          <li><a href="/blog-details-video">Blog Details Video</a></li>
                          <li><a href="/blog-details-gallery">Blog Details Gallery</a></li>
                          <li><a href="/blog-details-left-sidebar">Details Left Sidebar</a></li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">Pages</a>
                        <ul className="submenu">
                          <li><a href="/about">About Us</a></li>
                          <li><a href="/contact">Contact Us</a></li>
                          <li><a href="/login">Login</a></li>
                          <li><a href="/register">Register</a></li>
                          <li><a href="/cart">Shopping Cart</a></li>
                          <li><a href="/checkout">Checkout</a></li>
                          <li><a href="/wishlist">Wishlist</a></li>
                        </ul>
                      </li>
                      <li><a href="/contact">Contact</a></li>
                    </ul>
                  </nav>
                </div>
              </div>

              {/* Right Icons */}
              <div className="col-xl-2 col-lg-6 col-md-6 col-5 col-sm-7 pl-0">
                <div className="header-right f-right">
                  <ul>
                    <li className="search-btn">
                      <a className="search-btn nav-search search-trigger" href="#"><i className="fas fa-search"></i></a>
                    </li>
                    <li className="login-btn">
                      <a href="/login"><i className="far fa-user"></i></a>
                    </li>
                    <li className="d-shop-cart">
                      <a href="#"><i className="flaticon-shopping-cart"></i> <span className="cart-count">3</span></a>
                      <ul className="minicart">
                        {[pro1, pro2, pro3].map((img, idx) => (
                          <li key={idx}>
                            <div className="cart-img">
                              <a href="/product-details"><img src={img} alt={`product-${idx}`} /></a>
                            </div>
                            <div className="cart-content">
                              <h3><a href="/product-details">Black & White Shoes</a></h3>
                              <div className="cart-price">
                                <span className="new">$229.9</span>
                                <span><del>$239.9</del></span>
                              </div>
                            </div>
                            <div className="del-icon">
                              <a href="#"><i className="far fa-trash-alt"></i></a>
                            </div>
                          </li>
                        ))}
                        <li>
                          <div className="total-price">
                            <span className="f-left">Total:</span>
                            <span className="f-right">$300.0</span>
                          </div>
                        </li>
                        <li>
                          <div className="checkout-link">
                            <a href="/cart">Shopping Cart</a>
                            <a className="red-color" href="/checkout">Checkout</a>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mobile Menu */}
              <div className="col-12 d-xl-none">
                <div className="mobile-menu"></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

