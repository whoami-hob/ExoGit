<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AchatRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fournisseur_id' => 'required|exists:fournisseurs,id',
            'nom_article' => 'required|string|max:255',
            'reference' => 'required|string',
            'montant' => 'required|numeric',
            'date_achat' => 'required|date',
            'mode_paiement' => 'required|string',
        ];
    }
}
