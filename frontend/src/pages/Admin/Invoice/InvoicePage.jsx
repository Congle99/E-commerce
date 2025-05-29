import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Table, Button, Modal, Form, Spinner, Alert, Badge, Pagination
} from "react-bootstrap";
import Api from '~/components/Api.jsx';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });
    const [isConflict, setIsConflict] = useState(false);

    const loadInvoices = async (page = 1) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/invoices?page=${page}`);
            setInvoices(res.data.data || []);
            setPagination({
                current_page: res.data.current_page,
                last_page: res.data.last_page,
            });
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

    useEffect(() => {
        const handleStorage = (event) => {
            if (event.key === "invoice-updated") {
                try {
                    const data = JSON.parse(event.newValue);
                    if (editingInvoice && data.id === editingInvoice.id) {
                        setIsConflict(true);
                        toast.error("⚠ Hóa đơn đã bị chỉnh sửa ở tab khác. Vui lòng tải lại!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                } catch (err) {
                    console.error("Lỗi parse storage event:", err);
                }
            }
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [editingInvoice]);

    const startEditing = (invoice) => {
        setEditingInvoice(invoice);
        setFormData({
            total_amount: invoice.total_amount,
            status: invoice.status,
            invoice_date: invoice.invoice_date ? invoice.invoice_date.split("T")[0] : ""
        });
        setIsConflict(false);
    };

    const cancelEditing = () => {
        setEditingInvoice(null);
        setFormData({ total_amount: "", status: "unpaid", invoice_date: "" });
        setIsConflict(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveInvoice = async (e) => {
        e.preventDefault();
        if (!editingInvoice) return;
        if (isConflict) {
            toast.warn("Hóa đơn đã bị chỉnh sửa ở tab khác. Không thể lưu.");
            return;
        }

        setSaving(true);
        try {
            const res = await axios.put(`http://localhost:8000/api/invoices/${editingInvoice.id}`, formData);
            if (res.data.status === "success") {
                toast.success("Cập nhật hóa đơn thành công!");
                localStorage.setItem("invoice-updated", JSON.stringify({ id: editingInvoice.id, time: Date.now() }));
                await loadInvoices();
                cancelEditing();
            } else {
                toast.error("Lỗi: " + JSON.stringify(res.data.errors || res.data.message));
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Hóa đơn không tồn tại hoặc đã bị xoá");
            } else if (error.response && error.response.data) {
                toast.error("Lỗi: " + JSON.stringify(error.response.data.errors || error.response.data.message));
            } else if (error.message) {
                toast.error("Lỗi: " + error.message);
            } else {
                toast.error("Lỗi không xác định khi cập nhật hóa đơn");
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteInvoice = async (invoiceId) => {
        if (!window.confirm("Bạn chắc chắn muốn xoá hóa đơn này?")) return;

        try {
            const res = await axios.delete(`http://localhost:8000/api/invoices/${invoiceId}`);
            if (res.data.status === "success") {
                toast.success("Đã xoá hóa đơn thành công");
                await loadInvoices();
            } else {
                toast.error("Lỗi: " + (res.data.message || "Không rõ nguyên nhân"));
            }
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error("Invoice không tồn tại hoặc đã bị xoá. Vui lòng tải lại.");
            } else {
                toast.error("Lỗi khi xoá hóa đơn: " + (error.response?.data?.message || error.message));
            }
        }
    };

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
            <ToastContainer />
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
                                    <Button variant="info" size="sm" onClick={() => window.open(`/invoice/print/${inv.id}`, '_blank')}>
                                        In hóa đơn
                                    </Button>
                                    &nbsp;
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteInvoice(inv.id)}>
                                        Xoá
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

            <div className="d-flex justify-content-end mt-2 pagination-container">
                <Pagination className="mb-0">
                    <Pagination.Prev
                        disabled={pagination.current_page === 1}
                        onClick={() => loadInvoices(pagination.current_page - 1)}
                    />
                    {Array.from({ length: pagination.last_page }, (_, idx) => idx + 1).map(page => (
                        <Pagination.Item
                            key={page}
                            active={page === pagination.current_page}
                            onClick={() => loadInvoices(page)}
                        >
                            {page}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        disabled={pagination.current_page === pagination.last_page}
                        onClick={() => loadInvoices(pagination.current_page + 1)}
                    />
                </Pagination>
            </div>

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
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formStatus">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                                disabled={isConflict}
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
                                disabled
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelEditing} disabled={saving}>
                            Hủy
                        </Button>
                        <Button variant="primary" type="submit" disabled={saving || isConflict}>
                            {saving ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}
