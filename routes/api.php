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

// |--------------------------------------------------------------------------
// | Recipes Routes
// |--------------------------------------------------------------------------
Route::get('/recipes', [
    'uses' => 'RecipeController@getRecipes'
]);

Route::get('/recipe/{id}', [
    'uses' => 'RecipeController@getRecipe'
]);

Route::post('/recipe', [
    'uses' => 'RecipeController@postRecipe'
]);

Route::put('/recipe/{id}', [
    'uses' => 'RecipeController@putRecipe'
]);

Route::delete('/recipe/{id}', [
    'uses' => 'RecipeController@deleteRecipe'
]);

Route::get('/recipe/{id}/comments', [
    'uses' => 'RecipeController@getRecipeComments'
]);

Route::get('/recipe/{id}/ratings', [
    'uses' => 'RecipeController@getRecipeRatings'
]);

Route::get('/recipe/{id}/ingredients', [
    'uses' => 'RecipeController@getRecipeIngredients'
]);
// |--------------------------------------------------------------------------
// | Recipes Routes End
// |--------------------------------------------------------------------------


// |--------------------------------------------------------------------------
// | Users Routes
// |--------------------------------------------------------------------------
Route::get('/users', [
    'uses' => 'UserController@getUsers'
]);

Route::get('/user/{id}', [
    'uses' => 'UserController@getUser'
]);

Route::post('/user', [
    'uses' => 'UserController@signup'
]);

Route::put('/user/{id}', [
    'uses' => 'UserController@putUser'
]);

Route::delete('/user/{id}', [
    'uses' => 'UserController@deleteUser'
]);

Route::get('/user/{id}/details', [
    'uses' => 'UserController@getUserDetails'
]);
// |--------------------------------------------------------------------------
// | Users Routes End
// |--------------------------------------------------------------------------



// |--------------------------------------------------------------------------
// | Ingredients Routes
// |--------------------------------------------------------------------------
Route::get('/ingredients', [
    'uses' => 'IngredientController@getIngredients'
]);

Route::get('/ingredient/{id}', [
    'uses' => 'IngredientController@getIngredient'
]);

Route::post('/ingredient', [
    'uses' => 'IngredientController@postIngredient'
]);

Route::put('/ingredient/{id}', [
    'uses' => 'IngredientController@putIngredient'
]);

Route::delete('/ingredient/{id}', [
    'uses' => 'IngredientController@deleteIngredient'
]);

Route::get('/ingredient/{id}/count', [
    'uses' => 'IngredientController@getIngredientsCount'
]);
// |--------------------------------------------------------------------------
// | Ingredients Routes End
// |--------------------------------------------------------------------------

// |--------------------------------------------------------------------------
// | Comments Routes
// |--------------------------------------------------------------------------
Route::get('/comments', [
    'uses' => 'CommentController@getComments'
]);

Route::get('/comment/{id}', [
    'uses' => 'CommentController@getComment'
]);

Route::post('/comment', [
    'uses' => 'CommentController@postComment'
]);

Route::put('/comment/{id}', [
    'uses' => 'CommentController@putComment'
]);

Route::delete('/comment/{id}', [
    'uses' => 'CommentController@deleteComment'
]);
// |--------------------------------------------------------------------------
// | Comments Routes End
// |--------------------------------------------------------------------------

// |--------------------------------------------------------------------------
// | Count Routes
// |--------------------------------------------------------------------------
Route::get('/counts', [
    'uses' => 'CountController@getCounts'
]);

Route::get('/count/{id}', [
    'uses' => 'CountController@getCount'
]);

Route::post('/count', [
    'uses' => 'CountController@postCount'
]);

Route::put('/count/{id}', [
    'uses' => 'CountController@putCount'
]);

Route::delete('/count/{id}', [
    'uses' => 'CountController@deleteCount'
]);
// |--------------------------------------------------------------------------
// | Count Routes End
// |--------------------------------------------------------------------------

// |--------------------------------------------------------------------------
// | Detail Routes
// |--------------------------------------------------------------------------
Route::get('/details', [
    'uses' => 'detailController@getdetails'
]);

Route::get('/detail/{id}', [
    'uses' => 'detailController@getdetail'
]);

Route::post('/detail', [
    'uses' => 'detailController@postdetail'
]);

Route::put('/detail/{id}', [
    'uses' => 'detailController@putdetail'
]);

Route::delete('/detail/{id}', [
    'uses' => 'detailController@deletedetail'
]);
// |--------------------------------------------------------------------------
// | Detail Routes End
// |--------------------------------------------------------------------------


// |--------------------------------------------------------------------------
// | Rating Routes
// |--------------------------------------------------------------------------
Route::get('/ratings', [
    'uses' => 'ratingController@getratings'
]);

Route::get('/rating/{id}', [
    'uses' => 'ratingController@getrating'
]);

Route::post('/rating', [
    'uses' => 'ratingController@postrating'
]);

Route::put('/rating/{id}', [
    'uses' => 'ratingController@putrating'
]);

Route::delete('/rating/{id}', [
    'uses' => 'ratingController@deleterating'
]);
// |--------------------------------------------------------------------------
// | Rating Routes End
// |--------------------------------------------------------------------------


// |--------------------------------------------------------------------------
// | Role Routes
// |--------------------------------------------------------------------------
Route::get('/roles', [
    'uses' => 'roleController@getroles'
]);

Route::get('/role/{id}', [
    'uses' => 'roleController@getrole'
]);

Route::post('/role', [
    'uses' => 'roleController@postrole'
]);

Route::put('/role/{id}', [
    'uses' => 'roleController@putrole'
]);

Route::delete('/role/{id}', [
    'uses' => 'roleController@deleterole'
]);
// |--------------------------------------------------------------------------
// | Role Routes End
// |--------------------------------------------------------------------------