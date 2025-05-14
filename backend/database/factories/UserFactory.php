<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        return [
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password123'), // Mã hóa mật khẩu
            'role' => $this->faker->randomElement(['admin', 'user']), // Giả sử role có thể là admin hoặc user
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null, // Mặc định không bị xóa mềm
        ];
    }

}
