<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 400);
        }

        // Kiểm tra người dùng
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Email hoặc mật khẩu không đúng.'], 401);
        }

        // Tạo token nếu dùng Sanctum (bỏ comment nếu dùng)
        // $token = $user->createToken('auth_token')->plainTextToken;
        
        // Trả về thông tin người dùng và vai trò
        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'role' => $user->role,
            ],
            // 'token' => $token, // Bỏ comment nếu dùng Sanctum
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first(), 'errors' => $validator->errors()], 400);
        }

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user', // giá trị mặc định
        ]);

        // Tạo token nếu dùng Sanctum (bỏ comment nếu dùng)
        // $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true, 
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'role' => $user->role,
            ],
            // 'token' => $token, // Bỏ comment nếu dùng Sanctum
        ]);
    }
}