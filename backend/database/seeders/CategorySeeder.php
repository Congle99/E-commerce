<?php 
use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categoryNames = [
            'Áo Thun',
            'Quần Jeans',
            'Váy Dài',
            'Áo Sơ Mi',
            'Áo Khoác',
            'Chân Váy',
            'Quần Short',
            'Áo Len',
            'Đồ Bộ',
            'Áo Hoodie',
        ];

        foreach ($categoryNames as $name) {
            Category::factory()->create([
                'name' => $name,
                'slug' => Str::slug($name),
                'parent_id' => null,
            ]);
        }
    }
}
