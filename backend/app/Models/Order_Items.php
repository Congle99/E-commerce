<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order_Items extends Model
{
    use HasFactory;
    public $incrementing = false;

    protected $primaryKey = ['order_id', 'product_id'];

    protected $table = 'order_items';

    protected $fillable = ['order_id', 'product_id', 'quantity', 'price'];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function getKey()
    {
        return [
            'order_id' => $this->order_id,
            'product_id' => $this->product_id,
        ];
    }
}