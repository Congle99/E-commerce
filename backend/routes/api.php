<?php

use App\Http\Controllers\Api\ContactInfoController;
use App\Http\Controllers\Api\ProductApiController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('contact-info', [ContactInfoController::class, 'getCompanyInfo']);
Route::post('contact-info', [ContactInfoController::class, 'upsert']);


Route::get('/products/sort', [ProductApiController::class, 'sort']); // Sắp xếp sản phẩm
