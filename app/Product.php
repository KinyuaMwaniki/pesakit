<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    protected $guarded = [];

    public function suppliers()
    {
        return $this->belongsToMany(Supplier::class, 'supplier_products', 'product_id', 'supply_id')->select('suppliers.id', 'name');
    }

    protected $casts = [
        'quantity' => 'integer'
    ];
}
