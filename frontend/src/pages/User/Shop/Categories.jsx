import "./Categories.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import Api from "~/components/Api";
import { FaSearch } from "react-icons/fa";

const { http } = Api();

const formatCurrency = (value) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

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
  const [priceError, setPriceError] = useState(false);

  const [min, max] = priceRange;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await http.get("/categories");
       // setCategories(response.data);
        setCategories(response.data.slice(0, 5));
        setNoData(response.data.length === 0);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setPriceError(min > max);
  }, [min, max]);

  const handleInputChange = (index, value) => {
    let newValue = parseInt(value) || 0;
    if (index === 0 && newValue < 0) newValue = 0;
    if (index === 1 && newValue > 1000) newValue = 1000;

    const newRange = [...priceRange];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };

  const handleSliderChange = (newRange) => {
    setPriceRange(newRange);
  };


  const handleCategoryCheck = (id, checked) => {
    setSelectedCategories((prev) => {
      const updated = checked ? [...prev, id] : prev.filter((cid) => cid !== id);
      setFilterTriggered((p) => !p);
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
    setFilterTriggered((p) => !p);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    setFilterTriggered((p) => !p);
  };

  const handlePriceSearch = () => {
    if (!priceError) {
      console.log("Lọc theo giá:", [min, max]);
      setFilterTriggered((p) => !p);
    }
  };

  const getSliderStyles = () => {
    const color = priceError ? "red" : "#007bff";
    return {
      trackStyle: [{ backgroundColor: color, height: 6 }],
      handleStyle: [
        { backgroundColor: color, borderColor: color },
        { backgroundColor: color, borderColor: color },
      ],
      railStyle: { backgroundColor: "#ddd", height: 6 },
    };
  };

  const sliderStyles = getSliderStyles();

  return (
    <div className="categories-page">
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

      <div className="price-range">
        <h4>GIÁ</h4>
        <Slider
          range
          min={0}
          max={1000}
          step={10}
          value={[min, max]}
          onChange={handleSliderChange}
          allowCross={false}
          trackStyle={sliderStyles.trackStyle}
          handleStyle={sliderStyles.handleStyle}
          railStyle={sliderStyles.railStyle}
        />

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
            {formatCurrency(min)}
          </span>
          <span style={{ fontWeight: "bold", fontSize: "14px" }}>
            {formatCurrency(max)}
          </span>
        </div>

        {priceError && (
          <div style={{ color: "red", fontSize: "13px", marginTop: "6px" }}>
            Giá trị bắt đầu không được lớn hơn giá trị kết thúc.
          </div>
        )}

        <div
          className="inputs"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            gap: "10px",
          }}
        >
          <input
            type="number"
            min={0}
            max={1000}
            value={priceRange[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
          />
          <span>–</span>
          <input
            type="number"
            min={0}
            max={1000}
            value={priceRange[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
          />

        </div>

        <div style={{ marginTop: "12px", textAlign: "center" }}>
          <button
            onClick={handlePriceSearch}
            disabled={priceError}
            style={{
              padding: "8px 16px",
              backgroundColor: priceError ? "#ccc" : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: priceError ? "not-allowed" : "pointer",
              fontWeight: "bold",
            }}
          >
            Tìm kiếm theo giá
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
