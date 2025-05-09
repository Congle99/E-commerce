<<<<<<< HEAD
import { useState } from "react";
=======
>>>>>>> feature/promotion_code-admin-update
import Banner from "./Banner";
import Categories from "./Categories";
import Products from "./Products";

const Shop = () => {
<<<<<<< HEAD
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // ✅ Dùng để báo cho Products biết khi nào cần lọc lại dữ liệu
  const [filterTriggered, setFilterTriggered] = useState(false);

=======
>>>>>>> feature/promotion_code-admin-update
  return (
    <div className="home-slider-wrapper">
      <Banner />
      <div className="container">
        <div className="row">
<<<<<<< HEAD
          {/* Cột lọc sản phẩm */}
          <div className="col-md-3">
            <Categories
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setFilterTriggered={setFilterTriggered} // ✅ gửi callback để khi nhấn lọc thì cập nhật
            />
          </div>
          {/* Cột hiển thị danh sách sản phẩm */}
          <div className="col-md-9">
            <Products
              searchTerm={searchTerm}
              selectedCategories={selectedCategories}
              priceRange={priceRange}
              filterTriggered={filterTriggered} // ✅ truyền state trigger lọc
            />
=======
          <div className="col-md-3">
            <Categories />
          </div>
          <div className="col-md-9">
            <Products />
>>>>>>> feature/promotion_code-admin-update
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
