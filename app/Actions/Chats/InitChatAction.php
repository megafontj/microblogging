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
            $chat = Chat::getChat($chatWithUserId);
            return [
                'id' => $chat->id,
                'me' => $chat->user1_id == Auth::id() ? $chat->user1_id : $chat->user2_id,
                'user_id' => $chatWithUserId
            ];
        }

        $chat = Chat::create([
            'user1_id' => Auth::user()->id,
            'user2_id' => $chatWithUserId
        ]);

        return [
            'id' => $chat->id,
            'me' => $chat->user1_id == Auth::id() ? $chat->user1_id : $chat->user2_id,
            'user_id' => $chatWithUserId
        ];
    }
}
