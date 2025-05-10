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
    /**
     * Thêm vật phẩm vào giỏ hàng.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);


        $userId = Auth::id() ?? 1;

        // Kiểm tra sản phẩm có tồn tại trong giỏ hàng chưa
        $cartItem = CartItem::where('user_id', $userId)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            // Nếu đã tồn tại, tăng số lượng
            $cartItem->quantity += $request->quantity;
            $cartItem->save();

            return response()->json([
                'message' => 'Cập nhật số lượng sản phẩm trong giỏ hàng thành công.',
                'cart_item' => $cartItem,
            ]);
        }

        // Nếu chưa tồn tại, thêm mới sản phẩm vào giỏ hàng
        $cartItem = CartItem::create([
            'user_id' => $userId,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
        ]);

        return response()->json([
            'message' => 'Thêm sản phẩm vào giỏ hàng thành công.',
            'cart_item' => $cartItem,
        ]);
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
