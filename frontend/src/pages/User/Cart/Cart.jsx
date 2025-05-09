import React, { useState } from "react";
import "./Cart.scss"; 

const initialCart = [
  {
    id: 1,
    name: "Áo sơ mi trắng",
    price: 250000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Quần jeans nam",
    price: 450000,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1618354691200-c13d736f62c4?auto=format&fit=crop&w=600&q=80",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const formatCurrency = (value) =>
    value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

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
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} className="cart-img" />
              </td>
              <td>{item.name}</td>
              <td>{formatCurrency(item.price)}</td>
              <td>
                <div className="qty-controls">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
              </td>
              <td>{formatCurrency(item.price * item.quantity)}</td>
              <td>
                <button className="btn-remove" onClick={() => handleRemove(item.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
