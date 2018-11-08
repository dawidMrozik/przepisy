<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIngredientsCountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Counts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('amount')->nullable($value=false);
            $table->char('unit', 45)->nullable($value=false);
            $table->timestamps();
            $table->integer("ingredient_id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Count');
    }
}
