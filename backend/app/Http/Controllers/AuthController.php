<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json([
                'success' => true,
                'role' => $user->role,
                'message' => 'Đăng nhập thành công.',
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Đăng nhập thất bại. Kiểm tra lại email hoặc mật khẩu.',
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user' // Mặc định role là user
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đăng ký thành công.',
        ]);
    }
}