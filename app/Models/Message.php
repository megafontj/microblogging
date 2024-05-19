<?php

namespace App\Models;

use App\Support\QuerySearch\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory, Filterable;

    protected $fillable = [
        'chat_id',
        'sender_id',
        'content'
    ];

    public function chat(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
