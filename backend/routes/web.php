<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StatsController;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->middleware(['api'])->group(function () {
    Route::resource('/product', ProductController::class);
    Route::get('/stats', [StatsController::class, 'index']);
    Route::get('/category', [CategoryController::class, 'index']);
});
