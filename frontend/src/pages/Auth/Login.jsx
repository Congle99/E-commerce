import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "~/components/Api.jsx";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const { http } = Api();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await http.post("/login", {
        email,
        password,
        remember: remember,
      });

      if (response.data.success) {
        // Lưu thông tin user vào localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));

        // 🔔 Phát sự kiện login để các component khác biết
        window.dispatchEvent(new Event("userLoggedIn"));

        console.log("User data:", response);
        const role = response.data.user.role;
        if (role === "admin") {
          navigate("/");
        } else {
          navigate("/user");
        }
      } else {
        setError(response.data.message || "Đăng nhập thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      setError("Đã xảy ra lỗi, vui lòng thử lại.");
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
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>Login</span>
                  </li>
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
                <h3 className="text-center mb-60">Login From Here</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <label htmlFor="email">
                    Email Address <span>**</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter Username or Email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="password">
                    Password <span>**</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="login-action mb-20 fix">
                    <span className="log-rem f-left">
                      <input
                        id="remember"
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                      />
                      <label htmlFor="remember">Remember me!</label>
                    </span>
                    <span className="forgot-login f-right">
                      <a href="#">Lost your password?</a>
                    </span>
                  </div>
                  <button
                    className="btn theme-btn-2 w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login Now"}
                  </button>
                  <div className="or-divide">
                    <span>or</span>
                  </div>
                  <button
                    className="btn theme-btn w-100"
                    type="button"
                    onClick={() => navigate("/register")}
                  >
                    Register Now
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
