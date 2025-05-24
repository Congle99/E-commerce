import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Api from '~/components/Api.jsx';
import './ForgetPassword.scss';

const ForgetPassword = () => {
    const { http } = Api();
    const navigate = useNavigate(); // Khởi tạo useNavigate

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [questionPassword, setQuestionPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isVerified, setIsVerified] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await http.post('/verify-reset', {
                email,
                phone,
                questionpassword: questionPassword
            });

            if (response.data.success) {
                setIsVerified(true);
                setMessage('Xác thực thành công. Vui lòng nhập mật khẩu mới.');
            } else {
                setError(response.data.message || 'Thông tin không chính xác.');
            }
        } catch (err) {
            setError('Thông tin không chính xác. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setError('');
        setMessage('');

        if (newPassword.length < 8) {
            setError('Mật khẩu phải có ít nhất 8 ký tự.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            return;
        }

        try {
            const response = await http.post('/reset-password', {
                email,
                newPassword
            });

            if (response.data.success) {
                setMessage('Mật khẩu đã được thay đổi thành công.');
                setIsVerified(false);
                navigate('/login'); // Chuyển hướng tới trang login
            } else {
                setError(response.data.message || 'Đổi mật khẩu thất bại.');
            }
        } catch (err) {
            setError('Đã xảy ra lỗi khi đổi mật khẩu.');
        }
    };

    return (
        <div className="forget-password-container">
            <h2>Quên mật khẩu</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            {!isVerified && (
                <>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email đã đăng ký"
                        />
                    </div>

                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Nhập số điện thoại đã đăng ký"
                        />
                    </div>

                    <div className="form-group">
                        <label>Câu hỏi bảo mật (Nơi du lịch bạn thích nhất)</label>
                        <input
                            type="text"
                            value={questionPassword}
                            onChange={(e) => setQuestionPassword(e.target.value)}
                            placeholder="Câu hỏi bảo mật"
                        />
                    </div>

                    <button className="btn btn-primary" onClick={handleVerify} disabled={loading}>
                        {loading ? 'Đang kiểm tra...' : 'Xác thực'}
                    </button>
                </>
            )}

            {isVerified && (
                <>
                    <div className="form-group mt-4">
                        <label>Mật khẩu mới</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Nhập mật khẩu mới"
                        />
                    </div>

                    <div className="form-group">
                        <label>Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Xác nhận lại mật khẩu"
                        />
                    </div>

                    <button className="btn btn-success" onClick={handleResetPassword}>
                        Đổi mật khẩu
                    </button>
                </>
            )}
        </div>
    );
};

export default ForgetPassword;