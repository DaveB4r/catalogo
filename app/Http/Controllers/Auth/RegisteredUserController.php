<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
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
        $usuarios = DB::table("users")->leftJoin("productos", "productos.user_id", "=", "users.id")->select("users.id", "name", "email", "phone", DB::raw("Count(productos.id) as cantidad_productos"))->groupBy("users.id")->orderBy("cantidad_productos", "desc")->get();
        return Inertia::render('auth/admin', [
            "usuarios" => $usuarios
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

        return redirect()->route("register");
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
}
