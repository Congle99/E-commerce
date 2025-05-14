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
            // Tạo hoặc tham chiếu đến một bản ghi trong bảng orders
            'order_id' => Order::factory(),
            // Tạo hoặc tham chiếu đến một bản ghi trong bảng products
            'product_id' => Product::factory(),
            // Số lượng: một số ngẫu nhiên từ 1 đến 10
            'quantity' => $this->faker->numberBetween(1, 10),
            // Giá: một số thập phân ngẫu nhiên từ 10.00 đến 500.00
            'price' => $this->faker->randomFloat(2, 10, 500),
            'created_at' => now(),
            'updated_at' => now(),
        ];   
    }
}
