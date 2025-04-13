
import React from 'react';
import '../Order/OrderPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faDownload, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

const QuanLyDonHang = () => {
  const donHang = [
    {
      id: '#DH001',
      khachHang: 'Nguyễn Văn A',
      ngayDat: '15/06/2023',
      tongTien: '1.250.000đ',
      trangThai: 'Đã giao',
    },
  ];

  return (
    <div className="noi-dung-chinh">

      {/* Nội dung trang */}
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
                  {donHang.map((don) => (
                    <tr key={don.id}>
                      <td>{don.id}</td>
                      <td>{don.khachHang}</td>
                      <td>{don.ngayDat}</td>
                      <td>{don.tongTien}</td>
                      <td>
                        <span className="badge bg-success">{don.trangThai}</span>
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuanLyDonHang;