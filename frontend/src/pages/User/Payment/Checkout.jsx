import React, { useState, useEffect } from "react";
import "./Checkout.scss";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    city: "",
    district: "",
    ward: "",
    address: "",
    phone: "",
    email: "",
    postcode: "",
    note: "",
    paymentMethod: "cash",
    bankName: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch danh sách sản phẩm từ giỏ hàng
  useEffect(() => {
    const fetchCartItems = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await fetch("http://localhost:8000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
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
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(
        "http://localhost:8000/api/promotion-codes/validate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

  // Xử lý nhập liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gửi dữ liệu thanh toán
  const handleSubmit = async () => {
    setError("");
    setIsSubmitting(true);

    const hasErrors = Object.entries(validationRules).some(([key, rule]) => {
      const value = formData[key];
      if (!rule.regex.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          [key]: rule.message,
        }));
        return true;
      }
      return false;
    });

    if (hasErrors) {
      setError("Vui lòng kiểm tra lại thông tin.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      cart_items: cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
      shipping: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        company_name: formData.companyName,
        city: formData.city,
        district: formData.district,
        ward: formData.ward,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        postcode: formData.postcode,
        note: formData.note,
      },
      payment_method: formData.paymentMethod,
      promotion_code: promoCode || undefined,
    };

    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const response = await fetch("http://localhost:8000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Thanh toán thành công!");
        window.location.href = "/user";
        const data = await response.json();
        console.log("Payment response:", data);
      } else {
        const data = await response.json();
        setError(data.message || "Lỗi khi thanh toán");
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      setError("Lỗi kết nối đến server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Định dạng tiền tệ
  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="checkout-container">
      {/* Form Thông Tin Thanh Toán */}
      <div className="checkout-form">
        <h2>Thông Tin Giao Hàng</h2>
        <form>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ward"
            placeholder="Ward"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="postcode"
            placeholder="Postcode"
            onChange={handleInputChange}
          />
          <textarea
            name="note"
            placeholder="Note"
            onChange={handleInputChange}
          />
          <h3>Phương Thức Thanh Toán</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              onChange={handleInputChange}
              checked={formData.paymentMethod === "cash"}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="bank_transfer"
              onChange={handleInputChange}
              checked={formData.paymentMethod === "bank_transfer"}
            />
            Direct Bank Transfer
          </label>
          {formData.paymentMethod === "bank_transfer" && (
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              onChange={handleInputChange}
            />
          )}
          {error && <p className="error-message">{error}</p>}
          <button type="button" onClick={handleSubmit} disabled={isSubmitting}>
            Đặt Hàng
          </button>
        </form>
      </div>

      {/* Đơn Hàng Của Bạn */}
      <div className="order-summary">
        <h2>Đơn Hàng Của Bạn</h2>
        <table>
          <thead>
            <tr>
              <th>Sản Phẩm</th>
              <th>Số Lượng</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product.id}>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.product.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Tổng Cộng</td>
              <td>{formatCurrency(calculateTotal())}</td>
            </tr>
            {discount > 0 && (
              <tr>
                <td colSpan="2">Sau Giảm Giá</td>
                <td>
                  {formatCurrency(calculateTotal() * (1 - discount / 100))}
                </td>
              </tr>
            )}
          </tfoot>
        </table>

        {/* Mã Giảm Giá */}
        <div className="promo-section">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button onClick={handleApplyPromoCode}>Áp dụng</button>
          {error && <p className="error-message">{error}</p>}
          {discount > 0 && <p>Giảm giá: {discount}%</p>}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
