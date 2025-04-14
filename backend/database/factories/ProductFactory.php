<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Tạo slug từ tên sản phẩm
        $name = $this->faker->words(3, true); // Tạo tên sản phẩm từ 3 từ
        $slug = Str::slug($name); // Tạo slug từ tên
        return [
            'name' => $name,
            'slug' => $slug,
            'description' => $this->faker->paragraph(), // Mô tả ngẫu nhiên
            'price' => $this->faker->randomFloat(2, 10, 1000), // Giá từ 10 đến 1000
            'discount_price' => $this->faker->randomFloat(2, 5, 900), // Giá giảm từ 5 đến 900
            'category_id' => Category::factory(), // Giả định bạn có model Category và factory
            'image' => $this->faker->imageUrl(640, 480, 'products'), // URL hình ảnh giả
            'status' => $this->faker->randomElement(['Còn hàng', 'Hết hàng']), // Trạng thái ngẫu nhiên
            'inventory' => $this->faker->numberBetween(0, 100), // Số lượng tồn kho từ 0 đến 100
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
