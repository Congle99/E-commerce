<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Tạo 50 sản phẩm mẫu
        for ($i = 1; $i <= 50; $i++) {
            Product::create([
                'name' => "Sản phẩm mẫu {$i}",
                'slug' => Str::slug("Sản phẩm mẫu {$i}"),
                'description' => "Mô tả chi tiết cho sản phẩm mẫu {$i}",
                'price' => rand(100000, 500000),
                'discount_price' => rand(50000, 90000),
                'category_id' => rand(1, 5),
                'image' => 'https://bizweb.dktcdn.net/100/446/974/products/ao-thun-mlb-new-era-heavy-cotton-new-york-yankees-black-13086578-1.jpg?v=1691318321487',
                'status' => rand(0, 1) ? 'Còn hàng' : 'Hết hàng',
                'inventory' => rand(0, 100),
            ]);
        }
    }
}
