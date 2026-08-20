<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $payment->gateway_reference }}</title>
    <style>
        @page {
            margin: 40px 45px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1a1a1a;
            font-size: 12px;
            line-height: 1.5;
            background: #ffffff;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.5px;
        }
        .logo span {
            color: #10b981;
        }
        .badge-table {
            text-align: right;
        }
        .invoice-title {
            font-size: 20px;
            font-weight: 700;
            color: #0f172a;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0;
        }
        .paid-stamp {
            display: inline-block;
            background-color: #d1fae5;
            color: #047857;
            border: 1.5px solid #10b981;
            padding: 4px 12px;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border-radius: 4px;
            margin-top: 6px;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .details-col {
            width: 50%;
            vertical-align: top;
        }
        .section-label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            color: #64748b;
            letter-spacing: 1px;
            margin-bottom: 6px;
        }
        .company-name {
            font-size: 14px;
            font-weight: 700;
            color: #0f172a;
        }
        .meta-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6px;
        }
        .meta-table td {
            padding: 2px 0;
            font-size: 11px;
        }
        .meta-label {
            color: #64748b;
            font-weight: 600;
            width: 110px;
        }
        .meta-val {
            color: #0f172a;
            font-weight: 700;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .items-table th {
            background-color: #f8fafc;
            border-bottom: 2px solid #e2e8f0;
            color: #475569;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            padding: 10px 12px;
            text-align: left;
        }
        .items-table td {
            border-bottom: 1px solid #f1f5f9;
            padding: 12px;
            font-size: 11px;
            color: #1e293b;
        }
        .text-right {
            text-align: right !important;
        }
        .summary-table {
            width: 40%;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 35px;
        }
        .summary-table td {
            padding: 6px 12px;
            font-size: 11px;
        }
        .summary-label {
            color: #64748b;
            font-weight: 600;
        }
        .summary-val {
            text-align: right;
            font-weight: 700;
            color: #0f172a;
        }
        .total-row td {
            border-top: 2px solid #0f172a;
            border-bottom: 2px solid #0f172a;
            font-size: 14px;
            font-weight: 800;
            color: #0f172a;
            padding: 10px 12px;
        }
        .total-row .summary-val {
            color: #047857;
        }
        .legal-notice {
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            font-size: 9.5px;
            color: #64748b;
            line-height: 1.6;
            margin-top: 40px;
        }
    </style>
</head>
<body>
    <!-- HEADER -->
    <table class="header-table">
        <tr>
            <td style="vertical-align: top;">
                <div class="logo">VOLTORIA <span>AI</span></div>
                <div style="font-size: 10px; color: #64748b; margin-top: 2px;">High-Ticket B2B Platform Concierge</div>
            </td>
            <td class="badge-table" style="vertical-align: top;">
                <h1 class="invoice-title">OFFICIAL RECEIPT</h1>
                <div class="paid-stamp">✓ PAID & VERIFIED</div>
            </td>
        </tr>
    </table>

    <!-- DETAILS GRID -->
    <table class="details-table">
        <tr>
            <td class="details-col">
                <div class="section-label">Merchant of Record (Issuer)</div>
                <div class="company-name">INCHWARD LIMITED</div>
                <div style="color: #475569; margin-top: 3px;">
                    Company Number: <strong>16021412</strong><br>
                    Academy House, 11 Dunraven Place<br>
                    Bridgend, Mid Glamorgan, CF31 1JF<br>
                    United Kingdom<br>
                    Email: info@voltoria.co.uk
                </div>
            </td>
            <td class="details-col" style="padding-left: 20px;">
                <div class="section-label">Billed To (Client)</div>
                <div class="company-name">{{ $user->name }} {{ $user->surname }}</div>
                <div style="color: #475569; margin-top: 3px;">
                    Email: {{ $user->email }}<br>
                    @if($user->address_street)
                        Address: {{ $user->address_street }}, {{ $user->address_city }} {{ $user->address_postcode }}, {{ $user->address_country }}<br>
                    @endif
                </div>

                <table class="meta-table">
                    <tr>
                        <td class="meta-label">Invoice Ref:</td>
                        <td class="meta-val">{{ $payment->gateway_reference }}</td>
                    </tr>
                    <tr>
                        <td class="meta-label">Date Issued:</td>
                        <td class="meta-val">{{ $payment->created_at ? $payment->created_at->format('M d, Y H:i T') : date('M d, Y') }}</td>
                    </tr>
                    <tr>
                        <td class="meta-label">Payment Method:</td>
                        <td class="meta-val">Direct Merchant Vault (S2S)</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <!-- LINE ITEMS -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 55%;">Service / Item Description</th>
                <th style="width: 15%; text-align: center;">Qty</th>
                <th style="width: 15%; text-align: right;">Unit Price</th>
                <th style="width: 15%; text-align: right;">Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong>{{ $payment->service_name ?: 'Voltoria AI B2B SaaS Service' }}</strong>
                    <div style="font-size: 9.5px; color: #64748b; margin-top: 2px;">
                        @if($payment->type === 'topup')
                            Account Wallet Balance Refill & Credit Allocation
                        @else
                            Automated Document Generation & Advisory Analysis
                        @endif
                    </div>
                </td>
                <td style="text-align: center;">1</td>
                <td class="text-right">€{{ number_format($payment->amount, 2) }}</td>
                <td class="text-right"><strong>€{{ number_format($payment->amount, 2) }}</strong></td>
            </tr>
        </tbody>
    </table>

    <!-- SUMMARY -->
    <table class="summary-table">
        <tr>
            <td class="summary-label">Subtotal:</td>
            <td class="summary-val">€{{ number_format($payment->amount, 2) }}</td>
        </tr>
        <tr>
            <td class="summary-label">VAT / Tax (0% B2B Reverse Charge):</td>
            <td class="summary-val">€0.00</td>
        </tr>
        <tr class="total-row">
            <td class="summary-label" style="color: #0f172a;">Total Paid:</td>
            <td class="summary-val">€{{ number_format($payment->amount, 2) }} EUR</td>
        </tr>
    </table>

    <!-- LEGAL DISCLAIMER -->
    <div class="legal-notice">
        <strong>Legal & Taxation Notice:</strong> INCHWARD LIMITED (UK Co. No. 16021412) is the official Merchant of Record for this transaction. This electronic document serves as an official tax receipt under UK commercial legislation. Customers retain a 14-day statutory right to request a refund for unconsumed wallet credits in accordance with our Refund & Cancellation Policy. All disputes are subject to the jurisdiction of the courts of England and Wales.
    </div>
</body>
</html>
