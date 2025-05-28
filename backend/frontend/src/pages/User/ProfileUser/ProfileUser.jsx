import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "~/components/Api.jsx";
import "./ProfileUser.scss";

const ProfileUser = () => {
    const navigate = useNavigate();
    const { http } = Api();
    const [userData, setUserData] = useState({
        id: "",
        email: "",
        role: "",
        created_at: "",
    });
    const [editData, setEditData] = useState({});
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [activeTab, setActiveTab] = useState("profile");
    const [setIsEditing] = useState(false);
    const [changePasswordMsg, setChangePasswordMsg] = useState("");
    const [changePasswordError, setChangePasswordError] = useState("");

    const [deleteAccountMsg, setDeleteAccountMsg] = useState("");
    const [deleteAccountError, setDeleteAccountError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem("user"));
                if (!userInfo) {
                    navigate("/login");
                    return;
                }

                setUserData({
                    id: userInfo.id,
                    email: userInfo.email || "",
                    role: userInfo.role || "user",
                    created_at: userInfo.created_at || new Date().toISOString(),
                });

                setEditData({
                    email: userInfo.email || "",
                });

                setLoading(false);
            } catch (err) {
                setError("Lỗi khi tải thông tin người dùng");
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        if (activeTab === "orders") {
            const fetchOrders = async () => {
                try {
                    const userInfo = JSON.parse(localStorage.getItem("user"));
                    const response = await http.get(
                        `/user/orders?id=${userInfo.id}&page=${currentPage}&per_page=8`
                    );

                    setOrders(response.data.data);
                    setTotalPages(response.data.last_page);
                } catch (err) {
                    console.error("Lỗi API:", err);
                    setError("Không thể tải đơn hàng");
                }
            };
            fetchOrders();
        }
    }, [activeTab, currentPage, http]);

    useEffect(() => {
        if (activeTab === "payments") {
            const fetchPayments = async () => {
                try {
                    const userInfo = JSON.parse(localStorage.getItem("user"));
                    const response = await http.get(
                        `/user/payments?id=${userInfo.id}&page=${currentPage}&per_page=8`
                    );

                    setPayments(response.data.data);
                    setTotalPages(response.data.last_page);
                } catch (err) {
                    console.error("Lỗi API:", err);
                    setError("Không thể tải lịch sử thanh toán");
                }
            };
            fetchPayments();
        }
    }, [activeTab, currentPage, http]);

    //Đổi mật khẩu
    const handleChangePassword = async (newPassword) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("user"));

            const response = await http.put("/user/password", {
                id: userInfo.id,
                password: newPassword,
            });

            // Cập nhật thông báo thành công
            setChangePasswordMsg(response.data.message);
            setChangePasswordError("");
        } catch (err) {
            const message =
                err.response?.data?.message || "Đổi mật khẩu thất bại";
            setChangePasswordError(message);
            setChangePasswordMsg("");
        }
    };

    //Xóa tài khoản
    const handleDeleteAccount = async () => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản không?"))
            return;

        const userInfo = JSON.parse(localStorage.getItem("user"));

        try {
            const response = await http.request({
                url: "/user/delete",
                method: "DELETE",
                data: { id: userInfo.id },
            });

            setDeleteAccountMsg(response.data.message); // Thông báo thành công
            setDeleteAccountError("");

            localStorage.removeItem("user");
            setTimeout(() => {
                navigate("/login");
            }, 2000); // Cho người dùng thấy thông báo trước khi chuyển trang
        } catch (err) {
            const message =
                err.response?.data?.message || "Xóa tài khoản thất bại";
            setDeleteAccountError(message);
            setDeleteAccountMsg("");
        }
    };

    //Đăng xuất
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    // Component đổi mật khẩu
    const ChangePassword = ({
        onChangePassword,
        onDeleteAccount,
        loading,
        success,
        errorMsg,
        deleteMsg,
        deleteError,
    }) => {
        const [newPassword, setNewPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [error, setError] = useState("");

        const handleSubmit = (e) => {
            e.preventDefault();
            setError("");

            const htmlTagRegex = /<[^>]*>/;
            const whitespaceRegex = /\s/;
            const lowercaseRegex = /[a-z]/;
            const digitRegex = /[0-9]/;

            if (!newPassword) {
                setError("Vui lòng nhập mật khẩu mới.");
                return;
            }

            if (newPassword.length < 8) {
                setError("Mật khẩu phải có ít nhất 8 ký tự.");
                return;
            }

            if (newPassword.length > 50) {
                setError("Mật khẩu không được vượt quá 50 ký tự.");
                return;
            }

            if (whitespaceRegex.test(newPassword)) {
                setError("Mật khẩu không được chứa khoảng trắng.");
                return;
            }

            if (
                !lowercaseRegex.test(newPassword) ||
                !digitRegex.test(newPassword)
            ) {
                setError(
                    "Mật khẩu phải chứa ít nhất một chữ thường và một số."
                );
                return;
            }

            if (htmlTagRegex.test(newPassword)) {
                setError("Mật khẩu không được chứa mã HTML.");
                return;
            }

            if (newPassword !== confirmPassword) {
                setError("Mật khẩu xác nhận không khớp.");
                return;
            }

            onChangePassword(newPassword);
        };

        return (
            <div className="change-password">
                <h3>Đổi mật khẩu</h3>

                {/* Hiển thị thông báo */}
                {success && (
                    <div className="alert alert-success">{success}</div>
                )}
                {(error || errorMsg) && (
                    <div className="alert alert-danger">
                        {error || errorMsg}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="change-password-form">
                    <div className="form-group">
                        <label htmlFor="newPassword">Mật khẩu mới</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder="Nhập mật khẩu mới"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Xác nhận mật khẩu mới
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder="Nhập lại mật khẩu mới"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                    </button>
                </form>

                <hr />

                <div className="delete-account-section">
                    <h4>Xóa tài khoản</h4>
                    {deleteMsg && (
                        <div className="alert alert-success">{deleteMsg}</div>
                    )}
                    {deleteError && (
                        <div className="alert alert-danger">{deleteError}</div>
                    )}
                    <p className="text-muted">
                        Hành động này không thể hoàn tác. Vui lòng cân nhắc kỹ
                        trước khi xóa tài khoản.
                    </p>
                    <button
                        className="btn btn-danger"
                        onClick={onDeleteAccount}
                        disabled={loading}
                    >
                        {loading ? "Đang xử lý..." : "Xóa tài khoản"}
                    </button>
                </div>
            </div>
        );
    };

    // Component hỗ trợ khách hàng
    const SupportComponent = () => {
        const [message, setMessage] = useState("");
        const [sent, setSent] = useState(false);
        const [errorMsg, setErrorMsg] = useState("");

        const handleSendSupport = async () => {
            try {
                await http.post("user/support", {
                    user_id: userData.id,
                    email: userData.email,
                    message,
                });

                setSent(true);
                setErrorMsg("");
                setMessage("");
            } catch (error) {
                setErrorMsg("Không thể gửi yêu cầu, vui lòng thử lại.");
            }
        };

        return (
            <div className="profile-content">
                <h3 className="mb-4">Hỗ trợ khách hàng</h3>
                {sent && (
                    <div className="alert alert-success">
                        Yêu cầu của bạn đã được gửi thành công!
                    </div>
                )}
                {errorMsg && (
                    <div className="alert alert-danger">{errorMsg}</div>
                )}
                <div className="form-group">
                    <label>Nội dung yêu cầu hỗ trợ:</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Nhập yêu cầu của bạn..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <button
                    className="btn btn-primary mt-3"
                    onClick={handleSendSupport}
                >
                    Gửi yêu cầu
                </button>
            </div>
        );
    };

    //Lấy thông tin người dùng
    const renderProfile = () => (
        <div className="profile-content">
            <h3 className="mb-4">Thông tin cá nhân</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <div className="user-info">
                <div className="info-item">
                    <label>Email:</label>
                    <span>{userData.email}</span>
                </div>
                <div className="info-item">
                    <label>Vai trò:</label>
                    <span>
                        {userData.role === "admin"
                            ? "Quản trị viên"
                            : "Người dùng"}
                    </span>
                </div>
                <div className="info-item">
                    <label>Ngày tạo:</label>
                    <span>
                        {new Date(userData.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );

    //Lấy lịch sử đặt hàng
    const renderOrders = () => (
        <div className="profile-content">
            <h3 className="mb-4">Lịch sử đơn hàng</h3>
            {orders.length === 0 ? (
                <p>Bạn chưa có đơn hàng nào</p>
            ) : (
                <>
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
                                        <td>
                                            {parseFloat(
                                                order.total_price
                                            ).toLocaleString()}{" "}
                                            VNĐ
                                        </td>
                                        <td>
                                            <span
                                                className={`status-badge ${order.status.toLowerCase()}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            {new Date(
                                                order.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination mt-3 text-center">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`btn btn-sm me-1 ${
                                    currentPage === i + 1
                                        ? "btn-primary"
                                        : "btn-outline-secondary"
                                }`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );

    const renderPayments = () => (
        <div className="profile-content">
            <h3 className="mb-4">Lịch sử thanh toán</h3>
            {payments.length === 0 ? (
                <p>Bạn chưa có giao dịch thanh toán nào</p>
            ) : (
                <>
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
                                                <span className="status-badge success">
                                                    Thành công
                                                </span>
                                            ) : (
                                                <span className="status-badge failed">
                                                    Thất bại
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {new Date(
                                                payment.payment_date
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Phân trang */}
                    <div className="pagination mt-3 text-center">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`btn btn-sm me-1 ${
                                    currentPage === i + 1
                                        ? "btn-primary"
                                        : "btn-outline-secondary"
                                }`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );

    //Gán content
    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return renderProfile();
            case "changePassword":
                return (
                    <ChangePassword
                        onChangePassword={handleChangePassword}
                        onDeleteAccount={handleDeleteAccount}
                        loading={false}
                        success={changePasswordMsg}
                        errorMsg={changePasswordError}
                        deleteMsg={deleteAccountMsg}
                        deleteError={deleteAccountError}
                    />
                );
            case "orders":
                return renderOrders();
            case "payments":
                return renderPayments();
            case "support":
                return <SupportComponent />;
            default:
                return null;
        }
    };

    //Menu
    return (
        <main>
            <section
                className="breadcrumb-area"
                style={{ backgroundImage: "url(img/bg/page-title.png)" }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="breadcrumb-text text-center">
                                <h1>Thông tin người dùng</h1>
                                <ul className="breadcrumb-menu">
                                    <li>
                                        <a href="/">Trang chủ</a>
                                    </li>
                                    <li>
                                        <span>Thông tin người dùng</span>
                                    </li>
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
                                            src="/user.png"
                                            alt="Avatar"
                                            className="rounded-circle"
                                            width="100"
                                        />
                                    </div>
                                    <p className="text-muted">
                                        {userData.role === "admin"
                                            ? "Quản trị viên"
                                            : "Người dùng"}
                                    </p>
                                </div>

                                <nav className="profile-menu">
                                    <ul>
                                        <li
                                            className={
                                                activeTab === "profile"
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setActiveTab("profile")
                                            }
                                        >
                                            <i className="fas fa-user"></i>{" "}
                                            Thông tin cá nhân
                                        </li>
                                        <li
                                            className={
                                                activeTab === "changePassword"
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setActiveTab("changePassword")
                                            }
                                        >
                                            <i className="fas fa-key"></i> Đổi
                                            mật khẩu
                                        </li>
                                        <li
                                            className={
                                                activeTab === "orders"
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setActiveTab("orders")
                                            }
                                        >
                                            <i className="fas fa-shopping-bag"></i>{" "}
                                            Đơn hàng
                                        </li>
                                        <li
                                            className={
                                                activeTab === "payments"
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setActiveTab("payments")
                                            }
                                        >
                                            <i className="fas fa-credit-card"></i>{" "}
                                            Thanh toán
                                        </li>
                                        <li
                                            className={
                                                activeTab === "support"
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setActiveTab("support")
                                            }
                                        >
                                            <i className="fas fa-headset"></i>{" "}
                                            Chăm sóc khách hàng
                                        </li>
                                        <li onClick={handleLogout}>
                                            <i className="fas fa-sign-out-alt"></i>{" "}
                                            Đăng xuất
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div className="profile-main">
                                {loading ? (
                                    <div className="text-center">
                                        <div
                                            className="spinner-border text-primary"
                                            role="status"
                                        >
                                            <span className="sr-only">
                                                Loading...
                                            </span>
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
