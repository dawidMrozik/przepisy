<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIngredientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Ingredients', function (Blueprint $table) {
            $table->increments('id');
            $table->char('name', 45)->nullable($value=false);
            $table->integer('carbs')->nullable($value=false);
            $table->integer('proteins')->nullable($value=false);
            $table->integer('fats')->nullable($value=false);
            $table->integer('calories')->nullable($value=false);
            $table->timestamps();
            $table->integer('count_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Ingredient');
    }
}
