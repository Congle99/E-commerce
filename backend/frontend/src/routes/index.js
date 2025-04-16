import Home from "../pages/Home";
import Product from "~/pages/Product/Product.jsx";
import OrderPage from "~/pages/Order/OrderPage.jsx";
import OrderDetailPage from "../pages/OrderDetail/OrderDetailPage.jsx";

const publicRoute = [
    {path: '/', component: Home},
    {path: '/product', component: Product},
    {path: '/order', component: OrderPage},
    {path: '/order/order-details/:id', component: OrderDetailPage},
]
const privateRoute = [

]
 
export {publicRoute, privateRoute};