<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'T-shirt Cotton',
                'slug' => 't-shirt-cotton',
                'description' => 'A comfortable cotton T-shirt perfect for everyday wear.',
                'price' => 150.00,
                'discount_price' => 120.00,
                'category_id' => 1, // Thay đổi theo ID của danh mục thực tế
                'image' => 'images/t-shirt-cotton.jpg',
            ],
            [
                'name' => 'Jeans Slim Fit',
                'slug' => 'jeans-slim-fit',
                'description' => 'A pair of stylish slim-fit jeans for a modern look.',
                'price' => 250.00,
                'discount_price' => 200.00,
                'category_id' => 2, // Thay đổi theo ID của danh mục thực tế
                'image' => 'images/jeans-slim-fit.jpg',
            ],
            [
                'name' => 'Sneakers Sports',
                'slug' => 'sneakers-sports',
                'description' => 'Comfortable sneakers for running and sports activities.',
                'price' => 500.00,
                'discount_price' => 450.00,
                'category_id' => 3, // Thay đổi theo ID của danh mục thực tế
                'image' => 'images/sneakers-sports.jpg',
            ],
            [
                'name' => 'Jacket Leather',
                'slug' => 'jacket-leather',
                'description' => 'A premium leather jacket for a stylish look.',
                'price' => 700.00,
                'discount_price' => 650.00,
                'category_id' => 1, // Thay đổi theo ID của danh mục thực tế
                'image' => 'images/jacket-leather.jpg',
            ],
            [
                'name' => 'Sunglasses Ray-Ban',
                'slug' => 'sunglasses-ray-ban',
                'description' => 'Ray-Ban sunglasses with a classic design.',
                'price' => 150.00,
                'discount_price' => 130.00,
                'category_id' => 4, // Thay đổi theo ID của danh mục thực tế
                'image' => 'images/sunglasses-ray-ban.jpg',
            ],
            [
                'name' => 'Winter Coat',
                'slug' => 'winter-coat',
                'description' => 'A warm winter coat perfect for cold weather.',
                'price' => 850.00,
                'discount_price' => 800.00,
                'category_id' => 1, // Thay đổi theo ID của danh mục thực tế
                'image' => 'images/winter-coat.jpg',
            ],
            [
                'name' => 'Watch Rolex',
                'slug' => 'watch-rolex',
                'description' => 'Luxury Rolex watch for those who appreciate fine timepieces.',
                'price' => 12000.00,
                'discount_price' => 11500.00,
                'category_id' => 5, // Thay đổi theo ID của danh mục thực tế
                'image' => 'images/watch-rolex.jpg',
            ],
            [
                'name' => 'Backpack Hiking',
                'slug' => 'backpack-hiking',
                'description' => 'A durable backpack designed for hiking and outdoor adventures.',
                'price' => 180.00,
                'discount_price' => 150.00,
                'category_id' => 3, // Thay đổi theo ID của danh mục thực tế
                'image' => 'images/backpack-hiking.jpg',
            ],
            [
                'name' => 'Hat Baseball',
                'slug' => 'hat-baseball',
                'description' => 'Stylish baseball hat for casual wear.',
                'price' => 50.00,
                'discount_price' => 40.00,
                'category_id' => 4, // Thay đổi theo ID của danh mục thực tế
                'image' => 'images/hat-baseball.jpg',
            ],
            [
                'name' => 'Leather Wallet',
                'slug' => 'leather-wallet',
                'description' => 'A high-quality leather wallet with multiple compartments.',
                'price' => 120.00,
                'discount_price' => 100.00,
                'category_id' => 5, // Thay đổi theo ID của danh mục thực tế
                'image' => 'images/leather-wallet.jpg',
            ],
        ]);
    }
}
