<?php

namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class FeedbackFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'content' => $this->faker->paragraph(),
            'rating' => $this->faker->numberBetween(1, 5),
            'reply' => $this->faker->boolean(50) ? $this->faker->sentence() : null,
        ];
    }
}
