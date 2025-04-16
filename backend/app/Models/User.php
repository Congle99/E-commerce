<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'user';
    protected $fillable = [
        'email',
        'password',
        'role',
    ];

    // Định nghĩa ép kiểu
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    // Ẩn các trường nhạy cảm khi trả về dữ liệu
    protected $hidden = [
        'password',
    ];
}