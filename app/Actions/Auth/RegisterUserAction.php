<?php

namespace App\Actions\Auth;

use App\Models\User;

class RegisterUserAction
{
    public function execute(array $data): User
    {
        return User::create($data);
    }
}
