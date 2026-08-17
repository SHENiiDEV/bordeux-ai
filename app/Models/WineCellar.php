<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WineCellar extends Model
{
    use HasFactory;

    protected $table = 'wine_cellar';

    protected $fillable = [
        'user_id',
        'wine_name',
        'region',
        'type',
        'price_segment',
        'ai_rating',
        'user_rating',
        'notes',
        'vintage_year',
        'peak_drinking_start',
        'peak_drinking_end',
        'estimated_value',
        'bottle_count',
        'added_via',
    ];

    protected $casts = [
        'ai_rating' => 'float',
        'user_rating' => 'float',
        'estimated_value' => 'float',
        'vintage_year' => 'integer',
        'peak_drinking_start' => 'integer',
        'peak_drinking_end' => 'integer',
        'bottle_count' => 'integer',
    ];

    protected $appends = ['drinking_status'];

    public function getDrinkingStatusAttribute(): string
    {
        $currentYear = (int) date('Y');
        $start = $this->peak_drinking_start;
        $end = $this->peak_drinking_end;

        if (!$start || !$end) {
            return 'ready_to_drink';
        }

        if ($currentYear < $start) {
            return 'aging';
        } elseif ($currentYear >= $start && $currentYear <= $end) {
            return 'peak_now';
        } else {
            return 'past_peak';
        }
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
