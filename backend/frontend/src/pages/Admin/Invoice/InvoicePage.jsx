import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Spinner, Alert, Badge } from "react-bootstrap";
import Api from '~/components/Api.jsx';

const { http } = Api();

export default function InvoicePage() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingInvoice, setEditingInvoice] = useState(null);
    const [formData, setFormData] = useState({
        total_amount: "",
        status: "unpaid",
        invoice_date: ""
    });
    const [saving, setSaving] = useState(false);

    const loadInvoices = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/invoices");
            setInvoices(res.data.data || []);
        } catch (err) {
            console.error(err);
            setError("Không tải được danh sách hoá đơn");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInvoices();
    }, []);

    const startEditing = (invoice) => {
        setEditingInvoice(invoice);
        setFormData({
            total_amount: invoice.total_amount,
            status: invoice.status,
            invoice_date: invoice.invoice_date ? invoice.invoice_date.split("T")[0] : ""
        });
    };

    const cancelEditing = () => {
        setEditingInvoice(null);
        setFormData({ total_amount: "", status: "unpaid", invoice_date: "" });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveInvoice = async (e) => {
        e.preventDefault();
        if (!editingInvoice) return;

        setSaving(true);
        try {
            const res = await axios.put(`http://localhost:8000/api/invoices/${editingInvoice.id}`, formData);
            if (res.data.status === "success") {
                alert("Cập nhật hóa đơn thành công!");
                await loadInvoices();
                cancelEditing();
            } else {
                alert("Lỗi: " + JSON.stringify(res.data.errors || res.data.message));
            }
        } catch (error) {
            alert("Lỗi mạng hoặc server");
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    // Hàm hiển thị nhãn trạng thái với màu sắc
    const renderStatusBadge = (status) => {
        switch (status) {
            case "unpaid":
                return <Badge bg="warning">Đang chờ thanh toán</Badge>;
            case "paid":
                return <Badge bg="success">Đã thanh toán</Badge>;
            case "cash_on_delivery":
                return <Badge bg="info">Thanh toán khi nhận hàng</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    if (loading) {
        return <div className="invoice-page text-center my-5"><Spinner animation="border" /> Đang tải...</div>;
    }

    if (error) {
        return <Alert variant="danger" className="my-5 text-center">{error}</Alert>;
    }

    return (
        <div className="invoice-page container mt-4">
            <h2 className="mb-4">Danh sách hoá đơn</h2>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Số hoá đơn</th>
                        <th>Đơn hàng</th>
                        <th>Ngày tạo</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.length > 0 ? (
                        invoices.map(inv => (
                            <tr key={inv.id}>
                                <td>{inv.id}</td>
                                <td>{inv.invoice_number}</td>
                                <td>#{inv.order_id}</td>
                                <td>{inv.invoice_date ? new Date(inv.invoice_date).toLocaleDateString() : ''}</td>
                                <td>{inv.total_amount.toLocaleString()} VNĐ</td>
                                <td>{renderStatusBadge(inv.status)}</td>
                                <td>
                                    <Button variant="primary" size="sm" onClick={() => startEditing(inv)}>
                                        Sửa
                                    </Button>
                                    &nbsp;
                                    <Button
                                        variant="info"
                                        size="sm"
                                        onClick={() => window.open(`/invoice/print/${inv.id}`, '_blank')}
                                    >
                                        In hóa đơn
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">Chưa có hoá đơn</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={!!editingInvoice} onHide={cancelEditing} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa hóa đơn #{editingInvoice?.invoice_number}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={saveInvoice}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formTotalAmount">
                            <Form.Label>Tổng tiền</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="total_amount"
                                value={formData.total_amount}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formStatus">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="unpaid">Đang chờ thanh toán</option>
                                <option value="paid">Đã thanh toán</option>
                                <option value="cash_on_delivery">Thanh toán khi nhận hàng</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formInvoiceDate">
                            <Form.Label>Ngày hóa đơn</Form.Label>
                            <Form.Control
                                type="date"
                                name="invoice_date"
                                value={formData.invoice_date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelEditing} disabled={saving}>
                            Hủy
                        </Button>
                        <Button variant="primary" type="submit" disabled={saving}>
                            {saving ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}
