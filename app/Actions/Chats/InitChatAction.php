<?php

namespace App\Actions\Chats;

use App\Models\Chat;
use Illuminate\Support\Facades\Auth;

class InitChatAction
{
    public function execute(int $chatWithUserId)
    {
        $hasChat = Chat::hasChat($chatWithUserId);
        if ($hasChat) {
            return Chat::getChat($chatWithUserId);
        }

        return Chat::create([
            'user1_id' => Auth::user()->id,
            'user2_id' => $chatWithUserId
        ]);
    }
}
