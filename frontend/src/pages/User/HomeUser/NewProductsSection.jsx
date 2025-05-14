import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BannerSection.scss"; // dùng lại cùng style
import Api from "~/components/Api";
import imagePlaceholder from "../../../assets/images/product/image.png";

const { http } = Api();

const NewProductsSection = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const sliderRef = useRef();

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await http.get("/product?latest=6"); // tùy API Laravel bạn dùng
        setNewProducts(response.data.data || []);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm mới nhất:", error);
      }
    };

    fetchNewProducts();
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(newProducts.length - 4);
    }
  };

  const handleNext = () => {
    if (currentIndex + 4 < newProducts.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/ProductUser/${id}`);
  };

  return (
    <div className="banner-section">
      <h2 className="banner-title">Sản phẩm mới</h2>
      <div className="banner-slider-wrapper">
        <button className="slider-btn" onClick={handlePrev}>
          &#10094;
        </button>
        <div className="banner-slider-container">
          <div
            className="banner-products"
            ref={sliderRef}
            style={{
              transform: `translateX(-${currentIndex * (100 / 4)}%)`,
            }}
          >
            {newProducts.map((item) => (
              <div
                key={item.id}
                className="banner-card"
                onClick={() => handleNavigate(item.id)}
              >
                <img
                  src={
                    item.image
                      ? `http://localhost:8000/storage/${item.image}`
                      : imagePlaceholder
                  }
                  alt={item.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = imagePlaceholder;
                  }}
                />
                <h3>{item.name}</h3>
                <p className="price">
                  {item.discount_price
                    ? `${item.discount_price.toLocaleString("vi-VN")} VNĐ`
                    : `${item.price.toLocaleString("vi-VN")} VNĐ`}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button className="slider-btn" onClick={handleNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default NewProductsSection;
