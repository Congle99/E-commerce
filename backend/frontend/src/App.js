import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Admin/Home/index";
import ContactPage from "./pages/Contact";
import { publicRoute } from "~/routes";
import { DefaultLayout } from "~/components/Layouts";
import "bootstrap/dist/css/bootstrap.min.css";
import ManageContactInfo from "./components/Admin/ManageContactInfo";
import ContactInfo from "./pages/Admin/ContactInfo/ContactInfo";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin/contact" element={<ContactInfo />} />
                    {publicRoute.map((route, index) => {
                        const Layout = route.layout || DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
