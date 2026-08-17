<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessSommelierQueryJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TelegramWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $update = $request->all();

        Log::info("Telegram webhook received update ID: " . ($update['update_id'] ?? 'unknown'));

        if (isset($update['message']['text']) && isset($update['message']['chat']['id'])) {
            $chatId = (string) $update['message']['chat']['id'];
            $text = $update['message']['text'];
            $username = $update['message']['from']['username'] ?? null;

            // Optional: link telegram_id to existing user account by telegram_username if matched
            $user = null;
            if ($username) {
                $user = User::where('telegram_username', $username)->first();
                if ($user && !$user->telegram_id) {
                    $user->update(['telegram_id' => $chatId]);
                }
            }

            // Dispatch background Redis queue job for instant HTTP 200 return to Telegram
            ProcessSommelierQueryJob::dispatch($chatId, $text, $user?->id);
        }

        return response()->json(['status' => 'ok'], 200);
    }
}
