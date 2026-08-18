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
    public const EXCLUDED_COUNTRIES = [
        'Sudan', 'Democratic Republic of the Congo', 'Iran', 'Mali', 'Myanmar', 
        'North Korea', 'South Sudan', 'Syria', 'Yemen', 'Afghanistan', 'Belarus', 
        'Central African Republic', 'Cuba', 'Haiti', 'Iraq', 'Russia', 'Somalia', 
        'Venezuela', 'Zimbabwe'
    ];

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
            'surname' => 'required|string|max:200',
            'email' => 'required|string|email|max:200|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone_number' => 'required|string|max:50',
            'date_of_birth' => 'required|date|before:-18 years',
            'address_street' => 'required|string|max:255',
            'address_city' => 'required|string|max:100',
            'address_country' => [
                'required', 
                'string', 
                'max:100', 
                function ($attribute, $value, $fail) {
                    if (in_array($value, self::EXCLUDED_COUNTRIES)) {
                        $fail("Registration is not available from {$value}.");
                    }
                }
            ],
            'address_postcode' => 'required|string|max:50',
            'agreed_to_terms' => 'required|accepted',
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
            'surname' => $validated['surname'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone_number' => $validated['phone_number'],
            'date_of_birth' => $validated['date_of_birth'],
            'address_street' => $validated['address_street'],
            'address_city' => $validated['address_city'],
            'address_country' => $validated['address_country'],
            'address_postcode' => $validated['address_postcode'],
            'agreed_to_terms' => true,
            'telegram_username' => $validated['telegram_username'] ?? null,
            'membership_status' => 'active',
            'expires_at' => now()->addYear(),
        ]);

        // Create default TasteProfile for new user
        TasteProfile::create([
            'user_id' => $user->id,
            'budget_tier' => 'Grand Cru ($2,500 - $10,000/bottle)',
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
