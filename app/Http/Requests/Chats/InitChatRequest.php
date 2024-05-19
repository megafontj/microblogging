<?php

namespace App\Http\Requests\Chats;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InitChatRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'user_id' => ['required', Rule::exists('users', 'id')]
        ];
    }


    public function getUserId()
    {
        return $this->validated('user_id');
    }
}
