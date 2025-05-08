import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
    return (
        <div className="tab-content" id="myTabContent">
            <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
            >
                <div className="row">
                    {products.map((product) => (
                        <div className="col-lg-4 col-md-6" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;
