<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
 
class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => [
                'required',
                'email:rfc,dns',
                'unique:user,email',
                'not_regex:/<[^>]*>/i'
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[a-z]/',        // chữ thường
                'regex:/[0-9]/',        // số
                'not_regex:/<[^>]*>/i'
            ],
            'password_confirmation' => 'required|same:password',
            'questionpassword' => [
                'required',
                'string',
                'max:50',
                'not_regex:/<[^>]*>/i'
            ],
        ], [
            'email.required' => 'Vui lòng nhập email.',
            'email.email' => 'Email không hợp lệ.',
            'email.unique' => 'Email đã được sử dụng.',
            'email.not_regex' => 'Email không được chứa mã HTML.',
            'password.required' => 'Vui lòng nhập mật khẩu.',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'password.regex' => 'Mật khẩu phải bao gồm chữ thường và số.',
            'password.not_regex' => 'Mật khẩu không được chứa mã HTML.',
            'password_confirmation.required' => 'Vui lòng xác nhận mật khẩu.',
            'password_confirmation.same' => 'Mật khẩu xác nhận không khớp.',
            'questionpassword.required' => 'Câu hỏi bảo mật là bắt buộc.',
            'questionpassword.max' => 'Câu hỏi bảo mật không được vượt quá 50 ký tự.',
            'questionpassword.not_regex' => 'Câu hỏi bảo mật không được chứa mã HTML.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Dữ liệu không hợp lệ.',
                'errors' => $validator->errors(),
            ], 400);
        }

        $user = User::create([
            'email' => strip_tags(trim($request->email)),
            'password' => Hash::make(strip_tags(trim($request->password))),
            'questionpassword' => strip_tags(trim($request->questionpassword ?? '')),
            'role' => 'user',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Đăng ký thành công!',
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token,
        ]);
    }

    public function login(Request $request)
    {
    // Xác thực đầu vào: chỉ dùng email + password
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    // Tìm người dùng theo email
    $user = User::where('email', $request->email)->first();

    // Nếu không tìm thấy người dùng
    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Tài khoản không tồn tại.'
        ], 404);
    }

    // Nếu mật khẩu sai
    if (!Hash::check($request->password, $user->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Mật khẩu không đúng.'
        ], 401);
    }

    // Đăng nhập thành công - tạo token
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'success' => true,
        'message' => 'Đăng nhập thành công.',
        'user' => [
            'id' => $user->id,
            'email' => $user->email,
            'role' => $user->role,
        ],
        'token' => $token,
    ]);
    }

    //Xác thực tài khoản với questionpassword 
    public function forgotPasswordCheck(Request $request)
{
    $request->validate([
        'email' => [
            'required',
            'email:rfc,dns',
            'not_regex:/<[^>]*>/i'
        ],
        'questionpassword' => [
            'required',
            'string',
            'max:50',
            'not_regex:/<[^>]*>/i'
        ],
    ], [
        'email.required' => 'Vui lòng nhập email.',
        'email.email' => 'Email không hợp lệ.',
        'email.not_regex' => 'Email không được chứa mã HTML.',
        'questionpassword.required' => 'Câu hỏi bảo mật là bắt buộc.',
        'questionpassword.max' => 'Câu hỏi bảo mật không được vượt quá 50 ký tự.',
        'questionpassword.not_regex' => 'Câu hỏi bảo mật không được chứa mã HTML.',
    ]);

    $user = User::where('email', $request->email)
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
        'email' => [
            'required',
            'email:rfc,dns',
            'not_regex:/<[^>]*>/i'
        ],
        'newPassword' => [
            'required',
            'string',
            'min:8',
            'max:50',
            'regex:/[a-z]/',         // ít nhất 1 chữ thường
            'regex:/[0-9]/',         // ít nhất 1 số
            'not_regex:/<[^>]*>/i',  // không chứa HTML
            'not_regex:/\s/',        // không chứa khoảng trắng
        ],
    ], [
        'email.required' => 'Vui lòng nhập email.',
        'email.email' => 'Email không hợp lệ.',
        'email.not_regex' => 'Email không được chứa mã HTML.',

        'newPassword.required' => 'Vui lòng nhập mật khẩu mới.',
        'newPassword.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
        'newPassword.max' => 'Mật khẩu không được vượt quá 50 ký tự.',
        'newPassword.regex' => 'Mật khẩu phải có ít nhất một chữ thường và một số.',
        'newPassword.not_regex' => 'Mật khẩu không được chứa khoảng trắng hoặc mã HTML.',
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
