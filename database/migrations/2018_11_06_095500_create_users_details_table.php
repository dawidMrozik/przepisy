<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::enableForeignKeyConstraints();
        
        Schema::create('Details', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('calories')->nullable($value = true);
            $table->integer('caloriesEaten')->nullable($value = false)->default(0);
            $table->integer('height')->nullable($value = true);
            $table->integer('weight')->nullable($value = true);
            $table->integer('age')->nullable($value = true);
            $table->integer('carbs')->nullable($value = true);
            $table->integer('protein')->nullable($value = true);
            $table->integer('fat')->nullable($value = true);
            $table->date('date')->nullable($value = false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('User_details');
    }
}
