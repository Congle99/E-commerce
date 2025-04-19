<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;
    // Tên bảng, nếu không chỉ định thì Laravel sẽ tự động lấy tên bảng dạng số nhiều của model (products)
    protected $table = 'products';

    // Khóa chính của bảng
    protected $primaryKey = 'id';

    // Các thuộc tính có thể điền (mass assignable)
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'discount_price',
        'category_id',
        'image',
        'status',
        'inventory',
    ];

    // Các thuộc tính không cần timestamps nếu bạn không muốn Laravel tự động quản lý
    // public $timestamps = false;
    // Tuy nhiên, bảng của bạn có cột created_at và updated_at, nên để mặc định là true

    // Định nghĩa quan hệ với model Category (dựa trên category_id)
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'id');
    }

    // Nếu cần cast các kiểu dữ liệu
    protected $casts = [
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'inventory' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
