<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePromotionCodesTable extends Migration
{
    public function up()
    {
        Schema::create('promotion_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->integer('discount_percentage')->unsigned(); // Phần trăm giảm giá
            $table->date('valid_from'); // Ngày bắt đầu
            $table->date('valid_to'); // Ngày kết thúc
            $table->integer('usage_limit')->unsigned()->nullable(); // Giới hạn số lần sử dụng
            $table->integer('used_times')->default(0); // Số lần đã sử dụng
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('promotion_codes');
    }
}
