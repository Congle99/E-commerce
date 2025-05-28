<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SupportRequestMail;

class SupportController extends Controller
{
    public function send(Request $request)
    {
    $request->validate([
        'email' => 'required|email',
        'message' => 'required|string|max:1000',
    ]);

    $adminEmail = 'hdhai2710@gmail.com';

    try {
        Mail::to($adminEmail)->send(
            new SupportRequestMail($request->email, $request->message)
        );

        return response()->json(['success' => true, 'message' => 'Gửi email thành công']);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gửi email thất bại: ' . $e->getMessage()
        ], 500);
    }
    }
}

