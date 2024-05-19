<?php

namespace App\Http\Requests\Tweet;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrUpdateTweetRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'content' => ['required', 'string', 'max:500']
        ];
    }

    public function content(): string
    {
        return $this->validated()['content'];
    }
}
