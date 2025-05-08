import React from "react";

const ProductCard = ({ product }) => {
    const categories = Array.isArray(product.categories)
        ? product.categories
        : [];
    return (
        <div className="product-wrapper mb-50">
            <div className="product-img mb-25">
                <a href="product-details.html">
                    <img src={product.image} alt={product.name} />
                    <img
                        className="secondary-img"
                        src={product.secondaryImg}
                        alt={product.name}
                    />
                </a>
                <div className="product-action text-center">
                    <a href="#" title="Shopping Cart">
                        <i className="flaticon-shopping-cart"></i>
                    </a>
                    <a href="#" title="Quick View">
                        <i className="flaticon-eye"></i>
                    </a>
                    <a href="#" title="Compare">
                        <i className="flaticon-compare"></i>
                    </a>
                </div>
                {product.isNew && (
                    <div className="sale-tag">
                        <span className="new">new</span>
                    </div>
                )}
                {product.isSale && (
                    <div className="sale-tag">
                        <span className="sale">sale</span>
                    </div>
                )}
            </div>
            <div className="product-content">
                <div className="pro-cat mb-10">
                    {/* {product.categories.map((category, index) => (
                        <a href="shop.html" key={index}>
                            {category}
                            {index < product.categories.length - 1 ? ", " : ""}
                        </a>
                    ))} */}
                </div>
                <h4>
                    <a href="product-details.html">{product.name}</a>
                </h4>
                <div className="product-meta">
                    <div className="pro-price">
                        <span>{product.price}</span>
                        <span className="old-price">{product.oldPrice}</span>
                    </div>
                </div>
                <div className="product-wishlist">
                    <a href="#">
                        <i className="far fa-heart" title="Wishlist"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
