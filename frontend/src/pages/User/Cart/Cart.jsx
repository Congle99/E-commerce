import React, { useState, useEffect } from "react";
import "./Cart.scss";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Lấy danh sách giỏ hàng từ API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Nếu cần token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data);
        } else {
          console.error("Failed to fetch cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Cập nhật số lượng sản phẩm
  const handleQuantityChange = async (id, delta) => {
    const updatedItem = cartItems.find((item) => item.id === id);
    if (!updatedItem) return;

    const newQuantity = Math.max(1, updatedItem.quantity + delta);

    try {
      const response = await fetch(`http://localhost:8000/api/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Nếu cần token
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: newQuantity,
                }
              : item
          )
        );
      } else {
        console.error("Failed to update item quantity");
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Nếu cần token
        },
      });

      if (response.ok) {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  // Áp dụng mã giảm giá
  const handleApplyPromoCode = async () => {
    setError("");
    try {
      const response = await fetch(
        "http://localhost:8000/api/promotion-codes/validate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: promoCode }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setDiscount(data.discount_percentage);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Mã giảm giá không hợp lệ");
      }
    } catch (error) {
      console.error("Error validating promo code:", error);
      setError("Có lỗi xảy ra khi áp dụng mã giảm giá");
    }
  };

  // Xác nhận thanh toán
  const handleConfirmPayment = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/promotion-codes/confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: promoCode }),
        }
      );

      if (response.ok) {
        alert("Thanh toán thành công!");
        setCartItems([]);
        setPromoCode("");
        setDiscount(0);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Thanh toán thất bại");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      setError("Có lỗi xảy ra khi xác nhận thanh toán");
    }
  };

  const formatCurrency = (value) => {
    value = parseFloat(value);
    if (typeof value !== "number") return "0 ₫"; // fallback giá trị
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="cart-container">
      <h2>Giỏ Hàng</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.product.id}>
              <td>
                <img
                  src={item.product.image}
                  alt={item.name}
                  className="cart-img"
                />
              </td>
              <td>{item.product.name}</td>
              <td>{formatCurrency(item.product.price)}</td>
              <td>
                <div className="qty-controls">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    +
                  </button>
                </div>
              </td>
              <td>{formatCurrency(item.product.price * item.quantity)}</td>
              <td>
                <button
                  className="btn-remove"
                  onClick={() => handleRemove(item.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Áp dụng mã giảm giá */}
      <div className="promo-section">
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button onClick={handleApplyPromoCode}>Áp dụng</button>
        {error && <p className="error-message">{error}</p>}
        {discount > 0 && <p>Áp dụng giảm giá: {discount}%</p>}
      </div>

      {/* Tổng tiền */}
      <div className="cart-total">
        <p>Tổng tiền: {formatCurrency(calculateTotal())}</p>
        {discount > 0 && (
          <p>
            Sau giảm giá:{" "}
            {formatCurrency(calculateTotal() * (1 - discount / 100))}
          </p>
        )}
        <button onClick={() => navigate("/checkout")}>Thanh Toán</button>
      </div>
    </div>
  );
};

export default Cart;
