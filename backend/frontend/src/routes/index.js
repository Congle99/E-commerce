import Home from "~/pages/Admin/Home";
import Product from "~/pages/Admin/Product/Product.jsx";
import OrderPage from "~/pages/Admin/Order/OrderPage.jsx";
import OrderDetailPage from "../pages/Admin/OrderDetail/OrderDetailPage.jsx";
import ContactInfo from "../pages/Admin/ContactInfo/ContactInfo.jsx";

const publicRoute = [
    { path: "/", component: Home },
    { path: "/product", component: Product },
    { path: "/order", component: OrderPage },
    { path: "/order/order-details/:id", component: OrderDetailPage },
    { path: "/admin/contact-info", component: ContactInfo },
];
const privateRoute = [];

export { publicRoute, privateRoute };
