<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Đây là nơi bạn có thể đăng ký các API routes cho ứng dụng của bạn.
|
*/

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Routes được bảo vệ bằng auth:sanctum middleware
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Routes dành cho admin
    Route::middleware('role:admin')->group(function () {
        // Thêm các routes chỉ admin mới truy cập được ở đây
        // Ví dụ: Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    });
    
    // Routes dành cho user thông thường
    Route::middleware('role:user')->group(function () {
        // Thêm các routes chỉ user thông thường mới truy cập được ở đây
        // Ví dụ: Route::get('/user/orders', [UserController::class, 'orders']);
    });
});