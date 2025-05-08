// RecentlyViewedProducts.jsx
import React, { useEffect, useState } from 'react';

const RecentlyViewedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setProducts(viewed);
  }, []);

  return (
    <div className="recently-viewed my-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Sản phẩm bạn đã xem</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
            <h3>{product.name}</h3>
            <p className="text-red-500 font-bold">{product.sale_price}₫</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedProducts;
