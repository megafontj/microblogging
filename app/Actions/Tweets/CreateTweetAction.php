<?php

namespace App\Actions\Tweets;

use App\Models\Tweet;
use Illuminate\Support\Facades\Auth;

class CreateTweetAction
{
    public function execute(array $data): Tweet
    {
        $data['user_id'] = Auth::user()->id;

        return Tweet::create($data);
    }
}
