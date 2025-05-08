<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'data' => $products->items(),
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'discount_price' => 'required|numeric',
            'category_id' => 'required|integer|exists:categories,id',
            'status' => 'required|string|max:255',
            'inventory' => 'required|integer',
            'image' => 'required|image|max:2048', // Tối đa 2MB
        ]);

        // Lưu hình ảnh
        $imagePath = $request->file('image')->store('uploads', 'public');

        // Tạo sản phẩm
        $product = Product::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'price' => $request->price,
            'discount_price' => $request->discount_price,
            'category_id' => $request->category_id,
            'status' => $request->status,
            'inventory' => $request->inventory,
            'image' => $imagePath,
        ]);

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:products,slug,' . $id,
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric',
            'discount_price' => 'sometimes|required|numeric',
            'category_id' => 'sometimes|required|integer|exists:categories,id',
            'status' => 'sometimes|required|string|max:255',
            'inventory' => 'sometimes|required|integer',
            'image' => 'sometimes|image|max:2048', // Tối đa 2MB
        ]);

        // Cập nhật hình ảnh nếu có
        if ($request->hasFile('image')) {
            // Xóa ảnh cũ nếu tồn tại
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                try {
                    Storage::disk('public')->delete($product->image);
                } catch (\Exception $e) {
                    // Log error if needed
                }
            }
            // Lưu ảnh mới
            $imagePath = $request->file('image')->store('uploads', 'public');
            $validated['image'] = $imagePath;
        }

        // Cập nhật sản phẩm
        $product->update($validated);

        return response()->json($product, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Xóa sản phẩm thành công'], 200);
    }
}
