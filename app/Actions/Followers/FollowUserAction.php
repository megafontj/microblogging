<?php

namespace App\Actions\Followers;

use App\Models\User;

class FollowUserAction
{
    public function execute(int $idUserToFollow): void
    {
        /** @var User $user */
        $user = User::find($idUserToFollow);
        $user->followers()->attach(auth()->user()->id);
    }
}
