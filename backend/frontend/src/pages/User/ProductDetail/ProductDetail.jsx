import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "~/components/Api";
import imageMd from "../../../assets/images/product/image.png";
import "./ProductDetail.scss";

const { http } = Api();
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    http.get(`/ProductUser/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi tải chi tiết sản phẩm:", err);
      });
  }, [id]);

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} sản phẩm size ${selectedSize} vào giỏ hàng`);
  };
  if (!product) return <div>Đang tải sản phẩm...</div>;
  return (
    <div className="product-detail container">
    <div className="row">
      {/* Cột hình ảnh */}
      <div className="col-md-6 image-section">
        <img
          src={product.image ? `http://localhost:8000/storage/${product.image}` : imageMd}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = imageMd;
          }}
          className="img-fluid"
        />
      </div>
  
      {/* Cột thông tin chi tiết */}
      <div className="col-md-6 info-section">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-category"><strong>Loại:</strong> {product.category?.name || "Chưa xác định"}</p>
  
        <div className="price">
          {product.discount_price ? (
            <>
              <span className="discount">{product.discount_price.toLocaleString("vi-VN")}₫</span>
              <span className="original">{product.price.toLocaleString("vi-VN")}₫</span>
            </>
          ) : (
            <span className="discount">{product.price.toLocaleString("vi-VN")}₫</span>
          )}
        </div>
  
        <p className="description">{product.description}</p>
  
        <div className="d-flex align-items-center gap-3 mt-3">
          <label>Số lượng:</label>
          <input
            type="number"
            min="1"
            max={product.inventory || 100}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Math.min(product.inventory || 100, +e.target.value)))
            }
            style={{ width: "80px" }}
          />
        </div>
  
        <div className="action-buttons mt-4">
          <button className="btn btn-primary me-2" onClick={handleAddToCart}>
            Mua ngay
          </button>
          <button className="btn btn-outline-secondary">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ProductDetail;
