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
            $table->char('title', 45)->nullable($value=false);
            $table->char('img_url', 45)->nullable($value=true);
            $table->char('description', 45)->nullable($value=true);
            $table->text('preparation')->nullable($value=false);
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
