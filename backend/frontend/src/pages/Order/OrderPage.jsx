import React, { useState, useEffect } from 'react';
import '../Order/OrderPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import Api from '~/components/Api.jsx';
import { useNavigate } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';

const { http } = Api();

const QuanLyDonHang = () => {
    const navigate = useNavigate();
    const [orders, setOrder] = useState([]);
    const [orderDetailsMap, setOrderDetailsMap] = useState({});
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1); // Tổng số trang
    // State để quản lý trạng thái Collapse cho từng sản phẩm
    const [collapseState, setCollapseState] = useState({});
    const [updatedStatus, setUpdatedStatus] = useState({});
    const [message, setMessage] = useState(null);
    const [loadingMap, setLoadingMap] = useState({});

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

    const fetchOrderDetail = async (id) => {
        try {
            setLoadingMap((prev) => ({ ...prev, [id]: true }));
            const response = await http.get(`order/order-details/${id}`);
            console.log('API response:', response);
            if (response.data) {
                setOrderDetailsMap((prev) => ({
                    ...prev,
                    [id]: response.data.data, // Lưu response.data
                }));
            } else {
                setMessage('Không tìm thấy chi tiết đơn hàng');
                setOrderDetailsMap((prev) => ({ ...prev, [id]: null }));
            }
        } catch (err) {
            setMessage(<div>Không tìm thấy chi tiết đơn hàng</div>);
            setOrderDetailsMap((prev) => ({ ...prev, [id]: null }));
            console.error('Error fetching order details:', err);
        } finally {
            setLoadingMap((prev) => ({ ...prev, [id]: false }));
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
    //Chuyển trang chi tiết đơn hàng
    const handleViewDetail = (id) => {
        navigate(`order-details/${id}`);
    };

    const handleRowClick = (orderId) => {
        const newCollapseState = {};
        Object.keys(collapseState).forEach((key) => {
            newCollapseState[key] = false;
        });
        newCollapseState[orderId] = true;
        setCollapseState(newCollapseState);
        fetchOrderDetail(orderId);
    };

    const handleStatusChange = (orderId, newStatus) => {
        setUpdatedStatus((prev) => ({
            ...prev,
            [orderId]: newStatus,
        }));
    };

    const handleCancel = (orderId) => {
        setCollapseState((prev) => ({
            ...prev,
            [orderId]: false,
        }));
        setUpdatedStatus((prev) => ({
            ...prev,
            [orderId]: undefined,
        }));
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(orders) && orders.length > 0 ? (
                                        orders.map((order) => (
                                            <React.Fragment key={order.id}>
                                                <tr
                                                    onClick={() => handleRowClick(order.id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <td>{order.id}</td>
                                                    <td>{order.user?.email || 'N/A'}</td>
                                                    <td>{order.created_at}</td>
                                                    <td>{order.total_price}</td>
                                                    <td>
                                                        <span className="badge bg-success">{order.status}</span>
                                                    </td>
    
                                                </tr>
                                                {/* Collapse Form */}
                                                <tr>
                                                    <td colSpan="6" className="p-0">
                                                        <Collapse in={collapseState[order.id]}>
                                                            <div id={`collapse-${order.id}`} className="p-3">
                                                                <h6>Chi tiết đơn hàng #{order.id}</h6>
                                                                {loadingMap[order.id] ? (
                                                                    <div>Đang tải...</div>
                                                                ) : orderDetailsMap[order.id] ? (
                                                                    <>
                                                                        <div className="row mb-3">
                                                                            <div className="col-md-3">
                                                                                <label className="form-label">Mã đơn:</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    value={orderDetailsMap[order.id][0]?.order?.id || order.id}
                                                                                    readOnly
                                                                                />
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <label className="form-label">Khách hàng:</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    value={
                                                                                        orderDetailsMap[order.id][0]?.order?.user?.email ||
                                                                                        order.user?.email ||
                                                                                        'N/A'
                                                                                    }
                                                                                    readOnly
                                                                                />
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <label className="form-label">Ngày đặt:</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    value={
                                                                                        orderDetailsMap[order.id][0]?.created_at ||
                                                                                        order.created_at
                                                                                    }
                                                                                    readOnly
                                                                                />
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <label className="form-label">Tổng tiền:</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    value={
                                                                                        orderDetailsMap[order.id][0]?.order?.total_price ||
                                                                                        order.total_price
                                                                                    }
                                                                                    readOnly
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mb-3">
                                                                            <div className="col-md-3">
                                                                                <label className="form-label">Trạng thái:</label>
                                                                                <select
                                                                                    className="form-select form-select-sm"
                                                                                    value={
                                                                                        updatedStatus[order.id] ||
                                                                                        orderDetailsMap[order.id][0]?.order?.status ||
                                                                                        order.status
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        handleStatusChange(order.id, e.target.value)
                                                                                    }
                                                                                >
                                                                                    <option value="Đã giao">Đã giao</option>
                                                                                    <option value="Chưa giao">Chưa giao</option>
                                                                                    <option value="Hủy">Hủy</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <label className="form-label">Địa chỉ giao hàng:</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    value={
                                                                                        orderDetailsMap[order.id][0]?.address ||
                                                                                        '123 Đường ABC, Quận 1, TP.HCM'
                                                                                    }
                                                                                    readOnly
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <h6>Danh sách sản phẩm</h6>
                                                                        <table className="table table-bordered table-hover">
                                                                            <thead className="table-dark">
                                                                                <tr>
                                                                                    <th>Tên sản phẩm</th>
                                                                                    <th>Số lượng</th>
                                                                                    <th>Giá</th>
                                                                                    <th>Tổng</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {orderDetailsMap[order.id] &&
                                                                                Array.isArray(orderDetailsMap[order.id]) &&
                                                                                orderDetailsMap[order.id].length > 0 ? (
                                                                                    orderDetailsMap[order.id].map((item, index) => (
                                                                                        <tr key={index}>
                                                                                            <td>{item.product?.name || 'N/A'}</td>
                                                                                            <td>{item.quantity || 0}</td>
                                                                                            <td>{item.product?.price || 0}</td>
                                                                                            <td>{(item.quantity || 0) * (item.product?.price || 0)}</td>
                                                                                        </tr>
                                                                                    ))
                                                                                ) : (
                                                                                    <tr>
                                                                                        <td colSpan="4">Không có sản phẩm</td>
                                                                                    </tr>
                                                                                )}
                                                                            </tbody>
                                                                        </table>
                                                                    </>
                                                                ) : (
                                                                    <div>{message || 'Không có dữ liệu chi tiết'}</div>
                                                                )}
                                                                <div className="d-flex justify-content-end mt-3">
                                                                    <button className="btn btn-sm btn-primary me-2">Cập nhật</button>
                                                                    <button className="btn btn-sm btn-success me-2">Lưu</button>
                                                                    <button className="btn btn-sm btn-info me-2">In</button>
                                                                    <button
                                                                        className="btn btn-sm btn-secondary"
                                                                        onClick={() => handleCancel(order.id)}
                                                                    >
                                                                        Hủy
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </Collapse>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
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
                                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                            Trước
                                        </button>
                                    </li>
                                    {renderPagination()}
                                    <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
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