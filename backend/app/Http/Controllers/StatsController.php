<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $timeRange = $request->query('timeRange', 'month');
        $now = Carbon::now();

        // Get the start date based on time range
        $startDate = match ($timeRange) {
            'day' => $now->copy()->subDays(7),
            'month' => $now->copy()->subMonths(6),
            'year' => $now->copy()->subYears(1),
            default => $now->copy()->subMonths(6),
        };

        // Get revenue data with status consideration
        $revenueData = Order::select(
            DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d") as date'),
            DB::raw('SUM(CASE 
                WHEN status = "Hủy" THEN -total_price 
                ELSE total_price 
            END) as total')
        )
            ->where('created_at', '>=', $startDate)
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Get orders count data
        $ordersData = Order::select(
            DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d") as date'),
            DB::raw('COUNT(*) as count')
        )
            ->where('created_at', '>=', $startDate)
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Get products count data
        $productsData = Product::select(
            DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d") as date'),
            DB::raw('COUNT(*) as count')
        )
            ->where('created_at', '>=', $startDate)
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Format data for response
        $labels = $revenueData->pluck('date')->toArray();
        $revenue = $revenueData->pluck('total')->toArray();
        $orders = $ordersData->pluck('count')->toArray();
        $products = $productsData->pluck('count')->toArray();

        // Get current totals
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        
        // Calculate monthly orders total considering status
        $monthlyOrders = Order::whereMonth('created_at', $now->month)
            ->whereYear('created_at', $now->year)
            ->select(DB::raw('SUM(CASE 
                WHEN status = "Hủy" THEN -total_price 
                ELSE total_price 
            END) as total'))
            ->value('total') ?? 0;

        // Count pending orders with "pending confirmation" status
        $pendingOrders = Order::where('status', 'Chờ xác nhận')->count();

        return response()->json([
            'labels' => $labels,
            'revenue' => $revenue,
            'orders' => $orders,
            'products' => $products,
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
