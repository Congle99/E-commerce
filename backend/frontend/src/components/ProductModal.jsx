import React from 'react';

export default function ProductModal() {
  return (
    <div className="mt-6 p-4 bg-gray-50 border rounded-xl">
      <h2 className="text-lg font-semibold mb-2">Thêm sản phẩm (demo)</h2>
      <form className="space-y-2">
        <div>
          <label className="block text-sm">Tên sản phẩm</label>
          <input className="w-full border rounded px-2 py-1" type="text" />
        </div>
        <div>
          <label className="block text-sm">Danh mục</label>
          <select className="w-full border rounded px-2 py-1">
            <option>Áo thun</option>
            <option>Quần jean</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Giá</label>
          <input className="w-full border rounded px-2 py-1" type="number" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
          Lưu
        </button>
      </form>
    </div>
  );
}
