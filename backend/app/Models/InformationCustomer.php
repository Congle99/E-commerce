<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InformationCustomer extends Model
{
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'company_name',
        'address',
        'phone',
        'email',
        'city',
        'district',
        'ward',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
