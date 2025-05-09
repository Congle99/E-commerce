<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Lấy danh sách sản phẩm trong giỏ hàng
    public function index()
    {
        $userId = Auth::id(); // Lấy ID của người dùng đã đăng nhập

        $cartItems = CartItem::with('product')
            ->where('user_id', $userId)
            ->get();

        return response()->json($cartItems);
    }
}
