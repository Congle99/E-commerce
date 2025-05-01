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
          NHÂN NGÀY 30/04 - KỶ NIỆM 50 NĂM <br />
          <span className="highlight">SIÊU KHUYẾN MÃI -30%</span>
        </h2>
        <p>Chương trình từ 30.4 - 2.9.2025</p>
      </div>
    </div>
  );
};

export default Banner;
