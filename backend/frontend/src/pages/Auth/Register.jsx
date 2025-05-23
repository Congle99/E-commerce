import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '~/components/Api.jsx';
import './Register.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const navigate = useNavigate();
    const { http } = Api();

    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formErrors, setFormErrors] = useState({
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateForm = () => {
        let isValid = true;
        const errors = {
            username: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        if (!username.trim()) {
            errors.username = 'Tên người dùng không được để trống';
            isValid = false;
        }

        if (!phone.trim()) {
            errors.phone = 'Số điện thoại không được để trống';
            isValid = false;
        } else if (!/^0\d{9}$/.test(phone)) {
            errors.phone = 'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số';
            isValid = false;
        }

        if (!email) {
            errors.email = 'Email không được để trống';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email không hợp lệ';
            isValid = false;
        }

        if (!password) {
            errors.password = 'Mật khẩu không được để trống';
            isValid = false;
        } else if (password.length < 8) {
            errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
            isValid = false;
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Mật khẩu không khớp';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError('');
        setSuccessMessage('');

        const userData = {
            username,
            phone,
            email,
            password,
            role: 'user'
        };

        try {
            const response = await http.post('/register', userData);
            if (response.data.success) {
                setSuccessMessage('Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập sau vài giây...');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(response.data.message || 'Đăng ký thất bại.');
            }
        } catch (err) {
            console.error('Lỗi khi đăng ký:', err);
            setError('Đã xảy ra lỗi, vui lòng thử lại.');

            if (err.response && err.response.data) {
                const apiErrors = err.response.data.errors || {};
                const translatedErrors = {
                    username: '',
                    phone: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                };

                if (apiErrors.username?.[0]?.includes('has already been taken')) {
                    translatedErrors.username = 'Tên người dùng đã được đăng ký trước đó';
                }

                if (apiErrors.phone?.[0]?.includes('has already been taken') || err.response.data.message?.toLowerCase().includes('phone')) {
                    translatedErrors.phone = 'Số điện thoại đã được đăng ký trước đó';
                }

                if (apiErrors.email?.[0]?.includes('has already been taken')) {
                    translatedErrors.email = 'Email đã được đăng ký trước đó';
                }

                // Nếu backend trả về lỗi khác
                if (apiErrors.password?.[0]) {
                    translatedErrors.password = apiErrors.password[0];
                }

                setFormErrors(translatedErrors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login-area pt-100 pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="basic-login">
                            <h3 className="text-center mb-60">Đăng ký tài khoản</h3>

                            {error && <div className="alert alert-danger">{error}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}

                            <form onSubmit={handleSubmit}>
                                {/* Username */}
                                <div className="form-group">
                                    <label htmlFor="username">Tên tài khoản <span className="required">*</span></label>
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="Nhập tên người dùng..."
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className={formErrors.username ? 'error' : ''}
                                        required
                                    />
                                    {formErrors.username && <div className="error-message">{formErrors.username}</div>}
                                </div>

                                {/* Phone */}
                                <div className="form-group">
                                    <label htmlFor="phone">Số điện thoại <span className="required">*</span></label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="Nhập số điện thoại..."
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className={formErrors.phone ? 'error' : ''}
                                        required
                                    />
                                    {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                                </div>

                                {/* Email */}
                                <div className="form-group">
                                    <label htmlFor="email-id">Email <span className="required">*</span></label>
                                    <input
                                        id="email-id"
                                        type="email"
                                        placeholder="Nhập email..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={formErrors.email ? 'error' : ''}
                                        required
                                    />
                                    {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                                </div>

                                {/* Password */}
                                <div className="form-group">
                                    <label htmlFor="pass">Mật khẩu <span className="required">*</span></label>
                                    <div className="password-field">
                                        <input
                                            id="pass"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Nhập mật khẩu..."
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={formErrors.password ? 'error' : ''}
                                            required
                                        />
                                        <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </button>
                                    </div>
                                    {formErrors.password && <div className="error-message">{formErrors.password}</div>}
                                </div>

                                {/* Confirm Password */}
                                <div className="form-group">
                                    <label htmlFor="confirm-pass">Xác nhận mật khẩu <span className="required">*</span></label>
                                    <div className="password-field">
                                        <input
                                            id="confirm-pass"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Nhập lại mật khẩu..."
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={formErrors.confirmPassword ? 'error' : ''}
                                            required
                                        />
                                        <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                        </button>
                                    </div>
                                    {formErrors.confirmPassword && <div className="error-message">{formErrors.confirmPassword}</div>}
                                </div>

                                {/* Submit Button */}
                                <button className="btn theme-btn-2 w-100" type="submit" disabled={loading}>
                                    {loading ? <span><span className="spinner"></span> Đang xử lý...</span> : 'Đăng ký ngay'}
                                </button>

                                <div className="or-divide"><span>hoặc</span></div>

                                <button className="btn theme-btn w-100" type="button" onClick={() => navigate('/login')}>
                                    Đăng nhập
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
