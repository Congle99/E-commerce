import Header from "./Header";
import Sidebar from "./Sidebar"; // Import component Sidebar
import "./DefaultLayout.scss"; // Import file SCSS tương ứng

function DefaultLayout({ children }) {
  return (
    <div className="layout-container">
      <Header />
      <div className="main-content-wrapper">
        <Sidebar />
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;