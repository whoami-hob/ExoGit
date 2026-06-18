<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achat extends Model
{
    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class);
    }
    protected $fillable = [
        'fournisseur_id',
        'reference',
        'montant',
        'date_achat',
        'nom_article',
        'mode_paiement'
    ];
}
