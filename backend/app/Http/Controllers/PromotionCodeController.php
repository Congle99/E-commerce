<?php

namespace App\Http\Controllers;

use App\Models\PromotionCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PromotionCodeController extends Controller
{
    // Lấy danh sách mã khuyến mãi
    public function index()
    {
        $promotionCodes = PromotionCode::paginate(10);
        return response()->json($promotionCodes);
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
}
