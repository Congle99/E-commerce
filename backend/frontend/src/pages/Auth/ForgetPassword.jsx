import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "~/components/Api.jsx";
import "./ForgetPassword.scss";

const ForgetPassword = () => {
    const { http } = Api();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [questionPassword, setQuestionPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isVerified, setIsVerified] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleVerify = async () => {
        setLoading(true);
        setError("");
        setMessage("");

        // HTML & khoảng trắng regex
        const htmlTagRegex = /<[^>]*>/;
        const whitespaceRegex = /^[\s\u3000]+$/;

        // VALIDATION
        if (!email.trim()) {
            setError("Email là bắt buộc.");
            setLoading(false);
            return;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Email không đúng định dạng.");
            setLoading(false);
            return;
        } else if (htmlTagRegex.test(email) || whitespaceRegex.test(email)) {
            setError("Email không hợp lệ.");
            setLoading(false);
            return;
        }

        if (!questionPassword.trim()) {
            setError("Câu hỏi bảo mật là bắt buộc.");
            setLoading(false);
            return;
        } else if (questionPassword.length > 50) {
            setError("Câu hỏi bảo mật không được vượt quá 50 ký tự.");
            setLoading(false);
            return;
        } else if (htmlTagRegex.test(questionPassword)) {
            setError("Câu hỏi bảo mật không được chứa mã HTML.");
            setLoading(false);
            return;
        }

        try {
            const response = await http.post("/verify-reset", {
                email,
                questionpassword: questionPassword,
            });

            if (response.data.success) {
                setIsVerified(true);
                setMessage("Xác thực thành công. Vui lòng nhập mật khẩu mới.");
            } else {
                setError(response.data.message || "Thông tin không chính xác.");
            }
        } catch (err) {
            setError("Thông tin không chính xác. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
    setError("");
    setMessage("");

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

    if (!lowercaseRegex.test(newPassword) || !digitRegex.test(newPassword)) {
        setError("Mật khẩu phải chứa ít nhất một chữ thường và một số.");
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

    try {
        const response = await http.post("/reset-password", {
            email,
            newPassword,
        });

        if (response.data.success) {
            setMessage("Mật khẩu đã được thay đổi thành công. Chuyển hướng...");
            setTimeout(() => navigate("/login"), 2000);
        } else {
            setError(response.data.message || "Đổi mật khẩu thất bại.");
        }
    } catch (err) {
        setError("Đã xảy ra lỗi khi đổi mật khẩu.");
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
                        <label>
                            Câu hỏi bảo mật (Nơi du lịch bạn thích nhất)
                        </label>
                        <input
                            type="text"
                            value={questionPassword}
                            onChange={(e) =>
                                setQuestionPassword(e.target.value)
                            }
                            placeholder="Câu hỏi bảo mật"
                        />
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleVerify}
                        disabled={loading}
                    >
                        {loading ? "Đang kiểm tra..." : "Xác thực"}
                    </button>
                </>
            )}

            {isVerified && (
                <>
                    <div className="form-group mt-4">
                        <label>Mật khẩu mới</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Nhập mật khẩu mới"
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Ẩn" : "Hiện"}
                            </button>
                        </div>
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

                    <button
                        className="btn btn-success"
                        onClick={handleResetPassword}
                    >
                        Đổi mật khẩu
                    </button>
                </>
            )}
        </div>
    );
};

export default ForgetPassword;
