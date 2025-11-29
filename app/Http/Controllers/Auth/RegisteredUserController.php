<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Categorias;
use App\Models\Productos;
use App\Models\User;
use App\Models\Variations;
use Auth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Str;

class RegisteredUserController extends Controller
{
    public function index()
    {
        $id = Auth::id();
        if ($id !== 1)
            return redirect()->route("productos.index");
        $usuarios = DB::table("users")->leftJoin("productos", "productos.user_id", "=", "users.id")->select("users.id", "name", "email", "phone", "users.created_at as date_creation", "activo", DB::raw("Count(productos.id) as cantidad_productos"))->groupBy("users.id")->orderBy("cantidad_productos", "desc")->get();
        return Inertia::render('auth/admin', [
            "usuarios" => $usuarios,
            "flash" => [
                "success_user" => session("success_user"),
                "error_user" => session("error_user")
            ]
        ]);
    }
    /**
     * Show the registration page.
     */
    public function create()
    {
        $id = Auth::id();
        if ($id !== 1)
            return redirect()->route("productos.index");
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'nullable|string|max:255'
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone
        ]);
        $this->avatar($request, $user->id);

        event(new Registered($user));

        // Auth::login($user);

        return redirect()->route("admin_catalogo")->with("success_user", "Catalogo creado satisfactoriamente");
    }

    public function update(Request $request, Int $id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:255'
        ]);

        User::where("id", $id)->update($validated);

        return redirect()->route("admin_catalogo")->with("success_user", "Catalogo editado satisfactoriamente");
    }

    /**
     * Handle user status
     */

    public function updateStatus(Request $request, Int $id)
    {
        User::where('id', $id)->update(['activo' => $request->status]);
    }

    /**
     * Handle Avatar
     */

    public function avatar(Request $request, Int $id)
    {
        $user = User::select("avatar")->find($id);
        if (isset($user->avatar)) {
            $imagen = str_replace("storage/", "", $user->avatar);
            Storage::disk("public")->delete($imagen);
        }
        $uploadedFile = $request->file("file");
        $manager = new ImageManager(new Driver());
        $imageFile = $manager->read($uploadedFile);
        $encodedImage = $imageFile->toWebp(quality: 80);
        $filename = Str::random(40) . ".webp";
        Storage::disk('public')->put("avatars/" . $filename, $encodedImage->toFilePointer());
        $imagen = "storage/avatars/" . $filename;
        User::where('id', $id)->update(['avatar' => $imagen]);
    }

    public function destroy(Int $id)
    {
        $user = User::find($id);
        // elimino la imagen de perfil
        if (isset($user->avatar)) {
            $imagen = str_replace("storage/", "", $user->avatar);
            Storage::disk("public")->delete($imagen);
        }
        // elimino productos
        $productos = Productos::where("user_id", $user->id)->get();
        if (count($productos) > 0) {
            foreach ($productos as $producto) {
                if (isset($producto->imagen)) {
                    $imagen = str_replace("storage/", "", $producto->imagen);
                    Storage::disk("public")->delete($imagen);
                }
                Variations::where("producto_id", $producto->id)->delete();
                $producto->delete();
            }
        }
        // elimino categorias
        Categorias::where("user_id", $user->id)->delete();
        $user->delete();
        return redirect()->route("admin_catalogo")->with("success_user", "Catalogo Eliminado satisfactoriamente");
    }
}
