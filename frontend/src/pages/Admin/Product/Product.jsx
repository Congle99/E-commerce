import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard.jsx';
import ProductModal from './ProductModal.jsx';
import './Product.scss';
import Api from '~/components/Api';
import * as XLSX from 'xlsx'; // Import thư viện xlsx

const { http } = Api();

const ProductsPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState([
        { title: 'Sản phẩm', value: 0, icon: 'fa-tshirt', color: 'primary' },
        { title: 'Đơn hàng (tháng)', value: '$0', icon: 'fa-dollar-sign', color: 'success' },
        { title: 'Đơn hàng chờ', value: 0, icon: 'fa-comments', color: 'warning' },
        { title: 'Danh mục', value: 0, icon: 'fa-tags', color: 'info' },
    ]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [lastPage, setLastPage] = useState(1); // Tổng số trang

    const fetchProducts = async (page = 1) => {
        try {
            setLoading(true);
            const response = await http.get(`/product?page=${page}`);
            const { data, current_page, last_page } = response.data;
            setProducts(data);
            setCurrentPage(current_page);
            setLastPage(last_page);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await http.get('/stats');
            setStats([
                { title: 'Sản phẩm', value: response.data.total_products, icon: 'fa-tshirt', color: 'primary' },
                {
                    title: 'Đơn hàng (tháng)',
                    value: `$${response.data.monthly_orders}`,
                    icon: 'fa-dollar-sign',
                    color: 'success',
                },
                { title: 'Đơn hàng chờ', value: response.data.pending_orders, icon: 'fa-comments', color: 'warning' },
                { title: 'Danh mục', value: response.data.total_categories, icon: 'fa-tags', color: 'info' },
            ]);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu thống kê:', error);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
        fetchStats();
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

    const handleSaveProduct = (updatedProduct) => {
        if (selectedProduct) {
            setProducts((prevProducts) =>
                prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
            );
        } else {
            setProducts((prevProducts) => [...prevProducts, updatedProduct]);
        }
        fetchProducts(currentPage);
        fetchStats();
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await http.delete(`/product/${id}`);
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
                fetchStats();
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
            }
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // Hàm xuất Excel
    const exportToExcel = () => {
        // Chuẩn bị dữ liệu cho Excel
        const data = products.map((product) => ({
            ID: product.id,
            'Tên sản phẩm': product.name,
            'Danh mục': product.category?.name || 'N/A',
            Giá: product.price,
            'Tồn kho': product.inventory,
            'Trạng thái': product.status,
        }));

        // Tạo worksheet từ dữ liệu
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Tạo workbook và thêm worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sản phẩm');

        // Xuất file Excel
        XLSX.writeFile(workbook, 'BaoCao_SanPham.xlsx');
    };

    return (
        <div className="admin-container">
            <div className="container-fluid" style={{ paddingTop: '20px' }}>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Quản lý sản phẩm thời trang</h1>
                    <button
                        className="d-none d-sm-inline-block btn btn-sm btn-dark shadow-sm"
                        onClick={exportToExcel} // Gắn sự kiện xuất Excel
                    >
                        <i className="fas fa-download fa-sm text-white-50 me-1"></i> Xuất báo cáo
                    </button>
                </div>

                <div className="row">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>

                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <h6 className="m-0 font-weight-bold text-dark">Danh sách sản phẩm</h6>
                        <button
                            className="btn btn-dark"
                            onClick={() => {
                                setSelectedProduct(null);
                                setShowModal(true);
                            }}
                        >
                            <i className="fas fa-plus me-1"></i> Thêm sản phẩm
                        </button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            {loading ? (
                                <div className="text-center">Đang tải...</div>
                            ) : (
                                <table className="table table-bordered table-hover" width="100%" cellSpacing="0">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Hình ảnh</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Danh mục</th>
                                            <th>Giá</th>
                                            <th>Tồn kho</th>
                                            <th>Trạng thái</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.length > 0 ? (
                                            products.map((product) => (
                                                <tr key={product.id}>
                                                    <td>{product.id}</td>
                                                    <td>
                                                        <img
                                                            src={`http://localhost:8000/storage/${product.image}`}
                                                            alt={product.name}
                                                            className="img-thumbnail"
                                                            style={{ width: '50px' }}
                                                        />
                                                    </td>
                                                    <td>{product.name}</td>
                                                    <td>{product.category?.name || 'N/A'}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.inventory}</td>
                                                    <td>
                                                        <span
                                                            className={`badge bg-${
                                                                product.inventory > 10
                                                                    ? 'success'
                                                                    : product.inventory > 0
                                                                    ? 'warning'
                                                                    : 'danger'
                                                            }`}
                                                        >
                                                            {product.inventory > 10
                                                                ? 'Còn hàng'
                                                                : product.inventory > 0
                                                                ? 'Sắp hết'
                                                                : 'Hết hàng'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-primary me-1"
                                                            onClick={() => handleEditProduct(product)}
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleDeleteProduct(product.id)}
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center">
                                                    Không có sản phẩm nào
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}

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
            <ProductModal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedProduct(null);
                }}
                onSave={handleSaveProduct}
                product={selectedProduct}
            />
        </div>
    );
};

export default ProductsPage;
