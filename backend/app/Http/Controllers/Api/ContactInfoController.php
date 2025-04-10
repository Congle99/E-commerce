<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactInfo;
use Illuminate\Http\Request;

class ContactInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ContactInfo::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'email' => 'nullable|email',
    //         'phone' => 'nullable|string',
    //         'address' => 'nullable|string',
    //         'google_map' => 'nullable|url',
    //     ]);

    //     $info = ContactInfo::create($request->all());

    //     return response()->json($info, 201);
    // }
    public function upsert(Request $request)
    {
        $request->validate([
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'google_map' => 'nullable|url'
        ]);
        $info = ContactInfo::first();
        if ($info) {
            $info->update(($request->all()));
        } else {
            $info = ContactInfo::create($request->all());
        }
        return response()->json($info);
    }
    public function getCompanyInfo()
    {
        $info = ContactInfo::first();
        return response()->json($info);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return ContactInfo::findOrFail($id);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        ContactInfo::destroy($id);
        return response()->json(null, 204);
    }
}
