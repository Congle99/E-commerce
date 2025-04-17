import React from 'react';
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

const ShopBody = () => {
    return (
        <section className="shop-area pt-100 pb-100">
            <div className="container">
                <div className="row">
                    {/* Sidebar - Left Side */}
                    <div className="col-xl-3 col-lg-3 col-md-4">
                        <div className="sidebar-box">
                            <div className="shop-widget">
                                <h3 className="shop-title">Search by</h3>
                                <form className="shop-search">
                                    <input type="text" placeholder="Your keyword...." />
                                    <button><i className="fa fa-search"></i></button>
                                </form>
                            </div>
                            <ShopWidget title="Categories" items={['Accessories', 'Bags', 'Clothing', 'Shoes', 'Exclusive', 'Uncategorized', 'Women']} />
                            <ShopWidget title="Brand" items={['Apex', 'Bata', 'Puma', 'Nike', 'Likoda', 'Piolaba']} />
                            <ShopWidget title="Price filter" items={['£0.00 - £50.00', '£50.00 - £100.00', '£100.00 - £150.00', '£150.00 - £200.00', '£200.00+']} />
                            <ShopWidget title="Product Size" items={['L', 'M', 'X', 'XL', 'XXL']} />
                            <div className="shop-widget">
                                <div className="shop-sidebar-banner">
                                    <a href="/shop">
                                        <img src={require('../asset/img/banner/shop-banner.jpg')} alt="Shop Banner" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Display - Right Side */}
                    <div className="col-xl-9 col-lg-9 col-md-8">
                        {/* Tab Filter */}
                        <div className="row mb-10">
                            <div className="col-xl-5 col-lg-6 col-md-6">
                                <div className="product-showing mb-40">
                                    <p>Showing 1–22 of 32 results</p>
                                </div>
                            </div>

                            <div className="col-xl-7 col-lg-6 col-md-6">
                                <div className="shop-tab f-right">
                                    <ul className="nav text-center" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a
                                                className="nav-link active"
                                                id="home-tab"
                                                data-toggle="tab"
                                                href="#home"
                                                role="tab"
                                                aria-controls="home"
                                                aria-selected="true"
                                            >
                                                <i className="fas fa-list-ul"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                id="profile-tab"
                                                data-toggle="tab"
                                                href="#profile"
                                                role="tab"
                                                aria-controls="profile"
                                                aria-selected="false"
                                            >
                                                <i className="fas fa-th-large"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pro-filter mb-40 f-right">
                                    <form action="#">
                                        <select name="pro-filter" id="pro-filter">
                                            <option value="1">Shop By</option>
                                            <option value="2">Top Sales</option>
                                            <option value="3">New Product</option>
                                            <option value="4">A to Z Product</option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade show active"
                                id="home"
                                role="tabpanel"
                                aria-labelledby="home-tab"
                            >
                                <div className="row">
                                    {/* Product Item */}
                                    {[
                                        {
                                            id: 1,
                                            img1: require('../asset/img/product/pro13.jpg'),
                                            img2: require('../asset/img/product/pro14.jpg')
                                        },
                                        {
                                            id: 2,
                                            img1: require('../asset/img/product/pro15.jpg'),
                                            img2: require('../asset/img/product/pro16.jpg')
                                        },
                                        {
                                            id: 3,
                                            img1: require('../asset/img/product/pro1.jpg'),
                                            img2: require('../asset/img/product/pro2.jpg')
                                        },
                                        {
                                            id: 4,
                                            img1: require('../asset/img/product/pro29.jpg'),
                                            img2: require('../asset/img/product/pro28.jpg')
                                        },
                                        {
                                            id: 4,
                                            img1: require('../asset/img/product/pro29.jpg'),
                                            img2: require('../asset/img/product/pro28.jpg')
                                        },
                                        {
                                            id: 4,
                                            img1: require('../asset/img/product/pro29.jpg'),
                                            img2: require('../asset/img/product/pro28.jpg')
                                        }

                                    ].map((product) => (
                                        <div className="col-lg-4 col-md-6" key={product.id}>
                                            <div className="product-wrapper mb-50">
                                                <div className="product-img mb-25">
                                                    <a href="product-details.html">
                                                        <img src={product.img1} alt="" />
                                                        <img className="secondary-img" src={product.img2} alt="" />
                                                    </a>
                                                    <div className="product-action text-center">
                                                        <a href="#" title="Shopping Cart">
                                                            <i className="flaticon-shopping-cart"></i>
                                                        </a>
                                                        <a href="#" title="Quick View">
                                                            <i className="flaticon-eye"></i>
                                                        </a>
                                                        <a href="#" data-toggle="tooltip" data-placement="right" title="Compare">
                                                            <i className="flaticon-compare"></i>
                                                        </a>
                                                    </div>
                                                    <div className="sale-tag">
                                                        <span className="new">new</span>
                                                        <span className="sale">sale</span>
                                                    </div>
                                                </div>
                                                <div className="product-content">
                                                    <div className="pro-cat mb-10">
                                                        <a href="shop.html">decor, </a>
                                                        <a href="shop.html">furniture</a>
                                                    </div>
                                                    <h4>
                                                        <a href="product-details.html">Minimal Troma Furniture</a>
                                                    </h4>
                                                    <div className="product-meta">
                                                        <div className="pro-price">
                                                            <span>$119.000000 USD</span>
                                                            <span className="old-price">$230.00 USD</span>
                                                        </div>
                                                    </div>
                                                    <div className="product-wishlist">
                                                        <a href="#">
                                                            <i className="far fa-heart" title="Wishlist"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ShopWidget = ({ title, items }) => (
    <div className="shop-widget">
        <h3 className="shop-title">{title}</h3>
        <ul className="shop-link">
            {items.map(item => (
                <li key={item}>
                    <a href="/shop"><i className="far fa-square"></i> {item}</a>
                </li>
            ))}
        </ul>
    </div>
);

export default ShopBody;
