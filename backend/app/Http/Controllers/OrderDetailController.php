<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderDetailResource;
use App\Models\Order_Items;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orderDetails = Order_Items::with(['order', 'product'])->get();
        return OrderDetailResource::collection($orderDetails);
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
        $orderDetails = Order_Items::with(['order.user', 'product'])
            ->where('order_id', $id)
            ->get();

        if ($orderDetails->isEmpty()) {
            abort(404, 'Không tìm thấy chi tiết đơn hàng cho order_id này.');
        }
        return OrderDetailResource::collection($orderDetails);
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
