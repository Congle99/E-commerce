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
        $request->validate([
            'account' => 'required|string', // Kiểm tra trường account
            'password' => 'required|string',
        ]);

        // Có thể đăng nhập bằng email hoặc username
        $user = User::where('email', $request->account)
                    ->orWhere('username', $request->account) 
                    ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Đăng nhập thất bại.'], 401);
        }

        //Tạo token sau đăng nhập 
$token = $user->createToken('auth_token')->plainTextToken;

return response()->json([

'success' => true,

'user' => [

'id' => $user->id,

'email' => $user->email,

'username' => $user->username,

'phone' => $user->phone,

'role' => $user->role,

],

'token' => $token,

]);

}

// Đăng ký tài khoản
public function register(Request $request)

{

$validator = Validator::make($request->all(), [

'username' => 'required|string|unique:user,username',

'phone' => 'required|string|unique:user,phone',

'email' => 'required|email|unique:user,email',

'password' => 'required|min:6',

]);

if ($validator->fails()) {

return response()->json([

'success' => false,

'message' => $validator->errors()->first(),

'errors' => $validator->errors()

], 400);

}

$user = User::create([

'username' => $request->username,

'phone' => $request->phone,

'email' => $request->email,

'password' => Hash::make($request->password),

'questionpassword' => '', // để rỗng 

'role' => 'user',

]);

$token = $user->createToken('auth_token')->plainTextToken;

return response()->json([

'success' => true,

'user' => [

'id' => $user->id,

'email' => $user->email,

'username' => $user->username,

'phone' => $user->phone,

'role' => $user->role,

],

'token' => $token,

]);

}
// Xác thực thông tin để cho phép đổi mật khẩu
public function forgotPasswordCheck(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'phone' => 'required|string',
        'questionpassword' => 'required|string',
    ]);

    $user = User::where('email', $request->email)
        ->where('phone', $request->phone)
        ->where('questionpassword', $request->questionpassword)
        ->first();

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Thông tin không chính xác.'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'message' => 'Xác thực thành công.'
    ]);
}

// Đổi mật khẩu mới sau xác thực
public function resetPassword(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'newPassword' => 'required|string|min:8',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Người dùng không tồn tại.'
        ], 404);
    }

    $user->password = \Hash::make($request->newPassword);
    $user->save();

    return response()->json([
        'success' => true,
        'message' => 'Mật khẩu đã được đổi thành công.'
    ]);
}

}
