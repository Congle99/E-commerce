import React from 'react';
import pageTitleBg from '../asset/img/bg/page-title.png'; // Đường dẫn ảnh nền

const Breadcrumb = () => {
  return (
    <section
      className="breadcrumb-area"
      style={{ backgroundImage: `url(${pageTitleBg})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="breadcrumb-text text-center">
              <h1>Our Shop</h1>
              <ul className="breadcrumb-menu">
                <li><a href="/">home</a></li>
                <li><span>shop</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
