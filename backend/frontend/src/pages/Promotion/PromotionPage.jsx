import React, { useState, useEffect } from "react";
import "./PromotionPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faDownload } from "@fortawesome/free-solid-svg-icons";
import Api from "~/components/Api.jsx";
import { useNavigate } from "react-router-dom";
import { Dropdown, Pagination } from "react-bootstrap";
import PromotionModal from "./PromotionModal.jsx";

const { http } = Api();

const PromotionPage = () => {
    const navigate = useNavigate();
    const [promotions, setPromotions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1); // Tổng số trang
    const [message, setMessage] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all"); // Bộ lọc trạng thái

    const [showModal, setShowModal] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    // Gọi API để lấy danh sách mã khuyến mãi
    const fetchPromotions = async (page = 1) => {
        try {
            const response = await http.get("promotion-codes", {
                params: { page },
            });
            setPromotions(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (err) {
            setMessage("Không thể tải danh sách mã khuyến mãi");
            setPromotions([]);
        }
    };
    // Hiển thị modal để chỉnh sửa
    const handleEditPromotion = (promotion) => {
        setSelectedPromotion(promotion);
        setShowModal(true);
    };

    // Lưu mã khuyến mãi
    const handleSavePromotion = (savedPromotion) => {
        setShowModal(false);
        // Cập nhật danh sách mã khuyến mãi hoặc gọi lại API fetchPromotions
    };
    // Hiển thị modal để thêm mới
    const handleAddPromotion = () => {
        setSelectedPromotion(null);
        setShowModal(true);
    };
    useEffect(() => {
        fetchPromotions(currentPage);
    }, [currentPage]);

    // Hàm chuyển trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    // Xóa mã khuyến mãi
    const deletePromotion = async (promotionId) => {
        if (
            window.confirm(
                `Bạn có chắc chắn muốn xóa mã khuyến mãi #${promotionId}?`
            )
        ) {
            try {
                await http.delete(`promotion-codes/${promotionId}`);
                setMessage("Xóa mã khuyến mãi thành công");
                fetchPromotions(currentPage);
            } catch (err) {
                setMessage("Xóa mã khuyến mãi thất bại");
            }
        }
    };

    // Tạo danh sách trang cho phân trang
    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= lastPage; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }
        return pages;
    };

    return (
        <div className="noi-dung-chinh">
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">
                        Quản lý mã khuyến mãi
                    </h1>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleAddPromotion()}
                    >
                        Thêm mã khuyến mãi
                    </button>
                </div>

                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <h6 className="m-0 font-weight-bold text-dark">
                            Danh sách mã khuyến mãi
                        </h6>
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                <FontAwesomeIcon
                                    icon={faFilter}
                                    className="me-1"
                                />{" "}
                                Lọc
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => setFilterStatus("all")}
                                >
                                    Tất cả
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => setFilterStatus("active")}
                                >
                                    Đang hoạt động
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => setFilterStatus("expired")}
                                >
                                    Hết hạn
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="card-body">
                        {message && (
                            <div
                                className={`alert ${
                                    message.includes("thành công")
                                        ? "alert-success"
                                        : "alert-danger"
                                }`}
                            >
                                {message}
                            </div>
                        )}
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Mã</th>
                                        <th>Phần trăm giảm giá</th>
                                        <th>Ngày bắt đầu</th>
                                        <th>Ngày kết thúc</th>
                                        <th>Giới hạn</th>
                                        <th>Đã sử dụng</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(promotions) &&
                                    promotions.length > 0 ? (
                                        promotions.map((promotion) => (
                                            <tr key={promotion.id}>
                                                <td>{promotion.id}</td>
                                                <td>{promotion.code}</td>
                                                <td>
                                                    {
                                                        promotion.discount_percentage
                                                    }
                                                    %
                                                </td>
                                                <td>{promotion.valid_from}</td>
                                                <td>{promotion.valid_to}</td>
                                                <td>
                                                    {promotion.usage_limit ||
                                                        "Không giới hạn"}
                                                </td>
                                                <td>{promotion.used_times}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={() =>
                                                            handleEditPromotion(
                                                                promotion
                                                            )
                                                        }
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() =>
                                                            deletePromotion(
                                                                promotion.id
                                                            )
                                                        }
                                                    >
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-center"
                                            >
                                                Không có mã khuyến mãi nào
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Phân trang */}
                        {lastPage > 1 && (
                            <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-end">
                                    <li
                                        className={`page-item ${
                                            currentPage === 1 ? "disabled" : ""
                                        }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage - 1
                                                )
                                            }
                                        >
                                            Trước
                                        </button>
                                    </li>
                                    {renderPagination()}
                                    <li
                                        className={`page-item ${
                                            currentPage === lastPage
                                                ? "disabled"
                                                : ""
                                        }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage + 1
                                                )
                                            }
                                        >
                                            Sau
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            </div>
            <PromotionModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSavePromotion}
                promotion={selectedPromotion}
            />
        </div>
    );
};

export default PromotionPage;
