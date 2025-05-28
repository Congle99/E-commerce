<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\InformationCustomer;
use Illuminate\Support\Facades\Validator;

class UserProfileController extends Controller
{
    /**
     * Lấy thông tin cá nhân người dùng.
     */
    public function show()
    {
        $userId = Auth::id();

        $profile =InformationCustomer ::where('user_id', $userId)->first();

        if (!$profile) {
            return response()->json(['message' => 'Chưa có thông tin cá nhân'], 404);
        }

        return response()->json($profile);
    }

    /**
     * Lưu hoặc cập nhật thông tin cá nhân người dùng.
     */
    public function store(Request $request)
    {
        $userId = Auth::id();

        $validator = Validator::make($request->all(), [
            'first_name'    => 'required|string|max:255',
            'last_name'     => 'required|string|max:255',
            'company_name'  => 'nullable|string|max:255',
            'address'       => 'required|string|max:500',
            'email'         => 'nullable|email|max:255',
            'phone'         => 'required|string|max:20',
            'city'          => 'required|string|max:255',
            'district'      => 'required|string|max:255',
            'ward'          => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only([
            'first_name', 'last_name', 'company_name', 'address', 'phone', 'email', 'city', 'district', 'ward'
        ]);
        

        $profile = InformationCustomer::updateOrCreate(
            ['user_id' => $userId],
            $data
        );

        return response()->json($profile, 200);
    }
}
