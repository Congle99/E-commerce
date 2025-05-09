import "./UserLayout.scss";
import HeaderUser from "./Header/HeaderUser";
import FooterUser from "./Footer/FooterUser";

function UserLayout({ children }) {
  return (
    <div className="user-layout">
      <HeaderUser />
      <main>{children}</main>
      <FooterUser />
    </div>
  );
}

export default UserLayout;
