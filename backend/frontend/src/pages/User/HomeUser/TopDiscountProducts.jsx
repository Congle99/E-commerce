import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopDiscountProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/top-discount-products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="top-discount-products my-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Ưu đãi tốt nhất</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
            <h3>{product.name}</h3>
            <p className="text-red-500 font-bold">{product.sale_price}₫</p>
            <p className="line-through text-gray-500 text-sm">{product.original_price}₫</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDiscountProducts;
