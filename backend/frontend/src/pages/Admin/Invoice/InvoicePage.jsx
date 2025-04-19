import React, { useEffect, useState } from 'react';
import Api from '~/components/Api.jsx';

const InvoicePage = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Thêm state để lưu lỗi
    const { http } = Api(); // Lấy instance http từ Api

    useEffect(() => {
      const fetchInvoices = async () => {
          try {
              const response = await http.get('invoices');
              console.log(response.data); // Kiểm tra dữ liệu trả về
              setInvoices(response.data);
          } catch (error) {
              console.error('Lỗi khi lấy hóa đơn:', error);
          } finally {
              setLoading(false);
          }
      };
  
      fetchInvoices();
  }, []);
  
    if (loading) {
        return <div>Loading...</div>; // Bạn có thể thay đổi "Loading..." thành một spinner nếu muốn
    }

    if (error) {
        return <div>{error}</div>; // Hiển thị lỗi nếu có
    }

    return (
      <div>
          <h1>Danh sách hóa đơn</h1>
          {invoices.length === 0 ? (
              <p>Không có hóa đơn nào</p>
          ) : (
              <ul>
                  {invoices.map(invoice => (
                      <li key={invoice.id}>
                          Hóa đơn {invoice.id}: {invoice.amount} VNĐ
                      </li>
                  ))}
              </ul>
          )}
      </div>
  );
  
  
};

export default InvoicePage;
