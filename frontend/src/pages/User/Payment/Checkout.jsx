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
    paymentMethod: "cod",
    bankName: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validationRules = {
    firstName: {
      regex: /^[a-zA-ZÀ-ỹ\s]{2,30}$/,
      message: "Tên không hợp lệ",
    },
    lastName: {
      regex: /^[a-zA-ZÀ-ỹ\s]{2,30}$/,
      message: "Họ không hợp lệ",
    },
    phone: {
      regex: /^(0|\+84)[0-9]{9,10}$/,
      message: "Số điện thoại không hợp lệ",
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email không hợp lệ",
    },
    postcode: {
      regex: /^[0-9]{5,6}$/,
      message: "Mã bưu điện phải có 5-6 chữ số",
    },
    address: {
      regex: /^.{5,}$/,
      message: "Địa chỉ quá ngắn",
    },
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user/profile-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({
            ...prev,
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            companyName: data.company_name || "",
            city: data.city || "",
            district: data.district || "",
            ward: data.ward || "",
            address: data.address || "",
            phone: data.phone || "",
            email: data.email || user.email || "",
          }));
        }
      } catch (err) {
        console.error("Error fetching profile info:", err);
      }
    };

    // Fetch cart items
    const fetchCartItems = async () => {
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

    fetchProfile();
    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleApplyPromoCode = async () => {
    setError("");
    const token = localStorage.getItem("token");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Xóa lỗi của field vừa nhập (nếu có)
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleSubmit = async () => {
    setError("");
    setIsSubmitting(true);
    setFormErrors({}); // Reset lỗi

    // Validate
    const errors = {};
    Object.entries(validationRules).forEach(([key, rule]) => {
      const value = (formData[key] || "").trim();
      if (!rule.regex.test(value)) {
        errors[key] = rule.message;
      }
    });

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
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

    const token = localStorage.getItem("token");

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
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {formErrors.firstName && (
            <span className="error-message">{formErrors.firstName}</span>
          )}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {formErrors.lastName && (
            <span className="error-message">{formErrors.lastName}</span>
          )}
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
          />
          {formErrors.address && (
            <span className="error-message">{formErrors.address}</span>
          )}
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {formErrors.phone && (
            <span className="error-message">{formErrors.phone}</span>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <span className="error-message">{formErrors.email}</span>
          )}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ward"
            placeholder="Ward"
            value={formData.ward}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="postcode"
            placeholder="Postcode"
            value={formData.postcode}
            onChange={handleInputChange}
          />
          {formErrors.postcode && (
            <span className="error-message">{formErrors.postcode}</span>
          )}
          <textarea
            name="note"
            placeholder="Note"
            value={formData.note}
            onChange={handleInputChange}
          />
          <h3>Phương Thức Thanh Toán</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              onChange={handleInputChange}
              checked={formData.paymentMethod === "cod"}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              onChange={handleInputChange}
              checked={formData.paymentMethod === "bank"}
            />
            Direct Bank Transfer
          </label>
          {formData.paymentMethod === "bank_transfer" && (
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              value={formData.bankName}
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
