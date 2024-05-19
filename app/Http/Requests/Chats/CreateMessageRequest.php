<?php

namespace App\Http\Requests\Chats;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateMessageRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'content' => ['required', 'string', 'max:700'],
            'chat_id' => ['required', 'integer', Rule::exists('chats', 'id')]
        ];
    }
}
