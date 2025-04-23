import "./Categories.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

const categories = ["Tất cả", "Áo thun", "Áo khoác", "Quần jeans", "Đầm", "Giày dép", "Phụ kiện"];

const formatCurrency = (value) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const Categories = () => {
  const [priceRange, setPriceRange] = useState([2000000, 18000000]);

  const handleInputChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value) || 0;
    setPriceRange(newRange);
  };

  return (
    <div className="categories-page">
      <div className="search-bar">
        <input type="text" placeholder="🔍 Tìm kiếm danh mục..." />
      </div>

      <h2 className="section-title">Categories</h2>

      <ul className="category-list">
        {categories.map((cat, index) => (
          <li key={index}>{cat}</li>
        ))}
      </ul>

      <div className="price-range">
        <h4>GIÁ</h4>

        <Slider
          range
          min={0}
          max={20000000}
          step={100000}
          value={priceRange}
          onChange={setPriceRange}
          trackStyle={[{ backgroundColor: "#007bff", height: 6 }]}
          handleStyle={[
            { backgroundColor: "#007bff", borderColor: "#007bff" },
            { backgroundColor: "#007bff", borderColor: "#007bff" },
          ]}
          railStyle={{ backgroundColor: "#ddd", height: 6 }}
        />

        <div className="price-display">
          <span>{formatCurrency(priceRange[0])}</span>
          <span>{formatCurrency(priceRange[1])}</span>
        </div>

        <div className="inputs">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
          />
          <span>–</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
          />
        </div>

        <button className="search-btn">SEARCH</button>
      </div>
    </div>
  );
};

export default Categories;
