<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DevisController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\AchatController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

// 1. الرابط الرئيسي: توجيه للمنصة
Route::get('/', function () {
    return redirect('/login');
});

// 2. مسارات محمية بـ auth (للجميع)
Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // البروفايل
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // العملاء
    Route::resource('clients', ClientController::class);

    // المنتجات
    Route::resource('products', ProductController::class);

    // عروض الأسعار (Devis)
    Route::prefix('devis')->name('devis.')->group(function () {
        Route::get('/', [DevisController::class, 'index'])->name('index');
        Route::get('/create', [DevisController::class, 'create'])->name('create');
        Route::post('/', [DevisController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [DevisController::class, 'edit'])->name('edit');
        Route::put('/{id}', [DevisController::class, 'update'])->name('update');
        Route::delete('/{id}', [DevisController::class, 'destroy'])->name('destroy');
        Route::get('/{id}/pdf', [DevisController::class, 'downloadPdf'])->name('pdf');
        Route::post('/{id}/convert-to-invoice', [DevisController::class, 'convertToInvoice'])->name('convert-to-invoice');
        Route::get('/{id}/validate-to-bc', [DevisController::class, 'validateToBC'])->name('validate-to-bc');
    });

    // الفواتير (Factures)
    Route::prefix('factures')->name('factures.')->group(function () {
        Route::get('/', [FactureController::class, 'index'])->name('index');
        Route::delete('/{facture}', [FactureController::class, 'destroy'])->name('destroy');
        Route::get('/{facture}/pdf', [FactureController::class, 'generatePDF'])->name('pdf');
        Route::patch('/{facture}/toggle-status', [FactureController::class, 'toggleStatus'])->name('toggle-status');
        Route::get('/trashed', [FactureController::class, 'trashed'])->name('trashed');
        Route::post('/{id}/restore', [FactureController::class, 'restore'])->name('restore');
    });

    // الموردين
    Route::prefix('fournisseurs')->name('fournisseurs.')->group(function () {
        Route::get('/', [FournisseurController::class, 'index'])->name('index');
        Route::get('/create', [FournisseurController::class, 'create'])->name('create');
        Route::post('/', [FournisseurController::class, 'store'])->name('store');
        Route::get('/{fournisseur}/edit', [FournisseurController::class, 'edit'])->name('edit');
        Route::put('/{fournisseur}', [FournisseurController::class, 'update'])->name('update');
        Route::delete('/{fournisseur}', [FournisseurController::class, 'destroy'])->name('destroy');
        Route::get('/{fournisseur}/achats', [FournisseurController::class, 'showAchats'])->name('achats');
    });

    // 3. مسارات خاصة بالـ Admin فقط
    Route::middleware('role:admin')->group(function () {
        // المشتريات
        Route::get('/achats/{id}/pdf', [AchatController::class, 'generatePdf'])->name('achats.pdf');
        Route::resource('achats', AchatController::class);
        
        
        // المستخدمين
        Route::resource('users', UserController::class);
    });

    // تسجيل الخروج
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

require __DIR__.'/auth.php';