import React, { useState, useEffect } from "react";
import "./Products.scss";
import Api from "~/components/Api"; // Giống trang Admin

const { http } = Api(); // Dùng instance axios giống Admin

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await http.get(`/product?page=${currentPage}`);
        setProducts(response.data.data);
        setTotalPages(response.data.last_page);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

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
          <div className="products-grid">
            {products.map((item) => (
              <div key={item.id} className="product-card">
                <img
                  src={`http://localhost:8000/storage/${item.image}`}
                  alt={item.name}
                  className="product-image"
                />
                <h3>{item.name}</h3>
                <p>{item.price.toLocaleString("vi-VN")}₫</p>
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
