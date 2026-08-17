<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InviteCode;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminInviteController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user->is_admin) {
            abort(403, 'Unauthorized access to Concierge Admin.');
        }

        $invites = InviteCode::with(['creator', 'recipient'])->latest()->get();

        return Inertia::render('Admin/Invites', [
            'invites' => $invites,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if (!$user->is_admin) {
            abort(403, 'Unauthorized access.');
        }

        $code = 'BDX-' . strtoupper(Str::random(4)) . '-' . strtoupper(Str::random(4)) . '-2026';

        InviteCode::create([
            'code' => $code,
            'created_by_user_id' => $user->id,
            'expires_at' => now()->addDays(90),
            'is_used' => false,
        ]);

        return redirect()->back()->with('success', "New VIP Invite Code [{$code}] generated.");
    }
}
