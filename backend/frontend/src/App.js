import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserRoute, AdminRoute } from '~/routes';
import { DefaultLayout, UserLayout } from '~/components/Layouts';
import Login from '~/pages/Auth/Login'; // Nhập component Login
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Route cho Đăng Nhập */}
                    <Route path="/login" element={<Login />} />

                    {/* Admin Routes */}
                    {AdminRoute.map((route, index) => {
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

                    {/* User Routes */}
                    {UserRoute.map((route, index) => {
                        const Layout = route.layout || UserLayout; 
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