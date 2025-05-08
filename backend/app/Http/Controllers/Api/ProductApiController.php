<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductApiController extends Controller
{

    /**
     * Lọc sản phẩm theo danh mục, giá và thương hiệu.
     */
    public function filter(Request $request)
    {
        $query = Product::query();

        // Lọc theo danh mục
        if ($request->has('categories') && !empty($request->categories)) {
            $categories = explode(',', $request->categories); // Danh sách category ID
            $query->whereIn('category_id', $categories);
        }

        // Lọc theo khoảng giá
        if ($request->has('min_price') && $request->has('max_price')) {
            $query->whereBetween('price', [$request->min_price, $request->max_price]);
        }

        $products = $query->select('id', 'name', 'price', 'discount_price', 'image', 'inventory', 'status')
            ->with('category:id,name')
            ->paginate(12);

        if ($products->isEmpty()) {
            return response()->json([
                'data' => [],
                'message' => 'Không có sản phẩm nào phù hợp với bộ lọc.',
            ]);
        }

        return response()->json([
            'data' => $products->items(),
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
            'message' => 'Danh sách sản phẩm sau khi lọc',
        ]);
    }
}
