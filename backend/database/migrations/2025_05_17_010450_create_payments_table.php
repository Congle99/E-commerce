<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id('payment_id'); // Auto-increment primary key
            $table->unsignedBigInteger('order_id'); // Foreign key to orders table
            $table->string('payment_method', 20); // e.g. 'cash', 'bank_transfer'
            $table->tinyInteger('payment_status')->default(2); // 1 = success, 2 = pending, 0 = failed
            $table->dateTime('payment_date')->nullable(); // Payment date
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
