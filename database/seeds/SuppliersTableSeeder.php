<?php

use App\Supplier;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SuppliersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $one = Supplier::create([
            'name' => 'Tuskys',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        $two = Supplier::create([
            'name' => 'Total',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
