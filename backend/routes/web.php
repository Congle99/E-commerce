<?php

use App\Http\Controllers\Api\ContactInfoController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('/api/contact-infos', ContactInfoController::class);
