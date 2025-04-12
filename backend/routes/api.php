<?php
use App\Http\Controllers\ProductController;
use Illuminate\Routing\Route;
use App\Http\Controllers\Api\UserController;
Route::get('/product', [ProductController::class, 'getAll']);
Route::post('/product', [ProductController::class, 'cteateProduct']);


Route::get('/users', [UserController::class, 'index']);
