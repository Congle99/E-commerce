<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Shipping;
use App\Models\CartItem;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{

    // public function index()
    // {
    //     try {
    //         $orders = Order::with('user')
    //             ->orderBy('created_at', 'desc')
    //             ->paginate(10);

    //         return response()->json([
    //             'data' => $orders->items(),
    //             'current_page' => $orders->currentPage(),
    //             'last_page' => $orders->lastPage(),
    //             'total' => $orders->total(),
    //         ], 200);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'message' => 'Không thể lấy danh sách đơn hàng',
    //             'error' => $e->getMessage(),
    //         ], 500);
    //     }
    // }

    /**
     * Display a listing of the orders.
     */
    public function index(Request $request)
    {
        try {
            // Lấy tham số status từ query string
            $status = $request->query('status');

            // Bắt đầu query
            $query = Order::with('user') // Lấy thông tin user liên quan
                ->orderBy('created_at', 'desc'); // Sắp xếp theo ngày tạo mới nhất

            // Nếu có status và không phải 'all', thêm điều kiện lọc
            if ($status && $status !== 'all') {
                $query->where('status', $status);
            }

            // Phân trang, 10 đơn hàng/trang
            $orders = $query->paginate(10);

            return response()->json([
                'data' => $orders->items(), // Danh sách đơn hàng
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'total' => $orders->total(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Không thể lấy danh sách đơn hàng',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created order in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|in:pending,completed,delivered,Đang giao,Đã giao'  // sửa lại thêm trạng thái
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $order = Order::create([
            'user_id' => $request->user_id,
            'total_price' => $request->total_price,
            'status' => $request->status,
        ]);

        // Tạo hóa đơn nếu trạng thái là delivered, completed, Đang giao hoặc Đã giao
        if (in_array($order->status, ['delivered', 'completed', 'Đang giao', 'Đã giao'])) {
            Invoice::create([
                'order_id' => $order->id,
                'invoice_number' => 'INV-' . now()->format('YmdHis') . '-' . $order->id,
                'total_amount' => $order->total_price,
                'invoice_date' => now()->toDateString(),
                'status' => 'unpaid',
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Order created successfully',
            'data' => $order
        ], 201);
    }

    /**
     * Display the specified order.
     */
    public function show($id)
    {
        $order = Order::with('user')->find($id);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $order
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'sometimes|exists:users,id',
            'total_price' => 'sometimes|numeric|min:0',
            'status' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $oldStatus = $order->status;

        $order->update($request->only(['user_id', 'total_price', 'status']));
        $order->refresh();

        $newStatus = $order->status;

        // Tạo hóa đơn nếu trạng thái chuyển sang Đang giao hoặc Đã giao và chưa có invoice
        if (
            in_array($newStatus, ['Đang giao', 'Đã giao'])
            && $oldStatus !== $newStatus
            && !$order->invoice
        ) {

            Invoice::create([
                'order_id' => $order->id,
                'invoice_number' => 'INV-' . now()->format('YmdHis') . '-' . $order->id,
                'total_amount' => $order->total_price,
                'invoice_date' => now()->toDateString(),
                'status' => 'unpaid',
            ]);
        } else {
            // \Log::info('Không tạo invoice, hoặc invoice đã tồn tại hoặc trạng thái không thay đổi');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Order updated successfully',
            'data' => $order
        ], 200);
    }

    public function destroy($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found'
            ], 404);
        }

        $order->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Order deleted successfully'
        ], 200);
    }

    public function getInvoice($orderId)
    {
        $order = Order::find($orderId);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found'
            ], 404);
        }

        $invoice = $order->invoice;

        if (!$invoice) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invoice not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $invoice
        ], 200);
    }
    public function createOrder(Request $request)
    {
        $userId = Auth::id();

        $request->validate([
            'cart_items' => 'required|array',
            'cart_items.*.product_id' => 'required|exists:products,id',
            'cart_items.*.quantity' => 'required|integer|min:1',
            'shipping' => 'required|array',
            'shipping.first_name' => 'required|string|max:255',
            'shipping.last_name' => 'required|string|max:255',
            'shipping.company_name' => 'nullable|string|max:255',
            'shipping.city' => 'required|string|max:255',
            'shipping.district' => 'required|string|max:255',
            'shipping.ward' => 'required|string|max:255',
            'shipping.address' => 'required|string|max:255',
            'shipping.phone' => 'required|string|max:15',
            'shipping.email' => 'required|email|max:255',
            'shipping.postcode' => 'required|string|max:10',
            'shipping.note' => 'nullable|string',
            'payment_method' => 'required|string|max:20',
            'promotion_code' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            $totalPrice = 0;
            $orderItems = [];

            foreach ($request->cart_items as $item) {
                $product = \App\Models\Product::find($item['product_id']);
                if (!$product) continue;
                if ($product->inventory < $item['quantity']) {
                    return response()->json(['message' => 'Sản phẩm không đủ số lượng.'], 400);
                }
                $lineTotal = $product->price * $item['quantity'];
                $totalPrice += $lineTotal;
                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price
                ];
            }

            // Xử lý mã giảm giá
            $discountAmount = 0;
            if ($request->filled('promotion_code')) {
                $promotion = \App\Models\PromotionCode::where('code', $request->promotion_code)
                    ->where('valid_from', '<=', now())
                    ->where('valid_to', '>=', now())
                    ->where(function ($q) {
                        $q->whereNull('usage_limit')->orWhere('usage_limit', '>', 0);
                    })
                    ->first();

                if ($promotion && $totalPrice >= ($promotion->min_order_value ?? 0)) {
                    $discountAmount = ($totalPrice * $promotion->discount_percentage) / 100;
                    if (isset($promotion->max_discount_amount)) {
                        $discountAmount = min($discountAmount, $promotion->max_discount_amount);
                    }
                    if ($promotion->usage_limit !== null) {
                        $promotion->decrement('usage_limit');
                    }
                }
            }
            $finalPrice = $totalPrice - $discountAmount;

            // Tạo đơn hàng
            $order = Order::create([
                'user_id' => $userId,
                'total_price' => $finalPrice,
                'status' => 'Chờ xác nhận',
            ]);

            // Lưu chi tiết đơn hàng vào order_items
            foreach ($orderItems as $item) {
                \App\Models\Order_Items::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            // Lưu thông tin giao hàng
            $shipping = Shipping::create(array_merge($request->shipping, ['order_id' => $order->id]));

            // Lưu thông tin thanh toán
            $payment = Payment::create([
                'order_id' => $order->id,
                'payment_method' => $request->payment_method,
                'payment_status' => 2, // Pending
                'payment_date' => now(),
            ]);

            DB::commit();
            // XÓA GIỎ HÀNG
            CartItem::where('user_id', $userId)->delete();
            // Load các thông tin liên quan để trả về cho FE
            $order->load(['user', 'shipping', 'payment']);
            $orderDetails = \App\Models\Order_Items::with('product')->where('order_id', $order->id)->get();

            return response()->json([
                'message' => 'Đơn hàng được tạo thành công.',
                'order' => $order,
                'order_details' => \App\Http\Resources\OrderDetailResource::collection($orderDetails),
                'shipping' => $shipping,
                'payment' => $payment,
                'discount_amount' => $discountAmount,
                'final_price' => $finalPrice,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Lỗi khi tạo đơn hàng.', 'error' => $e->getMessage()], 500);
        }
    }

    private function calculateTotalPrice($cartItems)
    {
        return collect($cartItems)->reduce(function ($total, $item) {
            $product = \App\Models\Product::find($item['product_id']);
            return $total + ($product->price * $item['quantity']);
        }, 0);
    }
}
