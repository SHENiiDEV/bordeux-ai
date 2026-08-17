<?php

use App\Http\Controllers\PaymentWebhookController;
use App\Http\Controllers\TelegramWebhookController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Phase 3 Telegram Webhook S2S Endpoint
Route::post('/telegram/webhook', [TelegramWebhookController::class, 'handle'])->name('api.telegram.webhook');

// Phase 2 Transactional Webhooks Endpoint for High-Ticket Gateways
Route::post('/webhooks/payment/{gateway}', [PaymentWebhookController::class, 'handle'])->name('api.payment.webhook');
