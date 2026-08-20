<?php

namespace Tests\Feature;

use App\Mail\ContactMessageMail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class PublicPagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_how_it_works_page_renders(): void
    {
        $response = $this->get(route('how-it-works'));
        $response->assertStatus(200);
    }

    public function test_contact_page_renders_with_env_company_details(): void
    {
        $response = $this->get(route('contact'));
        $response->assertStatus(200);
        $response->assertSee('GREAT LEADERS LTD');
    }

    public function test_contact_form_submission_dispatches_mail(): void
    {
        Mail::fake();

        $response = $this->post(route('contact.submit'), [
            'name' => 'Alexander Vance',
            'email' => 'alexander@vance.co.uk',
            'subject' => 'B2B Invoice Inquiry',
            'message' => 'Please provide details on UK VAT B2B reverse charge invoices.',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        Mail::assertSent(ContactMessageMail::class, function ($mail) {
            return $mail->email === 'alexander@vance.co.uk' &&
                   $mail->subjectText === 'B2B Invoice Inquiry';
        });
    }

    public function test_support_page_renders(): void
    {
        $response = $this->get(route('support'));
        $response->assertStatus(200);
    }

    public function test_about_page_renders(): void
    {
        $response = $this->get(route('about'));
        $response->assertStatus(200);
    }
}
