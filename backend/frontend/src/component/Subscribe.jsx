import React from 'react';
import subscribeIcon from '../asset/img/icon/subscribe.png';
import './Subscribe.css'; // nếu bạn muốn tách riêng CSS

const Subscribe = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý submit tại đây nếu cần
  };

  return (
    <section className="subscribe-area box-105">
      <div className="subscribe-inner black-bg pt-70 pb-20">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-5">
              <div className="subscribe d-flex fix">
                <div className="subscribe-icon">
                  <img src={subscribeIcon} alt="Subscribe Icon" />
                </div>
                <div className="area-title white-color mb-50">
                  <h2>Newsletter</h2>
                  <p>Subscribe here to get every single update</p>
                </div>
              </div>
            </div>
            <div className="col-xl-7">
              <div className="subscribe fix">
                <div className="subscribe-form mb-50">
                  <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter your email address" />
                    <button className="btn theme-btn" type="submit">subscribe now</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
