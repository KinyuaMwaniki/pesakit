<?php

use App\Product;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $one = Product::create([
            'name' => 'Pen',
            'description' => 'Bic Pens',
            'quantity' => '40',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        $two = Product::create([
            'name' => 'NoteBook',
            'description' => 'Spiral Bind Note book',
            'quantity' => '100',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
