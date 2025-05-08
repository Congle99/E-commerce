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

        // Lọc theo thương hiệu (Giả sử có cột 'brand')
        if ($request->has('brand')) {
            $query->where('brand', $request->brand);
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
