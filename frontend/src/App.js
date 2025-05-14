
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserRoute, AdminRoute } from '~/routes';
import { DefaultLayout, UserLayout } from '~/components/Layouts';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
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
export default App