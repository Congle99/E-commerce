import "./Categories.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState, useEffect } from "react";
import Api from "~/components/Api"; // <-- Import file API của bạn

const { http } = Api(); // <-- Sử dụng http đã cấu hình

const formatCurrency = (value) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const Categories = () => {
  const [priceRange, setPriceRange] = useState([2000000, 18000000]);
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [noData, setNoData] = useState(false); 

  const handleInputChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value) || 0;
    setPriceRange(newRange);
  };

  // Fetch categories từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await http.get("/categories"); 
        const fetchedCategories = ["Tất cả", ...response.data];
        setCategories(fetchedCategories);

        // Kiểm tra xem có dữ liệu không
        if (fetchedCategories.length <= 1) {
          setNoData(true);
        } else {
          setNoData(false);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-page">
      <div className="search-bar">
        <input type="text" placeholder="🔍 Tìm kiếm danh mục..." />
      </div>

      <h2 className="section-title">Categories</h2>

      <ul className="category-list">
        {loading ? (
          <li>Đang tải...</li> // Hiển thị khi dữ liệu đang tải
        ) : noData ? (
          <li>Không có dữ liệu</li> // Hiển thị khi không có dữ liệu
        ) : (
          categories.map((cat, index) => (
            <li key={index}>
              {typeof cat === "string" ? cat : cat.name} {/* Hiển thị tên nếu là object */}
            </li>
          ))
        )}
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

        <button className="search-btn">TÌM KIẾM</button>
      </div>
    </div>
  );
};

export default Categories;
