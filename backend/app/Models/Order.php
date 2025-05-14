<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_price',
        'status',
    ];

    // Định nghĩa ép kiểu cho trường status
    protected $casts = [
        'status' => 'string', // Vì đây là ENUM ('pending', 'completed')
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Quan hệ với User
    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }
}