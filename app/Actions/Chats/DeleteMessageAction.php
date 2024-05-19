<?php

namespace App\Actions\Chats;

use App\Models\Chat;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Finder\Exception\AccessDeniedException;

class DeleteMessageAction
{
    public function execute(int $id)
    {
        $message = Message::findOrFail($id);
        if($message->sender_id !== Auth::user()->id) {
            throw new AccessDeniedException('Access denied', 403);
        }
    }
}
