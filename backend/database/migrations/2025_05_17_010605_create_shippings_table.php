<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShippingsTable extends Migration
{
    public function up()
    {
        Schema::create('shippings', function (Blueprint $table) {
            $table->id('id'); // Auto-increment primary key
            $table->unsignedBigInteger('order_id'); // Foreign key to orders table
            $table->string('first_name');
            $table->string('last_name');
            $table->string('company_name')->nullable();
            $table->string('city');
            $table->string('district');
            $table->string('ward');
            $table->string('address');
            $table->string('phone', 15);
            $table->string('email');
            $table->string('postcode');
            $table->text('note')->nullable();
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('shippings');
    }
}
