import React from 'react';
import banner1 from '../asset/img/banner/top-seller/banner1.jpg';
import banner2 from '../asset/img/banner/top-seller/banner2.jpg';
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

const ProductCard = ({ image, title, price, oldPrice, link, rightAlign, children }) => {
  return (
    <div className={`top-seller ${rightAlign ? 'text-right' : ''} mb-50 position-relative`}>
      <img src={image} alt={title} className="img-fluid rounded" />
      <div className={`seller-box ${rightAlign ? 'sellet-2-content' : 'text-center'}`}>
        <div className="top-seller-content text-left p-4 bg-white shadow rounded" style={{ maxWidth: '400px' }}>
          <h2><a href={link}>{title}</a></h2>
          <div className="pro-price mb-3">
            <span className="text-dark fw-bold">${price}</span>{' '}
            <span className="old-price text-muted text-decoration-line-through">${oldPrice}</span>
          </div>
          <div className="top-seller-btn d-flex align-items-center gap-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const TopSellers = () => {
  return (
    <section className="top-seller-area box-90 py-5">
      <div className="container-fluid">
        {/* Section title */}
        <div className="row align-items-center mb-4">
          <div className="col-xl-5 col-lg-8 col-md-7">
            <div className="area-title">
              <h2>Top Sellers</h2>
              <p>Browse the huge variety of our products</p>
            </div>
          </div>
          <div className="col-xl-7 col-lg-4 col-md-5 text-md-end text-start">
            <a href="/shop" className="btn theme-btn">Collection</a>
          </div>
        </div>

        {/* Top seller products */}
        <div className="row">
          <div className="col-xl-5 col-lg-5">
            <ProductCard
              image={banner1}
              title="Minimal Home Decor"
              price="119.00 USD"
              oldPrice="230.00 USD"
              link="/shop"
            >
              <a href="/shop" className="btn theme-btn">Shop Now</a>
            </ProductCard>
          </div>

          <div className="col-xl-7 col-lg-7">
            <ProductCard
              image={banner2}
              title="Xcross Comoer Furniture"
              price="119.00 USD"
              oldPrice="230.00 USD"
              link="/shop"
              rightAlign
            >
              <a href="/shop" className="btn theme-btn-2 me-3">View Details</a>
              <a href="#" className="shop-btn">
                <i className="flaticon-shopping-cart fs-4"></i>
              </a>
            </ProductCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
