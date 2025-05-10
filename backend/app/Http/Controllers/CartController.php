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
    // Xóa sản phẩm khỏi giỏ hàng
    public function destroy($id)
    {
        $userId = Auth::id() ?? 1;

        $cartItem = CartItem::where('user_id', $userId)->where('id', $id)->first();

        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['message' => 'Xóa sản phẩm khỏi giỏ hàng thành công.']);
        }

        return response()->json(['message' => 'Không tìm thấy sản phẩm.'], 404);
    }
}
