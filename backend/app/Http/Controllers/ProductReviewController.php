<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;

class ProductReviewController extends Controller
{
    // Lấy danh sách review của sản phẩm
    public function index($productId)
    {
        $reviews = Review::with('user')->where('product_id', $productId)->latest()->get();

        return response()->json($reviews);
    }

    // Thêm hoặc cập nhật đánh giá (1 user chỉ được đánh giá 1 lần 1 sp)
    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'product_id' => 'required|exists:products,id',
    //         'rating' => 'required|integer|min:1|max:5',
    //         //'comment' => 'nullable|string',
    //         'comment' => 'required|string|max:255',
    //     ]);

    //     $review = Review::updateOrCreate(
    //         [
    //             'user_id' => Auth::id(),
    //             'product_id' => $validated['product_id'],
    //         ],
    //         [
    //             'rating' => $validated['rating'],
    //             'comment' => $validated['comment'] ?? '',
    //         ]
    //     );

    //     return response()->json($review, 201);
    // }

    public function store(Request $request)
{
    $validated = $request->validate([
        'product_id' => 'required|exists:products,id',
        'rating' => 'required|integer|min:1|max:5',
        'comment' => 'required|string|max:255',
    ]);

    $userId = Auth::id();

    // Kiểm tra xem user đã đánh giá sản phẩm này chưa
    $alreadyReviewed = Review::where('user_id', $userId)
        ->where('product_id', $validated['product_id'])
        ->exists();

    if ($alreadyReviewed) {
        return response()->json([
            'message' => 'Bạn đã đánh giá sản phẩm này rồi.'
        ], 409); // Conflict
    }

    $review = Review::create([
        'user_id' => $userId,
        'product_id' => $validated['product_id'],
        'rating' => $validated['rating'],
        'comment' => $validated['comment'],
    ]);

    return response()->json($review, 201);
}


    public function update(Request $request, $id)
{
    $user = $request->user();
    $review = Review::findOrFail($id);

    // Chỉ cho phép người tạo đánh giá được sửa
    if ($review->user_id !== $user->id) {
        return response()->json(['message' => 'Bạn không có quyền sửa đánh giá này.'], 403);
    }

    $request->validate([
        'rating' => 'required|integer|min:1|max:5',
        'comment' => 'required|string|max:255',
    ]);

    $review->update([
        'rating' => $request->rating,
        'comment' => $request->comment,
    ]);

    return response()->json(['message' => 'Cập nhật đánh giá thành công.']);
}

public function destroy(Request $request, $id)
{
    $user = $request->user();
    $review = Review::findOrFail($id);

    // Kiểm tra quyền
    if ($review->user_id !== $user->id) {
        return response()->json(['message' => 'Bạn không có quyền xóa đánh giá này.'], 403);
    }

    $review->delete();
    return response()->json(['message' => 'Đánh giá đã được xóa.']);
}


}
