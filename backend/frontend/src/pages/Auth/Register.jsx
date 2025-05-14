import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '~/components/Api.jsx';
import './Register.scss';

const { http } = Api();

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateForm = () => {
        let isValid = true;
        const errors = {
            email: '',
            password: '',
            confirmPassword: ''
        };

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
        } else if (password.length < 6) {
            errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
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
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        setError('');

        const userData = { 
            email, 
            password,
            role: 'user' // Mặc định role là user
        };

        try {
            const response = await http.post('/api/register', userData);
            if (response.data.success) {
                alert('Đăng ký thành công!');
                navigate('/login');
            } else {
                setError(response.data.message || 'Đăng ký thất bại.');
            }
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error);
            setError('Đã xảy ra lỗi, vui lòng thử lại.');
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Đã xảy ra lỗi.');
                const serverErrors = {
                    email: error.response.data.errors?.email?.[0] || '',
                    password: error.response.data.errors?.password?.[0] || '',
                    confirmPassword: ''
                };
                setFormErrors(serverErrors);
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
                            <h3 className="text-center mb-60">Signup From Here</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email-id">Email <span className="required">*</span></label>
                                    <input
                                        id="email-id"
                                        type="email"
                                        placeholder="Enter Username or Email address..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={formErrors.email ? 'error' : ''}
                                        required
                                    />
                                    {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pass">Password... <span className="required">*</span></label>
                                    <div className="password-field">
                                        <input
                                            id="pass"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter password..."
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={formErrors.password ? 'error' : ''}
                                            required
                                        />
                                        <button 
                                            type="button" 
                                            className="toggle-password"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? "Ẩn" : "Hiện"}
                                        </button>
                                    </div>
                                    {formErrors.password && <div className="error-message">{formErrors.password}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirm-pass">Confirm Password <span className="required">*</span></label>
                                    <div className="password-field">
                                        <input
                                            id="confirm-pass"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Enter password again..."
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={formErrors.confirmPassword ? 'error' : ''}
                                            required
                                        />
                                        <button 
                                            type="button" 
                                            className="toggle-password"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? "Ẩn" : "Hiện"}
                                        </button>
                                    </div>
                                    {formErrors.confirmPassword && <div className="error-message">{formErrors.confirmPassword}</div>}
                                </div>

                                <button 
                                    className="btn theme-btn-2 w-100" 
                                    type="submit" 
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span>
                                            <span className="spinner"></span> Đang xử lý...
                                        </span>
                                    ) : (
                                        'Đăng ký ngay'
                                    )}
                                </button>
                                
                                <div className="or-divide"><span>hoặc</span></div>
                                
                                <button 
                                    className="btn theme-btn w-100" 
                                    type="button" 
                                    onClick={() => navigate('/login')}
                                >
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