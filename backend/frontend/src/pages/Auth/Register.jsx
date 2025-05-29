import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "~/components/Api.jsx";
import "./Register.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faCheck,
    faExclamationTriangle,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
    const navigate = useNavigate();
    const { http } = Api();

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password_confirmation: "",
        questionpassword: "",
    });

    // UI state
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ type: "", message: "", show: false });
    const [fieldErrors, setFieldErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showQuestionPassword, setShowQuestionPassword] = useState(false);

    // Password strength indicator
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        feedback: "",
        color: "weak",
    });

    // Handle input changes
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Clear field error when user starts typing
        if (fieldErrors[field]) {
            setFieldErrors((prev) => ({ ...prev, [field]: "" }));
        }

        // Check password strength
        if (field === "password") {
            checkPasswordStrength(value);
        }

        // Clear alert when user starts typing
        if (alert.show) {
            setAlert({ type: "", message: "", show: false });
        }
    };

    // Password strength checker
    const checkPasswordStrength = (password) => {
        let score = 0;
        let feedback = "";
        let color = "weak";

        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        switch (score) {
            case 0:
            case 1:
                feedback = "Rất yếu";
                color = "weak";
                break;
            case 2:
                feedback = "Yếu";
                color = "weak";
                break;
            case 3:
                feedback = "Trung bình";
                color = "medium";
                break;
            case 4:
                feedback = "Mạnh";
                color = "strong";
                break;
            case 5:
                feedback = "Rất mạnh";
                color = "very-strong";
                break;
        }

        setPasswordStrength({ score, feedback, color });
    };

    // Client-side validation
    const validateForm = () => {
        const errors = {};
        let isValid = true;

        // Email validation
        if (!formData.email.trim()) {
            errors.email = "Email là bắt buộc";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Email không đúng định dạng";
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            errors.password = "Mật khẩu là bắt buộc";
            isValid = false;
        } else if (formData.password.length < 8) {
            errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
            isValid = false;
        } else if (/\s/.test(formData.password)) {
            errors.password = "Mật khẩu không được chứa khoảng trắng";
            isValid = false;
        } else if (formData.password.length > 50) {
            errors.password = "Mật khẩu không được dài quá 50 ký tự";
            isValid = false;
        } else if (passwordStrength.score < 3) {
            errors.password = "Mật khẩu cần mạnh hơn";
            isValid = false;
        }

        // Confirm password validation
        if (!formData.password_confirmation) {
            errors.password_confirmation = "Vui lòng xác nhận mật khẩu";
            isValid = false;
        } else if (formData.password !== formData.password_confirmation) {
            errors.password_confirmation = "Mật khẩu xác nhận không khớp";
            isValid = false;
        }

        // Question password validation
        if (!formData.questionpassword.trim()) {
            errors.questionpassword = "Câu hỏi bảo mật là bắt buộc";
            isValid = false;
        } else if (formData.questionpassword.length > 50) {
            errors.questionpassword =
                "Câu hỏi bảo mật không được vượt quá 50 ký tự";
            isValid = false;
        }

        setFieldErrors(errors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showAlert("error", "Vui lòng kiểm tra lại thông tin đã nhập");
            return;
        }

        setLoading(true);

        try {
            const response = await http.post("/register", formData);

            if (response.data.success) {
                showAlert(
                    "success",
                    "Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập sau 3 giây..."
                );

                // Store token if auto-login is enabled
                if (response.data.token) {
                    localStorage.setItem("auth_token", response.data.token);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.user)
                    );
                }

                // Redirect after 3 seconds
                setTimeout(() => {
                    navigate("/login", {
                        state: {
                            message: "Đăng ký thành công! Vui lòng đăng nhập.",
                            email: formData.email,
                        },
                    });
                }, 3000);
            }
        } catch (error) {
            console.error("Registration error:", error);

            if (error.response) {
                const { status, data } = error.response;

                // Handle validation errors from server
                if (status === 400 && data.errors) {
                    setFieldErrors(data.errors);
                    showAlert("error", data.message || "Dữ liệu không hợp lệ");
                }
                // Handle rate limiting
                else if (status === 429) {
                    showAlert(
                        "error",
                        data.message ||
                            "Quá nhiều yêu cầu. Vui lòng thử lại sau."
                    );
                }
                // Handle server errors
                else if (status === 500) {
                    showAlert("error", "Lỗi hệ thống. Vui lòng thử lại sau.");
                }
                // Handle other errors
                else {
                    showAlert(
                        "error",
                        data.message || "Đăng ký thất bại. Vui lòng thử lại."
                    );
                }
            } else {
                showAlert(
                    "error",
                    "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    // Show alert helper
    const showAlert = (type, message) => {
        setAlert({ type, message, show: true });

        // Auto hide success alerts
        if (type === "success") {
            setTimeout(() => {
                setAlert((prev) => ({ ...prev, show: false }));
            }, 5000);
        }
    };

    return (
        <section className="login-area pt-100 pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="basic-login">
                            <h3 className="text-center mb-60">
                                Đăng ký tài khoản
                            </h3>

                            {/* Alert Messages */}
                            {alert.show && (
                                <div
                                    className={`alert alert-${
                                        alert.type === "error"
                                            ? "danger"
                                            : alert.type
                                    } alert-dismissible`}
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            alert.type === "success"
                                                ? faCheck
                                                : faExclamationTriangle
                                        }
                                        className="me-2"
                                    />
                                    {alert.message}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() =>
                                            setAlert({ ...alert, show: false })
                                        }
                                    ></button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} noValidate>
                                {/* Email Field */}
                                <div className="form-group">
                                    <label htmlFor="email-id">
                                        Email{" "}
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        id="email-id"
                                        type="email"
                                        placeholder="Nhập email..."
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value
                                                    .toLowerCase()
                                                    .trim()
                                            )
                                        }
                                        className={
                                            fieldErrors.email ? "error" : ""
                                        }
                                        disabled={loading}
                                        autoComplete="email"
                                    />
                                    {fieldErrors.email && (
                                        <div className="error-message">
                                            <FontAwesomeIcon
                                                icon={faExclamationTriangle}
                                                className="me-1"
                                            />
                                            {fieldErrors.email}
                                        </div>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="form-group">
                                    <label htmlFor="password">
                                        Mật khẩu{" "}
                                        <span className="required">*</span>
                                    </label>
                                    <div className="password-field">
                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Nhập mật khẩu..."
                                            value={formData.password}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                fieldErrors.password
                                                    ? "error"
                                                    : ""
                                            }
                                            disabled={loading}
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="toggle-password"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            disabled={loading}
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    showPassword
                                                        ? faEyeSlash
                                                        : faEye
                                                }
                                            />
                                        </button>
                                    </div>

                                    {/* Password Strength Indicator */}
                                    {formData.password && (
                                        <div
                                            className={`password-strength ${passwordStrength.color}`}
                                        >
                                            <div className="strength-bar">
                                                <div
                                                    className="strength-fill"
                                                    style={{
                                                        width: `${
                                                            (passwordStrength.score /
                                                                5) *
                                                            100
                                                        }%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="strength-text">
                                                {passwordStrength.feedback}
                                            </span>
                                        </div>
                                    )}

                                    {fieldErrors.password && (
                                        <div className="error-message">
                                            <FontAwesomeIcon
                                                icon={faExclamationTriangle}
                                                className="me-1"
                                            />
                                            {fieldErrors.password}
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div className="form-group">
                                    <label htmlFor="confirm-password">
                                        Xác nhận mật khẩu{" "}
                                        <span className="required">*</span>
                                    </label>
                                    <div className="password-field">
                                        <input
                                            id="confirm-password"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Nhập lại mật khẩu..."
                                            value={
                                                formData.password_confirmation
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                fieldErrors.password_confirmation
                                                    ? "error"
                                                    : ""
                                            }
                                            disabled={loading}
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="toggle-password"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            disabled={loading}
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    showConfirmPassword
                                                        ? faEyeSlash
                                                        : faEye
                                                }
                                            />
                                        </button>
                                    </div>
                                    {fieldErrors.password_confirmation && (
                                        <div className="error-message">
                                            <FontAwesomeIcon
                                                icon={faExclamationTriangle}
                                                className="me-1"
                                            />
                                            {fieldErrors.password_confirmation}
                                        </div>
                                    )}
                                </div>

                                {/* Security Question (Optional) */}
                                <div className="form-group">
                                    <label htmlFor="question-password">
                                        Câu hỏi bảo mật{" "}
                                        <span className="text-muted">
                                            (Dùng để lấy lại mật khẩu)
                                        </span>
                                    </label>
                                    <div className="password-field">
                                        <input
                                            id="question-password"
                                            type={
                                                showQuestionPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Địa điểm du lịch bạn thích nhất?"
                                            value={formData.questionpassword}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "questionpassword",
                                                    e.target.value
                                                )
                                            }
                                            disabled={loading}
                                        />
                                        {fieldErrors.questionpassword && (
                                            <div className="error-message">
                                                <FontAwesomeIcon
                                                    icon={faExclamationTriangle}
                                                    className="me-1"
                                                />
                                                {fieldErrors.questionpassword}
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            className="toggle-password"
                                            onClick={() =>
                                                setShowQuestionPassword(
                                                    !showQuestionPassword
                                                )
                                            }
                                            disabled={loading}
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    showQuestionPassword
                                                        ? faEyeSlash
                                                        : faEye
                                                }
                                            />
                                        </button>
                                    </div>
                                    <small className="form-text text-muted">
                                        Câu hỏi này sẽ được dùng để khôi phục
                                        mật khẩu
                                    </small>
                                </div>

                                {/* Submit Button */}
                                <button
                                    className="btn theme-btn-2 w-100"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faSpinner}
                                                spin
                                                className="me-2"
                                            />
                                            Đang xử lý...
                                        </span>
                                    ) : (
                                        "Đăng ký ngay"
                                    )}
                                </button>

                                <div className="or-divide">
                                    <span>hoặc</span>
                                </div>

                                {/* Login Button */}
                                <button
                                    className="btn theme-btn w-100"
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    disabled={loading}
                                >
                                    Đã có tài khoản? Đăng nhập
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
