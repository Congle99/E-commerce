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
    // Tạo mã khuyến mãi mới
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|unique:promotion_codes',
            'discount_percentage' => 'required|integer|min:1|max:100',
            'valid_from' => 'required|date',
            'valid_to' => 'required|date|after_or_equal:valid_from',
            'usage_limit' => 'nullable|integer|min:1',
        ]);

        $promo = PromotionCode::create($request->all());
        return response()->json($promo, 201);
    }
}
