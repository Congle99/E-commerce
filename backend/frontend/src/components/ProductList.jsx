import React, { useState, useEffect } from "react";
import TabFilter from "./TabFillter/TabFilter";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import {
    getProducts,
    filterProducts,
    searchProducts,
    sortProducts,
} from "../services/productService";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [searchKeyword, setSearchKeyword] = useState("");
    const [sortOption, setSortOption] = useState({
        sortBy: "name",
        order: "asc",
    });

    // Hàm gọi API lấy danh sách sản phẩm
    const fetchProducts = async (page = 1) => {
        try {
            setLoading(true);
            const data = await getProducts(page);
            setProducts(data.data);
            setCurrentPage(data.current_page);
            setLastPage(data.last_page);
            console.log(data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý tìm kiếm
    const handleSearch = async (keyword) => {
        try {
            setLoading(true);
            const data = await searchProducts(keyword, currentPage);
            setProducts(data.data);
            setSearchKeyword(keyword);
            setCurrentPage(data.current_page);
            setLastPage(data.last_page);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm sản phẩm:", error);
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý lọc sản phẩm
    const handleFilter = async (newFilters) => {
        try {
            setLoading(true);
            const data = await filterProducts(newFilters, currentPage);
            setProducts(data.data);
            setFilters(newFilters);
            setCurrentPage(data.current_page);
            setLastPage(data.last_page);
        } catch (error) {
            console.error("Lỗi khi lọc sản phẩm:", error);
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý sắp xếp sản phẩm
    const handleSort = async (sortOption) => {
        try {
            setLoading(true);
            const data = await sortProducts(
                sortOption.sortBy,
                sortOption.order,
                currentPage
            );
            setProducts(data.data);
            setSortOption(sortOption);
            setCurrentPage(data.current_page);
            setLastPage(data.last_page);
        } catch (error) {
            console.error("Lỗi khi sắp xếp sản phẩm:", error);
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý phân trang
    const handlePageChange = async (page) => {
        setCurrentPage(page);
        await fetchProducts(page);
    };

    // Gọi API khi component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <section className="shop-area pt-100 pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <TabFilter
                            onFilterChange={handleFilter}
                            onSearch={handleSearch}
                            onSortChange={handleSort}
                        />
                        {loading ? (
                            <p>Đang tải sản phẩm...</p>
                        ) : (
                            <ProductGrid products={products} />
                        )}
                        <Pagination
                            currentPage={currentPage}
                            lastPage={lastPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductList;
