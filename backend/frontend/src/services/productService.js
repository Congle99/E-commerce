const API_BASE_URL = "http://localhost:8000/api";

// Lấy danh sách sản phẩm
export const getProducts = async (page = 1) => {
    const response = await fetch(`${API_BASE_URL}/products?page=${page}`);
    if (!response.ok) {
        throw new Error("Lỗi khi lấy danh sách sản phẩm");
    }
    return response.json();
};

// Tìm kiếm sản phẩm
export const searchProducts = async (keyword, page = 1) => {
    const response = await fetch(
        `${API_BASE_URL}/products/search?keyword=${encodeURIComponent(
            keyword
        )}&page=${page}`
    );
    if (!response.ok) {
        throw new Error("Lỗi khi tìm kiếm sản phẩm");
    }
    return response.json();
};

// Lọc sản phẩm
export const filterProducts = async (filters, page = 1) => {
    const queryParams = new URLSearchParams({ ...filters, page }).toString();
    const response = await fetch(
        `${API_BASE_URL}/products/filter?${queryParams}`
    );
    if (!response.ok) {
        throw new Error("Lỗi khi lọc sản phẩm");
    }
    return response.json();
};

// Sắp xếp sản phẩm
export const sortProducts = async (sortBy, order = "asc", page = 1) => {
    const response = await fetch(
        `${API_BASE_URL}/products/sort?sort_by=${sortBy}&order=${order}&page=${page}`
    );
    if (!response.ok) {
        throw new Error("Lỗi khi sắp xếp sản phẩm");
    }
    return response.json();
};
