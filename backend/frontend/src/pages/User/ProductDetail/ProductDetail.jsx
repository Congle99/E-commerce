import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "~/components/Api";
import imageMd from "../../../assets/images/product/image.png";
import "./ProductDetail.scss";
import Banner from "../Shop/Banner";
import ReactImageMagnify from "react-image-magnify";

const { http } = Api();

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageSrc, setImageSrc] = useState(imageMd);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    http
      .get(`/ProductUser/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Lỗi khi tải chi tiết sản phẩm:", err));
  }, [id]);

  useEffect(() => {
    if (product?.image) {
      const testImage = new Image();
      testImage.src = `http://localhost:8000/storage/${product.image}`;
      testImage.onload = () => setImageSrc(testImage.src);
      testImage.onerror = () => setImageSrc(imageMd);
    } else {
      setImageSrc(imageMd);
    }
  }, [product]);

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} sản phẩm size ${selectedSize} vào giỏ hàng`);
  };

  if (!product) return <div>Đang tải sản phẩm...</div>;

  return (
    <div className="product-detail">
      <Banner />
      <div className="row">
        {/* Cột hình ảnh */}
        <div className="col-md-6 image-section">
          <div className="magnify-wrapper">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: product.name || "Sản phẩm",
                  isFluidWidth: true,
                  src: imageSrc,
                },
                largeImage: {
                  src: imageSrc,
                  width: 1200,
                  height: 1200,
                },
                enlargedImageContainerStyle: {
                  zIndex: 100,
                  background: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                },
                lensStyle: {
                  backgroundColor: "rgba(0,0,0,.2)",
                },
              }}
            />
          </div>
        </div>

        {/* Cột thông tin */}
        <div className="col-md-6 info-section">
          <p className="product-category">
            <strong>Loại:</strong> {product.category?.name || "Chưa xác định"}
          </p>
          <h1 className="product-name">{product.name}</h1>
          <div className="price">
            {product.discount_price ? (
              <>
                <span className="discount">
                  Giá: {product.discount_price.toLocaleString("vi-VN")}₫
                </span>
                <span className="original">
                  {product.price.toLocaleString("vi-VN")}₫
                </span>
              </>
            ) : (
              <span className="discount">
                {product.price.toLocaleString("vi-VN")}₫
              </span>
            )}
          </div>

          <p className="description">
            <b>Mô tả: </b>
            {product.description}
          </p>

          <div className="quantity-wrapper">
            <div className="quantitybox">
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="qty-number">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() =>
                  setQuantity(Math.min(product.inventory || 100, quantity + 1))
                }
              >
                +
              </button>
            </div>
            <button className="icon-btn">
              <i className="fas fa-heart"></i>
            </button>
          </div>

          <div className="action-buttons mt-4">
            <button className="btn btn-primary me-2" onClick={handleAddToCart}>
              Mua ngay
            </button>
            <button className="btn btn-outline-secondary">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
