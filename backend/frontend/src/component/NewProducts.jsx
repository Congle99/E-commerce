import React, { useState } from 'react';
import product1 from '../asset/img/product/pro1.jpg';
import product2 from '../asset/img/product/pro2.jpg';
import product4 from '../asset/img/product/pro4.jpg';

import '../asset/css/style.css';

const products = [
  { id: 1, img1: product1, img2: product2, title: 'Minimal Troma Furniture', categories: ['decor', 'furniture'], price: 119, oldPrice: 230, tags: ['new', 'sale'] },
  { id: 2, img1: product2, img2: product4, title: 'Modern Chair Design', categories: ['furniture'], price: 89, oldPrice: 150, tags: ['sale'] },
  { id: 3, img1: product4, img2: product1, title: 'Elegant Wood Table', categories: ['table'], price: 199, oldPrice: null, tags: ['new'] },
  { id: 4, img1: product1, img2: product2, title: 'Comfort Sofa', categories: ['sofa', 'decor'], price: 299, oldPrice: 350, tags: [] },
  { id: 5, img1: product2, img2: product1, title: 'Classic Armchair', categories: ['chair'], price: 159, oldPrice: 199, tags: ['sale'] },
  { id: 6, img1: product4, img2: product2, title: 'Wooden Bookshelf', categories: ['bookshelf'], price: 219, oldPrice: null, tags: ['new'] }
];

const ProductCard = ({ img1, img2, title, categories, price, oldPrice, tags }) => (
  <div className="product-item" style={{ width: '25%', boxSizing: 'border-box', padding: '0 15px' }}>
    <div className="product-wrapper mb-50">
      <div className="product-img mb-25">
        <a href="/product-details">
          <img src={img1} alt={title} />
          <img className="secondary-img" src={img2} alt={`${title} 2`} />
        </a>
        <div className="product-action text-center">
          <a href="#"><i className="flaticon-shopping-cart"></i></a>
          <a href="#"><i className="flaticon-eye"></i></a>
          <a href="#"><i className="flaticon-compare"></i></a>
        </div>
        <div className="sale-tag">
          {tags.map((tag, index) => (
            <span key={index} className={tag.toLowerCase()}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="product-content">
        <div className="pro-cat mb-10">
          {categories.map((cat, i) => (
            <a key={i} href="/shop">{cat}{i < categories.length - 1 ? ', ' : ''}</a>
          ))}
        </div>
        <h4><a href="/product-details">{title}</a></h4>
        <div className="product-meta">
          <div className="pro-price">
            <span>${price} USD</span>
            {oldPrice && <span className="old-price">${oldPrice} USD</span>}
          </div>
        </div>
        <div className="product-wishlist">
          <a href="#"><i className="far fa-heart" title="Wishlist"></i></a>
        </div>
      </div>
    </div>
  </div>
);

const NewProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 4;

  const total = products.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Lấy các sản phẩm đang hiển thị dựa vào currentIndex
  const getVisibleProducts = () => {
    const visible = [];
    for (let i = 0; i < visibleItems; i++) {
      visible.push(products[(currentIndex + i) % total]);
    }
    return visible;
  };

  return (
    <section className="product-area box-90 pt-70 pb-40">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-5 col-lg-12">
            <div className="area-title mb-50">
              <h2>New Products</h2>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <button onClick={handlePrev} style={navButtonStyle('left')}>‹</button>
          <button onClick={handleNext} style={navButtonStyle('right')}>›</button>

          <div className="product-slider-container" style={{ overflow: 'hidden' }}>
            <div
              className="product-slider-track d-flex"
              style={{
                transition: 'transform 0.5s ease',
                display: 'flex',
                width: '100%'
              }}
            >
              {getVisibleProducts().map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const navButtonStyle = (side) => ({
  position: 'absolute',
  top: '40%',
  [side]: 0,
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0,0,0,0.5)',
  color: '#fff',
  border: 'none',
  padding: '10px 15px',
  cursor: 'pointer',
  zIndex: 10
});

export default NewProducts;
