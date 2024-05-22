<?php

namespace App\Actions\Chats;

use App\Models\Chat;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class CreateMessageAction
{
    public function __construct(private InitChatAction $action)
    {
    }

    public function execute(array $data)
    {
        $data['sender_id'] = Auth::user()->id;
        return Message::create($data);
    }
}
