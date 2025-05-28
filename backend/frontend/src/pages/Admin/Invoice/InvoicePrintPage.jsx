import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Alert, Button } from "react-bootstrap";
import './InvoicePrintPage.scss';

export default function InvoicePrintPage({ invoiceId }) {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const getStatusText = (status) => {
    switch(status) {
      case "unpaid":
        return "Đang chờ thanh toán";
      case "paid":
        return "Đã thanh toán";
      case "cash_on_delivery":
        return "Thanh toán khi nhận hàng";
      default:
        return status;
    }
  };
  

  useEffect(() => {
    async function fetchInvoice() {
      try {
        const res = await axios.get(`http://localhost:8000/api/invoices/${invoiceId}`);
        setInvoice(res.data.data);
      } catch (err) {
        setError("Không tải được hóa đơn.");
      } finally {
        setLoading(false);
      }
    }
    fetchInvoice();
  }, [invoiceId]);

  if (loading) return <div className="text-center my-5"><Spinner animation="border" /> Đang tải...</div>;
  if (error) return <Alert variant="danger" className="my-5 text-center">{error}</Alert>;

  // Hàm gọi cửa sổ in trình duyệt
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mt-4 print-area" style={{ maxWidth: "800px" }}>
      <h2 className="mb-4">Hóa đơn #{invoice.invoice_number}</h2>
  
      <div className="border p-3 mb-3" style={{ backgroundColor: "#f9f9f9" }}>
        <p><strong>Mã hóa đơn:</strong> {invoice.invoice_number}</p>
        <p><strong>Đơn hàng ID:</strong> #{invoice.order_id}</p>
        <p><strong>Ngày hóa đơn:</strong> {new Date(invoice.invoice_date).toLocaleDateString()}</p>
        <p><strong>Tổng tiền:</strong> {invoice.total_amount.toLocaleString()} VNĐ</p>
        <p><strong>Trạng thái:</strong> {getStatusText(invoice.status)}</p>
      </div>
  
      <Button variant="primary" className="btn-print" onClick={handlePrint}>
        In hóa đơn
      </Button>
    </div>
  );  
}
