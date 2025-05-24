<?php

namespace App\Http\Controllers;

use App\Models\PromotionCode;
use Illuminate\Http\Request;

class PromotionCodeController extends Controller
{
    // Lấy danh sách mã khuyến mãi
    public function index()
    {
        $promotionCodes = PromotionCode::paginate(10);
        return response()->json($promotionCodes);
    }
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|unique:promotion_codes',
            'discount_percentage' => 'required|integer|min:1|max:100',
            'valid_from' => 'required|date',
            'valid_to' => 'required|date|after_or_equal:valid_from',
            'usage_limit' => 'nullable|integer|min:1',
        ], [
            'code.required' => 'Mã giảm giá là bắt buộc',
            'code.unique' => 'Mã giảm giá đã tồn tại',
            'discount_percentage.required' => 'Phần trăm giảm giá là bắt buộc',
            'valid_from.required' => 'Ngày bắt đầu là bắt buộc',
            'valid_to.required' => 'Ngày kết thúc là bắt buộc',
        ]);

        $promo = PromotionCode::create($request->all());
        return response()->json($promo, 201);
    }
    public function update(Request $request, $id)
    {
        // Lấy bản ghi hiện tại
        $promotionCode = PromotionCode::findOrFail($id);

        // Quy tắc xác thực
        $request->validate([
            'code' => 'required|string|unique:promotion_codes,code,' . $promotionCode->id,
            'discount_percentage' => 'required|integer|min:1|max:100',
            'valid_from' => 'required|date',
            'valid_to' => 'required|date|after_or_equal:valid_from',
            'usage_limit' => 'nullable|integer|min:1',
        ]);

        // Cập nhật dữ liệu
        $promotionCode->update($request->all());

        return response()->json($promotionCode, 200);
    }
    public function destroy($id)
    {
        try {
            $promotionCode = PromotionCode::find($id);

            if (!$promotionCode) {
                return response()->json(['message' => 'Không tìm thấy mã khuyến mãi.'], 404);
            }

            $promotionCode->delete();

            return response()->json(['message' => 'Mã khuyến mãi đã được xóa.']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Không thể xóa mã khuyến mãi.', 'error' => $e->getMessage()], 500);
        }
    }
    // Xác thực mã khuyến mãi (chỉ trả về thông tin)
    public function validatePromotionCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $promotionCode = PromotionCode::where('code', $request->code)
            ->where('valid_from', '<=', now())
            ->where('valid_to', '>=', now())
            ->first();

        if (!$promotionCode) {
            return response()->json(['message' => 'Mã khuyến mãi không hợp lệ hoặc đã hết hạn.'], 400);
        }

        if ($promotionCode->usage_limit !== null && $promotionCode->usage_limit <= 0) {
            return response()->json(['message' => 'Mã khuyến mãi đã đạt giới hạn sử dụng.'], 400);
        }

        return response()->json([
            'message' => 'Mã khuyến mãi hợp lệ.',
            'discount_percentage' => $promotionCode->discount_percentage,
        ], 200);
    }

    //Xác nhận thanh toán và trừ mã khuyến mãi
    public function confirmPayment(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $promotionCode = PromotionCode::where('code', $request->code)
            ->where('valid_from', '<=', now())
            ->where('valid_to', '>=', now())
            ->first();

        if (!$promotionCode) {
            return response()->json(['message' => 'Mã khuyến mãi không hợp lệ hoặc đã hết hạn.'], 400);
        }

        if ($promotionCode->usage_limit !== null && $promotionCode->usage_limit <= 0) {
            return response()->json(['message' => 'Mã khuyến mãi đã đạt giới hạn sử dụng.'], 400);
        }

        // Trừ số lượng sử dụng
        if ($promotionCode->usage_limit !== null) {
            $promotionCode->decrement('usage_limit');
        }

        return response()->json([
            'message' => 'Xác nhận thanh toán thành công. Mã khuyến mãi đã được áp dụng.',
            'discount_percentage' => $promotionCode->discount_percentage,
        ], 200);
    }
}
