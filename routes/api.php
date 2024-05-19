<?php

use App\Http\Controllers\ApiV1\AuthController;
use App\Http\Middleware\OnlyGuestAccessMiddlware;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('auth/login', [AuthController::class, 'login'])->middleware(OnlyGuestAccessMiddlware::class);
    Route::middleware(['api', 'auth:api'])->prefix('auth')->group(function() {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('me', [AuthController::class, 'me']);
    });
});
