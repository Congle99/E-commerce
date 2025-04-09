import React, { useState } from 'react';
import StatsCard from '~/components/Layouts/DefaultLayout/StatsCard/StatsCard.jsx';
import ProductModal from '~/components/Layouts/DefaultLayout/ProductModal/ProductModal.jsx';
import '../Product/Product.scss';

const ProductsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([ {
      id: 'F001',
      image: 'https://via.placeholder.com/50',
      name: 'Áo thun cổ tròn',
      category: 'Áo thun',
      price: '250.000đ',
      stock: 45,
      status: 'Còn hàng'
    },
    // Thêm các sản phẩm khác...
    {
      id: 'F002',
      image: 'https://via.placeholder.com/50',
      name: 'Quần jeans',
      category: 'Quần',
      price: '450.000đ',
      stock: 12,
      status: 'Sắp hết'
    }
  ]);

  const stats = [
    { title: 'Sản phẩm', value: 124, icon: 'fa-tshirt', color: 'primary' },
    { title: 'Đơn hàng (tháng)', value: '$15,000', icon: 'fa-dollar-sign', color: 'success' },
    { title: 'Đơn hàng chờ', value: 18, icon: 'fa-comments', color: 'warning' },
    { title: 'Danh mục', value: 8, icon: 'fa-tags', color: 'info' }
  ];


  const handleSaveProduct = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  return (
    <div className="admin-container">
      <div className="container-fluid" style={{ paddingTop: '20px' }}>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Quản lý sản phẩm thời trang</h1>
          <button className="d-none d-sm-inline-block btn btn-sm btn-dark shadow-sm">
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
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-plus me-1"></i> Thêm sản phẩm
            </button>
          </div>
          <div className="card-body">
            <div className="table-responsive">
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
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td><img src={product.image} alt={product.name} className="img-thumbnail" /></td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <span className={`badge bg-${product.status === 'Còn hàng' ? 'success' : product.status === 'Sắp hết' ? 'warning' : 'danger'}`}>
                          {product.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary me-1">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-end">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1">Trước</a>
                  </li>
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#">Sau</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <ProductModal 
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default ProductsPage;