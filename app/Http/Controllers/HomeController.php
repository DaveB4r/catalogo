<?php

namespace App\Http\Controllers;

use Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /*
    * Display home page
    */
    public function index()
    {
        $user = Auth::user();
        $catalogos = DB::table("users")->select("name", "avatar")->limit(7)->orderBy("id", "Desc")->get();
        return Inertia::render("Home/Index", [
            "user" => $user,
            "catalogos" => $catalogos
        ]);
    }
}
