<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductApiController extends Controller
{

    /**
     * Sắp xếp sản phẩm theo giá, tên hoặc độ phổ biến.
     */
    public function sort(Request $request)
    {
        $sortBy = $request->query('sort_by', 'name'); // Mặc định sắp xếp theo tên
        $order = $request->query('order', 'asc'); // Mặc định sắp xếp tăng dần

        $validSorts = ['price', 'name', 'popularity']; // Các trường hợp sắp xếp hợp lệ
        if (!in_array($sortBy, $validSorts)) {
            return response()->json([
                'data' => [],
                'message' => 'Tham số sắp xếp không hợp lệ.',
            ]);
        }

        $products = Product::select('id', 'name', 'price', 'discount_price', 'image', 'inventory', 'status')
            ->with('category:id,name')
            ->orderBy($sortBy, $order)
            ->paginate(12);

        return response()->json([
            'data' => $products->items(),
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
            'message' => 'Danh sách sản phẩm sau khi sắp xếp',
        ]);
    }
}
