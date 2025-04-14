<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Order_Items;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order_Items>
 */
class Order_ItemsFactory extends Factory
{
    protected $model = Order_Items::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(), // Giả định bạn có model Order và factory
            'product_id' => Product::factory(), // Giả định bạn có model Product và factory
            'quantity' => $this->faker->numberBetween(1, 10), // Số lượng ngẫu nhiên từ 1 đến 10
            'price' => $this->faker->randomFloat(2, 5, 500), // Giá ngẫu nhiên từ 5 đến 500
        ];
    }
}
