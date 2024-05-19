<?php

namespace App\Actions\Tweets;

use App\Models\Tweet;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Finder\Exception\AccessDeniedException;

class DeleteTweetAction
{
    public function execute(int $id): void
    {
        $tweet = Tweet::findOrFail($id);
        if ($tweet->user_id !== Auth::user()->id) {
            throw new AccessDeniedException("Access denied", 403);
        }

        $tweet->delete();
    }
}
