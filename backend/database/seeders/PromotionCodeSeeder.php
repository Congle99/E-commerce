<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PromotionCode;

class PromotionCodeSeeder extends Seeder
{
    public function run()
    {
        // Thêm các mã khuyến mãi mẫu
        PromotionCode::insert([
            [
                'code' => 'SUMMER2025',
                'discount_percentage' => 20,
                'valid_from' => '2025-05-01',
                'valid_to' => '2025-06-01',
                'usage_limit' => 100,
                'used_times' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'WINTER2025',
                'discount_percentage' => 30,
                'valid_from' => '2025-11-01',
                'valid_to' => '2025-12-31',
                'usage_limit' => 50,
                'used_times' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'SPRING2025',
                'discount_percentage' => 15,
                'valid_from' => '2025-03-01',
                'valid_to' => '2025-04-01',
                'usage_limit' => null,
                'used_times' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
