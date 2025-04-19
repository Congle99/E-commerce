import React, { useState, useEffect } from 'react';
import './ProductModal.scss';
import Api from '~/components/Api';

const { http } = Api();

const ProductModal = ({ show, onClose, onSave, product }) => {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        discount_price: '',
        category_id: '',
        status: '',
        inventory: '',
        image: null,
    });
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    // Khởi tạo formData khi chỉnh sửa sản phẩm
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                slug: product.slug || '',
                description: product.description || '',
                price: product.price || '',
                discount_price: product.discount_price || '',
                category_id: product.category_id || '',
                status: product.status || '',
                inventory: product.inventory || '',
                image: null, // Không load lại file ảnh, để người dùng chọn lại nếu muốn
            });
            // Hiển thị ảnh hiện tại nếu có
            if (product.image) {
                setImagePreview(`http://localhost:8000/storage/${product.image}`);
            }
        } else {
            // Reset form khi thêm mới
            setFormData({
                name: '',
                slug: '',
                description: '',
                price: '',
                discount_price: '',
                category_id: '',
                status: '',
                inventory: '',
                image: null,
            });
            setImagePreview(null);
        }
    }, [product]);

    const fetchCategories = async () => {
        try {
            const response = await http.get('/category');
            setCategories(response.data);
        } catch (err) {
            setError('Không thể lấy dữ liệu danh mục');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files) {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                image: file,
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu
        if (!formData.name || !formData.price || !formData.discount_price || !formData.category_id || !formData.status || !formData.inventory) {
            setMessage('Vui lòng điền đầy đủ các trường bắt buộc!');
            return;
        }

        try {
            const price = parseFloat(formData.price);
            const discountPrice = parseFloat(formData.discount_price);
            const inventory = parseInt(formData.inventory, 10);
            const categoryId = parseInt(formData.category_id, 10);

            if (isNaN(price) || price <= 0) {
                setMessage('Giá bán phải lớn hơn 0!');
                return;
            }
            if (isNaN(discountPrice) || discountPrice >= price) {
                setMessage('Giá giảm phải nhỏ hơn giá bán!');
                return;
            }
            if (isNaN(inventory) || inventory < 0) {
                setMessage('Số lượng không thể âm!');
                return;
            }
            if (isNaN(categoryId) || !categories.find((cat) => cat.id === categoryId)) {
                setMessage('Danh mục không hợp lệ!');
                return;
            }

            const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

            const dataToSend = new FormData();
            dataToSend.append('name', formData.name);
            dataToSend.append('slug', slug);
            dataToSend.append('description', formData.description || '');
            dataToSend.append('price', price);
            dataToSend.append('discount_price', discountPrice);
            dataToSend.append('category_id', categoryId);
            dataToSend.append('status', formData.status);
            dataToSend.append('inventory', inventory);
            if (formData.image) {
                dataToSend.append('image', formData.image);
            }

            let response;
            if (product) {
                // Cập nhật sản phẩm
                dataToSend.append('_method', 'PUT'); // Laravel giả lập PUT qua POST
                response = await http.post(`/product/${product.id}`, dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setMessage('Cập nhật sản phẩm thành công');
            } else {
                // Thêm sản phẩm mới
                response = await http.post('/product', dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setMessage('Tạo sản phẩm thành công');
            }

            onSave(response.data);
            setFormData({
                name: '',
                slug: '',
                description: '',
                price: '',
                discount_price: '',
                category_id: '',
                status: '',
                inventory: '',
                image: null,
            });
            setImagePreview(null);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setMessage(`Có lỗi xảy ra: ${errorMessage}`);
            console.error('Error details:', error.response?.data?.errors || error);
        }
    };

    if (!show) return null;

    return (
        <>
            <div className="modal-backdrop fade show" onClick={onClose}></div>
            <div className="modal fade show" style={{ display: 'block' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-dark text-white">
                            <h5 className="modal-title">{product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                {message && <div className="alert alert-info">{message}</div>}
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
                                            value={formData.category_id}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Chọn danh mục</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {error && <div className="text-danger">{error}</div>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label htmlFor="productPrice" className="form-label">
                                            Giá bán
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="productPrice"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                required
                                                step="0.01"
                                            />
                                            <span className="input-group-text">đ</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="productDiscountPrice" className="form-label">
                                            Giá giảm
                                        </label>
                                        <div className="input-group">
                                            <input
                                                name="discount_price"
                                                type="number"
                                                className="form-control"
                                                id="productDiscountPrice"
                                                value={formData.discount_price}
                                                onChange={handleChange}
                                                required
                                                step="0.01"
                                            />
                                            <span className="input-group-text">đ</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="productStock" className="form-label">
                                            Số lượng
                                        </label>
                                        <input
                                            name="inventory"
                                            type="number"
                                            className="form-control"
                                            id="productStock"
                                            value={formData.inventory}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label htmlFor="productStatus" className="form-label">
                                            Trạng thái
                                        </label>
                                        <select
                                            name="status"
                                            className="form-select"
                                            id="productStatus"
                                            value={formData.status}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Chọn trạng thái</option>
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
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        id="productDescription"
                                        rows="3"
                                        value={formData.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productImages" className="form-label">
                                        Hình ảnh sản phẩm
                                    </label>
                                    <input
                                        name="image"
                                        className="form-control"
                                        type="file"
                                        id="productImages"
                                        onChange={handleChange}
                                        accept="image/*"
                                        required={!product} // Chỉ bắt buộc khi thêm mới
                                    />
                                    <div className="form-text">Chỉ hỗ trợ tải lên một hình ảnh</div>
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            style={{ maxWidth: '150px', marginTop: '10px' }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>
                                    Đóng
                                </button>
                                <button type="submit" className="btn btn-dark">
                                    {product ? 'Cập nhật sản phẩm' : 'Lưu sản phẩm'}
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