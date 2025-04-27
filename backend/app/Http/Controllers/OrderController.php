<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Invoice; 

class OrderController extends Controller
{
    /**
     * Display a listing of the orders.
     */
    public function index()
    {
        try {
            $orders = Order::with('user')
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            return response()->json([
                'data' => $orders->items(),
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'total' => $orders->total(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Không thể lấy danh sách đơn hàng',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created order in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|in:pending,completed,delivered'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $order = Order::create([
            'user_id' => $request->user_id,
            'total_price' => $request->total_price,
            'status' => $request->status,
        ]);

        // Tạo hóa đơn nếu trạng thái là delivered hoặc completed
        if (in_array($order->status, ['delivered', 'completed'])) {
            Invoice::create([
                'order_id' => $order->id,
                'invoice_number' => 'INV-' . now()->format('YmdHis') . '-' . $order->id,
                'total_amount' => $order->total_price,
                'invoice_date' => now()->toDateString(),
                'status' => 'unpaid',
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Order created successfully',
            'data' => $order
        ], 201);
    }

    /**
     * Display the specified order.
     */
    public function show($id)
    {
        $order = Order::with('user')->find($id);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $order
        ], 200);
    }

    /**
     * Update the specified order in storage.
     */
    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found'
            ], 404);
        }
    
        $validator = Validator::make($request->all(), [
            'user_id' => 'sometimes|exists:users,id',
            'total_price' => 'sometimes|numeric|min:0',
            'status' => 'required|string|max:255'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }
    
        $oldStatus = $order->status;
    
        $order->update($request->only(['user_id', 'total_price', 'status']));
        $order->refresh();
    
        $newStatus = $order->status;
    
        // Ở đây thay đổi thành 'Đã giao' hoặc trạng thái bạn muốn tạo hóa đơn
        if (in_array($newStatus, ['Đã giao']) 
            && $oldStatus !== $newStatus
            && !$order->invoice) {
            
            Invoice::create([
                'order_id' => $order->id,
                'invoice_number' => 'INV-' . now()->format('YmdHis') . '-' . $order->id,
                'total_amount' => $order->total_price,
                'invoice_date' => now()->toDateString(),
                'status' => 'unpaid',
            ]);
        } else {
            \Log::info('Không tạo invoice, hoặc invoice đã tồn tại hoặc trạng thái không thay đổi');
        }
    
        return response()->json([
            'status' => 'success',
            'message' => 'Order updated successfully',
            'data' => $order
        ], 200);
    }
    
    

    /**
     * Remove the specified order from storage.
     */
    public function destroy($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found'
            ], 404);
        }

        $order->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Order deleted successfully'
        ], 200);
    }

    /**
     * Lấy hóa đơn của đơn hàng
     */
    public function getInvoice($orderId)
    {
        $order = Order::find($orderId);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found'
            ], 404);
        }

        $invoice = $order->invoice;

        if (!$invoice) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invoice not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $invoice
        ], 200);
    }
}
