<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Order;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * Lấy thông tin người dùng hiện tại
     */
    public function getUserProfile(Request $request)
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
    public function getUserOrders(Request $request)
{
    $request->validate([
        'id' => 'required|exists:user,id'
    ]);

    $perPage = $request->query('per_page', 8);
    $userId = $request->query('id');

    $orders = Order::where('user_id', $userId)
        ->orderBy('created_at', 'desc')
        ->paginate($perPage);

    return response()->json($orders);
}

    /**
     * Lấy lịch sử thanh toán của người dùng
     */
 public function getUserPayments(Request $request)
{
    try {
        $userId = $request->query('id');
        $perPage = $request->query('per_page', 8);

        $orders = \App\Models\Order::where('user_id', $userId)->pluck('id');

        if ($orders->isEmpty()) {
            return response()->json(['message' => 'Không có đơn hàng'], 404);
        }

        $payments = \App\Models\Payment::whereIn('order_id', $orders)
            ->orderBy('payment_date', 'desc')
            ->paginate($perPage);

        return response()->json($payments);

    } catch (\Throwable $e) {
        return response()->json([
            'message' => 'Lỗi server',
            'error' => $e->getMessage(),
            'trace' => $e->getTrace()[0] ?? []
        ], 500);
    }
}

    
    //Cập nhật thông tin 
    public function update(Request $request)
    {
    $user = User::findOrFail($request->id);

    $validated = $request->validate([
        'username' => 'required|string|max:255|unique:user,username,' . $user->id,
        'email' => 'required|string|email|max:255|unique:user,email,' . $user->id,
        'phone' => 'nullable|string|unique:user,phone,' . $user->id,
    ], [
        'username.unique' => 'Tên đăng nhập đã tồn tại, vui lòng chọn tên khác.',
        'email.unique' => 'Email đã được sử dụng.',
        'phone.unique' => 'Số điện thoại đã được sử dụng.',
    ]);

    $user->update($validated);

    return response()->json(['success' => true]);
    }



    //Thêm câu hỏi bảo mật questionpassword  
    public function updateQuestion(Request $request)
    {
    $request->validate([
        'id' => 'required|exists:user,id',
        'questionpassword' => 'required|string|max:255',
        ]);

    $user = User::find($request->id);
    $user->questionpassword = $request->questionpassword;
    $user->save();

    return response()->json(['success' => true, 'message' => 'Câu hỏi bảo mật đã được cập nhật']);
    }

    // Đổi mật khẩu
public function updatePassword(Request $request)
{
    $request->validate([
        'id' => 'required|exists:user,id',
        'password' => 'required|string|min:6'
    ]);

    $user = User::find($request->id);
    $user->password = Hash::make($request->password);
    $user->save();

    return response()->json(['success' => true, 'message' => 'Đổi mật khẩu thành công']);
}

    //Xóa tài khoản 
    public function deleteAccount(Request $request)
{
    $request->validate([
        'id' => 'required|exists:user,id' // chú ý nếu bạn dùng bảng "user"
    ]);

    $user = User::find($request->id);
    if (!$user) {
        return response()->json(['message' => 'User không tồn tại'], 404);
    }

    $user->delete();

    return response()->json(['message' => 'Tài khoản đã bị xóa']);
}
}