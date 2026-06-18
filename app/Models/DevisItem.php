<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DevisItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'devis_id',
        'product_id',
        'quantity',
        'unit_price',
        'total'
    ];

    public function devis()
    {
        return $this->belongsTo(Devis::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}