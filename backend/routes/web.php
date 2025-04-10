<?php

use App\Http\Controllers\Api\ContactInfoController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/api/contact-info', [ContactInfoController::class, 'getCompanyInfo']);
// Route::post('/api/contact-info', [ContactInfoController::class, 'upsert']);
