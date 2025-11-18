<?php

namespace App\Http\Controllers;

use Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    /*
    * Display home page
    */
    public function index()
    {
        $user = Auth::user();
        return Inertia::render("Home/Index", [
            "user" => $user
        ]);
    }
}
