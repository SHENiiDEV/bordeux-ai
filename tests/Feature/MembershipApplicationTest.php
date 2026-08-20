<?php

namespace Tests\Feature;

use App\Mail\ApplicationReceivedMail;
use App\Mail\NewApplicationAdminMail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class MembershipApplicationTest extends TestCase
{
    use RefreshDatabase;

    public function test_apply_page_renders_successfully(): void
    {
        $response = $this->get(route('membership.apply'));
        $response->assertStatus(200);
    }

    public function test_submitting_application_dispatches_mail_to_applicant_and_admin(): void
    {
        Mail::fake();

        $response = $this->post(route('membership.apply.store'), [
            'name' => 'Alexander',
            'surname' => 'Vance',
            'email' => 'alexander.vance@example.com',
            'phone_number' => '+447700900000',
            'telegram_username' => '@alexandervance',
            'target_tier' => 'Grand Cru Tier (€500 / mo)',
            'cellar_size' => '250 - 1,000 bottles',
            'annual_budget' => '€50,000 - €250,000 / year',
            'wine_interest' => 'Bordeaux Left Bank Vintages & High-ticket Investment Cellars',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        // Verify Applicant Mail
        Mail::assertSent(ApplicationReceivedMail::class, function ($mail) {
            return $mail->hasTo('alexander.vance@example.com') &&
                   $mail->name === 'Alexander Vance';
        });

        // Verify Admin Queue Mail
        Mail::assertSent(NewApplicationAdminMail::class, function ($mail) {
            return $mail->hasTo('info@bordeux.co.uk') &&
                   $mail->applicationData['email'] === 'alexander.vance@example.com';
        });
    }
}
