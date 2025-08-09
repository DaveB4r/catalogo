<?php

namespace App\Http\Controllers;

use App\Models\Categorias;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CatalogoController extends Controller
{
    /**
     * Display catalog by user
     */
    public function index(string $id)
    {
        $user = User::where("name", str_replace("_", " ", $id))->first();
        if (!isset($user) || $user->name !== str_replace("_", " ", $id)) {
            return redirect()->route("login");
        }
        $productos = DB::table('productos')
            ->leftJoin('categorias', 'productos.categoria_id', '=', 'categorias.id')
            ->leftJoin('variations', 'productos.id', '=', 'variations.producto_id')
            ->select(
                'productos.id',
                'productos.nombre',
                'productos.imagen',
                'productos.precio',
                'productos.categoria_id',
                'categorias.nombre as categoria',
                DB::raw("GROUP_CONCAT(variations.id SEPARATOR '|-|') as variations_ids"),
                DB::raw("GROUP_CONCAT(variations.nombre SEPARATOR '|-|') as variations_nombres"),
                DB::raw("GROUP_CONCAT(variations.opciones SEPARATOR '|-|') as variations_opciones")
            )
            ->where('productos.user_id', $user->id)
            ->groupBy(
                'productos.id',
                'productos.nombre',
                'productos.imagen',
                'productos.precio',
                'productos.categoria_id',
                'categorias.nombre'
            )
            ->orderBy("categorias.nombre")
            ->orderBy("productos.nombre")
            ->get();
        $categorias = Categorias::where("categorias.user_id", $user->id)->select("categorias.id", "categorias.nombre")->rightJoin("productos", 'categorias.id', '=', 'productos.categoria_id')->groupBy('categorias.id')->get();
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
        $mainUrl = $protocol . "://" . $_SERVER['HTTP_HOST'];
        return Inertia::render("Catalogo/Index", [
            "logo" => $user->avatar,
            "name" => $user->name,
            "productos" => $productos,
            "categorias" => $categorias,
            "phone" => $user->phone
        ])->withViewData([
            'metaTitle' => $user->name,
            'metaDescription' => "Encuentra todos los productos de {$user->name} en un solo lugar.",
            "metaImage" => $mainUrl. "/" .$user->avatar,
            "metaUrl" => url()->current()
        ]);
    }
}
