<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->middleware(['api'])->group(function () {
    // Auth routes
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/test-route-works', function () {
        return response()->json(['message' => 'Route test works!']);
    });

    Route::resource('product', ProductController::class);
    Route::get('stats', [StatsController::class, 'index']);
    Route::get('category', [CategoryController::class, 'index']);
    Route::resource('order', OrderController::class);
    Route::resource('order/order-details', OrderDetailController::class);
    //User
    Route::get('/categories', [CategoryController::class, 'indexUser']);
    Route::get('/product', [ProductController::class, 'index']);
});
