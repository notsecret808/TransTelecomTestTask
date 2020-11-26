<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('book_name',150);
            $table->string('book_author',100);
            $table->string('book_description', 2000);
            $table->string('book_cover',80);
            $table->string('book_published',4)->nullable();
            $table->string('section_name',150);
            $table->timestamps();
        });
//        DB::statement('ALTER TABLE `books` ADD `book_cover` MEDIUMBLOB NOT NULL;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
