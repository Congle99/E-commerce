<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
{
    protected $model = Invoice::class;

    public function definition(): array
    {
        return [
            'order_id'       => Order::factory(), // giả lập luôn order nếu chưa có
            'invoice_number' => $this->faker->unique()->numerify('INV-####'),
            'total_amount'   => $this->faker->randomFloat(2, 100, 1000),
            'invoice_date'   => $this->faker->date(),
            'status'         => $this->faker->randomElement(['Đang chờ thanh toán', 'Đã thanh toán', 'Thanh toán khi nhận hàng']),
        ];
    }
}