<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecepieTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Recipes', function (Blueprint $table) {
            $table->increments('id');
            $table->text('title')->nullable($value=false);
            $table->text('img_url')->nullable($value=true);
            $table->text('description')->nullable($value=true);
            $table->text('preparation')->nullable($value=false);
            $table->integer('calories');
            $table->timestamps();
            $table->integer('user_id');
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
