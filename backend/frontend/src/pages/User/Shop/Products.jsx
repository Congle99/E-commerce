import React, { useState } from "react";
import "./Products.scss";

const products = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Sản phẩm ${i + 1}`,
  price: (100000 + i * 50000).toLocaleString("vi-VN") + "₫",
  image: `https://source.unsplash.com/300x300/?clothes,${i + 1}`,
}));

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Items per page

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Slice the products array for the current page
  const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="products-page">
      <div className="products-grid">
        {currentProducts.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} className="product-image" />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
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
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`page-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className={`page-btn ${currentPage === 3 ? "disabled" : ""}`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
