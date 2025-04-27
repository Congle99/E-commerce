import Home from "~/pages/Admin/Home";
import Product from "~/pages/Admin/Product/Product.jsx";
import OrderPage from "~/pages/Admin/Order/OrderPage.jsx";
import InvoicePage from "~/pages/Admin/Invoice/InvoicePage.jsx";
import OrderDetailPage from "../pages/Admin/OrderDetail/OrderDetailPage.jsx";
import CompletedOrdersPage from "~/pages/Admin/Invoice/InvoicePage.jsx"; 





const publicRoute = [
    {path: '/', component: Home},
    {path: '/product', component: Product},
    {path: '/order', component: OrderPage},
    { path: '/invoice', component: InvoicePage },
    {path: '/order/order-details/:id', component: OrderDetailPage},
    { path: "/orders/completed", component: CompletedOrdersPage },
]
const privateRoute = [

]
 
export {publicRoute, privateRoute};