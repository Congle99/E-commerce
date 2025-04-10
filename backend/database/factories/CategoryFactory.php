<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
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
        $name = $this->faker->randomElement($categoryNames);
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'parent_id' => null, 
        ];
    }
}
