<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Variations extends Model
{
    protected $fillable = [
        'nombre',
        'opciones',
        'producto_id'
    ];
    public function producto(): BelongsTo
    {
        return $this->belongsTo(Productos::class, 'producto_id');
    }
}
