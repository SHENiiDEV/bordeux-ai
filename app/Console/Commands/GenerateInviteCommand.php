<?php

namespace App\Console\Commands;

use App\Models\InviteCode;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GenerateInviteCommand extends Command
{
    protected $signature = 'bordeux:generate-invite {--days=90 : Days until code expires}';
    protected $description = 'Generate a new single-use Bordeux AI Private Club invitation code';

    public function handle(): int
    {
        $code = 'BDX-' . strtoupper(Str::random(4)) . '-' . strtoupper(Str::random(4)) . '-2026';
        $days = (int) $this->option('days');

        $invite = InviteCode::create([
            'code' => $code,
            'expires_at' => now()->addDays($days),
            'is_used' => false,
        ]);

        $this->info("VIP Invitation Code Generated Successfully!");
        $this->table(['Code', 'Expires At', 'Claim URL'], [
            [
                $invite->code,
                $invite->expires_at->toDateTimeString(),
                url("/invite/{$invite->code}"),
            ]
        ]);

        return Command::SUCCESS;
    }
}
