<?php

namespace App\Http\Controllers;

use App\Models\Categorias;
use App\Models\Productos;
use App\Models\Variations;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Str;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productos = Productos::where("productos.user_id", Auth::id())
            ->leftJoin("categorias", "productos.categoria_id", "=", "categorias.id")
            ->leftJoin("variations", "productos.id", "=", "variations.producto_id")
            ->select(
                "productos.id",
                "productos.nombre",
                "productos.imagen",
                "productos.descripcion",
                "productos.precio",
                "productos.categoria_id",
                "categorias.nombre AS categoria",
                DB::raw("GROUP_CONCAT(variations.id SEPARATOR \"|-|\") as variations_ids"),
                DB::raw("GROUP_CONCAT(variations.nombre SEPARATOR \"|-|\") as variations_nombres"),
                DB::raw("GROUP_CONCAT(variations.opciones SEPARATOR \"|-|\") as variations_opciones")
            )
            ->orderBy("productos.nombre")
            ->groupBy("productos.id")
            ->get();
        $categorias = Categorias::where("user_id", Auth::id())->orderBy('nombre')->get();
        $user = Auth::user();
        return Inertia::render("Productos/Index", [
            "productos" => $productos,
            "categorias" => $categorias,
            "user" => $user,
            "flash" => [
                "success" => session("success"),
                "error" => session("error"),
                "id" => session("id"),
                "deleted" => session("deleted")
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|string|max:255',
            'descripcion' => 'nullable',
            'categoria_id' => 'required|exists:categorias,id'
        ]);

        $producto = Productos::create([
            ...$validated,
            "user_id" => Auth::id()
        ]);

        if (isset($request->variationsData)) {
            if (!empty($request->variationsData)) {
                $this->save_variations($request->variationsData, $producto->id);
            }
        }

        return redirect()->route("productos.index")->with("id", $producto->id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Productos $producto)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|string|max:255',
            'descripcion' => 'nullable',
            'categoria_id' => 'required|exists:categorias,id'
        ]);

        $variationsIds = Variations::where("producto_id", $producto->id)->select("id")->get();

        $producto->update($validated);
        if (isset($request->variationsData)) {
            if (!empty($request->variationsData)) {
                $idsToRemove = [];
                foreach ($request->variationsData as $variation) {
                    $exists = $variation["id"] < 100000;
                    if ($exists) {
                        Variations::updateOrInsert(['id' => $variation["id"]], ['nombre' => $variation["nombre"], 'opciones' => $variation["opciones"], "producto_id" => $producto->id]);
                    } else {
                        Variations::updateOrInsert(['nombre' => $variation["nombre"], 'opciones' => $variation["opciones"], "producto_id" => $producto->id]);
                    }
                    array_push($idsToRemove, $variation["id"]);
                }
                $filtered = $variationsIds->reject(function ($item) use ($idsToRemove) {
                    return in_array($item->id, $idsToRemove);
                })->values();
                if (count($filtered) > 0) {
                    foreach ($filtered as $variationToRemove) {
                        var_dump($variationToRemove->id);
                        Variations::where("id", $variationToRemove->id)->delete();
                    }
                }
            }
        }

        return redirect()->route("productos.index")->with("id", $producto->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Productos $producto)
    {
        $imagen = str_replace("storage/", "", $producto->imagen);
        Storage::disk("public")->delete($imagen);
        Variations::where('producto_id', $producto->id)->delete();
        $producto->delete();
        return redirect()->route("productos.index")->with("deleted", $producto->id);
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
        $uploadedFile = $request->file('file');
        $manager = new ImageManager(new Driver());
        $imageFile = $manager->read($uploadedFile);
        $encodedImage = $imageFile->toWebp(quality: 80);
        $filename = Str::random(40).".webp";
        Storage::disk('public')->put("productos/" . $filename, $encodedImage->toFilePointer());
        $imagen = "storage/productos/" . $filename;
        Productos::where('id', $id)->update(['imagen' => $imagen]);
        return redirect()->route("productos.index")->with("success", "Producto {$message} satisfactoriamente");
    }

    /**
     * Handle Product Variations
     */

    public function save_variations($variationsData, $product_id)
    {
        foreach ($variationsData as $variation) {
            Variations::updateOrInsert(['nombre' => $variation["nombre"], 'opciones' => $variation["opciones"], "producto_id" => $product_id]);
        }
    }
}
