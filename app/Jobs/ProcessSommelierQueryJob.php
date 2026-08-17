<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\WineCellar;
use App\Services\AI\DeepSeekService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProcessSommelierQueryJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $telegramId,
        public string $userMessage,
        public ?int $userId = null
    ) {}

    public function handle(DeepSeekService $deepSeekService): void
    {
        $user = $this->userId ? User::find($this->userId) : User::where('telegram_id', $this->telegramId)->first();
        $tasteProfile = $user?->tasteProfile;

        // Query AI Sommelier
        $aiResult = $deepSeekService->querySommelier($this->userMessage, $tasteProfile);
        $replyText = $aiResult['reply_message'] ?? 'Thank you for your inquiry.';
        $suggestedWines = $aiResult['suggested_wines'] ?? [];

        // Synchronize suggested wines into user's wine cellar if user is registered
        if ($user) {
            foreach ($suggestedWines as $wineData) {
                WineCellar::create([
                    'user_id' => $user->id,
                    'wine_name' => substr($wineData['wine_name'] ?? 'Curated Selection', 0, 200),
                    'region' => substr($wineData['region'] ?? 'Bordeaux', 0, 200),
                    'type' => substr($wineData['type'] ?? 'Red Wine', 0, 100),
                    'price_segment' => substr($wineData['price_segment'] ?? 'Grand Cru', 0, 100),
                    'ai_rating' => $wineData['ai_rating'] ?? 98.0,
                    'notes' => $wineData['notes'] ?? null,
                    'added_via' => 'ai_recommendation',
                ]);
            }
        }

        // Format message for Telegram
        $formattedMessage = "🍷 *Bordeux AI Sommelier*\n\n" . $replyText;

        if (!empty($suggestedWines)) {
            $formattedMessage .= "\n\n🍾 *Cellar Recommendations:*";
            foreach ($suggestedWines as $wine) {
                $rating = isset($wine['ai_rating']) ? " (AI Score: {$wine['ai_rating']}/100)" : "";
                $formattedMessage .= "\n• *{$wine['wine_name']}* — {$wine['region']}{$rating}";
            }
        }

        $botToken = config('services.telegram.bot_token', env('TELEGRAM_BOT_TOKEN'));

        if ($botToken && $this->telegramId) {
            try {
                Http::post("https://api.telegram.org/bot{$botToken}/sendMessage", [
                    'chat_id' => $this->telegramId,
                    'text' => $formattedMessage,
                    'parse_mode' => 'Markdown',
                ]);
            } catch (\Throwable $e) {
                Log::error("Failed to send Telegram message to chat {$this->telegramId}: {$e->getMessage()}");
            }
        }
    }
}
