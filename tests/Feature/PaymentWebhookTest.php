<?php

namespace Tests\Feature;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaymentWebhookTest extends TestCase
{
    use RefreshDatabase;

    public function test_payment_webhook_activates_user_membership(): void
    {
        $user = User::factory()->create([
            'membership_status' => 'pending',
            'expires_at' => null,
        ]);

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'order_id' => 'BDX-TEST-1234',
            'amount' => 5000.00,
            'currency' => 'EUR',
            'gateway' => 'ezzygate',
            'status' => 'pending',
        ]);

        $payload = [
            'order_id' => 'BDX-TEST-1234',
            'status' => 'paid',
            'amount' => '5000.00',
        ];

        $secret = 'ezzy_secret_signature_key';
        $signature = hash_hmac('sha256', json_encode($payload), $secret);

        $response = $this->withHeaders([
            'X-Signature' => $signature,
        ])->postJson(route('api.payment.webhook', ['gateway' => 'ezzygate']), $payload);

        $response->assertStatus(200);

        $user->refresh();
        $transaction->refresh();

        $this->assertEquals('active', $user->membership_status);
        $this->assertNotNull($user->expires_at);
        $this->assertEquals('paid', $transaction->status);
    }
}
