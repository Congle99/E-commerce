import React from 'react';
import Slider from 'react-slick';

import sliderImg1 from '../asset/img/slider/slide1.jpg';
import sliderImg2 from '../asset/img/slider/slide1-1.jpg';
import shapeIcon from '../asset/img/slider/shape-icon.png';
import shape1 from '../asset/img/slider/shape1.png';
import shape2 from '../asset/img/slider/shape2.png';
import shape3 from '../asset/img/slider/shape3.png';
import shape4 from '../asset/img/slider/shape4.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../asset/css/style.css';
import './SliderCustom.css';

// Custom arrow components
const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}>
    <span>&#9654;</span>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}>
    <span>&#9664;</span>
  </div>
);

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="slider-area pos-relative">
      <Slider {...settings} className="slider-active">
        {/* Slide 1 */}
        <div
          className="single-slider slide-1-style slide-height d-flex align-items-center"
          style={{
            backgroundImage: `url(${sliderImg1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="shape-title bounce-animate"><h2>UX</h2></div>
          <div className="shape-icon bounce-animate">
            <img src={shapeIcon} alt="Shape Icon" />
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-7">
                <div className="slide-content">
                  <span>Furniture Collection</span>
                  <h1>Synnes Dining Chair Upholstered</h1>
                  <div className="slide-btn">
                    <a className="btn theme-btn" href="/shop">shop now</a>
                    <a className="btn white-btn" href="/shop">category</a>
                  </div>
                </div>
              </div>
              <div className="col-xl-5">
                <div className="slide-shape1">
                  <img src={shape1} alt="Shape 1" />
                </div>
                <div className="slide-shape2">
                  <img src={shape2} alt="Shape 2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div
          className="single-slider slide-1-style slide-height d-flex align-items-center"
          style={{
            backgroundImage: `url(${sliderImg2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="shape-title bounce-animate"><h2>UX</h2></div>
          <div className="shape-icon bounce-animate">
            <img src={shapeIcon} alt="Shape Icon" />
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-7">
                <div className="slide-content">
                  <span>Furniture Collection</span>
                  <h1>Synnes Dining Chair Upholstered</h1>
                  <div className="slide-btn">
                    <a className="btn theme-btn" href="/shop">shop now</a>
                    <a className="btn white-btn" href="/shop">category</a>
                  </div>
                </div>
              </div>
              <div className="col-xl-5">
                <div className="slide-shape1">
                  <img src={shape3} alt="Shape 3" />
                </div>
                <div className="slide-shape2">
                  <img src={shape4} alt="Shape 4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default SliderComponent;
