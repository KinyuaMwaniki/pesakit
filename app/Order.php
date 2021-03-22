<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;
    
    protected $guarded = [];
    
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_details')->select('products.id', 'name', 'description', 'quantity');
    }
}
