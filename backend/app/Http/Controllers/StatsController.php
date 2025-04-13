<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Tổng số sản phẩm
        $totalProducts = Product::count();

        // Tổng số danh mục
        $totalCategories = Category::count();

        // Tổng đơn hàng trong tháng (giả định có bảng orders)
        $monthlyOrders = Order::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total_price'); // Giả định có cột total trong bảng orders

        // Số đơn hàng chờ xử lý (giả định có cột status trong bảng orders)
        $pendingOrders = Order::where('status', 'pending')->count();

        return response()->json([
            'total_products' => $totalProducts,
            'monthly_orders' => $monthlyOrders,
            'pending_orders' => $pendingOrders,
            'total_categories' => $totalCategories,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
