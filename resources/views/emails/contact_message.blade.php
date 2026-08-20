<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Support Ticket</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        
        <!-- HEADER LOGO -->
        <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">BORDEUX <span style="color: #d4af37;">AI</span></h1>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px;">Executive Support Ticket Inquiry</p>
        </div>

        <!-- CONTENT -->
        <div style="border-top: 1px solid #334155; padding-top: 24px;">
            <h2 style="color: #d4af37; font-size: 18px; font-weight: 700; margin-top: 0;">New Inquiry from {{ $name }}</h2>

            <table style="width: 100%; border-collapse: collapse; background-color: #0f172a; border-radius: 12px; margin: 20px 0; font-size: 13px;">
                <tr>
                    <td style="padding: 12px 16px; color: #94a3b8; border-bottom: 1px solid #1e293b; width: 120px;">Sender Name:</td>
                    <td style="padding: 12px 16px; color: #ffffff; font-weight: 700; border-bottom: 1px solid #1e293b;">{{ $name }}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 16px; color: #94a3b8; border-bottom: 1px solid #1e293b;">Email Address:</td>
                    <td style="padding: 12px 16px; color: #d4af37; font-weight: 700; border-bottom: 1px solid #1e293b;">{{ $email }}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 16px; color: #94a3b8;">Subject:</td>
                    <td style="padding: 12px 16px; color: #ffffff; font-weight: 700;">{{ $subjectText }}</td>
                </tr>
            </table>

            <div style="background-color: #0f172a; border-left: 4px solid #d4af37; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                <p style="color: #94a3b8; font-size: 11px; font-weight: 700; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.8px;">Message Content:</p>
                <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">{{ $messageText }}</p>
            </div>
        </div>

        <!-- FOOTER -->
        <div style="border-top: 1px solid #334155; margin-top: 32px; padding-top: 20px; text-align: center; font-size: 11px; color: #64748b; line-height: 1.6;">
            <p style="margin: 0 0 4px 0;">© 2026 <strong>{{ env('COMPANY_NAME', 'CHANGE IT UP SERVICES LTD') }}</strong> (Company No: {{ env('COMPANY_NUMBER', '16107295') }}).</p>
            <p style="margin: 0;">{{ env('COMPANY_ADDRESS', '14 Broadway, Nottingham, United Kingdom, NG1 1PS') }}</p>
        </div>
    </div>
</body>
</html>
