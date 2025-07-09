<?php

namespace App\Http\Controllers;

use App\Models\Categorias;
use App\Models\Productos;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogoController extends Controller
{
    /**
     * Display catalog by user
     */
    public function index(string $id)
    {
        $user = User::where("name", str_replace("_"," ",$id))->first();
        if(!isset($user) || $user-> name !== str_replace("_"," ",$id)) {
            return redirect()->route("login");
        }
        $productos = Productos::where("productos.user_id", $user->id)->join("categorias", "productos.categoria_id", "=", "categorias.id", "left")->select("productos.id", "productos.nombre", "productos.imagen", "productos.tallas", "productos.colores", "productos.categoria_id", "categorias.nombre as categoria")->get();
        return Inertia::render("Catalogo/Index", [
            "productos" => $productos,
            "phone" => $user->phone
        ]);
    }
}
