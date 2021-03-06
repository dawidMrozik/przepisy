<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecepieRatingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Ratings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('rate')->nullable($value=false);
            $table->tinyInteger('israted')->nullable($value=false);
            $table->timestamps();
            $table->unsignedInteger('recipe_id');
            $table->unsignedInteger('user_id');
            $table->foreign('recipe_id')->references('id')->on('recipes');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Recepie');
    }
}
