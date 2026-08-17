<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SetTelegramWebhookCommand extends Command
{
    protected $signature = 'bordeux:telegram-webhook {--url= : Public HTTPS domain for Telegram Webhook}';
    protected $description = 'Set or refresh Telegram Bot Webhook endpoint';

    public function handle(): int
    {
        $botToken = config('services.telegram.bot_token') ?: env('TELEGRAM_BOT_TOKEN');

        if (!$botToken) {
            $this->error("TELEGRAM_BOT_TOKEN is not set in your .env file!");
            return Command::FAILURE;
        }

        $webhookUrl = $this->option('url') ?: config('services.telegram.webhook_url') ?: env('TELEGRAM_WEBHOOK_URL');

        if (!$webhookUrl) {
            $this->error("No webhook URL provided. Set TELEGRAM_WEBHOOK_URL in .env or pass --url=https://domain.com/api/telegram/webhook");
            return Command::FAILURE;
        }

        $endpoint = "https://api.telegram.org/bot{$botToken}/setWebhook";
        $response = Http::post($endpoint, [
            'url' => $webhookUrl,
        ]);

        if ($response->successful() && $response->json('ok')) {
            $this->info("Telegram Webhook set successfully to: {$webhookUrl}");
            return Command::SUCCESS;
        }

        $this->error("Failed to set Telegram Webhook: " . $response->body());
        return Command::FAILURE;
    }
}
