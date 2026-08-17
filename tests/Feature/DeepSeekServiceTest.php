<?php

namespace Tests\Feature;

use App\Models\TasteProfile;
use App\Services\AI\DeepSeekService;
use Tests\TestCase;

class DeepSeekServiceTest extends TestCase
{
    public function test_deepseek_service_returns_structured_sommelier_response(): void
    {
        $service = new DeepSeekService();
        $profile = new TasteProfile([
            'budget_tier' => 'Grand Cru ($2,500 - $10,000/bottle)',
            'preferred_notes' => 'Bordeaux, Cabernet Sauvignon, Oak',
            'blacklisted_notes' => 'Vanilla',
        ]);

        $result = $service->querySommelier('Suggest a red wine for dry-aged steak', $profile);

        $this->assertIsArray($result);
        $this->assertArrayHasKey('reply_message', $result);
        $this->assertArrayHasKey('suggested_wines', $result);
        $this->assertNotEmpty($result['suggested_wines']);
    }
}
