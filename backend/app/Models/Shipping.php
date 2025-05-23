<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'first_name',
        'last_name',
        'company_name',
        'city',
        'district',
        'ward',
        'address',
        'phone',
        'email',
        'postcode',
        'note',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
