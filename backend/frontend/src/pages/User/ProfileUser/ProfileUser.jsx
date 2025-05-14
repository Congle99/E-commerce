import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '~/components/Api.jsx';
import './ProfileUser.scss';

const { http } = Api();

const ProfileUser = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        role: ''
    });
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('profile');

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await http.get('/api/user');
                setUserData(response.data);
            } catch (err) {
                setError('Failed to fetch user data');
                console.error(err);
            }
        };

        fetchUserData();
    }, []);

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await http.get('/api/user/orders');
                setOrders(response.data);
            } catch (err) {
                setError('Failed to fetch orders');
                console.error(err);
            }
        };

        if (activeTab === 'orders') {
            fetchOrders();
        }
    }, [activeTab]);

    // Fetch payments
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await http.get('/api/user/payments');
                setPayments(response.data);
            } catch (err) {
                setError('Failed to fetch payments');
                console.error(err);
            }
        };

        if (activeTab === 'payments') {
            fetchPayments();
        }
    }, [activeTab]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="profile-content">
                        <h3 className="mb-4">Thông tin cá nhân</h3>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="user-info">
                            <div className="info-item">
                                <label>Email:</label>
                                <span>{userData.email}</span>
                            </div>
                            <div className="info-item">
                                <label>Vai trò:</label>
                                <span>{userData.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</span>
                            </div>
                        </div>
                    </div>
                );
            case 'orders':
                return (
                    <div className="profile-content">
                        <h3 className="mb-4">Lịch sử đơn hàng</h3>
                        {orders.length === 0 ? (
                            <p>Bạn chưa có đơn hàng nào</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Mã đơn hàng</th>
                                            <th>Tổng tiền</th>
                                            <th>Trạng thái</th>
                                            <th>Ngày tạo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.total_price.toLocaleString()} VNĐ</td>
                                                <td>
                                                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                );
            case 'payments':
                return (
                    <div className="profile-content">
                        <h3 className="mb-4">Lịch sử thanh toán</h3>
                        {payments.length === 0 ? (
                            <p>Bạn chưa có giao dịch thanh toán nào</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Mã thanh toán</th>
                                            <th>Mã đơn hàng</th>
                                            <th>Phương thức</th>
                                            <th>Trạng thái</th>
                                            <th>Ngày thanh toán</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map(payment => (
                                            <tr key={payment.payment_id}>
                                                <td>{payment.payment_id}</td>
                                                <td>{payment.order_id}</td>
                                                <td>{payment.payment_method}</td>
                                                <td>
                                                    {payment.payment_status === 1 ? (
                                                        <span className="status-badge success">Thành công</span>
                                                    ) : (
                                                        <span className="status-badge failed">Thất bại</span>
                                                    )}
                                                </td>
                                                <td>{new Date(payment.payment_date).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <main>
            <section className="breadcrumb-area" style={{ backgroundImage: 'url(img/bg/page-title.png)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="breadcrumb-text text-center">
                                <h1>Thông tin người dùng</h1>
                                <ul className="breadcrumb-menu">
                                    <li><a href="/">Trang chủ</a></li>
                                    <li><span>Thông tin người dùng</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="profile-area pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="profile-sidebar">
                                <div className="profile-user text-center mb-4">
                                    <div className="profile-avatar">
                                        <img 
                                            src="https://via.placeholder.com/150" 
                                            alt="Avatar" 
                                            className="rounded-circle"
                                            width="100"
                                        />
                                    </div>
                                    <h4 className="mt-3">{userData.email}</h4>
                                    <p className="text-muted">{userData.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</p>
                                </div>
                                
                                <nav className="profile-menu">
                                    <ul>
                                        <li 
                                            className={activeTab === 'profile' ? 'active' : ''}
                                            onClick={() => setActiveTab('profile')}
                                        >
                                            <i className="fas fa-user"></i> Thông tin cá nhân
                                        </li>
                                        <li 
                                            className={activeTab === 'orders' ? 'active' : ''}
                                            onClick={() => setActiveTab('orders')}
                                        >
                                            <i className="fas fa-shopping-bag"></i> Đơn hàng
                                        </li>
                                        <li 
                                            className={activeTab === 'payments' ? 'active' : ''}
                                            onClick={() => setActiveTab('payments')}
                                        >
                                            <i className="fas fa-credit-card"></i> Thanh toán
                                        </li>
                                        <li onClick={handleLogout}>
                                            <i className="fas fa-sign-out-alt"></i> Đăng xuất
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        
                        <div className="col-lg-9">
                            <div className="profile-main">
                                {loading ? (
                                    <div className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    renderContent()
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProfileUser;