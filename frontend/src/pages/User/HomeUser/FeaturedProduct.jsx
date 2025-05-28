import React from "react";
import "./FeaturedProduct.scss";
import modelImg from "../../../assets/images/product/image.png";

const FeaturedProduct = () => {
  return (
    <section className="featured-product">
      <div className="container">
        <div className="image-box">
          <img src={modelImg} alt="Trendy Outfit" />
          {/* Vị trí các icon dấu + */}
          <span className="hotspot" style={{ top: "30%", left: "20%" }}>+</span>
          <span className="hotspot" style={{ top: "20%", left: "60%" }}>+</span>
          <span className="hotspot" style={{ top: "75%", left: "70%" }}>+</span>
        </div>
        <div className="content-box">
          <p className="price">$79.00</p>
          <h2 className="title">Urban Denim Jacket</h2>
          <div className="attributes">
            <div><strong>Origin:</strong> Korea</div>
            <div><strong>Material:</strong> Denim</div>
            <div><strong>Designer:</strong> TrendHub</div>
          </div>
          <p className="description">
            Một thiết kế phong cách trẻ trung, phù hợp đi chơi hoặc dạo phố. Áo khoác denim hiện đại, chất vải bền và form chuẩn.
          </p>
          <div className="buttons">
            <button className="btn-primary">MUA NGAY</button>
            <button className="btn-secondary">CHI TIẾT</button>
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
