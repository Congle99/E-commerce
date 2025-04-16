<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Giả định bạn có model User và factory tương ứng
            'total_price' => $this->faker->randomFloat(2, 10, 1000), // Giá ngẫu nhiên từ 10 đến 1000
            'status' => $this->faker->randomElement(['Đã giao', 'Đang giao', 'Hủy']), // Trạng thái ngẫu nhiên
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
