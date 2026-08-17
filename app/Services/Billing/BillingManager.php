<?php

namespace App\Services\Billing;

use InvalidArgumentException;

class BillingManager
{
    public static function resolve(string $gateway): PaymentGatewayInterface
    {
        return match (strtolower($gateway)) {
            'ezzygate' => new EzzygateService(),
            'corefy' => new CorefyService(),
            'cardaq' => new CardaqService(),
            default => new EzzygateService(),
        };
    }
}
