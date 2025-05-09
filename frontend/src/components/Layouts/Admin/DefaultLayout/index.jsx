import Header from "./Header";
import Sidebar from "./Sidebar";
import "./DefaultLayout.scss";

function DefaultLayout({ children }) {
  return (
    <div className="admin-layout">  {/* Đổi tên class để khớp với SCSS */}
      <Header />
      <div className="main-content-wrapper">
        <Sidebar />
        <div className="main-content">  {/* Thêm div wrapper này */}
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;