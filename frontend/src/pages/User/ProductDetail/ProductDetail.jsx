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

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} sản phẩm size ${selectedSize} vào giỏ hàng`);
  };

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
      </div>
    </div>
  );
};

export default ProductDetail;
