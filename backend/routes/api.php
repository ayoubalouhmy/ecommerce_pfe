<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Test de connexion (route publique)
Route::get('/ping', function () {
    return response()->json([
        'status'  => 'success',
        'message' => '✅ Connexion Backend Laravel OK !',
        'time'    => now()->toDateTimeString(),
    ]);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
