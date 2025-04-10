<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Thêm một số danh mục mẫu vào bảng categories
        DB::table('categories')->insert([
            ['name' => 'T-Shirts', 'slug' => 't-shirts', 'parent_id' => null],
            ['name' => 'Jeans', 'slug' => 'jeans', 'parent_id' => null],
            ['name' => 'Shoes', 'slug' => 'shoes', 'parent_id' => null],
            ['name' => 'Accessories', 'slug' => 'accessories', 'parent_id' => null],
            ['name' => 'Watches', 'slug' => 'watches', 'parent_id' => null],
        ]);
    }
}
