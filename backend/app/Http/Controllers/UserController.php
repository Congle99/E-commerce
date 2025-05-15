<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Lấy thông tin người dùng hiện tại
     */
    public function profile(Request $request)
    {
        // Trong một ứng dụng thực tế, sẽ sử dụng Auth::user() sau khi xác thực
        // Tạm thời, lấy user từ localStorage trên frontend
        $user = User::find($request->input('user_id'));
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        
        return response()->json([
            'id' => $user->id,
            'email' => $user->email,
            'role' => $user->role,
            // Thêm thông tin khác nếu cần
        ]);
    }

    /**
     * Lấy danh sách đơn hàng của người dùng
     */
    public function getOrders(Request $request)
    {
        // Giả lập dữ liệu đơn hàng cho mục đích demo
        // Trong thực tế sẽ lấy từ database
        return response()->json([
            [
                'id' => 1,
                'total_price' => 1500000,
                'status' => 'Completed',
                'created_at' => now()->subDays(5),
            ],
            [
                'id' => 2,
                'total_price' => 750000,
                'status' => 'Processing',
                'created_at' => now()->subDays(2),
            ],
        ]);
    }

    /**
     * Lấy lịch sử thanh toán của người dùng
     */
    public function getPayments(Request $request)
    {
        // Giả lập dữ liệu thanh toán cho mục đích demo
        // Trong thực tế sẽ lấy từ database
        return response()->json([
            [
                'payment_id' => 1,
                'order_id' => 1,
                'payment_method' => 'Credit Card',
                'payment_status' => 1,
                'payment_date' => now()->subDays(5),
            ],
            [
                'payment_id' => 2,
                'order_id' => 2,
                'payment_method' => 'Bank Transfer',
                'payment_status' => 0,
                'payment_date' => now()->subDays(2),
            ],
        ]);
    }
}
