<?php

use App\Http\Controllers\Api\ContactInfoController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('contact-info', [ContactInfoController::class, 'getCompanyInfo']);
Route::post('contact-info', [ContactInfoController::class, 'upsert']);
