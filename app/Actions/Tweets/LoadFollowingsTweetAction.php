<?php

namespace App\Actions\Tweets;

use App\Models\Tweet;
use Illuminate\Support\Facades\Auth;

class LoadFollowingsTweetAction
{
    public function execute()
    {
        $user = Auth::user();
        $userIds = $user->followings()->get()->pluck('id')->toArray();

        return Tweet::with('owner')
            ->whereIn('user_id', $userIds)
            ->orderByDesc('created_at')->get();
    }
}
