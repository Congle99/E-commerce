<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Order_Items;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $this->call([
        //     CategorySeeder::class,
        //     // InvoiceSeeder::class
        // ]);
        // $this->call([
        //     PromotionCodeSeeder::class,
        // ]);
        Product::factory()->count(20)->create();

        // Order::factory()->count(15)->create();

        // Order_Items::factory()->count(50)->create();
        // $this->call([
        //     CartItemSeeder::class,
        // ]);
    }
}
