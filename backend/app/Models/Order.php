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

public function user()
{
    // Tham số thứ 2 là khóa ngoại trong bảng orders trỏ tới users.id
    return $this->belongsTo(User::class, 'user_id');
}

public function invoice()
{
    return $this->hasOne(Invoice::class, 'order_id');
}

    
    
}