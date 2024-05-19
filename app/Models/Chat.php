<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = ['user1_id', 'user2_id'];

    public static function hasChat(int $chatWithUserId)
    {
        return Chat::query()
            ->where('user1_id', $chatWithUserId)
            ->where('user2_id', Auth::user()->id)
            ->orWhere('user2_id', $chatWithUserId)
            ->where('user1_id', Auth::user()->id)->exists();
    }


    public static function getChat(int $chatWithUserId)
    {
        return Chat::query()
            ->where('user1_id', $chatWithUserId)
            ->where('user2_id', Auth::user()->id)
            ->orWhere('user2_id', $chatWithUserId)
            ->where('user1_id', Auth::user()->id)->first();
    }


    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }
}
