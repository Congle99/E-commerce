<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Nếu bạn sử dụng Sanctum

class User extends Authenticatable
{
     use HasApiTokens, Notifiable, HasFactory ;
    // use HasApiTokens; // Thêm nếu bạn sử dụng Sanctum

    /**
     * Tên bảng được liên kết với model.
     *
     * @var string
     */
    protected $table = 'user'; // Quan trọng: Đảm bảo đúng tên bảng từ migration

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
     public function reviews()
    {
        return $this->hasMany(Review::class, 'user_id');
    }
}