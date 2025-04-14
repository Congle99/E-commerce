import React, { useState, useEffect } from 'react';
import '../Order/OrderPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faDownload, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import Api from '~/components/Api.jsx';

const { http } = Api();

const QuanLyDonHang = () => {
    const [orders, setOrder] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1); // Tổng số trang

    const fetchOrder = async (page = 1) => {
        try {
            const response = await http.get(`/order?page=${page}`);
            const { data, current_page, last_page } = response.data;
            setOrder(Array.isArray(data) ? data : []);
            setCurrentPage(current_page);
            setLastPage(last_page);
        } catch (err) {
            setError('Không thể tải danh sách đơn hàng');
            setOrder([]);
        }
    };

    useEffect(() => {
        fetchOrder(currentPage);
    }, [currentPage]);

    // Hàm chuyển trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    // Tạo danh sách trang để hiển thị
    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= lastPage; i++) {
            pages.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>
                        {i}
                    </button>
                </li>,
            );
        }
        return pages;
    };

    return (
        <div className="noi-dung-chinh">
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Quản lý đơn hàng</h1>
                    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-dark shadow-sm">
                        <FontAwesomeIcon icon={faDownload} className="text-white-50" /> Xuất báo cáo
                    </a>
                </div>

                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <h6 className="m-0 font-weight-bold text-dark">Danh sách đơn hàng</h6>
                        <div className="dropdown">
                            <button className="btn btn-dark dropdown-toggle" type="button">
                                <FontAwesomeIcon icon={faFilter} className="me-1" /> Lọc đơn hàng
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Tất cả</a></li>
                                <li><a className="dropdown-item" href="#">Chờ xác nhận</a></li>
                                <li><a className="dropdown-item" href="#">Đang giao</a></li>
                                <li><a className="dropdown-item" href="#">Đã giao</a></li>
                                <li><a className="dropdown-item" href="#">Đã hủy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Mã đơn</th>
                                        <th>Khách hàng</th>
                                        <th>Ngày đặt</th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(orders) && orders.length > 0 ? (
                                        orders.map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.user?.email || 'N/A'}</td>
                                                <td>{order.created_at}</td>
                                                <td>{order.total_price}</td>
                                                <td>
                                                    <span className="badge bg-success">{order.status}</span>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary">
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                    <button className="btn btn-sm btn-warning ms-1">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                Không có đơn hàng nào
                                                {error && <div className="text-danger">{error}</div>}
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
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                        >
                                            Trước
                                        </button>
                                    </li>
                                    {renderPagination()}
                                    <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(currentPage + 1)}
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
        </div>
    );
};

export default QuanLyDonHang;