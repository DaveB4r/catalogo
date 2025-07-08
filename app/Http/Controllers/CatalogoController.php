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
        $decodeStr = base64_decode($id);
        $userData = explode(":",$decodeStr);
        $user = User::find($userData[0]);
        if(!isset($user) || $user-> name !== $userData[1]) {
            return redirect()->route("login");
        }
        $productos = Productos::where("productos.user_id", $userData[0])->join("categorias", "productos.categoria_id", "=", "categorias.id", "left")->select("productos.id", "productos.nombre", "productos.imagen", "productos.tallas", "productos.colores", "productos.categoria_id", "categorias.nombre as categoria")->get();
        return Inertia::render("Catalogo/Index", [
            "productos" => $productos
        ]);
    }
}
