<?php
// app/Http/Controllers/InvoiceController.php
namespace App\Http\Controllers;

use App\Models\Order; // Model Order
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index()
    {
        try {
            // Lấy các đơn hàng đã giao và có hóa đơn
            $invoices = Order::where('status', 'delivered') // Lọc đơn hàng đã giao
                             ->with('invoice') // Lấy thông tin hóa đơn kèm theo đơn hàng
                             ->get();

            return response()->json($invoices);
        } catch (\Exception $e) {
            // Log lỗi và trả về thông báo lỗi
            \Log::error("Error fetching invoices: " . $e->getMessage());
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
