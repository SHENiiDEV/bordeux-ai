<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\Billing\BillingManager;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $transactions = $user->transactions()->latest()->take(10)->get();

        return Inertia::render('Billing/Index', [
            'membership' => [
                'status' => $user->membership_status,
                'expires_at' => $user->expires_at ? $user->expires_at->toIso8601String() : null,
            ],
            'transactions' => $transactions,
        ]);
    }

    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'tier' => 'required|string|in:reserve,grand_cru,rare_vintage',
            'gateway' => 'required|string|in:ezzygate,corefy,cardaq',
        ]);

        $amounts = [
            'reserve' => 2500.00,
            'grand_cru' => 5000.00,
            'rare_vintage' => 12000.00,
        ];

        $amount = $amounts[$validated['tier']] ?? 2500.00;
        $orderId = 'BDX-' . strtoupper(Str::random(12));

        $transaction = Transaction::create([
            'user_id' => $request->user()->id,
            'order_id' => $orderId,
            'amount' => $amount,
            'currency' => 'EUR',
            'gateway' => $validated['gateway'],
            'status' => 'pending',
        ]);

        $gatewayService = BillingManager::resolve($validated['gateway']);
        $invoiceUrl = $gatewayService->createInvoiceUrl($transaction, route('billing.index'));

        return response()->json([
            'invoice_url' => $invoiceUrl,
            'order_id' => $orderId,
        ]);
    }
}
