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
        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'min:3',                        // Tối thiểu 3 ký tự
                'max:30',
                'regex:/^[A-Z0-9\-_]+$/',      // Chỉ chữ hoa, số, dấu gạch ngang và gạch dưới
                'unique:promotion_codes,code',   // Kiểm tra unique
            ],
            'discount_percentage' => [
                'required',
                'integer',
                'min:1',
                'max:100',
            ],
            'valid_from' => [
                'required',
                'date',
                'after_or_equal:now',           // Không cho phép tạo trong quá khứ
                'before_or_equal:' . now()->addYears(1)->format('Y-m-d H:i:s'), // Tối đa 1 năm tới
            ],
            'valid_to' => [
                'required',
                'date',
                'after_or_equal:valid_from',
                'before_or_equal:' . now()->addYears(2)->format('Y-m-d H:i:s'), // Tối đa 2 năm
            ],
            'usage_limit' => [
                'nullable',
                'integer',
                'min:1',
                'max:1000000',                  // Giới hạn tối đa
            ],
        ], [
            // === CODE VALIDATION MESSAGES ===
            'code.required' => 'Mã giảm giá là bắt buộc',
            'code.string' => 'Mã giảm giá phải là chuỗi ký tự',
            'code.min' => 'Mã giảm giá phải có ít nhất 3 ký tự',
            'code.max' => 'Mã giảm giá không được vượt quá 30 ký tự',
            'code.regex' => 'Mã giảm giá chỉ được chứa chữ cái in hoa, số, dấu gạch ngang (-) và gạch dưới (_)',
            'code.unique' => 'Mã giảm giá đã tồn tại trong hệ thống',

            // === DISCOUNT PERCENTAGE MESSAGES ===
            'discount_percentage.required' => 'Phần trăm giảm giá là bắt buộc',
            'discount_percentage.integer' => 'Phần trăm giảm giá phải là số nguyên',
            'discount_percentage.min' => 'Phần trăm giảm giá phải từ 1% trở lên',
            'discount_percentage.max' => 'Phần trăm giảm giá không được vượt quá 100%',

            // === VALID FROM MESSAGES ===
            'valid_from.required' => 'Ngày bắt đầu hiệu lực là bắt buộc',
            'valid_from.date' => 'Ngày bắt đầu hiệu lực không đúng định dạng ngày',
            'valid_from.after_or_equal' => 'Ngày bắt đầu hiệu lực không được trong quá khứ',
            'valid_from.before_or_equal' => 'Ngày bắt đầu hiệu lực không được quá 1 năm kể từ hiện tại',

            // === VALID TO MESSAGES ===
            'valid_to.required' => 'Ngày kết thúc hiệu lực là bắt buộc',
            'valid_to.date' => 'Ngày kết thúc hiệu lực không đúng định dạng ngày',
            'valid_to.after_or_equal' => 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu',
            'valid_to.before_or_equal' => 'Ngày kết thúc hiệu lực không được quá 2 năm kể từ hiện tại',

            // === USAGE LIMIT MESSAGES ===
            'usage_limit.integer' => 'Giới hạn sử dụng phải là số nguyên',
            'usage_limit.min' => 'Giới hạn sử dụng phải từ 1 lượt trở lên',
            'usage_limit.max' => 'Giới hạn sử dụng không được vượt quá 1,000,000 lượt',
        ]);


        $validated['code'] = strtoupper(trim($validated['code']));

        $promo = PromotionCode::create([
            'code' => $validated['code'],
            'discount_percentage' => $validated['discount_percentage'],
            'valid_from' => $validated['valid_from'],
            'valid_to' => $validated['valid_to'],
            'usage_limit' => $validated['usage_limit'] ?? null,
        ]);

        return response()->json($promo, 201);
    }
    public function update(Request $request, $id)
    {
        $promotionCode = PromotionCode::findOrFail($id);

        // Kiểm tra cập nhật đồng thời
        if ($request->has('updated_at') && $request->input('updated_at') !== $promotionCode->updated_at->toISOString()) {
            return response()->json([
                'message' => 'Dữ liệu đã được cập nhật ở nơi khác. Vui lòng tải lại trang trước khi chỉnh sửa.'
            ], 409);
        }

        // Xử lý trim code trước khi validate
        $request->merge([
            'code' => strtoupper(trim($request->input('code')))
        ]);

        $validated = $request->validate([
            'code' => [
                'required',
                'string',
                'min:3',                    // ✅ Tối thiểu 3 ký tự
                'max:30',
                'regex:/^[A-Z0-9\-_]+$/',   // ✅ Chỉ cho phép chữ hoa, số, dấu gạch ngang và gạch dưới
                'unique:promotion_codes,code,' . $promotionCode->id,
            ],
            'discount_percentage' => [
                'required',
                'integer',
                'min:1',
                'max:100',
            ],
            'valid_from' => [
                'required',
                'date',
            ],
            'valid_to' => [
                'required',
                'date',
                'after_or_equal:valid_from',
                'before_or_equal:' . now()->addYears(5)->format('Y-m-d'), // ✅ Tối đa 5 năm
            ],
            'usage_limit' => [
                'nullable',
                'integer',
                'min:1',
                'max:1000000',              // ✅ Giới hạn tối đa hợp lý
            ],
        ], [
            // ✅ Đầy đủ validation messages
            'code.required' => 'Mã giảm giá là bắt buộc',
            'code.min' => 'Mã giảm giá phải có ít nhất 3 ký tự',
            'code.max' => 'Mã giảm giá không được vượt quá 30 ký tự',
            'code.regex' => 'Mã giảm giá chỉ được chứa chữ cái in hoa, số, dấu gạch ngang và gạch dưới',
            'code.unique' => 'Mã giảm giá đã tồn tại',

            'discount_percentage.required' => 'Phần trăm giảm giá là bắt buộc',
            'discount_percentage.integer' => 'Phần trăm giảm giá phải là số nguyên',
            'discount_percentage.min' => 'Phần trăm giảm giá phải từ 1% trở lên',
            'discount_percentage.max' => 'Phần trăm giảm giá không được vượt quá 100%',

            'valid_from.required' => 'Ngày bắt đầu là bắt buộc',
            'valid_from.date' => 'Ngày bắt đầu không hợp lệ',

            'valid_to.required' => 'Ngày kết thúc là bắt buộc',
            'valid_to.date' => 'Ngày kết thúc không hợp lệ',
            'valid_to.after_or_equal' => 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu',
            'valid_to.before_or_equal' => 'Ngày kết thúc không được quá 5 năm kể từ hiện tại',

            'usage_limit.integer' => 'Giới hạn sử dụng phải là số nguyên',
            'usage_limit.min' => 'Giới hạn sử dụng phải từ 1 trở lên',
            'usage_limit.max' => 'Giới hạn sử dụng không được vượt quá 1,000,000',
        ]);

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
