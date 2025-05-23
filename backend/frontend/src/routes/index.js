import Home from "~/pages/Admin/Home";
import Product from "~/pages/Admin/Product/Product.jsx";
import OrderPage from "~/pages/Admin/Order/OrderPage.jsx";
import OrderDetailPage from "../pages/Admin/OrderDetail/OrderDetailPage.jsx";

import HomeUser from "../pages/User/HomeUser/HomeUser.jsx";
import Shop from "../pages/User/Shop/Shop.jsx";
import ProductDetail from "../pages/User/ProductDetail/ProductDetail.jsx";
import Cart from "../pages/User/Cart/Cart.jsx";
import Login from "../pages/Auth/Login.jsx"; // Import trang Login
import Register from "../pages/Auth/Register.jsx"; // Import trang Register
import ForgetPassword from "../pages/Auth/ForgetPassword.jsx"; // Sửa tên biến từ Register thành ForgetPassword
import ProfileUser from "../pages/User/ProfileUser/ProfileUser.jsx"; // Import trang ProfileUser

// Dành cho User
const UserRoute = [
    { path: '/user', component: HomeUser },
    { path: '/shop', component: Shop },
    { path: '/product', component: ProductDetail },
    { path: '/cart', component: Cart },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forgetPassword', component: ForgetPassword }, // Đảm bảo rằng biến ForgetPassword đã được import
    { path: '/profileUser', component: ProfileUser },
];

// Dành cho admin
const AdminRoute = [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    { path: '/order', component: OrderPage },
    { path: '/order/order-details/:id', component: OrderDetailPage },
];

export { UserRoute, AdminRoute };