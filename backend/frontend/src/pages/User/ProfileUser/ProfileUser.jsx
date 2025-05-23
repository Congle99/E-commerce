import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '~/components/Api.jsx';
import './ProfileUser.scss';

const ProfileUser = () => {
    const navigate = useNavigate();
    const { http } = Api();
    const [userData, setUserData] = useState({
        id: '',
        username: '',
        email: '',
        role: '',
        phone: '',
        created_at: ''
    });
    const [editData, setEditData] = useState({});
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);

    // 🔧 Câu hỏi bảo mật
    const [questionInput, setQuestionInput] = useState('');
    const [questionMsg, setQuestionMsg] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('user'));
                if (!userInfo) {
                    navigate('/login');
                    return;
                }

                setUserData({
                    id: userInfo.id,
                    username: userInfo.username || 'nguoimau',
                    email: userInfo.email || '',
                    role: userInfo.role || 'user',
                    phone: userInfo.phone || '0123-456-789',
                    created_at: userInfo.created_at || new Date().toISOString()
                });

                setEditData({
                    username: userInfo.username || '',
                    email: userInfo.email || '',
                    phone: userInfo.phone || ''
                });

                setLoading(false);
            } catch (err) {
                setError('Lỗi khi tải thông tin người dùng');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (activeTab === 'orders') {
            setOrders([
                {
                    id: 1,
                    total_price: 1500000,
                    status: 'Completed',
                    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 2,
                    total_price: 750000,
                    status: 'Processing',
                    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                }
            ]);
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'payments') {
            setPayments([
                {
                    payment_id: 1,
                    order_id: 1,
                    payment_method: 'Credit Card',
                    payment_status: 1,
                    payment_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    payment_id: 2,
                    order_id: 2,
                    payment_method: 'Bank Transfer',
                    payment_status: 0,
                    payment_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                }
            ]);
        }
    }, [activeTab]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleUpdate = async () => {
        try {
            const response = await http.put('/user/update', {
                id: userData.id,
                username: editData.username,
                email: editData.email,
                phone: editData.phone
            });

            if (response.data.success) {
                setSuccess('Cập nhật thành công!');
                setUserData(prev => ({
                    ...prev,
                    username: editData.username,
                    email: editData.email,
                    phone: editData.phone
                }));
                localStorage.setItem('user', JSON.stringify({
                    ...userData,
                    username: editData.username,
                    email: editData.email,
                    phone: editData.phone
                }));
                setIsEditing(false);
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError('Cập nhật thất bại!');
            }
        } catch (err) {
            setError('Có lỗi khi cập nhật: ' + (err.response?.data?.message || err.message));
        }
    };

    // ✅ Lưu câu hỏi bảo mật
    const handleQuestionSave = () => {
        // Mô phỏng lưu vào local hoặc gửi về API
        localStorage.setItem('secret_question', questionInput);
        setQuestionMsg('Đã lưu thành công!');
        setTimeout(() => setQuestionMsg(''), 2000);
    };

    // 🧩 Các phần render (không thay đổi)
    // --> Giữ nguyên `renderProfile`, `renderOrders`, `renderPayments`, `renderContent`


    const renderProfile = () => (
        <div className="profile-content">
            <h3 className="mb-4">Thông tin cá nhân</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <div className="user-info">
                <div className="info-item">
                    <label>Tên đăng nhập:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editData.username}
                            onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                        />
                    ) : (
                        <span>{userData.username}</span>
                    )}
                </div>
                <div className="info-item">
                    <label>Email:</label>
                    {isEditing ? (
                        <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        />
                    ) : (
                        <span>{userData.email}</span>
                    )}
                </div>
                <div className="info-item">
                    <label>Số điện thoại:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editData.phone}
                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        />
                    ) : (
                        <span>{userData.phone}</span>
                    )}
                </div>
                <div className="info-item">
                    <label>Vai trò:</label>
                    <span>{userData.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</span>
                </div>
                <div className="info-item">
                    <label>Ngày tạo:</label>
                    <span>{new Date(userData.created_at).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                    <label>Nơi du lịch bạn thích nhất:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            value={questionInput}
                            onChange={(e) => setQuestionInput(e.target.value)}
                            placeholder="Nhập địa điểm"
                            className="me-2 form-control"
                        />
                        <button className="btn btn-sm btn-success" onClick={handleQuestionSave}>
                            Lưu
                        </button>
                    </div>
                    {questionMsg && <small className="text-success">{questionMsg}</small>}
                </div>
                <div className="text-end mt-3">
                    {isEditing ? (
                        <>
                            <button className="btn btn-success me-2" onClick={handleUpdate}>Lưu thay đổi</button>
                            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Hủy</button>
                        </>
                    ) : (
                        <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Cập nhật thông tin</button>
                    )}
                </div>
            </div>
        </div>
    );

    const renderOrders = () => (
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

    const renderPayments = () => (
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

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return renderProfile();
            case 'orders':
                return renderOrders();
            case 'payments':
                return renderPayments();
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
                                        <img src="https://via.placeholder.com/150" alt="Avatar" className="rounded-circle" width="100" />
                                    </div>
                                    <h4 className="mt-3">{userData.username}</h4>
                                    <p className="text-muted">{userData.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</p>
                                </div>

                                <nav className="profile-menu">
                                    <ul>
                                        <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
                                            <i className="fas fa-user"></i> Thông tin cá nhân
                                        </li>
                                        <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
                                            <i className="fas fa-shopping-bag"></i> Đơn hàng
                                        </li>
                                        <li className={activeTab === 'payments' ? 'active' : ''} onClick={() => setActiveTab('payments')}>
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





