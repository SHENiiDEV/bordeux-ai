# 🍷 Bordeux AI — Private Sommelier & Wine Concierge Platform

> **High-Ticket Private Member Club for Fine Wine Collectors & Connoisseurs**

Bordeux AI is an invitation-only luxury platform that merges high-precision AI sommelier consultation via Telegram (powered by DeepSeek-V4) with automated wine cellar portfolio tracking, vintage drinking window analytics, and discreet S2S billing gateways.

---

## 🛠 Technology Stack

- **Backend**: Laravel 13, PHP 8.4
- **Frontend**: React.js + Inertia.js (Quiet Luxury UI/UX)
- **Styling**: Tailwind CSS, Framer Motion, Playfair Display & Inter Typography, Custom SVG Film Grain Overlay
- **Database & Queue**: MySQL / SQLite, Redis (Job Queues for Telegram Webhooks)
- **AI Sommelier Engine**: DeepSeek-V4 API integration with custom system prompt enforcing strict JSON output
- **Billing Gateways**: Custom S2S High-Ticket Merchant Interfaces (`EzzygateService`, `CorefyService`, `CardaqService`) with HMAC-SHA256 signature verification

---

## 🌟 Key Features

1. **24/7 Telegram Voice & Photo AI Sommelier Bot**
   - Instant response (< 50ms) for voice notes and wine menu photos while dining at fine establishments.
   - Decanting time recommendations, peak drinking window estimates, and Parker scale (90-100) scoring.

2. **Cellar Portfolio & Drinking Window Engine**
   - Bento Grid portfolio layout tracking total valuation (€), bottle counts, and average sommelier ratings.
   - Status indicators: `🍷 Peak Drinking Window (Now)`, `⏳ Hold for Aging`, and `Ready to Drink`.
   - Single-click CSV portfolio exporter (`/cellar/export`).

3. **Bespoke Palate Tuning Algorithm**
   - Interactive structural sliders for Tannin, Acidity, Body, and Oak preferences (1 to 10 scale).
   - Dynamic flavor note preset tags and custom blacklisted aromas (e.g. green tannins, over-extracted oak).

4. **Multi-Step Vetted Application & VIP Invites**
   - High-craft multi-step membership application flow (`/membership/apply`).
   - Single-use invite code claim interface (`/invite/{code}`).
   - Admin VIP invitation generator CLI tool (`php artisan bordeux:generate-invite`).

5. **Discreet S2S Billing Vault**
   - Dynamic Monthly and Annual subscription billing with 17% annual discount.
   - Webhook signature validation extending user membership expiry automatically.

---

## 🚀 Quick Setup & Installation

### 1. Environment Setup
```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
```

### 2. Configure Credentials (`.env`)
```env
DEEPSEEK_API_KEY=your_deepseek_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

CARD_GATEWAY_EZZYGATE_KEY=ezzy_secret_key
CARD_GATEWAY_COREFY_KEY=corefy_secret_key
CARD_GATEWAY_CARDAQ_KEY=cardaq_secret_key
```

### 3. Database Migration & Seeding
```bash
php artisan migrate:fresh --seed
```

### 4. Build Frontend Assets
```bash
npm run build
```

### 5. Launch Local Server
```bash
php artisan serve --port=1422
```

---

## ⚙️ Custom Artisan Commands

- **Generate VIP Single-Use Invitation Code**:
  ```bash
  php artisan bordeux:generate-invite --days=90
  ```

- **Set Telegram Bot Webhook**:
  ```bash
  php artisan bordeux:telegram-webhook --url=https://your-domain.com/api/telegram/webhook
  ```

- **Check & Expire Outdated Memberships**:
  ```bash
  php artisan bordeux:check-expirations
  ```

---

## 📜 Legal & Corporate Governance

- **Operating Company**: GREAT LEADERS LTD
- **Company Number**: 15954666 (Registered in England & Wales)
- **Registered Office Address**: Dept 6193 43 Owston Road, Carcroft, Doncaster, DN6 8DA
- **Legal Compliance**: Full Privacy Policy, Terms of Service, and Refund Policy pages styled with Quiet Luxury aesthetic standards and sticky Table of Contents navigation.

---

© 2026 GREAT LEADERS LTD (Company No. 15954666). All rights reserved.
