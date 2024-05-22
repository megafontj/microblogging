<?php

namespace App\Http\Controllers\ApiV1;

use App\Actions\Tweets\CreateTweetAction;
use App\Actions\Tweets\DeleteTweetAction;
use App\Actions\Tweets\UpdateTweetAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tweet\CreateOrUpdateTweetRequest;
use App\Http\Resources\TweetResource;
use App\Models\Tweet;
use App\Support\QuerySearch\SearchQuery;
use App\Support\Requests\SearchRequest;
use App\Support\Resources\EmptyResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TweetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function search(SearchRequest $request, SearchQuery $query): AnonymousResourceCollection
    {
        $tweets = Tweet::filter($query)->cursorPaginate(25);

        return TweetResource::collection($tweets);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateOrUpdateTweetRequest $request, CreateTweetAction $action): TweetResource
    {
        return new TweetResource($action->execute($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Tweet $tweet, Request $request): TweetResource
    {
        if ($include = $request->query('include')) {
            $tweet->load($include);
        }
        return new TweetResource($tweet);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(int $id, CreateOrUpdateTweetRequest $request, UpdateTweetAction $action): TweetResource
    {
        return new TweetResource($action->execute($id, $request->content()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, DeleteTweetAction $action): EmptyResource
    {
        $action->execute($id);

        return new EmptyResource();
    }

}
