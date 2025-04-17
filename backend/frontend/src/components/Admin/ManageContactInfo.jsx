import React, { useEffect, useState } from "react";
import "./ManageContactInfo.scss";

const ManageContactInfo = () => {
    const [info, setInfo] = useState({
        email: "",
        phone: "",
        address: "",
        google_map: "",
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/api/contact-info")
            .then((res) => res.json())
            .then((data) => {
                if (data) setInfo(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/api/contact-info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        }).then(async (res) => {
            const text = await res.text();
            console.log("Raw response:", text);
            try {
                const data = JSON.parse(text);
                setMessage("Cập nhật thành công!");
            } catch (err) {
                console.error("JSON parse error:", err);
                setMessage("Lỗi phản hồi không phải JSON.");
            }
        });
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;

    return (
        <div className="contact-form-container">
            <h2>Quản lý thông tin liên hệ</h2>
            {message && <div className="message">{message}</div>}
            <form onSubmit={handleSubmit} className="contact-form">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={info.email}
                    onChange={handleChange}
                />

                <label>Số điện thoại</label>
                <input
                    type="text"
                    name="phone"
                    value={info.phone}
                    onChange={handleChange}
                />

                <label>Địa chỉ</label>
                <input
                    type="text"
                    name="address"
                    value={info.address}
                    onChange={handleChange}
                />

                <label>Link Google Maps (iframe)</label>
                <input
                    type="text"
                    name="google_map"
                    value={info.google_map}
                    onChange={handleChange}
                />

                <button type="submit">Lưu thông tin</button>
            </form>
        </div>
    );
};

export default ManageContactInfo;
