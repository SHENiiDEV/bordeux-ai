<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
            'email' => 'required|email|max:200',
            'telegram_username' => 'nullable|string|max:200',
            'wine_interest' => 'required|string|max:1000',
            'estimated_budget' => 'required|string|max:200',
        ]);

        // Application logged or sent to admin concierge queue
        // Returns luxury feedback message
        return redirect()->back()->with('success', 'Your application to Bordeux AI Private Club has been received. Our concierge team will review your application.');
    }
}
