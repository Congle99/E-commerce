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
}
