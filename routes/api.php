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
    'uses' => 'RecipeController@postRecipe',
    'middleware' => 'auth.jwt'
]);

Route::put('/recipe/{id}', [
    'uses' => 'RecipeController@putRecipe',
    'middleware' => 'auth.jwt'
]);

Route::delete('/recipe/{id}', [
    'uses' => 'RecipeController@deleteRecipe',
    'middleware' => 'auth.jwt'
]);

Route::get('/recipe/{id}/comments', [
    'uses' => 'RecipeController@getRecipeComments'
]);

Route::get('/recipe/{id}/ratings', [
    'uses' => 'RecipeController@getRecipeRatings'
]);

Route::get('/recipe/{id}/ingredients', [
    'uses' => 'RecipeController@getRecipeIngredients',
    'middleware' => 'auth.jwt'
]);

Route::post('/recipe/{id}/ingredients/attach', [
    'uses' => 'RecipeController@attachIngredientToRecipe',
    'middleware' => 'auth.jwt'
]);

Route::delete('/recipe/{recipe_id}/ingredient/{ingredient_id}/detach', [
    'uses' => 'RecipeController@detachIngredientFromRecipe',
    'middleware' => 'auth.jwt'
]);

Route::put('/recipe/{id}/update_calories', [
    'uses' => 'RecipeController@updateCalories',
    //'middleware' => 'auth.jwt'
]);
// |--------------------------------------------------------------------------
// | Recipes Routes End
// |--------------------------------------------------------------------------


// |--------------------------------------------------------------------------
// | Users Routes
// |--------------------------------------------------------------------------
Route::get('/users', [
    'uses' => 'UserController@getUsers',
    'middleware' => 'auth.jwt'
]);

Route::get('/user/{id}', [
    'uses' => 'UserController@getUser'
]);

Route::post('/user', [
    'uses' => 'UserController@signup'
]);

Route::post('/user/signin', [
    'uses' => 'UserController@signin'
]);

Route::put('/user/{id}', [
    'uses' => 'UserController@putUser'
]);

Route::delete('/user/{id}', [
    'uses' => 'UserController@deleteUser',
    'middleware' => 'auth.jwt'
]);

Route::get('/user/{id}/details', [
    'uses' => 'UserController@getUserDetails'
]);

Route::put('/user/{id}/detail', [
    'uses' => 'UserController@updateDetails'
]);
// |--------------------------------------------------------------------------
// | Users Routes End
// |--------------------------------------------------------------------------



// |--------------------------------------------------------------------------
// | Ingredients Routes
// |--------------------------------------------------------------------------
Route::get('/ingredients', [
    'uses' => 'IngredientController@getIngredients',
    'middleware' => 'auth.jwt'
]);

Route::get('/ingredient/{id}', [
    'uses' => 'IngredientController@getIngredient'
]);

Route::post('/ingredient', [
    'uses' => 'IngredientController@postIngredient',
    'middleware' => 'auth.jwt'
]);

Route::put('/ingredient/{id}', [
    'uses' => 'IngredientController@putIngredient'
]);

Route::delete('/ingredient/{id}', [
    'uses' => 'IngredientController@deleteIngredient'
]);

Route::get('/ingredient/{id}/recipes', [
    'uses' => 'IngredientController@getIngredientRecipes'
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
    'uses' => 'CommentController@postComment',
    'middleware' => 'auth.jwt'
]);

Route::put('/comment/{id}', [
    'uses' => 'CommentController@putComment',
    'middleware' => 'auth.jwt'
]);

Route::delete('/comment/{id}', [
    'uses' => 'CommentController@deleteComment',
    'middleware' => 'auth.jwt'
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

Route::get('/counts/units', [
    'uses' => 'CountController@getCountsUnits'
]);

Route::get('/count/find/{unit}/{amount}', [
    'uses' => 'CountController@findCountId'
]);

Route::get('/count/unit/{unit}', [
    'uses' => 'CountController@getCountsWithUnit'
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
    'uses' => 'detailController@getDetails'
]);

Route::get('/detail/{id}', [
    'uses' => 'detailController@getDetail'
]);

Route::post('/detail', [
    'uses' => 'detailController@postDetail'
]);

Route::put('/detail/{id}', [
    'uses' => 'detailController@putDetail'
]);

Route::delete('/detail/{id}', [
    'uses' => 'detailController@deleteDetail'
]);

Route::get('/detail/user/{id}', [
    'uses' => 'detailController@getUserDetails'
]);

Route::put('/detail/{id}/eat', [
    'uses' => 'detailController@eatRecipe'
]);
// |--------------------------------------------------------------------------
// | Detail Routes End
// |--------------------------------------------------------------------------


// |--------------------------------------------------------------------------
// | Rating Routes
// |--------------------------------------------------------------------------
Route::get('/ratings', [
    'uses' => 'ratingController@getRatings'
]);

Route::get('/rating/{id}', [
    'uses' => 'ratingController@getRating'
]);

Route::post('/rating', [
    'uses' => 'ratingController@postRating'
]);

Route::put('/rating/{id}', [
    'uses' => 'ratingController@putRating'
]);

Route::delete('/rating/{id}', [
    'uses' => 'ratingController@deleteRating'
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