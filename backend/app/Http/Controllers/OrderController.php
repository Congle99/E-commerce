<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the orders.
     */
    public function index()
    {
        try {
            // Lấy đơn hàng với phân trang, 10 đơn hàng mỗi trang
            $orders = Order::with('user') // Lấy thông tin user liên quan
                ->orderBy('created_at', 'desc') // Sắp xếp theo ngày tạo mới nhất
                ->paginate(10); // Phân trang, 10 đơn hàng/trang

            return response()->json([
                'data' => $orders->items(), // Danh sách đơn hàng
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
            'status' => 'required|in:pending,completed'
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

        $order->update($request->only(['user_id', 'total_price', 'status']));

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
}
