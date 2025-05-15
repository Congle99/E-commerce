<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group.
|
*/

// Thêm route test
Route::get('/test-route-works', function () {
    return response()->json(['message' => 'Route test works!']);
});

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// User profile routes với prefix
Route::prefix('user')->group(function () {
    Route::post('/profile', [ProfileController::class, 'getUserProfile']);
    Route::get('/orders', [ProfileController::class, 'getUserOrders']);
    Route::get('/payments', [ProfileController::class, 'getUserPayments']);
});

// Test route
Route::get('/test-route', function () {
    return 'Hello from API route!';
});