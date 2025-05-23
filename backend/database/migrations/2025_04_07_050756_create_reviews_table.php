<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
       Schema::create('reviews', function (Blueprint $table) {
    $table->id('review_id');
    $table->unsignedBigInteger('user_id');
    $table->unsignedBigInteger('product_id');
    $table->unsignedTinyInteger('rating');
    $table->text('comment')->nullable();
    $table->timestamps();

    $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
    $table->unique(['user_id', 'product_id']);
});

    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
