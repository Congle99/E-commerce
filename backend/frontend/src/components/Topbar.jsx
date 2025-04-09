export default function Topbar() {
    return (
      <div className="topbar d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white">
        {/* Search box bên trái */}
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm sản phẩm…"
            style={{ width: "300px" }}
          />
          <i className="fas fa-search ms-2 text-secondary"></i>
        </div>
  
        {/* Navbar bên phải */}
        <ul className="navbar-nav d-flex flex-row align-items-center m-0">
          {/* Thông báo */}
          <li className="nav-item mx-2 position-relative">
            <a className="nav-link" href="#">
              <i className="fas fa-bell fa-fw"></i>
              <span className="badge bg-danger badge-counter position-absolute top-0 start-100 translate-middle rounded-pill">
                3+
              </span>
            </a>
          </li>
  
          {/* Tin nhắn */}
          <li className="nav-item mx-2 position-relative">
            <a className="nav-link" href="#">
              <i className="fas fa-envelope fa-fw"></i>
              <span className="badge bg-danger badge-counter position-absolute top-0 start-100 translate-middle rounded-pill">
                7
              </span>
            </a>
          </li>
  
          {/* Avatar + tên user */}
          <li className="nav-item d-flex align-items-center ms-3">
            <img
              className="rounded-circle"
              src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
              alt="avatar"
              width="32"
              height="32"
            />
            <span className="ms-2 text-gray-600">Admin</span>
          </li>
        </ul>
      </div>
    );
  }
  