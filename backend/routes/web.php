<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PromotionCodeController;

use App\Http\Controllers\ProductReviewController;

use App\Http\Controllers\CartController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;


Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->middleware(['api'])->group(function () {
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

    Route::resource('product', ProductController::class);
    Route::get('stats', [StatsController::class, 'index']);
    Route::get('category', [CategoryController::class, 'index']);
    Route::resource('order', OrderController::class);
    Route::resource('order/order-details', OrderDetailController::class);

    
    //User
    Route::get('/categories', [CategoryController::class, 'indexUser']);
    Route::get('/product', [ProductController::class, 'index']);
    Route::get('/ProductUser/{id}', [ProductController::class, 'show']);




    Route::get('invoices', [InvoiceController::class, 'index']);
    Route::post('invoices', [InvoiceController::class, 'store']);
    Route::put('/invoices/{id}', [InvoiceController::class, 'update']);
    Route::get('/invoices/{id}', [InvoiceController::class, 'show']);
    Route::delete('invoices/{id}', [InvoiceController::class, 'destroy']);



    Route::post('/reviews', [ProductReviewController::class, 'store']); // bỏ middleware
    Route::get('/reviews/{productId}', [ProductReviewController::class, 'index']);

    Route::get('/promotion-codes', [PromotionCodeController::class, 'index'])->name('promotion-codes.index');
    Route::post('/promotion-codes', [PromotionCodeController::class, 'store'])->name('promotion-codes.store');
    Route::put('/promotion-codes/{id}', [PromotionCodeController::class, 'update'])->name('promotion-codes.update');
    Route::delete('/promotion-codes/{id}', [PromotionCodeController::class, 'destroy']);
    Route::post('/promotion-codes/validate', [PromotionCodeController::class, 'validatePromotionCode'])->name('promotion-codes.validate');
    Route::post('/promotion-codes/confirm', [PromotionCodeController::class, 'confirmPayment'])->name('promotion-codes.confirm');

    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
});
