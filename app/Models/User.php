<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'email',
        'password',
        'phone_number',
        'date_of_birth',
        'address_street',
        'address_city',
        'address_country',
        'address_postcode',
        'agreed_to_terms',
        'terms_accepted_at',
        'balance',
        'telegram_id',
        'telegram_username',
        'membership_status',
        'expires_at',
        'is_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'date_of_birth' => 'date',
            'agreed_to_terms' => 'boolean',
            'terms_accepted_at' => 'datetime',
            'balance' => 'float',
            'expires_at' => 'datetime',
            'is_admin' => 'boolean',
        ];
    }

    public function tasteProfile(): HasOne
    {
        return $this->hasOne(TasteProfile::class);
    }

    public function wineCellar(): HasMany
    {
        return $this->hasMany(WineCellar::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
