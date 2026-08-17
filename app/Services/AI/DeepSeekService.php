<?php

namespace App\Services\AI;

use App\Models\TasteProfile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DeepSeekService
{
    protected string $apiKey;
    protected string $apiUrl;
    protected string $model;

    public function __construct()
    {
        $this->apiKey = config('services.deepseek.api_key', env('DEEPSEEK_API_KEY', 'sk-demo-deepseek-key'));
        $this->apiUrl = config('services.deepseek.api_url', 'https://api.deepseek.com/v1/chat/completions');
        $this->model = config('services.deepseek.model', 'deepseek-chat');
    }

    public function querySommelier(string $userMessage, ?TasteProfile $profile = null): array
    {
        $budgetTier = $profile?->budget_tier ?? 'Reserve ($500 - $2,500/bottle)';
        $preferredNotes = $profile?->preferred_notes ?? 'Bordeaux reds, aged tannins, complex oak';
        $blacklistedNotes = $profile?->blacklisted_notes ?? 'None specified';

        $systemPrompt = <<<PROMPT
You are Bordeux AI — an ultra-exclusive, private sommelier and wine concierge for high-net-worth connoisseurs and luxury wine collectors.

Tone of Voice:
- Refined, articulate, dignified, and highly knowledgeable.
- Speak with quiet luxury and reverence for the craft of winemaking.
- Address the user with absolute respect as a valued member of Bordeux AI Private Club.

User Taste Profile Context:
- Preferred Budget Tier: {$budgetTier}
- Preferred Flavor Notes: {$preferredNotes}
- Blacklisted / Disliked Notes: {$blacklistedNotes}

Strict Output Format:
You MUST return ONLY a valid JSON object with NO markdown code block wrappers, NO text outside JSON, formatted as:
{
  "reply_message": "Your polite, insightful sommelier answer to the client...",
  "suggested_wines": [
    {
      "wine_name": "Full Producer and Vintage Name (VARCHAR 200)",
      "region": "Appellation / Region",
      "type": "Red Wine / White Wine / Champagne",
      "price_segment": "Grand Cru / Premier Cru / Rare Vintage",
      "ai_rating": 98.5,
      "notes": "Brief notes on why this bottle matches their profile"
    }
  ]
}
PROMPT;

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$this->apiKey}",
                'Content-Type' => 'application/json',
            ])->timeout(30)->post($this->apiUrl, [
                'model' => $this->model,
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $userMessage],
                ],
                'temperature' => 0.7,
                'response_format' => ['type' => 'json_object'],
            ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content');
                $parsed = json_decode($content, true);

                if (is_array($parsed) && isset($parsed['reply_message'])) {
                    return $parsed;
                }
            }

            Log::warning("DeepSeek API non-standard response or call failed", [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
        } catch (\Throwable $e) {
            Log::error("DeepSeek API exception: {$e->getMessage()}");
        }

        // Fallback elegant response if API key is not yet set or external call fails
        return [
            'reply_message' => "Monsieur, I have reviewed your request regarding \"{$userMessage}\". For an exquisite dining pairing or cellar selection matching your {$budgetTier} preference, I recommend a bottle of exceptional provenance from our curated reserve.",
            'suggested_wines' => [
                [
                    'wine_name' => 'Château Margaux Premier Grand Cru Classé 2015',
                    'region' => 'Margaux, Bordeaux, France',
                    'type' => 'Red Wine',
                    'price_segment' => 'Grand Cru',
                    'ai_rating' => 99.0,
                    'notes' => 'A masterclass in finesse, silky tannins, violet floral notes, and graphite depth.',
                ]
            ],
        ];
    }
}
