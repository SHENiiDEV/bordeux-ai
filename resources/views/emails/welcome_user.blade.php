<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to Voltoria AI</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        
        <!-- HEADER LOGO -->
        <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">VOLTORIA <span style="color: #10b981;">AI</span></h1>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px;">High-Ticket Business Plan Architect & Concierge</p>
        </div>

        <!-- CONTENT -->
        <div style="border-top: 1px solid #334155; padding-top: 24px;">
            <h2 style="color: #ffffff; font-size: 20px; font-weight: 700; margin-top: 0;">Dear {{ $user->name }},</h2>

            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
                Welcome to <strong>Voltoria AI</strong>. Your private member account has been successfully provisioned. You now have full access to our high-ticket automated business plan architecture and financial modeling suite.
            </p>

            <div style="background-color: #0f172a; border-left: 4px solid #10b981; padding: 16px; border-radius: 8px; margin: 24px 0;">
                <p style="color: #10b981; font-[#10b981]; font-weight: 700; font-size: 13px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.8px;">Platform Key Capabilities:</p>
                <ul style="color: #cbd5e1; font-size: 13px; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li><strong>6-Page Institutional Memorandum</strong>: Executive summary & market positioning</li>
                    <li><strong>3-Year P&L Financial Model</strong>: Comprehensive revenue & cash flow forecasts</li>
                    <li><strong>Unit Economics Breakdown</strong>: CAC, LTV, and contribution margins</li>
                </ul>
            </div>

            <!-- CTA BUTTON -->
            <div style="text-align: center; margin: 32px 0;">
                <a href="{{ url('/projects/create') }}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 32px; border-radius: 12px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);">
                    Create Your First Business Plan Brief →
                </a>
            </div>

            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5;">
                If you have any questions or require custom white-glove onboarding, simply reply to this email to reach your dedicated concierge manager.
            </p>
        </div>

        <!-- FOOTER -->
        <div style="border-top: 1px solid #334155; margin-top: 32px; padding-top: 20px; text-align: center; font-size: 11px; color: #64748b; line-height: 1.6;">
            <p style="margin: 0 0 4px 0;">© 2026 <strong>INCHWARD LIMITED</strong> (Company Number: 16021412). All rights reserved.</p>
            <p style="margin: 0;">Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom</p>
        </div>
    </div>
</body>
</html>
