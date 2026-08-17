<?php

namespace App\Services\Billing;

use App\Models\Transaction;

class CardaqService implements PaymentGatewayInterface
{
    protected string $secretKey;

    public function __construct()
    {
        $this->secretKey = config('services.cardaq.secret_key', 'cardaq_secret_key');
    }

    public function createInvoiceUrl(Transaction $transaction, string $returnUrl): string
    {
        $token = hash_hmac('sha256', "{$transaction->order_id}:{$transaction->amount}", $this->secretKey);
        return "https://cardaq.com/checkout/{$transaction->order_id}?auth={$token}";
    }

    public function verifyWebhookSignature(array $payload, string $signature, string $secret): bool
    {
        $expected = hash_hmac('sha256', json_encode($payload), $secret ?: $this->secretKey);
        return hash_equals($expected, $signature);
    }
}
