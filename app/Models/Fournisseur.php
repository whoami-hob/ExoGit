<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Fournisseur extends Model
{
    public function achats()
    {
        return $this->hasMany(Achat::class);
    }
    protected $fillable = [
        'nom',
        'email',
        'telephone',
        'adresse'
    ];
}
