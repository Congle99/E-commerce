import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "~/components/Api";
import imageMd from "../../../assets/images/product/image.png";
import "./ProductDetail.scss";
import Banner from "../Shop/Banner";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
  const [fakeUserId] = useState(1); // Tạm thời dùng ID cố định để test gửi đánh giá

  useEffect(() => {
    http
      .get(`/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Lỗi khi tải đánh giá:", err));
  }, [id]);

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
    http
      .post("/cart", {
        user_id: fakeUserId,
        product_id: id,
        quantity: quantity,
      })
      .then(() => {
        alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng thành công!`);
      })
      .catch((err) => {
        console.error("Lỗi khi thêm vào giỏ hàng:", err);
        alert("Lỗi khi thêm sản phẩm vào giỏ hàng.");
      });
  };

  const handleSubmitReview = () => {
    if (!newComment.trim()) return alert("Vui lòng nhập nội dung đánh giá.");

    http
      .post("/reviews", {
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
      .then((res) => setReviews(res.data))
      .catch((err) => {
        console.error("Lỗi khi gửi đánh giá:", err);
        alert("Gửi đánh giá thất bại.");
      });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa-star ${
          i < rating ? "fas text-warning" : "far text-secondary"
        }`}
      ></i>
    ));
  };

  const renderSelectableStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa-star ${
          i < newRating ? "fas text-warning" : "far text-secondary"
        } me-1 star-clickable`}
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
          <div className="magnify-wrapper" style={{ position: "relative", zIndex: 100 }}>
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={3}
              wheel={{ step: 0.1 }}
              pinch={{ step: 0.1 }}
            >
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "auto",
                  background: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
                contentStyle={{
                  width: "100%",
                }}
              >
                <img
                  src={imageSrc}
                  alt={product.name || "Sản phẩm"}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </TransformComponent>
            </TransformWrapper>
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
            <button className="btn btn-primary me-2">Mua ngay</button>
            <button
              className="btn btn-outline-secondary"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </button>
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
      </div>
    </div>
  );
};

export default ProductDetail;