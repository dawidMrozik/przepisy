<?php

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\User;
use App\Models\Ingredient;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/recipe/{id}/comments', function($id) {
    return Recipe::find($id)->comments;
});

Route::get('/recipe/{id}/ingredients', function($id) {
    return Recipe::find($id)->ingredients;
});

Route::get('/recipe/{id}/ratings', function($id) {
    return Recipe::find($id)->ratings;
});

Route::get('/user/{id}', function($id) {
    return User::find($id);
});

Route::get('/user/{id}/detail', function($id) {
    return User::find($id)->detail;
});

Route::get('/ingredient/{id}/count', function($id) {
    return Ingredient::find($id)->count;
});