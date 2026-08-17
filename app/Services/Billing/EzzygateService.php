<?php

namespace App\Services\Billing;

use App\Models\Transaction;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class EzzygateService implements PaymentGatewayInterface
{
    protected string $apiKey;
    protected string $secretKey;
    protected string $apiUrl;

    public function __construct()
    {
        $this->apiKey = config('services.ezzygate.api_key', 'ezzy_live_demo_key');
        $this->secretKey = config('services.ezzygate.secret_key', 'ezzy_secret_signature_key');
        $this->apiUrl = config('services.ezzygate.api_url', 'https://api.ezzygate.com/v1');
    }

    public function createInvoiceUrl(Transaction $transaction, string $returnUrl): string
    {
        $payload = [
            'order_id' => $transaction->order_id,
            'amount' => number_format($transaction->amount, 2, '.', ''),
            'currency' => $transaction->currency,
            'customer_email' => $transaction->user->email,
            'return_url' => $returnUrl,
            'timestamp' => time(),
        ];

        $payload['signature'] = hash_hmac('sha256', json_encode($payload), $this->secretKey);

        // Simulated API call or direct Checkout URL generation
        return "https://checkout.ezzygate.com/pay/{$transaction->order_id}?token=" . $payload['signature'];
    }

    public function verifyWebhookSignature(array $payload, string $signature, string $secret): bool
    {
        if (empty($signature)) {
            return false;
        }

        $expectedSignature = hash_hmac('sha256', json_encode($payload), $secret ?: $this->secretKey);
        return hash_equals($expectedSignature, $signature);
    }
}
