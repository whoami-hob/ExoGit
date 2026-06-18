<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $clientId = $this->route('client') ? $this->route('client')->id : null;
        
        return [
            'name' => 'required|string|max:255',
            'ice' => 'nullable|string|regex:/^[0-9]{15}$/', 
            'email' => 'nullable|email|max:255|unique:clients,email,' . $clientId,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'ice.regex' => 'L\'ICE doit être composé de exactement 15 chiffres.',
        ];
    }
}
