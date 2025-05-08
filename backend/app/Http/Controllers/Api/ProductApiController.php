<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductApiController extends Controller
{
    /**
     * Hiển thị danh sách sản phẩm với hỗ trợ phân trang.
     */
    public function index(Request $request)
    {
        $products = Product::select('id', 'name', 'price', 'discount_price', 'image', 'inventory', 'status')
            ->with('category:id,name') // Lấy tên danh mục
            ->orderBy('created_at', 'desc') // Sắp xếp theo ngày tạo mới nhất
            ->paginate(12); // Phân trang (12 sản phẩm mỗi trang)

        return response()->json([
            'data' => $products->items(),
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
            'message' => 'Danh sách sản phẩm',
        ]);
    }
}
