import React from 'react';
import footerLogo from '../asset/img/logo/footer-logo.png';
import timeIcon from '../asset/img/icon/time.png';
import bannerImg from '../asset/img/banner/add.jpg';
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

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-area box-90 pt-100 pb-60">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-3 col-lg-5 col-md-6">
                <div className="footer-widget mb-40">
                  <div className="footer-logo">
                    <a href="/"><img src={footerLogo} alt="Footer Logo" /></a>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.
                  </p>
                  <div className="footer-time d-flex mt-30">
                    <div className="time-icon">
                      <img src={timeIcon} alt="Time Icon" />
                    </div>
                    <div className="time-text">
                      <span>Got Questions ? Call us 24/7!</span>
                      <h2>(0600) 874 548</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-2 col-lg-2 col-md-3 d-lg-none d-xl-block">
                <div className="footer-widget pl-50 mb-40">
                  <h3>Social Media</h3>
                  <ul className="footer-link">
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">Behance</a></li>
                    <li><a href="#">Dribbble</a></li>
                    <li><a href="#">Linkedin</a></li>
                    <li><a href="#">Youtube</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-2 col-lg-2 col-md-3 d-lg-none d-xl-block">
                <div className="footer-widget pl-30 mb-40">
                  <h3>Location</h3>
                  <ul className="footer-link">
                    <li><a href="#">New York</a></li>
                    <li><a href="#">Tokyo</a></li>
                    <li><a href="#">Dhaka</a></li>
                    <li><a href="#">Chittagong</a></li>
                    <li><a href="#">China</a></li>
                    <li><a href="#">Japan</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-2 col-lg-2 col-md-3">
                <div className="footer-widget mb-40">
                  <h3>About</h3>
                  <ul className="footer-link">
                    <li><a href="#">Terms & Conditions</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Wholesale</a></li>
                    <li><a href="#">Direction</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-3 col-lg-5 col-md-6">
                <div className="footer-widget mb-40">
                  <div className="footer-banner">
                    <a href="/shop"><img src={bannerImg} alt="Banner" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright-area box-105">
          <div className="container-fluid">
            <div className="copyright-border pt-30 pb-30">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="copyright text-center text-md-left">
                    <p>Copyright © 2019 <a href="#">BasicTheme</a>. All Rights Reserved</p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="footer-icon text-center text-md-right">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-behance"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Fullscreen search overlay */}
      <div className="search-wrap">
        <div className="search-inner">
          <i className="fas fa-times search-close" id="search-close"></i>
          <div className="search-cell">
            <form method="get">
              <div className="search-field-holder">
                <input type="search" className="main-search-input" placeholder="Search Entire Store..." />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
