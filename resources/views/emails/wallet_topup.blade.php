<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Wallet Top-Up Receipt</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        
        <!-- HEADER LOGO -->
        <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">VOLTORIA <span style="color: #10b981;">AI</span></h1>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px;">Official Transaction Receipt</p>
        </div>

        <!-- CONTENT -->
        <div style="border-top: 1px solid #334155; padding-top: 24px;">
            <div style="text-align: center; margin-bottom: 24px;">
                <span style="background-color: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid #10b981; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">Wallet Refill Success</span>
                <h2 style="color: #10b981; font-size: 36px; font-weight: 800; margin: 12px 0 0 0;">€{{ number_format($payment->amount, 2) }}</h2>
                <p style="color: #cbd5e1; font-size: 13px; margin-top: 4px;">Added to Account Wallet</p>
            </div>

            <!-- METADATA TABLE -->
            <table style="width: 100%; border-collapse: collapse; background-color: #0f172a; border-radius: 12px; margin-bottom: 24px; font-size: 13px;">
                <tr>
                    <td style="padding: 12px 16px; color: #94a3b8; border-bottom: 1px solid #1e293b;">Invoice Reference:</td>
                    <td style="padding: 12px 16px; color: #ffffff; font-weight: 700; text-align: right; border-bottom: 1px solid #1e293b;">{{ $payment->gateway_reference }}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 16px; color: #94a3b8; border-bottom: 1px solid #1e293b;">Updated Wallet Balance:</td>
                    <td style="padding: 12px 16px; color: #10b981; font-weight: 700; text-align: right; border-bottom: 1px solid #1e293b;">€{{ number_format($user->balance, 2) }}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 16px; color: #94a3b8;">Date & Time:</td>
                    <td style="padding: 12px 16px; color: #ffffff; text-align: right;">{{ $payment->created_at ? $payment->created_at->format('M d, Y H:i T') : date('M d, Y') }}</td>
                </tr>
            </table>

            <p style="color: #cbd5e1; font-size: 13px; line-height: 1.5;">
                📎 <strong>PDF Invoice Attached:</strong> Your official B2B tax invoice (<code>Invoice_{{ $payment->gateway_reference }}.pdf</code>) issued by <strong>{{ env('COMPANY_NAME', 'GREAT LEADERS LTD') }}</strong> has been attached to this message for your accounting records.
            </p>

            <!-- CTA BUTTON -->
            <div style="text-align: center; margin: 28px 0;">
                <a href="{{ url('/dashboard') }}" style="display: inline-block; background-color: #1e293b; border: 1px solid #10b981; color: #10b981; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 28px; border-radius: 10px; text-transform: uppercase; letter-spacing: 1px;">
                    Go to Account Dashboard →
                </a>
            </div>
        </div>

        <!-- FOOTER -->
        <div style="border-top: 1px solid #334155; margin-top: 32px; padding-top: 20px; text-align: center; font-size: 11px; color: #64748b; line-height: 1.6;">
            <p style="margin: 0 0 4px 0;">© 2026 <strong>{{ env('COMPANY_NAME', 'GREAT LEADERS LTD') }}</strong> (Company Number: {{ env('COMPANY_NUMBER', '15954666') }}). All rights reserved.</p>
            <p style="margin: 0;">{{ env('COMPANY_ADDRESS', 'Dept 6193 43 Owston Road, Carcroft, Doncaster, DN6 8DA') }}</p>
        </div>
    </div>
</body>
</html>
