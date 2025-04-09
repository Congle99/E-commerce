import Home from "../pages/Home";
import Product from "~/pages/Product/Product.jsx";

const publicRoute = [
    {path: '/', component: Home},
    {path: '/product', component: Product},
]
const privateRoute = [

]
 
export {publicRoute, privateRoute};