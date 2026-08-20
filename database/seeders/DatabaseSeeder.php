<?php

namespace Database\Seeders;

use App\Models\InviteCode;
use App\Models\Payment;
use App\Models\TasteProfile;
use App\Models\User;
use App\Models\WineCellar;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin & Sommelier Concierge User
        $user = User::create([
            'name' => 'Lord Sommelier',
            'surname' => 'Concierge',
            'email' => 'concierge@bordeux.ai',
            'password' => Hash::make('BordeuxLuxury2026!'),
            'phone_number' => '+44 7700 900888',
            'date_of_birth' => '1985-05-15',
            'address_street' => 'Academy House, 11 Dunraven Place',
            'address_city' => 'Bridgend',
            'address_country' => 'United Kingdom',
            'address_postcode' => 'CF31 1JF',
            'agreed_to_terms' => true,
            'terms_accepted_at' => now(),
            'balance' => 499.00,
            'telegram_username' => 'bordeux_vip',
            'membership_status' => 'active',
            'expires_at' => now()->addYears(2),
            'is_admin' => true,
        ]);

        // 2. Create Taste Profile
        TasteProfile::create([
            'user_id' => $user->id,
            'budget_tier' => 'Grand Cru ($2,500 - $10,000/bottle)',
            'preferred_notes' => 'Bordeaux, Cabernet Sauvignon, Cedar wood, Graphite, Dark cherry',
            'blacklisted_notes' => 'Over-extracted oak, Excessive residual sugar',
        ]);

        // 3. Create Sample High-Ticket Wine Cellar Items
        WineCellar::create([
            'user_id' => $user->id,
            'wine_name' => 'Château Lafite Rothschild 2010',
            'region' => 'Pauillac, Bordeaux, France',
            'type' => 'Red Wine',
            'price_segment' => 'Grand Cru',
            'ai_rating' => 99.5,
            'user_rating' => 98.0,
            'vintage_year' => 2010,
            'peak_drinking_start' => 2024,
            'peak_drinking_end' => 2050,
            'estimated_value' => 1450.00,
            'bottle_count' => 6,
            'notes' => 'Stored at 12°C in private vault. Sublime elegance and decades of lifespan.',
            'added_via' => 'manual',
        ]);

        WineCellar::create([
            'user_id' => $user->id,
            'wine_name' => 'Domaine de la Romanée-Conti 2017',
            'region' => 'Vosne-Romanée, Burgundy, France',
            'type' => 'Red Wine',
            'price_segment' => 'Rare Vintage',
            'ai_rating' => 100.0,
            'user_rating' => 99.5,
            'vintage_year' => 2017,
            'peak_drinking_start' => 2026,
            'peak_drinking_end' => 2060,
            'estimated_value' => 18500.00,
            'bottle_count' => 2,
            'notes' => 'Unrivaled Pinot Noir purity. Floral aromas, wild strawberry, oriental spice.',
            'added_via' => 'ai_recommendation',
        ]);

        // 4. Create Sample Payment Records
        Payment::create([
            'user_id' => $user->id,
            'type' => 'topup',
            'service_name' => 'Voltoria AI Pro Institutional Memorandum',
            'amount' => 499.00,
            'currency' => 'EUR',
            'gateway_reference' => 'TOPUP-A8F2K9L3',
            'status' => 'paid',
        ]);

        // 5. Create Active Demo Invite Code
        InviteCode::create([
            'code' => 'BORDEUX-VIP-2026',
            'created_by_user_id' => $user->id,
            'is_used' => false,
            'expires_at' => now()->addDays(90),
        ]);
    }
}
