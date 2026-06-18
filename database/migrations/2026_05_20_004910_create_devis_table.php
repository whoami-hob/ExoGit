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
    Schema::create('devis', function (Blueprint $table) {
        $table->id();
        // ربط الـ Devis بـ جدول الـ clients (علاقة Foreign Key)
        // إذا حُذف الزبون، تُحذف تقديراته تلقائياً لتجنب الأخطاء Cascade
        $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
        
        $table->string('devis_number')->unique(); // رقم تسلسلي فريد (مثال: DEV-2026-0001)
        $table->date('devis_date'); // تاريخ إصدار العرض
        
        // حالة الـ Devis: الافتراضية هي معلق (en_attente)
        $table->string('status')->default('en_attente'); // en_attente, valide, refuse
        
        $table->decimal('total_ht', 10, 2)->default(0); // المجموع الصافي دون رسوم
        $table->decimal('tva', 5, 2)->default(20.00); // نسبة الضريبة (مثلا 20% في المغرب)
        $table->decimal('total_ttc', 10, 2)->default(0); // المجموع الإجمالي بالرسوم
        
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devis');
    }
};
