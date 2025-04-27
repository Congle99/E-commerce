<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'invoice_number',
        'total_amount',
        'invoice_date',
        'status', 
    ];

    

    // Quan hệ với Order (mỗi hóa đơn thuộc về một đơn hàng)
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    
    
}
