import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "~/components/Api.jsx";
import "./Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const { http } = Api();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Khi component mount, kiểm tra cookie đã lưu email chưa
    useEffect(() => {
        const rememberedEmail = Cookies.get("rememberedEmail");
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRemember(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await http.post("/login", { email, password });

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                // Lưu cookie nếu người dùng chọn "Nhớ tài khoản"
                if (remember) {
                    Cookies.set("rememberedEmail", email, { expires: 7 }); // 7 ngày
                } else {
                    Cookies.remove("rememberedEmail");
                }

                // Điều hướng theo vai trò
                const role = response.data.user.role;
                navigate(role === "admin" ? "/admin" : "/user");
            } else {
                setError(response.data.message || "Đăng nhập thất bại.");
            }
        } catch (err) {
            if (err.response?.status === 404) {
                setError("Tài khoản không tồn tại.");
            } else if (err.response?.status === 401) {
                setError("Mật khẩu không đúng.");
            } else {
                setError("Đã xảy ra lỗi, vui lòng thử lại.");
            }
        } finally {
            setLoading(false);
        }
    };

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
                                <h1>Login</h1>
                                <ul className="breadcrumb-menu">
                                    <li><a href="/">Home</a></li>
                                    <li><span>Login</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="login-area pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="basic-login">
                                <h3 className="text-center mb-60">Đăng nhập tài khoản</h3>
                                {error && (
                                    <div className="alert alert-danger">{error}</div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="email">Email <span className="required">*</span></label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Nhập email..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="password">Mật khẩu <span className="required">*</span></label>
                                    <div className="password-field">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Nhập mật khẩu..."
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="toggle-password"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </button>
                                    </div>
                                    <div className="login-action mb-20 fix">
                                        <span className="log-rem f-left">
                                            <input
                                                id="remember"
                                                type="checkbox"
                                                checked={remember}
                                                onChange={(e) => setRemember(e.target.checked)}
                                            />
                                            <label htmlFor="remember">Nhớ tài khoản</label>
                                        </span>
                                        <span className="forgot-login f-right">
                                            <a href="/forgetPassword">Quên mật khẩu?</a>
                                        </span>
                                    </div>
                                    <button className="btn theme-btn-2 w-100" type="submit" disabled={loading}>
                                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                                    </button>
                                    <div className="or-divide"><span>hoặc</span></div>
                                    <button
                                        className="btn theme-btn w-100"
                                        type="button"
                                        onClick={() => navigate("/register")}
                                    >
                                        Đăng ký
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Login;
