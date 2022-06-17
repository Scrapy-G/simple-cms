<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->unique()->name(),
            'description' => $this->faker->realText(200, 2),
            'price' => $this->faker->numberBetween(100, 1000),
            'address' => $this->faker->streetName(),
        ];
    }
}
