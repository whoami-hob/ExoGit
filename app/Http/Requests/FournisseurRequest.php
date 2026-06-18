<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FournisseurRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $fournisseurId = $this->route('fournisseur') ? $this->route('fournisseur')->id : null;

        return [
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:fournisseurs,email,' . $fournisseurId,
            'telephone' => 'required|string|max:10',
            'adresse' => 'nullable|string',
        ];
    }
}
