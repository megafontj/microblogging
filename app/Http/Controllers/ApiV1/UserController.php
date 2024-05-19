<?php

namespace App\Http\Controllers\ApiV1;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Support\QuerySearch\SearchQuery;
use App\Support\Requests\SearchRequest;
use Illuminate\Http\Request;

class UserController
{
    public function search(SearchRequest $request, SearchQuery $query)
    {
        return UserResource::collection(User::filter($query)->cursorPaginate(25));
    }

    public function showByUsername(string $username, Request $request): UserResource
    {
        return new UserResource(User::findOrFailByUsername($username));
    }
}
