import React, { useState, useEffect } from 'react';
import './OrderPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faDownload } from '@fortawesome/free-solid-svg-icons';
import Api from '~/components/Api.jsx';
import { useNavigate } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Dropdown, Pagination } from 'react-bootstrap';

const { http } = Api();

const QuanLyDonHang = () => {
    const navigate = useNavigate();
    const [orders, setOrder] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [orderDetailsMap, setOrderDetailsMap] = useState({});
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1); // Tổng số trang
    // State để quản lý trạng thái Collapse cho từng sản phẩm
    const [collapseState, setCollapseState] = useState({});
    const [updatedStatus, setUpdatedStatus] = useState({});
    const [message, setMessage] = useState(null);
    const [loadingMap, setLoadingMap] = useState({});

    // Gọi API để lấy danh sách đơn hàng
    const fetchOrder = async (status, page = 1) => {
        setLoadingMap(true);
        try {
            const response = await http.get('order/', {
                params: {
                    status: status === 'all' ? '' : status,
                    page,
                },
            });
            setOrder(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
            setError(null);
        } catch (err) {
            setError('Không thể tải danh sách đơn hàng');
            setOrder([]);
        } finally {
            setLoadingMap(false);
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
            setOrderDetailsMap((prev) => ({ ...prev, [id]: null }));
            console.error('Error fetching order details:', err);
        } finally {
            setLoadingMap((prev) => ({ ...prev, [id]: false }));
        }
    };

    // Gọi API khi filterStatus hoặc currentPage thay đổi
    useEffect(() => {
        fetchOrder(filterStatus, currentPage);
    }, [filterStatus, currentPage]);

    //Hàm cập nhật order
    const updateOrderStatus = async (orderId) => {
        try {
            const newStatus = updatedStatus[orderId]; // Lấy trạng thái mới từ state
            if (!newStatus) {
                setMessage('Vui lòng chọn trạng thái mới');
                return;
            }

            // Gửi yêu cầu PUT đến API để cập nhật trạng thái
            const response = await http.put(`/order/${orderId}`, {
                status: newStatus,
            });

            if (response.data) {
                // Cập nhật danh sách đơn hàng sau khi cập nhật thành công
                setOrder((prevOrders) =>
                    prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
                );
                setMessage('Cập nhật trạng thái thành công');
                setTimeout(() => setMessage(null), 3000); // Xóa sau 3 giây
                setCollapseState((prev) => ({ ...prev, [orderId]: false })); // Đóng collapse
                setUpdatedStatus((prev) => ({ ...prev, [orderId]: undefined })); // Xóa trạng thái đã chọn
            }
        } catch (err) {
            setMessage('Cập nhật trạng thái thất bại');
            console.error('Error updating order status:', err);
        }
    };

    // Hàm chuyển trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };
    // Xử lý khi chọn trạng thái trong dropdown
    const handleFilter = (status) => {
        setFilterStatus(status);
        setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
    };

    // Tạo danh sách trang cho phân trang
    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= lastPage; i++) {
            pages.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                    {i}
                </Pagination.Item>,
            );
        }
        return pages;
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
    const handlePrint = (orderId) => {
        // Kiểm tra xem dữ liệu chi tiết đơn hàng đã có chưa
        if (!orderDetailsMap[orderId] || loadingMap[orderId]) {
            setMessage('Vui lòng đợi dữ liệu chi tiết đơn hàng được tải');
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        const printContent = document.getElementById(`print-order-${orderId}`);
        if (!printContent) {
            setMessage('Không tìm thấy nội dung để in');
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            setMessage('Không thể mở cửa sổ in. Vui lòng kiểm tra cài đặt trình duyệt.');
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        printWindow.document.write(`
            <html>
                <head>
                    <title>In Đơn Hàng #${orderId}</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            margin: 20mm; 
                            font-size: 12pt;
                        }
                        .print-container { 
                            max-width: 210mm; /* Kích thước A4 */
                            margin: 0 auto; 
                        }
                        .print-header { 
                            text-align: center; 
                            margin-bottom: 20mm; 
                        }
                        .print-table { 
                            width: 100%; 
                            border-collapse: collapse; 
                            margin-top: 10mm; 
                        }
                        .print-table th, .print-table td { 
                            border: 1px solid #000; 
                            padding: 8px; 
                            text-align: left; 
                        }
                        .print-table th { 
                            background-color: #f2f2f2; 
                            font-weight: bold; 
                        }
                        .print-details { 
                            margin-bottom: 20mm; 
                        }
                        .print-details p { 
                            margin: 5px 0; 
                        }
                        @media print {
                            body { 
                                margin: 0; 
                                size: A4 portrait; 
                            }
                            .no-print { 
                                display: none; 
                            }
                            @page { 
                                margin: 20mm; 
                            }
                        }
                    </style>
                </head>
                <body>
                    ${printContent.innerHTML}
                    <script>
                        window.onload = function() { 
                            setTimeout(() => { 
                                window.print(); 
                            }, 500); 
                        }
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <div className="noi-dung-chinh">
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Quản lý đơn hàng</h1>
                </div>

                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <h6 className="m-0 font-weight-bold text-dark">Danh sách đơn hàng</h6>
                        <div className="dropdown">
                            <Dropdown>
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    <FontAwesomeIcon icon={faFilter} className="me-1" /> Lọc đơn hàng
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleFilter('all')}>Tất cả</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleFilter('Chờ xác nhận')}>Chờ xác nhận</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleFilter('Đang giao')}>Đang giao</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleFilter('Đã giao')}>Đã giao</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleFilter('Hủy')}>Đã hủy</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="card-body">
                        {message && (
                            <div
                                className={`alert ${message.includes('thành công') ? 'alert-success' : 'alert-danger'}`}
                            >
                                {message}
                            </div>
                        )}
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
                                                        <span
                                                            className={`badge bg-${
                                                                order.status === 'Đã giao'
                                                                    ? 'success'
                                                                    : order.status === 'Đang giao'
                                                                    ? 'warning'
                                                                    : order.status === 'Hủy' 
                                                                    ? 'danger'
                                                                    : 'info'
                                                            }`}
                                                        >
                                                            {order.status}
                                                        </span>
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
                                                                                <label className="form-label">
                                                                                    Mã đơn:
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    value={
                                                                                        orderDetailsMap[order.id][0]
                                                                                            ?.order?.id || order.id
                                                                                    }
                                                                                    readOnly
                                                                                />
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <label className="form-label">
                                                                                    Khách hàng:
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    value={
                                                                                        orderDetailsMap[order.id][0]
                                                                                            ?.order?.user?.email ||
                                                                                        order.user?.email ||
                                                                                        'N/A'
                                                                                    }
                                                                                    readOnly
                                                                                />
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <label className="form-label">
                                                                                    Ngày đặt:
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    value={
                                                                                        orderDetailsMap[order.id][0]
                                                                                            ?.created_at ||
                                                                                        order.created_at
                                                                                    }
                                                                                    readOnly
                                                                                />
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <label className="form-label">
                                                                                    Tổng tiền:
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    value={
                                                                                        orderDetailsMap[order.id][0]
                                                                                            ?.order?.total_price ||
                                                                                        order.total_price
                                                                                    }
                                                                                    readOnly
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mb-3">
                                                                            <div className="col-md-3">
                                                                                <label className="form-label">
                                                                                    Trạng thái:
                                                                                </label>
                                                                                <select
                                                                                    className="form-select form-select-sm"
                                                                                    value={
                                                                                        updatedStatus[order.id] ||
                                                                                        orderDetailsMap[order.id][0]
                                                                                            ?.order?.status ||
                                                                                        order.status
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        handleStatusChange(
                                                                                            order.id,
                                                                                            e.target.value,
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <option value="Chờ xác nhận">
                                                                                    Chờ xác nhận
                                                                                    </option>
                                                                                    <option value="Đã giao">
                                                                                        Đã giao
                                                                                    </option>
                                                                                    <option value="Đang giao">
                                                                                        Đang giao
                                                                                    </option>
                                                                                    <option value="Hủy">Hủy</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <label className="form-label">
                                                                                    Địa chỉ giao hàng:
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    value={
                                                                                        orderDetailsMap[order.id][0]
                                                                                            ?.address ||
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
                                                                                Array.isArray(
                                                                                    orderDetailsMap[order.id],
                                                                                ) &&
                                                                                orderDetailsMap[order.id].length > 0 ? (
                                                                                    orderDetailsMap[order.id].map(
                                                                                        (item, index) => (
                                                                                            <tr key={index}>
                                                                                                <td>
                                                                                                    {item.product
                                                                                                        ?.name || 'N/A'}
                                                                                                </td>
                                                                                                <td>
                                                                                                    {item.quantity || 0}
                                                                                                </td>
                                                                                                <td>
                                                                                                    {item.product
                                                                                                        ?.price || 0}
                                                                                                </td>
                                                                                                <td>
                                                                                                    {(item.quantity ||
                                                                                                        0) *
                                                                                                        (item.product
                                                                                                            ?.price ||
                                                                                                            0)}
                                                                                                </td>
                                                                                            </tr>
                                                                                        ),
                                                                                    )
                                                                                ) : (
                                                                                    <tr>
                                                                                        <td colSpan="4">
                                                                                            Không có sản phẩm
                                                                                        </td>
                                                                                    </tr>
                                                                                )}
                                                                            </tbody>
                                                                        </table>
                                                                        {/* Print-friendly content */}
                                                                        <div id={`print-order-${order.id}`} style={{ display: 'none' }}>
                                                                            <div className="print-container">
                                                                                <div className="print-header">
                                                                                    <h2>Đơn Hàng #{order.id}</h2>
                                                                                </div>
                                                                                <div className="print-details">
                                                                                    <p><strong>Mã đơn:</strong> {orderDetailsMap[order.id][0]?.order?.id || order.id}</p>
                                                                                    <p><strong>Khách hàng:</strong> {orderDetailsMap[order.id][0]?.order?.user?.email || order.user?.email || 'N/A'}</p>


                                                                                    <p><strong>Ngày đặt:</strong> {orderDetailsMap[order.id][0]?.created_at || order.created_at}</p>
                                                                                    <p><strong>Tổng tiền:</strong> {orderDetailsMap[order.id][0]?.order?.total_price || order.total_price}</p>
                                                                                    <p><strong>Trạng thái:</strong> {orderDetailsMap[order.id][0]?.order?.status || order.status}</p>
                                                                                    <p><strong>Địa chỉ giao hàng:</strong> {orderDetailsMap[order.id][0]?.address || '123 Đường ABC, Quận 1, TP.HCM'}</p>
                                                                                </div>
                                                                                <h3>Danh sách sản phẩm</h3>
                                                                                <table className="print-table">
                                                                                    <thead>
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
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <div>{message || 'Không có dữ liệu chi tiết'}</div>
                                                                )}
                                                                <div className="d-flex justify-content-end mt-3">
                                                                    <button
                                                                        className="btn btn-sm btn-success me-2"
                                                                        onClick={() => updateOrderStatus(order.id)}
                                                                    >
                                                                        Lưu
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-sm btn-info me-2"
                                                                        onClick={() => handlePrint(order.id)}
                                                                    >
                                                                        In
                                                                    </button>
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
