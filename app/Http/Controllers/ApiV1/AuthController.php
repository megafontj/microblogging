<?php

namespace App\Http\Controllers\ApiV1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\EmptyResource;
use App\Http\Resources\TokenResource;
use App\Http\Resources\UserResource;
use Illuminate\Validation\UnauthorizedException;

class AuthController extends Controller
{
    public function login(LoginRequest $request): TokenResource
    {
        if (! $token = auth()->attempt($request->validated())) {
            throw new UnauthorizedException('Unauthorized', 401);
        }

        return new TokenResource($this->makeResponsibleToken($token));
    }

    public function logout(): EmptyResource
    {
        auth()->logout(true);

        return new EmptyResource();
    }

    public function refresh()
    {
        return new TokenResource($this->makeResponsibleToken(auth()->refresh()));
    }

    public function me()
    {
        return new UserResource(auth()->user());
    }

    protected function makeResponsibleToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }
}
