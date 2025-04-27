import React, { useEffect, useState } from "react";
import axios from "axios";
import "./InvoicePage.scss";
import Api from '~/components/Api.jsx';

const { http } = Api();
export default function InvoicePage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  useEffect(() => {
    // IIFE async để dễ dùng try/catch/finally
    (async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/invoices");
        console.log("API /invoices:", res.data);
        // res.data = { data: [...], current_page, last_page, total }
        setInvoices(res.data.data || []);  
      } catch (err) {
        console.error(err);
        setError("Không tải được danh sách hoá đơn");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div className="invoice-page">Loading…</div>;
  }

  if (error) {
    return <div className="invoice-page error">{error}</div>;
  }

  return (
    <div className="invoice-page">
      <h2>Danh sách hoá đơn</h2>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Số hoá đơn</th>
            <th>Đơn hàng</th>
            <th>Ngày tạo</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map(inv => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.invoice_number}</td>
                <td>#{inv.order_id}</td>
                <td>{new Date(inv.invoice_date).toLocaleDateString()}</td>
                <td>{inv.total_amount.toLocaleString()} VNĐ</td>
                <td>{inv.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="empty">Chưa có hoá đơn</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
  );
  
}
