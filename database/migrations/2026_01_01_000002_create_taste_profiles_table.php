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
        Schema::create('taste_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('budget_tier', 200)->default('reserve'); // e.g., 'classic', 'reserve', 'grand_cru', 'rare_vintage'
            $table->string('preferred_notes', 200)->nullable(); // e.g., 'Oak, Blackcurrant, Earthy'
            $table->string('blacklisted_notes', 200)->nullable(); // e.g., 'Vanilla, Sweet'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taste_profiles');
    }
};
