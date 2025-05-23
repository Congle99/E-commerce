<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            // Xóa ràng buộc cũ (nếu có)
            $table->dropForeign(['user_id']);

            // Sửa foreign key liên kết đúng bảng `user`
            $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            // Nếu muốn rollback lại như cũ
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
};
