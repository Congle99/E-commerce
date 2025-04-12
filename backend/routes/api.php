<?php
use App\Http\Controllers\ProductController;
use Illuminate\Routing\Route;

Route::get('/product', [ProductController::class, 'getAll']);
Route::post('/product', [ProductController::class, 'cteateProduct']);