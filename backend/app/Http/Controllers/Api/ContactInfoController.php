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
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'google_map' => 'nullable|url',
        ]);

        $info = ContactInfo::create($request->all());

        return response()->json($info, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return ContactInfo::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $info = ContactInfo::findOrFail($id);
        $info->update($request->all());
        return response()->json($info);
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
