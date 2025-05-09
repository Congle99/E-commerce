import React, { useState, useEffect } from "react";
import "./Cart.scss";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

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
    </div>
  );
};

export default Cart;
