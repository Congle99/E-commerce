<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up(): void
    {
          Schema::table('reviews', function (Blueprint $table) {
        // Sửa lại dòng này: chỉ rõ tên constraint để tránh lỗi
        $table->dropForeign('reviews_user_id_foreign');

        // Tạo lại khóa ngoại, chú ý bảng là 'user' hoặc 'users' tùy bảng thực tế
        $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade');
    });
        
    }

    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
        $table->dropForeign('reviews_user_id_foreign');

        // Quay lại như ban đầu
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    });
    }
};
