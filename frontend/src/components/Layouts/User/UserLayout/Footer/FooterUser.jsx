import React from 'react';
import './FooterUser.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';

function FooterUser() {
  return (
    <footer className="footer-user">
      <div className="footer-area">
        <div className="container">
          <div className="row">
            {/* Column 1: About Us */}
            <div className="col-xl-3 col-lg-3 col-md-6">
              <div className="footer-widget">
                <div className="footer-logo">
                  <a href="/">E-Commerce Shop</a>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="col-xl-3 col-lg-3 col-md-6">
              <div className="footer-widget">
                <h3>Quick Links</h3>
                <ul className="footer-link">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Shop</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>

            {/* Column 3: Social Media */}
            <div className="col-xl-3 col-lg-3 col-md-6">
              <div className="footer-widget">
                <h3>Follow Us</h3>
                <div className="footer-icons">
                  <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebookF} /></a>
                  <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
                  <a href="#" className="social-icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                  <a href="#" className="social-icon"><FontAwesomeIcon icon={faYoutube} /></a>
                </div>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div className="col-xl-3 col-lg-3 col-md-6">
              <div className="footer-widget">
                <h3>Newsletter</h3>
                <p>Sign up for our newsletter to get the latest updates.</p>
                <form>
                  <input type="email" placeholder="Your email address" />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p>Copyright © 2025 E-Commerce Shop. All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterUser;
