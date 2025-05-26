import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Api from '~/components/Api.jsx';
import './ProfileUser.scss';

const ProfileUser = () => {
    const navigate = useNavigate();
    const { http } = Api();

    // trạng thái user, đơn hàng, thanh toán
    const [userData, setUserData] = useState({ id: null, email: '', role: '' });
    const [profileInfo, setProfileInfo] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        company_name: '',
        address: '',
        phone: '',
        city: '',
        district: '',
        ward: '',
    });
    const [showForm, setShowForm] = useState(false);
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('profile');

    // Kiểm tra token, nếu không có thì chuyển về login
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Lấy thông tin user từ localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Lấy thông tin cá nhân khi userData.id có giá trị
    useEffect(() => {
        const fetchProfileInfo = async () => {
            setLoading(true);
            try {
                const response = await http.get('/user/profile-info');
                setProfileInfo(response.data);
            } catch (err) {
                console.log('Chưa có thông tin cá nhân hoặc lỗi lấy dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        if (userData.id) {
            fetchProfileInfo();
        }
    }, [userData, http]);

    // Khi có profileInfo thì khởi tạo lại formData cho form sửa/thêm
    useEffect(() => {
        if (profileInfo) {
            setFormData({
                first_name: profileInfo.first_name || '',
                last_name: profileInfo.last_name || '',
                company_name: profileInfo.company_name || '',
                address: profileInfo.address || '',
                phone: profileInfo.phone || '',
                city: profileInfo.city || '',
                district: profileInfo.district || '',
                ward: profileInfo.ward || '',
            });
        }
    }, [profileInfo]);

    // Lấy đơn hàng khi tab orders được chọn
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                // Thay bằng call API thật nếu có
                setOrders([
                    {
                        id: 1,
                        total_price: 1500000,
                        status: 'Completed',
                        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                    },
                    {
                        id: 2,
                        total_price: 750000,
                        status: 'Processing',
                        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    },
                ]);
            } catch (err) {
                setError('Lấy đơn hàng thất bại');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (activeTab === 'orders') {
            fetchOrders();
        }
    }, [activeTab]);

    // Lấy thanh toán khi tab payments được chọn
    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            try {
                // Thay bằng call API thật nếu có
                setPayments([
                    {
                        payment_id: 1,
                        order_id: 1,
                        payment_method: 'Credit Card',
                        payment_status: 1,
                        payment_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                    },
                    {
                        payment_id: 2,
                        order_id: 2,
                        payment_method: 'Bank Transfer',
                        payment_status: 0,
                        payment_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    },
                ]);
            } catch (err) {
                setError('Lấy thông tin thanh toán thất bại');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (activeTab === 'payments') {
            fetchPayments();
        }
    }, [activeTab]);

    // Xử lý input form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Gửi form cập nhật thông tin cá nhân và cập nhật
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await http.post('/user/profile-info', formData); // Dùng chung API
            setProfileInfo(response.data);
            setShowForm(false);
            setIsEditMode(false);
        } catch (err) {
            console.error('Lỗi khi gửi thông tin cá nhân', err);
        }
    };


    // Đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Render thông tin cá nhân
    const renderProfileInfo = () => (
        <div className="user-info">
            <div className="info-item">
                <label>Họ tên:</label> <span>{profileInfo.first_name} {profileInfo.last_name}</span>
            </div>
            <div className="info-item">
                <label>Email:</label> <span>{userData.email}</span>
            </div>
            <div className="info-item">
                <label>SĐT:</label> <span>{profileInfo.phone}</span>
            </div>
            <div className="info-item">
                <label>Địa chỉ:</label> <span>{profileInfo.address}, {profileInfo.ward}, {profileInfo.district}, {profileInfo.city}</span>
            </div>
            <div className="info-item">
                <label>Công ty:</label> <span>{profileInfo.company_name || 'Không có'}</span>
            </div>
            <div className="info-item">
                <button className="btn btn-outline-warning mt-3" onClick={() => {
                    setIsEditMode(true);
                    setShowForm(true);
                }}>
                    Chỉnh sửa thông tin
                </button>
            </div>
        </div>
    );

    // Form thêm/sửa thông tin cá nhân với input có value và onChange để controlled
  const renderForm = () => (
  <form onSubmit={handleFormSubmit} className="user-form">
    <div className="row">
      <div className="col-md-6">
        <label htmlFor="first_name">Họ <span style={{color: 'red'}}>*</span></label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          placeholder="Họ"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="last_name">Tên <span style={{color: 'red'}}>*</span></label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          placeholder="Tên"
          value={formData.last_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="phone">Số điện thoại <span style={{color: 'red'}}>*</span></label>
        <input
          id="phone"
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-12">
        <label htmlFor="company_name">Tên công ty (tuỳ chọn)</label>
        <input
          id="company_name"
          type="text"
          name="company_name"
          placeholder="Tên công ty (tuỳ chọn)"
          value={formData.company_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-12">
        <label htmlFor="address">Địa chỉ <span style={{color: 'red'}}>*</span></label>
        <input
          id="address"
          type="text"
          name="address"
          placeholder="Địa chỉ"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="ward">Phường/xã <span style={{color: 'red'}}>*</span></label>
        <input
          id="ward"
          type="text"
          name="ward"
          placeholder="Phường/xã"
          value={formData.ward}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="district">Quận/huyện <span style={{color: 'red'}}>*</span></label>
        <input
          id="district"
          type="text"
          name="district"
          placeholder="Quận/huyện"
          value={formData.district}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="city">Tỉnh/thành <span style={{color: 'red'}}>*</span></label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="Tỉnh/thành"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="col-md-12 mt-3">
        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Cập nhật' : 'Hoàn thành'}
        </button>
      </div>
    </div>
  </form>
);


    // Render nội dung theo tab
    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Đang tải...</span>
                    </div>
                </div>
            );
        }

        switch (activeTab) {
            case 'profile':
                return (
                    <div className="profile-content">
                        <h3 className="mb-4">Thông tin cá nhân</h3>
                        {profileInfo ? renderProfileInfo() : <p>Bạn chưa có thông tin cá nhân.</p>}
                        {!profileInfo && !showForm && (
                            <button className="btn btn-outline-primary mt-3" onClick={() => setShowForm(true)}>
                                Thêm thông tin cá nhân
                            </button>
                        )}
                        {showForm && renderForm()}
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
                                        {orders.map((order) => (
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
                                        {payments.map((payment) => (
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
            <div className="profile container">
                <div className="profile-header d-flex justify-content-between align-items-center">
                    <h2>Xin chào, {userData.email || 'Người dùng'}</h2>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Đăng xuất
                    </button>
                </div>

                <nav className="profile-nav nav nav-tabs mb-4">
                    <button
                        className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Hồ sơ
                    </button>
                    <button
                        className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Đơn hàng
                    </button>
                    <button
                        className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('payments')}
                    >
                        Thanh toán
                    </button>
                </nav>

                {error && <div className="alert alert-danger">{error}</div>}

                {renderContent()}

                <div className="mt-5">
                    <Link to="/" className="btn btn-secondary">
                        Quay lại trang chủ
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default ProfileUser;
