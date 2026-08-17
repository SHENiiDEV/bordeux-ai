<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TasteProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'budget_tier',
        'preferred_notes',
        'blacklisted_notes',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
