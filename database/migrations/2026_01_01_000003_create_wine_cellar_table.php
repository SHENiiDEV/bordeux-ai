<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wine_cellar', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('wine_name', 200);
            $table->string('region', 200)->nullable();
            $table->string('type', 100)->nullable(); // Red, White, Sparkling, Rose, Fortified
            $table->string('price_segment', 100)->nullable(); // e.g. 'Grand Cru', 'Premier Cru', 'Rare Vintage'
            $table->decimal('ai_rating', 4, 1)->nullable(); // e.g., 98.5
            $table->decimal('user_rating', 4, 1)->nullable(); // e.g., 96.0
            $table->text('notes')->nullable();
            $table->integer('vintage_year')->nullable();
            $table->integer('peak_drinking_start')->nullable();
            $table->integer('peak_drinking_end')->nullable();
            $table->decimal('estimated_value', 10, 2)->default(0.00);
            $table->integer('bottle_count')->default(1);
            $table->string('added_via', 50)->default('ai_recommendation'); // 'ai_recommendation' or 'manual'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wine_cellar');
    }
};
