import React, { useState, useEffect } from "react";
import "./Products.scss";
<<<<<<< HEAD
import Api from "~/components/Api";
import imageMd from "../../../assets/images/product/image.png";
import { useNavigate } from "react-router-dom";

const { http } = Api();
const Products = ({
  searchTerm,
  selectedCategories,
  priceRange,
  filterTriggered 
}) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();
  const itemsPerPage = 12;
  useEffect(() => {
    setCurrentPage(1);
  }, [filterTriggered]);
=======
import Api from "~/components/Api"; // Giống trang Admin

const { http } = Api(); // Dùng instance axios giống Admin

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;
>>>>>>> feature/promotion_code-admin-update

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
<<<<<<< HEAD

        const params = {
          page: currentPage,
          sort: sortOrder,
        };

        if (searchTerm) {
          params.keyword = searchTerm;
        }

        if (selectedCategories.length > 0) {
          params.categories = selectedCategories.join(",");
        }

        if (priceRange && priceRange.length === 2) {
          params.min_price = priceRange[0];
          params.max_price = priceRange[1];
        }

        const queryString = new URLSearchParams(params).toString();
        const response = await http.get(`/product?${queryString}`);

        setProducts(response.data.data);
        setTotalPages(response.data.last_page);
        setTotalItems(response.data.total);
=======
        const response = await http.get(`/product?page=${currentPage}`);
        setProducts(response.data.data);
        setTotalPages(response.data.last_page);
>>>>>>> feature/promotion_code-admin-update
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
<<<<<<< HEAD
  }, [currentPage, sortOrder, filterTriggered]); 
=======
  }, [currentPage]);
>>>>>>> feature/promotion_code-admin-update

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="products-page">
      {loading ? (
        <div className="loading">Đang tải dữ liệu...</div>
      ) : products.length === 0 ? (
        <div className="no-data">Không có sản phẩm nào</div>
      ) : (
        <>
<<<<<<< HEAD
          <div
            className="product-header-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              borderBottom: "1px solid rgb(182, 179, 179)",
              paddingBottom: "20px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>
                SẢN PHẨM{" "}
                <span style={{ fontWeight: "normal" }}>
                  ({totalItems} sản phẩm)
                </span>
              </h2>
            </div>
            <div>
              <select
                value={sortOrder}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSortOrder(e.target.value);
                }}
                style={{ padding: "6px 12px", fontSize: "14px" }}
              >
                <option value="">-- Sắp xếp theo --</option>
                <option value="asc">Giá: Thấp đến Cao</option>
                <option value="desc">Giá: Cao đến Thấp</option>
                <option value="discount_desc">Giảm giá: Cao đến Thấp (chưa) </option>
              </select>
            </div>
          </div>
          {/* Sản phẩm */}
          <div className="products-grid">
            {products.map((item) => (
              <div
                key={item.id}
                className="product-card"
                onClick={() => navigate(`/ProductUser/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={
                    item.image && item.image !== ""
                      ? `http://localhost:8000/storage/${item.image}`
                      : imageMd
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = imageMd;
                  }}
=======
          <div className="products-grid">
            {products.map((item) => (
              <div key={item.id} className="product-card">
                <img
                  src={`http://localhost:8000/storage/${item.image}`}
>>>>>>> feature/promotion_code-admin-update
                  alt={item.name}
                  className="image"
                />
                <h3>{item.name}</h3>
<<<<<<< HEAD
                <div className="price-wrapper">
                  {item.discount_price ? (
                    <>
                      <span className="discount-price">
                        {item.discount_price.toLocaleString("vi-VN")} VNĐ
                      </span>
                      <span className="original-price">
                        {item.price.toLocaleString("vi-VN")} VNĐ
                      </span>
                    </>
                  ) : (
                    <span className="discount-price">
                      {item.price.toLocaleString("vi-VN")} VNĐ
                    </span>
                  )}
                </div>
=======
                <p>{item.price.toLocaleString("vi-VN")}₫</p>
>>>>>>> feature/promotion_code-admin-update
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
<<<<<<< HEAD

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const isVisible =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1);

              if (
                (page === 2 && currentPage > 3) ||
                (page === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return (
                  <span key={page} className="dots">
                    ...
                  </span>
                );
              }

              return (
                isVisible && (
                  <button
                    key={page}
                    className={`page-btn ${currentPage === page ? "active" : ""
                      }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              );
            })}

            <button
              className={`page-btn ${currentPage === totalPages ? "disabled" : ""
                }`}
=======
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`page-btn ${currentPage === totalPages ? "disabled" : ""}`}
>>>>>>> feature/promotion_code-admin-update
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
