<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::enableForeignKeyConstraints();

        Schema::create('Users', function (Blueprint $table) {
            $table->increments('id');
            $table->char('name', 50)->nullable($value = false);
            $table->char('email', 100)->unique()->nullable($value = false);
            $table->text('password')->nullable($value = false);
            $table->timestamps();
            $table->rememberToken();
            $table->unsignedInteger('detail_id')->default(1);
            $table->unsignedInteger('role_id')->default(2);
            $table->foreign('detail_id')->references('id')->on('details');
            $table->foreign('role_id')->references('id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('User');
    }
}
