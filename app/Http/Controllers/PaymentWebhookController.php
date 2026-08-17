<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\Billing\BillingManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentWebhookController extends Controller
{
    public function handle(Request $request, string $gateway)
    {
        $payload = $request->all();
        $signature = $request->header('X-Signature') ?? $request->header('X-Hub-Signature') ?? ($payload['signature'] ?? '');

        Log::info("Payment webhook received from gateway {$gateway}", [
            'payload' => $payload,
            'signature' => $signature,
        ]);

        $gatewayService = BillingManager::resolve($gateway);
        $isValid = $gatewayService->verifyWebhookSignature($payload, $signature, config("services.{$gateway}.secret_key", ''));

        if (!$isValid && !app()->environment('local', 'testing')) {
            Log::warning("Invalid signature on {$gateway} webhook");
            return response()->json(['error' => 'Invalid signature'], 401);
        }

        $orderId = $payload['order_id'] ?? null;
        $status = strtolower($payload['status'] ?? '');

        if (!$orderId) {
            return response()->json(['error' => 'Missing order_id'], 400);
        }

        $transaction = Transaction::where('order_id', $orderId)->first();

        if (!$transaction) {
            return response()->json(['error' => 'Transaction not found'], 404);
        }

        if (in_array($status, ['paid', 'success', 'completed'])) {
            $transaction->update([
                'status' => 'paid',
                'signature_hash' => $signature ?: 'verified',
            ]);

            $user = $transaction->user;
            $user->update([
                'membership_status' => 'active',
                'expires_at' => now()->addYear(),
            ]);

            Log::info("Membership activated for user {$user->id} via order {$orderId}");
        } elseif (in_array($status, ['failed', 'canceled', 'declined'])) {
            $transaction->update([
                'status' => 'failed',
                'signature_hash' => $signature ?: 'failed',
            ]);
        }

        return response()->json(['status' => 'ok']);
    }
}
