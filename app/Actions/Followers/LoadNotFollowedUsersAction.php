<?php

namespace App\Actions\Followers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class LoadNotFollowedUsersAction
{

    public function execute()
    {
        /** @var User $user */
        $user = Auth::user();

        $followersIds = $user->followings()->get()->pluck('id')->toArray();

        return User::query()->whereNotIn('id', $followersIds)->get();
    }
}
