# Cloudflare WAF & Security Configuration Guide

To protect **Bordeux AI** against automated bot scraping, unauthorized webhook forgery, and credential stuffing, configure the following rules in your Cloudflare Dashboard:

## 1. Webhook Endpoint Bypass
Create a Firewall Skip Rule for high-ticket payment S2S webhooks and Telegram updates:
- **Rule Name**: `Allow Payment & Telegram Webhooks`
- **Expression**:
  ```
  (http.request.uri.path wildcard "/api/webhooks/*") or (http.request.uri.path eq "/api/telegram/webhook")
  ```
- **Action**: `Bypass / Skip` (WAF Managed Rules, Security Level: Essentially Off for these IPs).

## 2. Bot Management & Scraper Protection
- **Bot Fighting Mode**: `On`
- **Challenge Automated Traffic**: Enable Managed Challenge for all requests with Bot Score < 30.

## 3. High-Ticket Rate Limiting
Create a Rate Limiting Rule on registration and login endpoints:
- **Rule Name**: `Rate Limit Auth Endpoints`
- **Expression**:
  ```
  (http.request.uri.path eq "/login") or (http.request.uri.path eq "/invite/register")
  ```
- **Threshold**: 5 requests per 1 minute per IP.
- **Action**: `Block` (429 Too Many Requests).
