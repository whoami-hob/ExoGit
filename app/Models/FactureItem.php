<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FactureItem extends Model
{
    use HasFactory , SoftDeletes;

    protected $fillable = [
        'facture_id',
        'product_id',
        'quantity',
        'unit_price',
        'total_line',
    ];

    public function facture()
    {
        return $this->belongsTo(Facture::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
