<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Productos extends Model
{
    protected $table = "productos";
    protected $fillable = [
        'nombre',
        'imagen',
        'user_id',
        'categoria_id'
    ];

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categorias::class, 'categoria_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
