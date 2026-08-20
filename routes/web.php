<?php

use App\Http\Controllers\Auth\InviteRegistrationController;
use App\Http\Controllers\Auth\MembershipApplicationController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\TasteProfileController;
use App\Http\Controllers\WineCellarController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Landing / Applied Access Route
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canApply' => true,
    ]);
})->name('home');

// Phase 1 Legal Routes
Route::prefix('legal')->name('legal.')->group(function () {
    Route::get('/terms', [LegalController::class, 'terms'])->name('terms');
    Route::get('/privacy', [LegalController::class, 'privacy'])->name('privacy');
    Route::get('/refund', [LegalController::class, 'refund'])->name('refund');
});

// Phase 1 Private Membership Apply & Invite Routes
Route::get('/membership/apply', [MembershipApplicationController::class, 'create'])->name('membership.apply');
Route::post('/membership/apply', [MembershipApplicationController::class, 'store'])->name('membership.apply.store');

Route::get('/invite/{code}', [InviteRegistrationController::class, 'create'])->name('invite.claim');
Route::post('/invite/register', [InviteRegistrationController::class, 'store'])->name('invite.register');

// Authenticated Private Concierge Dashboard Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();
        return Inertia::render('Dashboard', [
            'user' => $user,
            'cellarCount' => $user->wineCellar()->count(),
            'tasteProfile' => $user->tasteProfile,
            'recentWines' => $user->wineCellar()->latest()->take(4)->get(),
        ]);
    })->name('dashboard');

    // Phase 4 Taste Profile & Cellar
    Route::get('/taste-profile', [TasteProfileController::class, 'show'])->name('taste-profile.show');
    Route::put('/taste-profile', [TasteProfileController::class, 'update'])->name('taste-profile.update');

    Route::get('/cellar', [WineCellarController::class, 'index'])->name('cellar.index');
    Route::get('/cellar/export', [WineCellarController::class, 'exportCsv'])->name('cellar.export');
    Route::post('/cellar', [WineCellarController::class, 'store'])->name('cellar.store');
    Route::delete('/cellar/{wine}', [WineCellarController::class, 'destroy'])->name('cellar.destroy');

    // Phase 2 Billing Routes
    Route::get('/billing', [BillingController::class, 'index'])->name('billing.index');
    Route::post('/billing/checkout', [BillingController::class, 'checkout'])->name('billing.checkout');

    // Wallet & Invoice Routes
    Route::get('/wallet', [\App\Http\Controllers\WalletController::class, 'index'])->name('wallet.index');
    Route::post('/wallet/topup', [\App\Http\Controllers\WalletController::class, 'topup'])->name('wallet.topup');
    Route::post('/wallet/deduct', [\App\Http\Controllers\WalletController::class, 'deduct'])->name('wallet.deduct');
    Route::get('/wallet/invoice/{payment}', [\App\Http\Controllers\WalletController::class, 'downloadInvoice'])->name('wallet.invoice');

    // Admin Concierge Invite Management
    Route::get('/admin/invites', [\App\Http\Controllers\Admin\AdminInviteController::class, 'index'])->name('admin.invites.index');
    Route::post('/admin/invites', [\App\Http\Controllers\Admin\AdminInviteController::class, 'store'])->name('admin.invites.store');
});

require __DIR__.'/auth.php';
