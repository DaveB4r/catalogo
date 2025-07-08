<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categorias extends Model
{
    protected $table = "categorias";
    protected $fillable = [
        'nombre',
        'user_id'
    ];

    public function productos(): HasMany
    {
        return $this->hasMany(Productos::class);
    }
}
