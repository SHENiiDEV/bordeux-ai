<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\ApplicationReceivedMail;
use App\Mail\NewApplicationAdminMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class MembershipApplicationController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/ApplyMembership');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'surname' => 'nullable|string|max:200',
            'email' => 'required|email|max:200',
            'phone_number' => 'nullable|string|max:100',
            'telegram_username' => 'nullable|string|max:200',
            'target_tier' => 'nullable|string|max:200',
            'cellar_size' => 'nullable|string|max:200',
            'annual_budget' => 'nullable|string|max:200',
            'wine_interest' => 'nullable|string|max:2000',
            'notes' => 'nullable|string|max:2000',
        ]);

        $candidateName = trim(($validated['name'] ?? '') . ' ' . ($validated['surname'] ?? ''));

        // 1. Send Luxury Application Confirmation Email to Applicant
        try {
            Mail::to($validated['email'])->send(new ApplicationReceivedMail($candidateName ?: $validated['name']));
        } catch (\Exception $e) {
            \Log::error("Failed to send ApplicationReceivedMail to candidate: " . $e->getMessage());
        }

        // 2. Send Admin Notification Email to info@bordeux.co.uk
        $adminEmail = env('COMPANY_EMAIL', 'info@bordeux.co.uk');
        try {
            Mail::to($adminEmail)->send(new NewApplicationAdminMail($validated));
        } catch (\Exception $e) {
            \Log::error("Failed to send NewApplicationAdminMail to admin queue: " . $e->getMessage());
        }

        return redirect()->back()->with('success', 'Your application to Bordeux AI Private Club has been received. Our concierge team will review your application within 24-48 hours.');
    }
}
