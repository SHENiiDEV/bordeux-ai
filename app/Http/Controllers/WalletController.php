<?php

namespace App\Http\Controllers;

use App\Mail\DocumentPaymentMail;
use App\Mail\WalletTopUpMail;
use App\Models\Payment;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $payments = $user->payments()->latest()->get();

        return Inertia::render('Wallet/Index', [
            'balance' => $user->balance,
            'payments' => $payments,
        ]);
    }

    public function topup(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:10|max:50000',
            'service_name' => 'nullable|string|max:200',
        ]);

        $user = $request->user();
        $amount = (float) $validated['amount'];
        $serviceName = $validated['service_name'] ?? 'Voltoria AI Wallet Refill';

        $ref = 'TOPUP-' . strtoupper(Str::random(10));

        // Update user balance
        $user->increment('balance', $amount);

        // Create Payment record
        $payment = Payment::create([
            'user_id' => $user->id,
            'type' => 'topup',
            'service_name' => $serviceName,
            'amount' => $amount,
            'currency' => 'EUR',
            'gateway_reference' => $ref,
            'status' => 'paid',
        ]);

        // Send WalletTopUpMail with PDF invoice attachment
        try {
            Mail::to($user->email)->send(new WalletTopUpMail($user, $payment));
        } catch (\Exception $e) {
            \Log::error("Failed to send WalletTopUpMail: " . $e->getMessage());
        }

        return redirect()->back()->with('success', "Successfully credited €{$amount} to your wallet. Receipt sent to email.");
    }

    public function deduct(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'service_name' => 'required|string|max:200',
        ]);

        $user = $request->user();
        $amount = (float) $validated['amount'];

        if ($user->balance < $amount) {
            return back()->withErrors(['balance' => 'Insufficient wallet balance. Please top up your wallet to proceed.']);
        }

        $user->decrement('balance', $amount);

        $ref = 'WALLET-DEDUCT-' . strtoupper(Str::random(10));

        $payment = Payment::create([
            'user_id' => $user->id,
            'type' => 'generation',
            'service_name' => $validated['service_name'],
            'amount' => $amount,
            'currency' => 'EUR',
            'gateway_reference' => $ref,
            'status' => 'paid',
        ]);

        // Send DocumentPaymentMail with PDF invoice attachment
        try {
            Mail::to($user->email)->send(new DocumentPaymentMail($user, $payment));
        } catch (\Exception $e) {
            \Log::error("Failed to send DocumentPaymentMail: " . $e->getMessage());
        }

        return redirect()->back()->with('success', "Service unlocked. Invoice sent to email.");
    }

    public function downloadInvoice(Request $request, Payment $payment)
    {
        $user = $request->user();

        // 403 Authorization Check
        abort_if($payment->user_id !== $user->id && !$user->is_admin, 403, 'Unauthorized access to this invoice.');

        $pdf = Pdf::loadView('pdf.wallet_invoice', [
            'payment' => $payment,
            'user' => $payment->user ?: $user,
        ]);

        $invoiceRef = $payment->gateway_reference ?: ('INV-' . $payment->id);

        return $pdf->download("Invoice_{$invoiceRef}.pdf");
    }
}
