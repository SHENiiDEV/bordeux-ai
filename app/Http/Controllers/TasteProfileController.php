<?php

namespace App\Http\Controllers;

use App\Models\TasteProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TasteProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        $profile = $user->tasteProfile ?? TasteProfile::create([
            'user_id' => $user->id,
            'budget_tier' => 'reserve',
            'preferred_notes' => 'Bordeaux, Cabernet Sauvignon, Oak',
            'blacklisted_notes' => '',
        ]);

        return Inertia::render('TasteProfile/Index', [
            'profile' => $profile,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'budget_tier' => 'required|string|max:200',
            'preferred_notes' => 'nullable|string|max:200',
            'blacklisted_notes' => 'nullable|string|max:200',
        ]);

        $user = $request->user();
        $profile = $user->tasteProfile;

        if (!$profile) {
            $profile = TasteProfile::create([
                'user_id' => $user->id,
                ...$validated,
            ]);
        } else {
            $profile->update($validated);
        }

        return redirect()->back()->with('success', 'Taste profile successfully updated.');
    }
}
