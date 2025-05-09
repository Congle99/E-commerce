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
        $userId = Auth::id() ?? 1;

        $cartItems = CartItem::with('product')
            ->where('user_id', $userId)
            ->get();

        return response()->json($cartItems);
    }
    public function update(Request $request, $id)
    {
        $userId = Auth::id() ?? 1;
        $cartItem = CartItem::where('user_id', $userId)->where('id', $id)->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Sản phẩm không tồn tại trong giỏ hàng.'], 404);
        }

        $cartItem->quantity = max(1, $request->input('quantity'));
        $cartItem->save();

        return response()->json(['message' => 'Cập nhật số lượng thành công.']);
    }
}
