<?php

use App\Http\Controllers\ApiV1\AuthController;
use App\Http\Controllers\ApiV1\ChatController;
use App\Http\Controllers\ApiV1\MessageController;
use App\Http\Controllers\ApiV1\TweetController;
use App\Http\Controllers\ApiV1\UserController;
use App\Http\Middleware\OnlyGuestAccessMiddlware;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->prefix('v1')->group(function () {
    Route::post('auth/login', [AuthController::class, 'login'])->middleware(OnlyGuestAccessMiddlware::class);
    Route::post('auth/register', [AuthController::class, 'register'])->middleware(OnlyGuestAccessMiddlware::class);

    Route::middleware(['auth:api'])->prefix('auth')->group(function() {
        // Auth routes
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('me', [AuthController::class, 'me']);
    });

    Route::middleware(['auth:api'])->group(function () {
        // Users routes
        Route::post('users:search', [UserController::class, 'search']);
        Route::get('users/{username}', [UserController::class, 'showByUsername']);
        Route::post('users/follow', [UserController::class, 'follow']);
        Route::post('users/unfollow', [UserController::class, 'unfollow']);
        Route::get('users/me/followers', [UserController::class, 'followers']);
        Route::get('users/me/followings', [UserController::class, 'following']);
        Route::get('users/me/recommendation', [UserController::class, 'recommendationUsers']);

        // Tweets Routes
        Route::post('tweets:search', [TweetController::class, 'search']);
        Route::get('tweets/followings', [TweetController::class, 'followings']);
        Route::apiResource('tweets', TweetController::class);

        // Chats and Messages
        Route::post('chats/init', [ChatController::class, 'initChat']);
        Route::get('chats/{id}', [ChatController::class, 'show']);
        Route::post('chats/messages:search', [MessageController::class, 'search']);
        Route::post('chats/messages', [MessageController::class, 'create']);
        Route::delete('chats/messages/{id}', [MessageController::class, 'delete']);
    });
});
