<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\InvoiceController;

Route::get('api/invoices', [InvoiceController::class, 'index']);


Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->middleware(['api'])->group(function () {
    Route::resource('product', ProductController::class);
    Route::get('stats', [StatsController::class, 'index']);
    Route::get('category', [CategoryController::class, 'index']);
    Route::resource('order', OrderController::class);
    Route::resource('order/order-details', OrderDetailController::class);
    Route::middleware('api')->get('api/invoices', [InvoiceController::class, 'index']);

    


});
