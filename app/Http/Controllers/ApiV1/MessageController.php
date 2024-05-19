<?php

namespace App\Http\Controllers\ApiV1;

use App\Actions\Chats\CreateMessageAction;
use App\Actions\Chats\DeleteMessageAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Chats\CreateMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Support\QuerySearch\SearchQuery;
use App\Support\Requests\SearchRequest;
use App\Support\Resources\EmptyResource;

class MessageController extends Controller
{
    public function search(SearchRequest $request, SearchQuery $query)
    {
        return MessageResource::collection(Message::filter($query)->cursorPaginate(20));
    }

    public function create(CreateMessageRequest $request, CreateMessageAction $action)
    {
        return new MessageResource($action->execute($request->validated()));
    }

    public function delete(int $id, DeleteMessageAction $action)
    {
        $action->execute($id);

        return new EmptyResource();
    }

}
