<<<<<<< HEAD
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

  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const fakeUserId = 1; // Tạm thời dùng ID cố định để test gửi đánh giá

  useEffect(() => {
    http.get(`/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error("Lỗi khi tải đánh giá:", err));
  }, [id]);

  useEffect(() => {
    http.get(`/ProductUser/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Lỗi khi tải chi tiết sản phẩm:", err));
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
=======
import React, { useState } from "react";
import "./ProductDetail.scss"; // Tạo file CSS riêng để style

const ProductDetail = () => {
  // Dữ liệu giả lập
  const product = {
    id: 1,
    name: "Áo thun nam tay ngắn",
    slug: "ao-thun-nam-tay-ngan",
    description:
      "Áo thun cotton cao cấp, mềm mại, thoáng mát, phù hợp cho mùa hè.",
    price: 300000,
    discount_price: 250000,
    category_id: 2,
    image: "https://via.placeholder.com/400x500", // hình giả
    status: "Còn hàng",
    inventory: 50,
    sizes: ["S", "M", "L", "XL"],
  };

  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
>>>>>>> feature/promotion_code-admin-update

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} sản phẩm size ${selectedSize} vào giỏ hàng`);
  };

<<<<<<< HEAD
  const handleSubmitReview = () => {
    if (!newComment.trim()) return alert("Vui lòng nhập nội dung đánh giá.");

    http.post("/reviews", {
      user_id: fakeUserId,
      product_id: id,
      rating: newRating,
      comment: newComment,
    })
    .then(() => {
      alert("Gửi đánh giá thành công!");
      setNewComment("");
      return http.get(`/reviews/${id}`);
    })
    .then(res => setReviews(res.data))
    .catch(err => {
      console.error("Lỗi khi gửi đánh giá:", err);
      alert("Gửi đánh giá thất bại.");
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa-star ${i < rating ? "fas text-warning" : "far text-secondary"}`}
      ></i>
    ));
  };

  const renderSelectableStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa-star ${i < newRating ? "fas text-warning" : "far text-secondary"} me-1 star-clickable`}
        onClick={() => setNewRating(i + 1)}
        style={{ cursor: "pointer", fontSize: "20px" }}
      ></i>
    ));
  };

  if (!product) return <div>Đang tải sản phẩm...</div>;

  return (
    <div className="product-detail">
      <div className="row">
        {/* Hình ảnh sản phẩm */}
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

        {/* Thông tin sản phẩm */}
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
              <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span className="qty-number">{quantity}</span>
              <button className="qty-btn" onClick={() => setQuantity(Math.min(product.inventory || 100, quantity + 1))}>+</button>
            </div>
            <button className="icon-btn">
              <i className="fas fa-heart"></i>
            </button>
          </div>

          <div className="action-buttons mt-4">
            <button className="btn btn-primary me-2" onClick={handleAddToCart}>Mua ngay</button>
            <button className="btn btn-outline-secondary">Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>

      {/* Đánh giá sản phẩm */}
      <div className="product-reviews mt-5">
        <h3>Đánh giá sản phẩm</h3>
        {reviews.length === 0 ? (
          <p>Chưa có đánh giá nào.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review-item mb-3">
              <div className="rating mb-1">{renderStars(review.rating)}</div>
              <p>{review.comment}</p>
              <small>Người đánh giá: {review.user?.name || "Ẩn danh"}</small>
            </div>
          ))
        )}

        {/* Gửi đánh giá */}
        <div className="submit-review mt-4">
          <h4>Viết đánh giá của bạn:</h4>
          <div className="mb-2">
            <label>Chọn sao: </label>{" "}
            <span className="ms-2">{renderSelectableStars()}</span>
          </div>
          <textarea
            className="form-control"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Nhận xét của bạn..."
            rows={4}
          />
          <button className="btn btn-success mt-2" onClick={handleSubmitReview}>
            Gửi đánh giá
          </button>
        </div>
=======
  return (
    <div className="product-detail">
      <div className="left">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="right">
        <h1 className="name">{product.name}</h1>

        <div className="price">
          <span className="discount">{product.discount_price.toLocaleString("vi-VN")}₫</span>
          <span className="original">{product.price.toLocaleString("vi-VN")}₫</span>
        </div>

        <p className="description">{product.description}</p>

        <div className="size-select">
          <label>Size:</label>
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="quantity-select">
          <label>Số lượng:</label>
          <input
            type="number"
            min="1"
            max={product.inventory}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(product.inventory, +e.target.value)))}
          />
        </div>

        <button className="add-to-cart" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </button>
>>>>>>> feature/promotion_code-admin-update
      </div>
    </div>
  );
};

export default ProductDetail;
