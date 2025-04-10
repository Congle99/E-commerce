<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('api')->group(function (){
    Route::get('/api/product', [ProductController::class, 'index']);
    Route::get('/api/category',[CategoryController::class, 'index']);
});
