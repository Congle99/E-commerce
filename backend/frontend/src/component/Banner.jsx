import React from 'react';
import banner1 from '../asset/img/banner/banner-1/banner1.jpg';
import banner2 from '../asset/img/banner/banner-1/banner2.jpg';
import banner3 from '../asset/img/banner/banner-1/banner3.jpg';
import '../../node_modules/slick-carousel/slick/slick.css'
import '../../node_modules/slick-carousel/slick/slick-theme.css'
import '../asset/css/style.css';
import './SliderCustom.css';
const Banner = () => {
  return (
    <section className="banner-area pt-30 pl-15 pr-15">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="banner mb-30">
              <a href="/shop"><img src={banner1} alt="Banner 1" /></a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="banner mb-30">
              <a href="/shop"><img src={banner2} alt="Banner 2" /></a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="banner mb-30">
              <a href="/shop"><img src={banner3} alt="Banner 3" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
