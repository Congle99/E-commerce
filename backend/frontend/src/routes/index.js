import Home from "~/pages/Admin/Home";
import Product from "~/pages/Admin/Product/Product.jsx";
import OrderPage from "~/pages/Admin/Order/OrderPage.jsx";
import OrderDetailPage from "../pages/Admin/OrderDetail/OrderDetailPage.jsx";

import HomeUser from "../pages/User/HomeUser/HomeUser.jsx"
import Shop from "../pages/User/Shop/Shop.jsx";

// Dành cho User
const UserRoute = [
    {path: '/user', component: HomeUser},
    {path: '/ShopUser', component: Shop},
]

// Dành cho admin
const AdminRoute = [
    {path: '/', component: Home},
    {path: '/product', component: Product},
    {path: '/order', component: OrderPage},
    {path: '/order/order-details/:id', component: OrderDetailPage},
]
 
export {UserRoute, AdminRoute};