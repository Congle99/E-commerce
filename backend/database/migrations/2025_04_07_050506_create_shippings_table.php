<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shippings', function (Blueprint $table) {
            $table->id('shipping_id'); 
            $table->unsignedBigInteger('order_id');
            $table->string('shipping_address', 255);
            $table->tinyInteger('shipping_method')->default(1); 
            $table->decimal('shipping_cost', 10, 2)->default(0);
            $table->dateTime('delivery_date')->nullable(); 

            // Thêm khóa ngoại
            $table->foreign('order_id')
                  ->references('id')
                  ->on('orders')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shippings');
    }
};
