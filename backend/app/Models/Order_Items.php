<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order_Items extends Model
{
    use HasFactory;
    protected $table = 'order_items';
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
    ];

    // Định nghĩa ép kiểu
    protected $casts = [
        'price' => 'decimal:2',
    ];

    // Quan hệ với Order
    public function order()
    {
        return $this->belongsTo(Order::class, 'id');
    }

    // Quan hệ với Product
    public function product()
    {
        return $this->belongsTo(Product::class, 'id');
    }
}