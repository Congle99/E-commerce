import "./Categories.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import Api from "~/components/Api";
import { FaSearch } from "react-icons/fa";

const { http } = Api();
=======
import { useState, useEffect } from "react";
import Api from "~/components/Api"; // <-- Import file API của bạn

const { http } = Api(); // <-- Sử dụng http đã cấu hình
>>>>>>> feature/promotion_code-admin-update

const formatCurrency = (value) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

<<<<<<< HEAD
const Categories = ({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  setFilterTriggered,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await http.get("/categories");
        setCategories(response.data);
        setNoData(response.data.length === 0);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
=======
const Categories = () => {
  const [priceRange, setPriceRange] = useState([2000000, 18000000]);
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [noData, setNoData] = useState(false); 
>>>>>>> feature/promotion_code-admin-update

  const handleInputChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value) || 0;
    setPriceRange(newRange);
  };

<<<<<<< HEAD
  const handleCategoryCheck = (id, checked) => {
    setSelectedCategories((prev) => {
      const updated = checked ? [...prev, id] : prev.filter((cid) => cid !== id);
      setFilterTriggered((p) => !p); // Auto lọc khi chọn category
      return updated;
    });
  };

  const isAllSelected =
    selectedCategories.length === categories.length && categories.length > 0;

  const handleAllCategoriesToggle = () => {
    if (isAllSelected) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((cat) => cat.id));
    }
    setFilterTriggered((p) => !p); // Auto lọc khi chọn Tất cả
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    setFilterTriggered((p) => !p); // Auto lọc khi thay đổi từ khóa
  };

  const handlePriceSearch = () => {
    console.log("Lọc theo giá:", priceRange);
    setFilterTriggered((p) => !p); // Chỉ lọc khi nhấn nút
  };

  return (
    <div className="categories-page">
      {/* Tìm kiếm theo từ khóa */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <button className="search-icon">
          <FaSearch />
        </button>
      </div>

      <br />
      <h2 className="section-title">Categories</h2>

      {/* Danh sách danh mục */}
      <div className="category-list-wrapper">
        <ul className="category-list">
          {loading ? (
            <li>Đang tải...</li>
          ) : noData ? (
            <li>Không có dữ liệu</li>
          ) : (
            <>
              <li className="category-item" onClick={handleAllCategoriesToggle}>
                <span className="category-name">Tất cả</span>
                <input type="checkbox" readOnly checked={isAllSelected} />
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="category-item"
                  onClick={() =>
                    handleCategoryCheck(cat.id, !selectedCategories.includes(cat.id))
                  }
                >
                  <span className="category-name">{cat.name}</span>
                  <input
                    type="checkbox"
                    readOnly
                    checked={selectedCategories.includes(cat.id)}
                  />
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      {/* Lọc theo giá */}
      <div className="price-range">
        <h4>GIÁ</h4>
        <Slider
          range
          min={0}
          max={1000}
          step={10}
=======
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
>>>>>>> feature/promotion_code-admin-update
          value={priceRange}
          onChange={setPriceRange}
          trackStyle={[{ backgroundColor: "#007bff", height: 6 }]}
          handleStyle={[
            { backgroundColor: "#007bff", borderColor: "#007bff" },
            { backgroundColor: "#007bff", borderColor: "#007bff" },
          ]}
          railStyle={{ backgroundColor: "#ddd", height: 6 }}
        />

<<<<<<< HEAD
        <div
          className="price-display"
          style={{
            marginTop: "8px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "14px" }}>
            {formatCurrency(priceRange[0])}
          </span>
          <span style={{ fontWeight: "bold", fontSize: "14px" }}>
            {formatCurrency(priceRange[1])}
          </span>
        </div>

        {/* Nhập khoảng giá bằng tay */}
        <div
          className="inputs"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            gap: "10px",
          }}
        >
=======
        <div className="price-display">
          <span>{formatCurrency(priceRange[0])}</span>
          <span>{formatCurrency(priceRange[1])}</span>
        </div>

        <div className="inputs">
>>>>>>> feature/promotion_code-admin-update
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

<<<<<<< HEAD
        {/* Nút tìm kiếm theo giá */}
        <div style={{ marginTop: "12px", textAlign: "center" }}>
          <button
            onClick={handlePriceSearch}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Tìm kiếm theo giá
          </button>
        </div>
=======
        <button className="search-btn">TÌM KIẾM</button>
>>>>>>> feature/promotion_code-admin-update
      </div>
    </div>
  );
};

export default Categories;
