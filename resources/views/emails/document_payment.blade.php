<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Service Receipt & Invoice</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        
        <!-- HEADER LOGO -->
        <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">VOLTORIA <span style="color: #10b981;">AI</span></h1>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px;">Service Receipt & Invoice Unlocked</p>
        </div>

        <!-- CONTENT -->
        <div style="border-top: 1px solid #334155; padding-top: 24px;">
            <div style="text-align: center; margin-bottom: 24px;">
                <span style="background-color: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid #10b981; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">Service Unlocked</span>
                <h2 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 12px 0 4px 0;">{{ $payment->service_name ?: 'Voltoria AI Pro Institutional Memorandum' }}</h2>
                <p style="color: #10b981; font-size: 20px; font-weight: 800; margin: 0;">€{{ number_format($payment->amount, 2) }}</p>
            </div>

            <!-- METADATA TABLE -->
            <table style="width: 100%; border-collapse: collapse; background-color: #0f172a; border-radius: 12px; margin-bottom: 24px; font-size: 13px;">
                <tr>
                    <td style="padding: 12px 16px; color: #94a3b8; border-bottom: 1px solid #1e293b;">Invoice Reference:</td>
                    <td style="padding: 12px 16px; color: #ffffff; font-weight: 700; text-align: right; border-bottom: 1px solid #1e293b;">{{ $payment->gateway_reference }}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 16px; color: #94a3b8; border-bottom: 1px solid #1e293b;">Deducted Amount:</td>
                    <td style="padding: 12px 16px; color: #f43f5e; font-weight: 700; text-align: right; border-bottom: 1px solid #1e293b;">-€{{ number_format($payment->amount, 2) }}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 16px; color: #94a3b8;">Remaining Balance:</td>
                    <td style="padding: 12px 16px; color: #10b981; font-weight: 700; text-align: right;">€{{ number_format($user->balance, 2) }}</td>
                </tr>
            </table>

            <p style="color: #cbd5e1; font-size: 13px; line-height: 1.5;">
                📎 Your official PDF tax invoice (<code>Invoice_{{ $payment->gateway_reference }}.pdf</code>) issued by <strong>INCHWARD LIMITED</strong> is attached to this email.
            </p>

            <!-- CTA BUTTON -->
            <div style="text-align: center; margin: 28px 0;">
                <a href="{{ url('/dashboard') }}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; font-weight: 700; font-size: 13px; text-decoration: none; padding: 14px 32px; border-radius: 12px; text-transform: uppercase; letter-spacing: 1px;">
                    View & Download PDF →
                </a>
            </div>
        </div>

        <!-- FOOTER -->
        <div style="border-top: 1px solid #334155; margin-top: 32px; padding-top: 20px; text-align: center; font-size: 11px; color: #64748b; line-height: 1.6;">
            <p style="margin: 0 0 4px 0;">© 2026 <strong>INCHWARD LIMITED</strong> (Company Number: 16021412). All rights reserved.</p>
            <p style="margin: 0;">Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom</p>
        </div>
    </div>
</body>
</html>
