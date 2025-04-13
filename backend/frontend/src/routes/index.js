import Home from "../pages/Home";
import Product from "~/pages/Product/Product.jsx";
import OrderPage from "~/pages/Order/OrderPage.jsx";

const publicRoute = [
    {path: '/', component: Home},
    {path: '/product', component: Product},
    {path: '/order', component: OrderPage},
]
const privateRoute = [

]
 
export {publicRoute, privateRoute};