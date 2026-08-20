<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Application Received — Bordeux AI</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #f8fafc; margin: 0; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #120d12; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 20px; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
        
        <!-- HEADER LOGO -->
        <div style="text-align: center; margin-bottom: 28px;">
            <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: 2px;">
                BORDEUX <span style="color: #d4af37;">AI</span>
            </h1>
            <p style="color: #f3cf65; font-size: 11px; margin-top: 4px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">
                Private Sommelier & Wine Concierge
            </p>
        </div>

        <!-- CONTENT -->
        <div style="border-top: 1px solid rgba(212, 175, 55, 0.2); padding-top: 28px;">
            <h2 style="color: #ffffff; font-size: 20px; font-weight: 700; margin-top: 0;">Dear {{ $name }},</h2>

            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.7;">
                Thank you for expressing your interest in joining <strong>Bordeux AI Private Sommelier Club</strong>. We are honored by your application for exclusive concierge access.
            </p>

            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.7;">
                Your application has been logged with highest priority and is currently undergoing vetting by our senior concierge committee.
            </p>

            <!-- STATUS BOX -->
            <div style="background-color: #1a1018; border-left: 4px solid #d4af37; padding: 20px; border-radius: 12px; margin: 28px 0; border: 1px solid rgba(212, 175, 55, 0.2);">
                <p style="color: #f3cf65; font-weight: 700; font-size: 12px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Application Status & Next Steps:</p>
                <ul style="color: #e2e8f0; font-size: 13px; margin: 0; padding-left: 18px; line-height: 1.8;">
                    <li><strong>Guaranteed Review SLA</strong>: 24–48 Hours</li>
                    <li><strong>Invitation Token Delivery</strong>: Sent directly via Telegram or Email upon approval</li>
                    <li><strong>Privacy Assurance</strong>: Handled under strict AES-256 client confidentiality</li>
                </ul>
            </div>

            <p style="color: #cbd5e1; font-size: 13px; line-height: 1.6;">
                Should our team require any additional verification regarding your cellar specifications or vintage preferences, we will reach out to you directly.
            </p>

            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin-top: 28px;">
                With highest regards,<br>
                <strong style="color: #ffffff;">Bordeux AI Executive Concierge</strong>
            </p>
        </div>

        <!-- FOOTER -->
        <div style="border-top: 1px solid rgba(212, 175, 55, 0.15); margin-top: 36px; padding-top: 24px; text-align: center; font-size: 11px; color: #64748b; line-height: 1.6;">
            <p style="margin: 0 0 4px 0;">© 2026 <strong>{{ env('COMPANY_NAME', 'GREAT LEADERS LTD') }}</strong> ({{ env('COMPANY_TAX_ID', 'Company No. 15954666') }}). All rights reserved.</p>
            <p style="margin: 0;">{{ env('COMPANY_ADDRESS', 'Dept 6193 43 Owston Road, Carcroft, Doncaster, DN6 8DA') }}</p>
        </div>
    </div>
</body>
</html>
