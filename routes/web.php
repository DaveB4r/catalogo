<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CatalogoController;
use App\Http\Controllers\CategoriasController;
use App\Http\Controllers\ProductosController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render("Home/Index");
})->name('home');

Route::get('c/{id}', [CatalogoController::class, 'index'])->name("catalogo");

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('categorias', CategoriasController::class);
    Route::resource('productos', ProductosController::class);
    Route::post('producto_image/{id}', [ProductosController::class, 'image'])->name('producto_image');
    Route::post('avatar/{id}', [RegisteredUserController::class, 'avatar'])->name("avatar");
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
