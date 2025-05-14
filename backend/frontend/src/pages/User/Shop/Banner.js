import React from 'react';
import './baner.css';

const Banner = () => {
  return (
    <div className="banner">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg"
        alt="Banner Khuyến Mãi"
      />
      <div className="banner-content">
        <h2>
          Giày Breshka <br />
          <span className="highlight">SIÊU KHUYẾN MÃI -30%</span>
        </h2>
        <p>Chương trình từ 30.8 - 2.9.2016</p>
      </div>
    </div>
  );
};

export default Banner;
