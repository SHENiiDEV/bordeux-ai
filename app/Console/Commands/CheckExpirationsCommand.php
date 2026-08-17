<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CheckExpirationsCommand extends Command
{
    protected $signature = 'bordeux:check-expirations';
    protected $description = 'Check expired memberships and update user status';

    public function handle(): int
    {
        $expiredUsers = User::where('membership_status', 'active')
            ->whereNotNull('expires_at')
            ->where('expires_at', '<=', now())
            ->get();

        $count = 0;
        foreach ($expiredUsers as $user) {
            $user->update(['membership_status' => 'expired']);
            $count++;
        }

        $this->info("Processed membership expiration check. Marked {$count} user(s) as expired.");

        return Command::SUCCESS;
    }
}
