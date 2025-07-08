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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "nombre" => "required|string|max:255"
        ]);
        Categorias::create([
            ...$validated,
            "user_id" => Auth::id()
        ]);
        return redirect()->route("categorias.index")->with("success", "Categoria creada satisfactoriamente");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categorias $categoria)
    {
        $validated = $request->validate([
            "nombre" => "required|string|max:255"
        ]);
        $categoria->update($validated);
        return redirect()->route("categorias.index")->with("success", "Categoria actualizada satisfactoriamente");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categorias $categoria)
    {
        $categoria->delete();
        return redirect()->route("categorias.index")->with("success","Categoria Eliminada satisfactoriamente");
    }
}
