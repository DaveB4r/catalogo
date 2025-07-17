<?php

namespace App\Http\Controllers;

use App\Models\Categorias;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorias = Categorias::where("user_id", Auth::id())->get();
        return Inertia::render("Categorias/Index", [
            "categorias" => $categorias,
            "flash" => [
                "success" => session("success"),
                "error" => session("error")
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "nombre" => "required|string|max:255"
        ]);
        $exists = Categorias::where("user_id", Auth::id())->where("nombre", $request->nombre)->select("nombre")->count();
        if ($exists > 0) {
            return redirect()->route("categorias.index")->with("error", "La categoria ya existe, intente nuevamente");
        }
        Categorias::create([
            ...$validated,
            "user_id" => Auth::id()
        ]);
        return redirect()->route("categorias.index")->with("success", "Categoria creada satisfactoriamente");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categorias $categoria)
    {
        $validated = $request->validate([
            "nombre" => "required|string|max:255"
        ]);
        $exists = Categorias::where("user_id", Auth::id())->where("nombre", $request->nombre)->select("nombre")->count();
        if($exists > 0) {
            return redirect()->route("categorias.index")->with("error", "La categoria ya existe, intente nuevamente");
        }
        $categoria->update($validated);
        return redirect()->route("categorias.index")->with("success", "Categoria actualizada satisfactoriamente");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categorias $categoria)
    {
        $categoria->delete();
        return redirect()->route("categorias.index")->with("success", "Categoria Eliminada satisfactoriamente");
    }
}
