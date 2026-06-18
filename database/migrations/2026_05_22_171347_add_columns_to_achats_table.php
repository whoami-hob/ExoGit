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
    Schema::table('achats', function (Blueprint $table) {
        $table->string('nom_article')->after('fournisseur_id'); 
        $table->string('mode_paiement')->after('montant');    
    });
}

public function down(): void
{
    Schema::table('achats', function (Blueprint $table) {
        $table->dropColumn(['nom_article', 'mode_paiement']);
    });
}
};
