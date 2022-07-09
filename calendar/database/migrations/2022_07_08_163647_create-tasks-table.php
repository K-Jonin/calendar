<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tasks', function (Blueprint $table) {
			$table->id();
			$table->string("title", 20);
			$table->string("desc")->nullable();
			$table->date("task_date");
			$table->time("start_time")->nullable();
			$table->time("finish_time")->nullable();
			$table->integer("delete_flag")->default(0);
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
		Schema::dropIfExists('tasks');
	}
}
