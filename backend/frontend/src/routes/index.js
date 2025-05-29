import Home from "~/pages/Admin/Home";
import Product from "~/pages/Admin/Product/Product.jsx";
import OrderPage from "~/pages/Admin/Order/OrderPage.jsx";
import OrderDetailPage from "../pages/Admin/OrderDetail/OrderDetailPage.jsx";
<<<<<<< HEAD

import HomeUser from "../pages/User/HomeUser/HomeUser.jsx";
import Shop from "../pages/User/Shop/Shop.jsx";
import ProductDetail from "../pages/User/ProductDetail/ProductDetail.jsx";
import Cart from "../pages/User/Cart/Cart.jsx";
import Login from "../pages/Auth/Login.jsx"; // Import trang Login
import Register from "../pages/Auth/Register.jsx"; // Import trang Register
import ProfileUser from "../pages/User/ProfileUser/ProfileUser.jsx"; // Import trang ProfileUser

import CompletedOrdersPage from "~/pages/Admin/Invoice/InvoicePage.jsx"; 
import InvoicePrintPageWrapper from "~/pages/Admin/Invoice/InvoicePrintPageWrapper.jsx";
import FeedbackPage from "~/pages/Admin/Feedback/FeedbackList.jsx";
>>>>>>> origin/Project/Công

// Dành cho User
const UserRoute = [
    { path: '/user', component: HomeUser },
    { path: '/shop', component: Shop }, // Đảm bảo đường dẫn chính xác
    { path: '/product', component: ProductDetail }, // Đảm bảo đường dẫn chính xác
    { path: '/cart', component: Cart }, // Đảm bảo đường dẫn chính xác
    { path: '/login', component: Login }, // Thêm route cho trang Login
    { path: '/register', component: Register }, // Thêm route cho trang Register
    { path: '/profileUser', component: ProfileUser }, // Thêm route cho trang ProfileUser
];

// Dành cho admin
const AdminRoute = [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    { path: '/order', component: OrderPage },
    { path: '/order/order-details/:id', component: OrderDetailPage },
	{ path: '/invoice', component: InvoicePage },
    { path: '/invoice/print/:id', component: InvoicePrintPageWrapper },
    {path: '/order/order-details/:id', component: OrderDetailPage},
    { path: "/orders/completed", component: CompletedOrdersPage },
    { path: '/Feedback', component: FeedbackPage },
];

export { UserRoute, AdminRoute };