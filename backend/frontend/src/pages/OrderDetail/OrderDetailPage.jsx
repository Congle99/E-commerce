import React, { useState, useEffect } from 'react';
import '../OrderDetail/OrderDetailPage.scss';
import Api from '~/components/Api.jsx';
import { useParams, useNavigate } from 'react-router-dom';

const { http } = Api();
const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    //Trở về lại trang Oreder
    const hanldReturnBackOrder = () => {
        navigate('/order');
    };
    const fetchOrderDetail = async () => {
        try {
            setLoading(true); // Bắt đầu gọi API
            const response = await http.get(`order/order-details/${id}`);
            if (response.data) {
                setOrderDetails(response.data.data); // Lưu dữ liệu từ API
            } else {
                setMessage('Không tìm thấy chi tiết đơn hàng');
            }
        } catch (err) {
            setMessage(
                <div>
                    Không tìm thấy chi tiết đơn hàng
                    <br></br>
                    <a className="back-btn" onClick={() => hanldReturnBackOrder()} type='button'>
                        Quay lại danh sách
                    </a>
                </div>,
            );
            console.error(err);
        } finally {
            setLoading(false); // Kết thúc gọi API
        }
    };

    useEffect(() => {
        fetchOrderDetail();
    }, [id]);

    // Xử lý trạng thái loading và lỗi
    if (loading) return <div>Đang tải...</div>;
    if (message) return <div>{message}</div>;
    if (!orderDetails)
        return (
            <div>
                Không có dữ liệu
                <a className="back-btn" onClick={() => hanldReturnBackOrder()}>
                    Quay lại danh sách
                </a>
            </div>
        );

    //Lấy giá trị phần tử đầu tiên
    const detail = orderDetails[0];

    return (
        <div className="order-container">
            <h1>Chi tiết đơn đặt hàng</h1>

            <div className="order-details">
                <div className="detail-row">
                    <span className="label">Mã đơn:</span>
                    <span className="value">{detail.order?.id || 'N/A'}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Khách hàng:</span>
                    <span className="value">{detail.order?.user?.email || 'N/A'}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Ngày đặt:</span>
                    <span className="value">{detail.created_at || 'N/A'}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Số tiền:</span>
                    <span className="value">{detail.order?.total_price || 'N/A'}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Trạng thái:</span>
                    <span className={`value status ${detail.order?.status || ''}`}>
                        {detail.order?.status || 'N/A'}
                    </span>
                </div>
            </div>

            <div className="ordered-products">
                <h2>Danh sách sản phẩm</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map((detail, index) => (
                            <tr key={index}>
                                <td>
                                    <img src={detail.product?.image || 'placeholder-image.jpg'} alt="Product" />
                                </td>
                                <td>{detail.product?.name || 'N/A'}</td>
                                <td>{detail.quantity || 'N/A'}</td>
                                <td>{detail.price || 'N/A'}</td>
                                <td>{(detail.quantity * detail.price).toFixed(2) || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <a className="back-btn" onClick={() => hanldReturnBackOrder()} type='button'>
                Quay lại danh sách
            </a>
        </div>
    );
};

export default OrderDetails;
