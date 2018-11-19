<?php
namespace App\Http\Controllers;
use App\Models\Recipe;
use Illuminate\Http\Request;
use JWTAuth;

class RecipeController extends Controller
{
    public function postRecipe(Request $request)
    {
        // Dostanie się do zalogowanego usera. Będzie istniał bo middleware to sprawdził
        //$user = JWTAuth::parseToken()->toUser();

        $Recipe = new Recipe();
        $Recipe->title = $request->input('title');
        $Recipe->img_url = $request->input('img_url');
        $Recipe->description = $request->input('description');
        $Recipe->preparation = $request->input('preparation');
        $Recipe->calories = $request->input('calories');
        $Recipe->user_id = $request->input('user_id');
        $Recipe->save();
        return response()->json(['Recipe' => $Recipe], 201);
    }

    public function getRecipes()
    {
        $Recipes = Recipe::all();

        $response = [
          'Recipes' => $Recipes
        ];
        return response()->json($response, 200);
    }

    public function getRecipe($id)
    {
        $Recipe = Recipe::find($id);
        $response = [
          'Recipe' => $Recipe
        ];
        return response()->json($response, 200);
    }

    public function putRecipe(Request $request, $id)
    {
        $Recipe = Recipe::find($id);
        if (!$Recipe) {
            return response()->json(['message' => 'Przepis nie znaleziony'], 404);
        }
        $Recipe->title = $request->input('title');
        $Recipe->img_url = $request->input('img_url');
        $Recipe->description = $request->input('description');
        $Recipe->preparation = $request->input('preparation');
        $Recipe->calories = $request->input('calories');
        $Recipe->user_id = $request->input('user_id');
        $Recipe->save();
        return response()->json(['Recipe' => $Recipe], 200);
    }

    public function deleteRecipe($id)
    {
        $Recipe = Recipe::find($id);
        $Recipe->ingredients()->detach();
        $Recipe->delete();
        return response()->json(['message' => 'Przepis pomyślnie usunięty'], 200);
    }

    public function getRecipeComments($id)
    {
        $comments = Recipe::find($id)->comments;
        $response = [
          'RecipeComments' => $comments
        ];
        return response()->json($response, 200);
    }

    public function getRecipeRatings($id)
    {
        $ratings = Recipe::find($id)->ratings;
        $response = [
          'RecipeRatings' => $ratings
        ];
        return response()->json($response, 200);
    }

    public function getRecipeIngredients($id)
    {
        $ingredients = Recipe::find($id)->ingredients()->get();
        $response = [
          'RecipeIngredients' => $ingredients
        ];
        return response()->json($response, 200);
    }

    public function attachIngredientToRecipe(Request $request, $id)
    {
        $ingredients = $request->input('ingredients');
        $recipe_id = $request->input('recipe_id');
        $recipe = Recipe::find($id);

        foreach($ingredients as $ingredient)
        {
            $recipe->ingredients()->attach($ingredient);
        }

        $response = [
            'message' => 'Składniki dodane'
        ];

        return response()->json($response, 200);
    }

    public function detachIngredientFromRecipe($recipe_id, $ingredient_id)
    {
        $recipe = Recipe::find($recipe_id);
        $recipe->ingredients()->detach($ingredient_id);

        return response()->json([ 'message' => 'Składnik odłączony' ], 200);
    }
}