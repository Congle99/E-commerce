<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

abstract class ProductController
{
    public function getAll(){
        return Product::all();
    }

    public function createProduct(Request $request){
        $item = Product::created($request -> all());
        return response() -> json($item, 201);
    }
}
