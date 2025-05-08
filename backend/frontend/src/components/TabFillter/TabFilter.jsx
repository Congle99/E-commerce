import React, { useState } from "react";
import "./style.css";
const TabFilter = ({ onFilterChange, onSearch, onSortChange }) => {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [sortOption, setSortOption] = useState({
        sortBy: "name",
        order: "asc",
    });

    const handleFilterSubmit = () => {
        onFilterChange({
            category,
            min_price: priceRange.min,
            max_price: priceRange.max,
        });
    };

    const handleSortChange = (key, value) => {
        const newSortOption = { ...sortOption, [key]: value };
        setSortOption(newSortOption);
        onSortChange(newSortOption);
    };

    return (
        <div className="container d-flex justify-content-between align-items-center mb-30">
            <div className="">
                <div className="shop-tab f-right">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button onClick={() => onSearch(keyword)}>Tìm kiếm</button>

                    <select onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Tất cả danh mục</option>
                        <option value="1">Danh mục 1</option>
                        <option value="2">Danh mục 2</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Giá từ"
                        value={priceRange.min}
                        onChange={(e) =>
                            setPriceRange({
                                ...priceRange,
                                min: e.target.value,
                            })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Giá đến"
                        value={priceRange.max}
                        onChange={(e) =>
                            setPriceRange({
                                ...priceRange,
                                max: e.target.value,
                            })
                        }
                    />
                    <button onClick={handleFilterSubmit}>Lọc</button>

                    <select
                        onChange={(e) =>
                            handleSortChange("sortBy", e.target.value)
                        }
                    >
                        <option value="name">Tên</option>
                        <option value="price">Giá</option>
                        <option value="popularity">Độ phổ biến</option>
                    </select>
                    <select
                        onChange={(e) =>
                            handleSortChange("order", e.target.value)
                        }
                    >
                        <option value="asc">Tăng dần</option>
                        <option value="desc">Giảm dần</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TabFilter;
