<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    public function terms(): Response
    {
        return Inertia::render('Legal/TermsOfService');
    }

    public function privacy(): Response
    {
        return Inertia::render('Legal/PrivacyPolicy');
    }

    public function refund(): Response
    {
        return Inertia::render('Legal/RefundPolicy');
    }
}
