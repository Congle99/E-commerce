<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductApiController extends Controller
{

    /**
     * Tìm kiếm sản phẩm theo từ khóa.
     */
    public function search(Request $request)
    {
        $keyword = $request->query('keyword', '');

        $products = Product::where('name', 'LIKE', "%{$keyword}%")
            ->select('id', 'name', 'price', 'discount_price', 'image', 'inventory', 'status')
            ->with('category:id,name')
            ->paginate(12);

        if ($products->isEmpty()) {
            return response()->json([
                'data' => [],
                'message' => 'Không tìm thấy sản phẩm nào phù hợp.',
            ]);
        }

        return response()->json([
            'data' => $products->items(),
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
            'message' => 'Kết quả tìm kiếm sản phẩm',
        ]);
    }
}
