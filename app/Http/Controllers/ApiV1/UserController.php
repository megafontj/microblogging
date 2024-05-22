<?php

namespace App\Http\Controllers\ApiV1;

use App\Actions\Followers\FollowUserAction;
use App\Actions\Followers\LoadNotFollowedUsersAction;
use App\Actions\Followers\UnfollowUserAction;
use App\Http\Requests\FollowUnfollowRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Support\QuerySearch\SearchQuery;
use App\Support\Requests\SearchRequest;
use App\Support\Resources\EmptyResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

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

    public function follow(FollowUnfollowRequest $request, FollowUserAction $action): EmptyResource
    {
        $action->execute($request->getUserId());

        return new EmptyResource();
    }

    public function unfollow(FollowUnfollowRequest $request, UnfollowUserAction $action): EmptyResource
    {
        $action->execute($request->getUserId());

        return new EmptyResource();
    }

    public function followers(): AnonymousResourceCollection
    {
        return UserResource::collection(auth()->user()->followers()->get());
    }

    public function following(): AnonymousResourceCollection
    {
        return UserResource::collection(auth()->user()->followings()->get());
    }

    public function recommendationUsers(LoadNotFollowedUsersAction $action)
    {
        return UserResource::collection($action->execute());
    }

}
