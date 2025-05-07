<?php

     namespace App\Models;

     use Illuminate\Foundation\Auth\User as Authenticatable;
     use Illuminate\Notifications\Notifiable;
     use Laravel\Sanctum\HasApiTokens;
     use Illuminate\Database\Eloquent\SoftDeletes;

     class User extends Authenticatable
     {
         use HasApiTokens, Notifiable, SoftDeletes;

         protected $fillable = [
             'email',
             'password',
             'role',
         ];

         protected $hidden = [
             'password',
             'remember_token',
         ];

         protected $dates = ['deleted_at'];
     }