import Home from "~/pages/Admin/Home";
import Product from "~/pages/Admin/Product/Product.jsx";
import OrderPage from "~/pages/Admin/Order/OrderPage.jsx";
import OrderDetailPage from "../pages/Admin/OrderDetail/OrderDetailPage.jsx";
import Home from "../pages/User/Home/HomeUser.jsx"

export const publicRoute = [
    { path: '/', component: UserHome }, // Trang chủ người dùng
];


export const publicRoute = [
    { path: '/', component: UserHome }, // Trang chủ người dùng
];


const publicRoute = [
    {path: '/', component: Home},

    // {path: '/', component: Home},
    // {path: '/product', component: Product},
    // {path: '/order', component: OrderPage},
    // {path: '/order/order-details/:id', component: OrderDetailPage},
]
const privateRoute = [

]
 
export {publicRoute, privateRoute};