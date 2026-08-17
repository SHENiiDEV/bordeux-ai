<?php

namespace App\Services\Billing;

use App\Models\Transaction;

interface PaymentGatewayInterface
{
    /**
     * Generate payment session URL for an order.
     */
    public function createInvoiceUrl(Transaction $transaction, string $returnUrl): string;

    /**
     * Verify incoming webhook signature hash.
     */
    public function verifyWebhookSignature(array $payload, string $signature, string $secret): bool;
}
