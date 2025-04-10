import React, { useState, useEffect } from 'react';
import './ProductModal.scss';
import axios from 'axios';

const ProductModal = ({ show, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        discount_price: 'Còn hàng',
        category_id: '',
        image: null,
    });
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gọi API POST tới Laravel
            const response = await axios.post('http://localhost:8000/api/product', formData);

            setMessage('Tạo Product thành công');
            // Reset form sau khi tạo thành công
            setFormData({
                name: '',
                category: '',
                price: '',
                stock: '',
                status: 'Còn hàng',
                description: '',
                image: null,
            });
            console.log(response.data); // Dữ liệu trả về từ API
        } catch (error) {
            setMessage('Có lỗi xảy ra khi tạo Product.');
            console.error(error);
        }
    };

    //Hàm gọi API Category
    const [categories, setCategoties] = useState([]);
    const [error, setError] = useState(null);
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/category');
            setCategoties(response.data);
        } catch (err) {
            setError('Không thể lấy dữ liệu danh mục');
        }
    };
    useEffect(() =>{
      fetchCategories();
    }, []);
    if (!show) return null;

    return (
        <>
            <div className="modal-backdrop fade show" onClick={onClose}></div>

            <div className="modal fade show" style={{ display: 'block' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-dark text-white">
                            <h5 className="modal-title">Thêm sản phẩm mới</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Tên sản phẩm</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Danh mục</label>
                                        <select
                                            className="form-select"
                                            name="category_id"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Chọn danh mục</option>
                                            <option value="Áo thun">Áo thun</option>
                                            <option value="Quần jeans">Quần jeans</option>
                                            <option value="Váy">Váy</option>
                                            <option value="Áo khoác">Áo khoác</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label htmlFor="productPrice" className="form-label">
                                            Giá bán
                                        </label>
                                        <div className="input-group">
                                            <input type="number" className="form-control" id="productPrice" required />
                                            <span className="input-group-text">đ</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="productStock" className="form-label">
                                            Số lượng
                                        </label>
                                        <input type="number" className="form-control" id="productStock" required />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="productStatus" className="form-label">
                                            Trạng thái
                                        </label>
                                        <select className="form-select" id="productStatus" required>
                                            <option value="Còn hàng">Còn hàng</option>
                                            <option value="Sắp hết">Sắp hết</option>
                                            <option value="Hết hàng">Hết hàng</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="productDescription" className="form-label">
                                        Mô tả sản phẩm
                                    </label>
                                    <textarea className="form-control" id="productDescription" rows="3"></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="productImages" className="form-label">
                                        Hình ảnh sản phẩm
                                    </label>
                                    <input className="form-control" type="file" id="productImages" multiple />
                                    <div className="form-text">Có thể tải lên nhiều hình ảnh</div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>
                                    Đóng
                                </button>
                                <button type="submit" className="btn btn-dark">
                                    Lưu sản phẩm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductModal;
