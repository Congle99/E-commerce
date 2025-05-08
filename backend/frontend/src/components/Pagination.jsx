import React from "react";

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

    return (
        <div className="basic-pagination basic-pagination-2 text-center mt-20">
            <ul>
                {pages.map((page) => (
                    <li
                        key={page}
                        className={page === currentPage ? "active" : ""}
                    >
                        <a onClick={() => onPageChange(page)}>{page}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
