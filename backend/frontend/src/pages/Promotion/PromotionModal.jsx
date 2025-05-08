import React, { useState, useEffect } from "react";
import "./PromotionModal.scss";
import Api from "~/components/Api";

const { http } = Api();

const PromotionModal = ({ show, onClose, onSave, promotion }) => {
    const [formData, setFormData] = useState({
        code: "",
        discount_percentage: "",
        valid_from: "",
        valid_to: "",
        usage_limit: "",
    });
    const [message, setMessage] = useState("");

    // Khởi tạo formData khi chỉnh sửa mã khuyến mãi
    useEffect(() => {
        if (promotion) {
            setFormData({
                code: promotion.code || "",
                discount_percentage: promotion.discount_percentage || "",
                valid_from: promotion.valid_from || "",
                valid_to: promotion.valid_to || "",
                usage_limit:
                    promotion.usage_limit !== null ? promotion.usage_limit : "",
            });
        } else {
            // Reset form khi thêm mới
            setFormData({
                code: "",
                discount_percentage: "",
                valid_from: "",
                valid_to: "",
                usage_limit: "",
            });
        }
    }, [promotion]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu
        if (
            !formData.code ||
            !formData.discount_percentage ||
            !formData.valid_from ||
            !formData.valid_to
        ) {
            setMessage("Vui lòng điền đầy đủ các trường bắt buộc!");
            return;
        }

        try {
            const discountPercentage = parseInt(
                formData.discount_percentage,
                10
            );
            const usageLimit = formData.usage_limit
                ? parseInt(formData.usage_limit, 10)
                : null;

            if (
                isNaN(discountPercentage) ||
                discountPercentage <= 0 ||
                discountPercentage > 100
            ) {
                setMessage(
                    "Phần trăm giảm giá phải nằm trong khoảng từ 1 đến 100!"
                );
                return;
            }

            if (usageLimit !== null && (isNaN(usageLimit) || usageLimit < 0)) {
                setMessage("Giới hạn sử dụng không thể âm!");
                return;
            }

            let response;
            if (promotion) {
                // Cập nhật mã khuyến mãi
                response = await http.put(
                    `/promotion-codes/${promotion.id}`,
                    formData
                );
                setMessage("Cập nhật mã khuyến mãi thành công");
            } else {
                // Thêm mã khuyến mãi mới
                response = await http.post("/promotion-codes", formData);
                setMessage("Tạo mã khuyến mãi thành công");
            }

            onSave(response.data);
            setFormData({
                code: "",
                discount_percentage: "",
                valid_from: "",
                valid_to: "",
                usage_limit: "",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setMessage(`Có lỗi xảy ra: ${errorMessage}`);
            console.error(
                "Error details:",
                error.response?.data?.errors || error
            );
        }
    };

    if (!show) return null;

    return (
        <>
            <div className="modal-backdrop fade show" onClick={onClose}></div>
            <div className="modal fade show" style={{ display: "block" }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-dark text-white">
                            <h5 className="modal-title">
                                {promotion
                                    ? "Chỉnh sửa mã khuyến mãi"
                                    : "Thêm mã khuyến mãi mới"}
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={onClose}
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                {message && (
                                    <div className="alert alert-info">
                                        {message}
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label className="form-label">
                                        Mã khuyến mãi
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Phần trăm giảm giá (%)
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="discount_percentage"
                                        value={formData.discount_percentage}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        max="100"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Ngày bắt đầu
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="valid_from"
                                        value={formData.valid_from}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Ngày kết thúc
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="valid_to"
                                        value={formData.valid_to}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Giới hạn sử dụng
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="usage_limit"
                                        value={formData.usage_limit}
                                        onChange={handleChange}
                                    />
                                    <div className="form-text">
                                        Để trống nếu không giới hạn số lần sử
                                        dụng.
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onClose}
                                >
                                    Đóng
                                </button>
                                <button type="submit" className="btn btn-dark">
                                    {promotion
                                        ? "Cập nhật mã khuyến mãi"
                                        : "Lưu mã khuyến mãi"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PromotionModal;
