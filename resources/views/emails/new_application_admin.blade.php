<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New VIP Application — Bordeux AI Admin</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 40px 20px;">
    <div style="max-width: 650px; margin: 0 auto; background-color: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        
        <!-- HEADER -->
        <div style="border-b border-[#334155] pb-20 text-center margin-bottom: 24px;">
            <span style="background-color: #4a0e17; color: #f3cf65; font-size: 10px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1.5px; border: 1px solid rgba(212, 175, 55, 0.4);">
                NEW VIP APPLICATION
            </span>
            <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 12px 0 4px 0;">BORDEUX AI CONCIERGE QUEUE</h1>
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">A new candidate has submitted an application for private membership.</p>
        </div>

        <!-- APPLICANT DATA TABLE -->
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px;">
            <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #94a3b8; font-weight: 600; width: 35%;">Full Name:</td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #ffffff; font-weight: 700;">{{ $applicationData['name'] ?? '' }} {{ $applicationData['surname'] ?? '' }}</td>
            </tr>
            <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #94a3b8; font-weight: 600;">Email Address:</td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #f3cf65; font-weight: 700;"><a href="mailto:{{ $applicationData['email'] ?? '' }}" style="color: #f3cf65; text-decoration: none;">{{ $applicationData['email'] ?? '' }}</a></td>
            </tr>
            <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #94a3b8; font-weight: 600;">Phone Number:</td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #ffffff;">{{ $applicationData['phone_number'] ?? 'N/A' }}</td>
            </tr>
            <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #94a3b8; font-weight: 600;">Telegram Username:</td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #38bdf8; font-weight: 700;">{{ $applicationData['telegram_username'] ?? 'N/A' }}</td>
            </tr>
            <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #94a3b8; font-weight: 600;">Preferred Concierge Tier:</td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #ffffff; font-weight: 700;">{{ $applicationData['target_tier'] ?? '' }}</td>
            </tr>
            <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #94a3b8; font-weight: 600;">Estimated Cellar Size:</td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #ffffff;">{{ $applicationData['cellar_size'] ?? '' }}</td>
            </tr>
            <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #94a3b8; font-weight: 600;">Annual Wine Budget:</td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #10b981; font-weight: 700;">{{ $applicationData['annual_budget'] ?? '' }}</td>
            </tr>
            <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #94a3b8; font-weight: 600;">Wine Interests / Notes:</td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #334155; color: #cbd5e1; font-style: italic;">{{ $applicationData['wine_interest'] ?? '' }}</td>
            </tr>
        </table>

        <!-- ACTION FOOTER -->
        <div style="margin-top: 28px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin-bottom: 16px;">Review candidate details and generate an invitation token in Admin Dashboard.</p>
            <a href="{{ url('/admin/invites') }}" style="display: inline-block; background-color: #4a0e17; color: #f3cf65; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 28px; border-radius: 10px; border: 1px solid rgba(212, 175, 55, 0.5);">
                Open Admin Invites Desk →
            </a>
        </div>

        <div style="border-top: 1px solid #334155; margin-top: 28px; padding-top: 16px; text-align: center; font-size: 11px; color: #64748b;">
            <p style="margin: 0;">Automated System Dispatch • {{ env('COMPANY_NAME', 'GREAT LEADERS LTD') }}</p>
        </div>
    </div>
</body>
</html>
