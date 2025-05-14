<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CartItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Dữ liệu mẫu cho bảng cart_items
        DB::table('cart_items')->insert([
            [
                'user_id' => 1, // Người dùng 1
                'product_id' => 1, // Sản phẩm 1
                'quantity' => 2, // Số lượng
            ],
            [
                'user_id' => 1, // Người dùng 1
                'product_id' => 2, // Sản phẩm 2
                'quantity' => 1, // Số lượng
            ],
            [
                'user_id' => 2, // Người dùng 2
                'product_id' => 3, // Sản phẩm 3
                'quantity' => 3, // Số lượng
            ],
        ]);
    }
}
