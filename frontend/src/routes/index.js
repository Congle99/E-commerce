import Home from "~/pages/Admin/Home";
import Product from "~/pages/Admin/Product/Product.jsx";
import OrderPage from "~/pages/Admin/Order/OrderPage.jsx";
import InvoicePage from "~/pages/Admin/Invoice/InvoicePage.jsx";
import OrderDetailPage from "../pages/Admin/OrderDetail/OrderDetailPage.jsx";
import CompletedOrdersPage from "~/pages/Admin/Invoice/InvoicePage.jsx";
import InvoicePrintPageWrapper from "~/pages/Admin/Invoice/InvoicePrintPageWrapper.jsx";
import Statistics from "~/pages/Admin/Statistics/Statistics.jsx";

import HomeUser from "../pages/User/HomeUser/HomeUser.jsx";
import Shop from "../pages/User/Shop/Shop.jsx";
import ProductDetail from "../pages/User/ProductDetail/ProductDetail.jsx";
import Cart from "../pages/User/Cart/Cart.jsx";
import PromotionPage from "../pages/Admin/Promotion/PromotionPage.jsx";
import Login from "../pages/Auth/Login.jsx"; // Import trang Login
import Register from "../pages/Auth/Register.jsx"; // Import trang Register
import ProfileUser from "../pages/User/ProfileUser/ProfileUser.jsx"; // Import trang ProfileUser

// Dành cho User
const UserRoute = [
  { path: "/user", component: HomeUser },
  { path: "/ShopUser", component: Shop },
  { path: "/ProductUser/:id", component: ProductDetail },
  { path: "/CartUser", component: Cart },
  { path: '/login', component: Login }, // Thêm route cho trang Login
    { path: '/register', component: Register }, // Thêm route cho trang Register
    { path: '/profileUser', component: ProfileUser }, // Thêm route cho trang ProfileUser
];

// Dành cho admin
const AdminRoute = [
  { path: "/", component: Statistics },
  { path: "/product", component: Product },
  { path: "/order", component: OrderPage },
  { path: "/invoice", component: InvoicePage },
  { path: "/invoice/print/:id", component: InvoicePrintPageWrapper },
  { path: "/order/order-details/:id", component: OrderDetailPage },
  { path: "/promotions", component: PromotionPage },
];

export { UserRoute, AdminRoute };
