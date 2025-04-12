import { useState } from "react";

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="sidebar">
      <h4 className="text-center py-3 text-white">My Admin</h4>
      <ul className="nav flex-column px-2">
        <li
          className={`nav-item ${
            active === "dashboard" ? "active" : ""
          }`}
          onClick={() => setActive("dashboard")}
        >
          <a href="#" className="nav-link text-white">
            <i className="fas fa-tachometer-alt me-2"></i> Dashboard
          </a>
        </li>
        <li
          className={`nav-item ${
            active === "products" ? "active" : ""
          }`}
          onClick={() => setActive("products")}
        >
          <a href="#" className="nav-link text-white">
            <i className="fas fa-boxes me-2"></i> Sản phẩm
          </a>
        </li>
        <li
          className={`nav-item ${
            active === "orders" ? "active" : ""
          }`}
          onClick={() => setActive("orders")}
        >
          <a href="#" className="nav-link text-white">
            <i className="fas fa-shopping-cart me-2"></i> Đơn hàng
          </a>
        </li>
        <li
          className={`nav-item ${
            active === "customers" ? "active" : ""
          }`}
          onClick={() => setActive("customers")}
        >
          <a href="#" className="nav-link text-white">
            <i className="fas fa-users me-2"></i> Khách hàng
          </a>
        </li>
        <li
          className={`nav-item ${
            active === "invoice" ? "active" : ""
          }`}
          onClick={() => setActive("invoice")}
        >
          <a href="#" className="nav-link text-white">
          <i class="fas fa-file-invoice"></i>Hoá Đơn
          </a>
        </li>

      </ul>
    </div>
  );
}
