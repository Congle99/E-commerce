<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'email' => 'required|string|email|max:255|unique:users,email', // Kiểm tra email duy nhất
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|max:10|in:user,admin',
        ]);

        // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay chưa
        if (User::where('email', $validated['email'])->exists()) {
            return response()->json(['message' => 'Email đã tồn tại.'], 400);
        }

        // Tạo người dùng mới nếu email chưa tồn tại
        $user = User::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] ?? 'user',
        ]);

        // Tạo token cho người dùng vừa đăng ký
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials + ['deleted_at' => null])) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        }

        return response()->json(['message' => 'Invalid credentials or account deleted'], 401);
    }

    public function profile(Request $request)
    {
        return response()->json($request->user());
    }
}