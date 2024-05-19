<?php

namespace App\Actions\Followers;

use App\Models\User;

class UnfollowUserAction
{
    public function execute(int $idUserToUnfollow): void
    {
        /** @var User $user */
        auth()->user()->followings()->detach($idUserToUnfollow);
    }
}
