import React, { useState, useEffect } from 'react';
import slide1 from '../asset/img/slider/slide1.jpg';
import slide1_1 from '../asset/img/slider/slide1-1.jpg';
import shapeIcon from '../asset/img/slider/shape-icon.png';
import shape1 from '../asset/img/slider/shape1.png';
import shape2 from '../asset/img/slider/shape2.png';
import shape3 from '../asset/img/slider/shape3.png';
import shape4 from '../asset/img/slider/shape4.png';

import '../asset/css/style.css';

const slides = [
  {
    background: slide1,
    shape1: shape1,
    shape2: shape2,
  },
  {
    background: slide1_1,
    shape1: shape3,
    shape2: shape4,
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Tự động chuyển slide sau mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="slider-area pos-relative">
      <div className="slider-active position-relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`single-slider slide-1-style slide-height d-flex align-items-center ${
              index === currentSlide ? 'active' : 'inactive'
            }`}
            style={{
              backgroundImage: `url(${slide.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position: index === currentSlide ? 'relative' : 'absolute',
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              width: '100%',
              height: '100vh'
            }}
          >
            <div className="shape-title bounce-animate"><h2>UX</h2></div>
            <div className="shape-icon bounce-animate">
              <img src={shapeIcon} alt="shape icon" />
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-7">
                  <div className="slide-content">
                    <span className="fade-in" style={{ animationDelay: '.2s' }}>Furniture Collection</span>
                    <h1 className="fade-in-up" style={{ animationDelay: '.5s' }}>
                      Synnes Dining Chair Upholstered
                    </h1>
                    <div className="slide-btn">
                      <a className="btn theme-btn fade-in-left" href="/shop" style={{ animationDelay: '.7s' }}>
                        shop now
                      </a>
                      <a className="btn white-btn fade-in-right" href="/shop" style={{ animationDelay: '.9s' }}>
                        category
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="slide-shape1 bounce-animate" style={{ animationDelay: '.9s' }}>
                    <img src={slide.shape1} alt="shape1" />
                  </div>
                  <div className="slide-shape2 bounce-animate" style={{ animationDelay: '1.2s' }}>
                    <img src={slide.shape2} alt="shape2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Nút chuyển slide */}
        <button className="slider-arrow prev" onClick={goToPrev}>
          &#10094;
        </button>
        <button className="slider-arrow next" onClick={goToNext}>
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
