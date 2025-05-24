<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('information_customers', function (Blueprint $table) {
            $table->id(); // ID riêng của bảng này
            $table->unsignedBigInteger('user_id')->unique(); // mỗi user chỉ có 1 thông tin khách hàng

            // Thông tin cá nhân
            $table->string('first_name');
            $table->string('last_name');
            $table->string('company_name')->nullable();
            $table->string('address');
            $table->string('phone');
            $table->string('email'); // có thể giống với email user
            $table->string('city');
            $table->string('district');
            $table->string('ward');

            $table->timestamps();

            // Khóa ngoại liên kết 1-1 với bảng user
            $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('information_customers');
    }
};
