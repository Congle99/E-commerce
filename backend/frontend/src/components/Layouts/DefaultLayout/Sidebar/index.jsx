import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTachometerAlt,
    faTshirt,
    faUsers,
    faShoppingCart,
    faPercent,
    faStar,
    faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import './SidebarStyle.scss';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Fashion Admin</h2>
            </div>

            <ul className="nav-menu">
                <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                    <NavLink to="/" className="nav-link">
                        <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
                        <span>Bảng điều khiển</span>
                    </NavLink>
                </li>
                <li className={`nav-item ${location.pathname === '/Product' ? 'active' : ''}`}>
                    <NavLink to="/Product" className="nav-link">
                        <FontAwesomeIcon icon={faTshirt} className="icon" />
                        <span>Sản phẩm</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <FontAwesomeIcon icon={faUsers} className="icon" />
                    <span>Khách hàng</span>
                </li>
                <li className="nav-item">
                    <FontAwesomeIcon icon={faShoppingCart} className="icon" />
                    <span>Đơn hàng</span>
                </li>
                <li className="nav-item">
                    <FontAwesomeIcon icon={faPercent} className="icon" />
                    <span>Khuyến mãi</span>
                </li>
                <li className="nav-item">
                    <FontAwesomeIcon icon={faStar} className="icon" />
                    <span>Đánh giá</span>
                </li>
                <li className="nav-item">
                    <FontAwesomeIcon icon={faChartBar} className="icon" />
                    <span>Báo cáo</span>
                </li>
            </ul>

            <div className="promotion-summary">
                <h4>Cập nhật: Khuyến mãi</h4>
                <p>Thời gian: Khuyến mãi</p>
            </div>
        </div>
    );
};

export default Sidebar;
