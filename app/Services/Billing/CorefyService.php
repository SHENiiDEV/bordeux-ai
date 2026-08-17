<?php

namespace App\Services\Billing;

use App\Models\Transaction;

class CorefyService implements PaymentGatewayInterface
{
    protected string $secretKey;

    public function __construct()
    {
        $this->secretKey = config('services.corefy.secret_key', 'corefy_secret_key');
    }

    public function createInvoiceUrl(Transaction $transaction, string $returnUrl): string
    {
        $token = hash_hmac('sha256', "{$transaction->order_id}:{$transaction->amount}:{$transaction->currency}", $this->secretKey);
        return "https://pay.corefy.com/h2h/{$transaction->order_id}?sig={$token}";
    }

    public function verifyWebhookSignature(array $payload, string $signature, string $secret): bool
    {
        $dataStr = implode('|', array_filter($payload, fn($k) => $k !== 'signature', ARRAY_FILTER_USE_KEY));
        $expected = hash_hmac('sha256', $dataStr, $secret ?: $this->secretKey);
        return hash_equals($expected, $signature);
    }
}
