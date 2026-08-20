<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function showContact()
    {
        return Inertia::render('Contact', [
            'companyName' => env('COMPANY_NAME', 'CHANGE IT UP SERVICES LTD'),
            'companyNumber' => env('COMPANY_NUMBER', '16107295'),
            'companyAddress' => env('COMPANY_ADDRESS', '14 Broadway, Nottingham, United Kingdom, NG1 1PS'),
            'supportEmail' => env('MAIL_FROM_ADDRESS', 'support@fitninja.co.uk'),
        ]);
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

        return redirect()->back()->with('success', 'Your support ticket inquiry has been received. Our concierge team will respond within 24 hours.');
    }

    public function showHowItWorks()
    {
        return Inertia::render('HowItWorks');
    }

    public function showSupport()
    {
        return Inertia::render('Support', [
            'companyName' => env('COMPANY_NAME', 'CHANGE IT UP SERVICES LTD'),
            'companyNumber' => env('COMPANY_NUMBER', '16107295'),
            'companyAddress' => env('COMPANY_ADDRESS', '14 Broadway, Nottingham, United Kingdom, NG1 1PS'),
            'supportEmail' => env('MAIL_FROM_ADDRESS', 'support@fitninja.co.uk'),
        ]);
    }

    public function showAbout()
    {
        return Inertia::render('About', [
            'companyName' => env('COMPANY_NAME', 'CHANGE IT UP SERVICES LTD'),
            'companyNumber' => env('COMPANY_NUMBER', '16107295'),
            'companyAddress' => env('COMPANY_ADDRESS', '14 Broadway, Nottingham, United Kingdom, NG1 1PS'),
            'supportEmail' => env('MAIL_FROM_ADDRESS', 'support@fitninja.co.uk'),
        ]);
    }
}
