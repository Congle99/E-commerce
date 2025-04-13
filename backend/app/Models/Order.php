<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $table = 'orders';

    protected $fillable = [
        'user_id',
        'total_price',
        'status',
    ];

    protected $casts = [
        'total_price' => 'decimal:2',
        'status' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Quan hệ với model User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
