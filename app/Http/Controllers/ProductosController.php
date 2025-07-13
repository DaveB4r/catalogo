<?php

namespace App\Http\Controllers;

use App\Models\Categorias;
use App\Models\Productos;
use App\Models\Variations;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productos = Productos::where("productos.user_id", Auth::id())->join("categorias", "productos.categoria_id", "=", "categorias.id", "left")->select("productos.id", "productos.nombre", "productos.imagen", "productos.categoria_id", "categorias.nombre AS categoria")->get();
        $categorias = Categorias::where("user_id", Auth::id())->get();
        $user = Auth::user();
        return Inertia::render("Productos/Index", [
            "productos" => $productos,
            "categorias" => $categorias,
            "user" => $user,
            "flash" => [
                "success" => session("success"),
                "error" => session("error"),
                "id" => session("id")
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
            'nombre' => 'required|string|max:255',
            'categoria_id' => 'required|exists:categorias,id'
        ]);

        $producto = Productos::create([
            ...$validated,
            "user_id" => Auth::id()
        ]);
        $variationModel = new Variations();

        if (isset($request->variationsData)) {
            if (!empty($request->variationsData)) {
                foreach ($request->variationsData as $variation) {
                    // dd($variation["nombre"]);
                    $variationModel->nombre = $variation["nombre"];
                    $variationModel->opciones = $variation["opciones"];
                    $variationModel->producto_id = $producto->id;
                    $variationModel->save();
                }
            }
        }

        return redirect()->route("productos.index")->with("id", $producto->id);
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
    public function update(Request $request, Productos $producto)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'categoria_id' => 'required|exists:categorias,id'
        ]);

        $producto->update($validated);

        return redirect()->route("productos.index")->with("id", $producto->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Productos $producto)
    {
        $imagen = str_replace("storage/", "", $producto->imagen);
        Storage::disk("public")->delete($imagen);
        $producto->delete();
        return redirect()->route("productos.index")->with("success", "Producto eliminado satisfactoriamente");
    }

    /**
     * Handle product image
     */
    public function image(Request $request, Int $id)
    {
        $producto = Productos::select("imagen")->find($id);
        $message = "creado";
        if (isset($producto->imagen)) {
            $imagen = str_replace("storage/", "", $producto->imagen);
            Storage::disk("public")->delete($imagen);
            $message = "actualizado";
        }
        $imagen = "storage/" . $request->file("file")->store("productos", "public");
        Productos::where('id', $id)->update(['imagen' => $imagen]);
        return redirect()->route("productos.index")->with("success", "Producto {$message} satisfactoriamente");
    }
}
