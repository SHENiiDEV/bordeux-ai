<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    private function getCorporateProps(): array
    {
        return [
            'companyName' => env('COMPANY_NAME', 'GREAT LEADERS LTD'),
            'companyAddress' => env('COMPANY_ADDRESS', 'Dept 6193 43 Owston Road, Carcroft, Doncaster, DN6 8DA'),
            'companyEmail' => env('COMPANY_EMAIL', 'info@bordeux.co.uk'),
            'companyTaxId' => env('COMPANY_TAX_ID', 'Company No. 15954666'),
            'supportEmail' => env('MAIL_FROM_ADDRESS', 'support@fitninja.co.uk'),
        ];
    }

    public function showContact()
    {
        return Inertia::render('Contact', $this->getCorporateProps());
    }

    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'email' => 'required|email|max:200',
            'subject' => 'required|string|max:250',
            'message' => 'required|string|max:5000',
        ]);

        $recipient = env('MAIL_FROM_ADDRESS', 'support@fitninja.co.uk');

        try {
            Mail::to($recipient)->send(new ContactMessageMail(
                $validated['name'],
                $validated['email'],
                $validated['subject'],
                $validated['message']
            ));
        } catch (\Exception $e) {
            \Log::error("Failed to send ContactMessageMail: " . $e->getMessage());
        }

        return redirect()->back()->with('success', 'Your support ticket inquiry has been received. Our concierge team will respond within 24-48 hours.');
    }

    public function showHowItWorks()
    {
        return Inertia::render('HowItWorks');
    }

    public function showSupport()
    {
        return Inertia::render('Support', $this->getCorporateProps());
    }

    public function showAbout()
    {
        return Inertia::render('About', $this->getCorporateProps());
    }
}
