<?php

namespace Tests\Feature;

use App\Mail\DocumentPaymentMail;
use App\Mail\WalletTopUpMail;
use App\Mail\WelcomeUserMail;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class InvoiceAndMailTest extends TestCase
{
    use RefreshDatabase;

    public function test_welcome_mail_can_be_rendered(): void
    {
        $user = User::factory()->create([
            'name' => 'Alexander',
            'email' => 'alexander@example.com',
        ]);

        $mailable = new WelcomeUserMail($user);
        $mailable->assertSeeInHtml('Dear Alexander');
        $mailable->assertSeeInHtml('INCHWARD LIMITED');
    }

    public function test_wallet_topup_mail_and_pdf_attachment(): void
    {
        $user = User::factory()->create();
        $payment = Payment::create([
            'user_id' => $user->id,
            'type' => 'topup',
            'service_name' => 'Voltoria AI Pro Institutional Memorandum',
            'amount' => 499.00,
            'currency' => 'EUR',
            'gateway_reference' => 'TOPUP-TEST1234',
            'status' => 'paid',
        ]);

        $mailable = new WalletTopUpMail($user, $payment);
        $mailable->assertSeeInHtml('TOPUP-TEST1234');
        $mailable->assertSeeInHtml('€499.00');

        $attachments = $mailable->attachments();
        $this->assertCount(1, $attachments);
    }

    public function test_pdf_invoice_download_endpoint(): void
    {
        $user = User::factory()->create();
        $payment = Payment::create([
            'user_id' => $user->id,
            'type' => 'topup',
            'service_name' => 'Starter Analysis Credit',
            'amount' => 149.00,
            'currency' => 'EUR',
            'gateway_reference' => 'TOPUP-INV5678',
            'status' => 'paid',
        ]);

        $response = $this->actingAs($user)->get(route('wallet.invoice', $payment->id));

        $response->assertStatus(200);
        $response->assertHeader('content-type', 'application/pdf');
    }

    public function test_pdf_invoice_download_forbidden_for_other_user(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();

        $payment = Payment::create([
            'user_id' => $owner->id,
            'type' => 'topup',
            'service_name' => 'Private Service',
            'amount' => 250.00,
            'currency' => 'EUR',
            'gateway_reference' => 'TOPUP-[#PRIVATE]',
            'status' => 'paid',
        ]);

        $response = $this->actingAs($otherUser)->get(route('wallet.invoice', $payment->id));

        $response->assertStatus(403);
    }
}
