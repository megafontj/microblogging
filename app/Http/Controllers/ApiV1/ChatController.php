<?php

namespace App\Http\Controllers\ApiV1;

use App\Actions\Chats\InitChatAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Chats\InitChatRequest;
use App\Http\Resources\ChatResource;
use App\Models\Chat;

class ChatController extends Controller
{
    public function initChat(InitChatRequest $request, InitChatAction $action): ChatResource
    {
        return new ChatResource((object)$action->execute($request->getUserId()));
    }

    public function show(int $id): ChatResource
    {
//        return new ChatResource(Chat::findOrFail($id));
    }
}
