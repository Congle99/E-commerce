import React from "react";

const Header = () => {
    return (
        <header>
            <div id="header-sticky" className="header-area box-90">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-xl-2 col-lg-6 col-md-6 col-7 col-sm-5 d-flex align-items-center pos-relative">
                            <div className="basic-bar cat-toggle">
                                <span className="bar1"></span>
                                <span className="bar2"></span>
                                <span className="bar3"></span>
                            </div>
                            <div className="logo">
                                <a href="index.html">
                                    <img src="img/logo/logo.png" alt="" />
                                </a>
                            </div>
                            <div className="category-menu">
                                <h4>Category</h4>
                                <ul>
                                    <li>
                                        <a href="shop.html">
                                            <i className="flaticon-shopping-cart-1"></i>{" "}
                                            Table lamp
                                        </a>
                                    </li>
                                    <li>
                                        <a href="shop.html">
                                            <i className="flaticon-shopping-cart-1"></i>{" "}
                                            Furniture
                                        </a>
                                    </li>
                                    <li>
                                        <a href="shop.html">
                                            <i className="flaticon-shopping-cart-1"></i>{" "}
                                            Chair
                                        </a>
                                    </li>
                                    <li>
                                        <a href="shop.html">
                                            <i className="flaticon-shopping-cart-1"></i>{" "}
                                            Men
                                        </a>
                                    </li>
                                    <li>
                                        <a href="shop.html">
                                            <i className="flaticon-shopping-cart-1"></i>{" "}
                                            Women
                                        </a>
                                    </li>
                                    <li>
                                        <a href="shop.html">
                                            <i className="flaticon-shopping-cart-1"></i>{" "}
                                            Cloth
                                        </a>
                                    </li>
                                    <li>
                                        <a href="shop.html">
                                            <i className="flaticon-shopping-cart-1"></i>{" "}
                                            Trend
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-6 col-md-8 col-8 d-none d-xl-block">
                            <div className="main-menu text-center">
                                <nav id="mobile-menu">
                                    <ul>
                                        <li>
                                            <a href="index.html">Home</a>
                                            <ul className="submenu">
                                                <li>
                                                    <a href="index.html">
                                                        Home Style 1
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index-2.html">
                                                        Home Style 2
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index-3.html">
                                                        Home Style 3
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index-4.html">
                                                        Home Style 4
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index-5.html">
                                                        Home Style 5
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="mega-menu">
                                            <a href="shop.html">Shop</a>
                                            <ul className="submenu">
                                                <li>
                                                    <a href="#">
                                                        Category View
                                                    </a>
                                                    <ul className="submenu level-1">
                                                        <li>
                                                            <a href="shop.html">
                                                                Shop 2 Column
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="shop-filter.html">
                                                                Shop Filter
                                                                Style
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="shop-full.html">
                                                                Shop Full
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="shop-3-col.html">
                                                                Shop 3 Column
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="shop-list.html">
                                                                List View
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        Category View
                                                    </a>
                                                    <ul className="submenu">
                                                        <li>
                                                            <a href="shop-left-sidebar.html">
                                                                Sidebar Left
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="shop-sidebar-right.html">
                                                                Sidebar Right
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="cart.html">
                                                                Shopping Cart
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="checkout.html">
                                                                Checkout
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="wishlist.html">
                                                                My Wishlist
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        Products Types
                                                    </a>
                                                    <ul className="submenu">
                                                        <li>
                                                            <a href="product-simple.html">
                                                                Simple Product
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="product-variable.html">
                                                                Variable Product
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="product-upcoming.html">
                                                                Product Upcoming
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="product-up-thumb.html">
                                                                Thumb Top
                                                                Product
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="product-sidebar.html">
                                                                Product Sidebar
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="shop-filter.html">
                                                Products
                                            </a>
                                        </li>
                                        <li>
                                            <a href="blog.html">Blog</a>
                                            <ul className="submenu">
                                                <li>
                                                    <a href="blog-2-col.html">
                                                        Blog 2 Column
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="blog-2-col-mas.html">
                                                        Blog 2 Col Masonry
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="blog-3-col.html">
                                                        Blog 3 Column
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="blog-3-col-mas.html">
                                                        Blog 3 Col Masonry
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="blog-details.html">
                                                        Blog Details
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="blog-details-audio.html">
                                                        Blog Details Audio
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="blog-details-video.html">
                                                        Blog Details Video
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="blog-details-gallery.html">
                                                        Blog Details Gallery
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="blog-details-left-sidebar.html">
                                                        Details Left Sidebar
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#">Pages</a>
                                            <ul className="submenu">
                                                <li>
                                                    <a href="about.html">
                                                        About Us
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="contact.html">
                                                        Contact Us
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="login.html">
                                                        Login
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="register.html">
                                                        Register
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="cart.html">
                                                        Shopping Cart
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="checkout.html">
                                                        Checkout
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="wishlist.html">
                                                        Wishlist
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="contact.html">Contact</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-6 col-md-6 col-5 col-sm-7 pl-0">
                            <div className="header-right f-right">
                                <ul>
                                    <li className="search-btn">
                                        <a
                                            className="search-btn nav-search search-trigger"
                                            href="#"
                                        >
                                            <i className="fas fa-search"></i>
                                        </a>
                                    </li>
                                    <li className="login-btn">
                                        <a href="login.html">
                                            <i className="far fa-user"></i>
                                        </a>
                                    </li>
                                    <li className="d-shop-cart">
                                        <a href="#">
                                            <i className="flaticon-shopping-cart"></i>{" "}
                                            <span className="cart-count">
                                                3
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 d-xl-none">
                            <div className="mobile-menu"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
