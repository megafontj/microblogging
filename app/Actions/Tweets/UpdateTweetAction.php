<?php

namespace App\Actions\Tweets;

use App\Models\Tweet;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Finder\Exception\AccessDeniedException;

class UpdateTweetAction
{
    public function execute(int $id, string $content)
    {
        $tweet = Tweet::findOrFail($id);

        if ($tweet->user_id !== Auth::user()->id) {
            throw new AccessDeniedException("Access denied", 403);
        }

        $tweet->content = $content;
        $tweet->save();

        return $tweet;
    }
}
