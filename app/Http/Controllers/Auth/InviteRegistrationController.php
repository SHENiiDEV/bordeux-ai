<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\InviteCode;
use App\Models\User;
use App\Models\TasteProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class InviteRegistrationController extends Controller
{
    public function create(Request $request, string $code)
    {
        $invite = InviteCode::where('code', $code)
            ->where('is_used', false)
            ->where(function ($query) {
                $query->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->first();

        if (!$invite) {
            return Inertia::render('Auth/InvalidInvite', [
                'message' => 'This invitation code is invalid, expired, or has already been used.',
            ]);
        }

        return Inertia::render('Auth/RegisterWithInvite', [
            'code' => $code,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'invite_code' => 'required|string|max:200',
            'name' => 'required|string|max:200',
            'email' => 'required|string|email|max:200|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'telegram_username' => 'nullable|string|max:200',
        ]);

        $invite = InviteCode::where('code', $validated['invite_code'])
            ->where('is_used', false)
            ->where(function ($query) {
                $query->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->first();

        if (!$invite) {
            return back()->withErrors(['invite_code' => 'The provided invitation code is invalid or expired.']);
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'telegram_username' => $validated['telegram_username'] ?? null,
            'membership_status' => 'active',
            'expires_at' => now()->addYear(),
        ]);

        // Create default TasteProfile for new user
        TasteProfile::create([
            'user_id' => $user->id,
            'budget_tier' => 'reserve',
            'preferred_notes' => 'Bordeaux, Cabernet Sauvignon, Oak',
            'blacklisted_notes' => '',
        ]);

        // Mark invite code as used
        $invite->update([
            'is_used' => true,
            'used_by_user_id' => $user->id,
        ]);

        Auth::login($user);

        return redirect()->route('dashboard');
    }
}
