<?php
namespace App\Http\Controllers;
use App\Models\Ingredient;
use Illuminate\Http\Request;
class IngredientController extends Controller
{
    public function postIngredient(Request $request)
    {
        $Ingredient = new Ingredient();
        $Ingredient->name = $request->input('name');
        $Ingredient->carbs = $request->input('carbs');
        $Ingredient->protein = $request->input('protein');
        $Ingredient->fat = $request->input('fat');
        $Ingredient->calories = $request->input('calories');
        $Ingredient->count_id = $request->input('count_id');
        $Ingredient->recipe_id = $request->input('recipe_id');
        $Ingredient->save();
        return response()->json(['Ingredient' => $Ingredient], 201);
    }

    public function getIngredients()
    {
        $Ingredients = Ingredient::all();

        $response = [
          'Ingredients' => $Ingredients
        ];
        return response()->json($response, 200);
    }

    public function getIngredient($id)
    {
        $Ingredient = Ingredient::find($id);
        $response = [
          'Ingredient' => $Ingredient
        ];
        return response()->json($response, 200);
    }

    public function putIngredient(Request $request, $id)
    {
        $Ingredient = Ingredient::find($id);
        if (!$Ingredient) {
            return response()->json(['message' => 'Składnik nie znaleziony'], 404);
        }
        $Ingredient->name = $request->input('name');
        $Ingredient->carbs = $request->input('carbs');
        $Ingredient->protein = $request->input('protein');
        $Ingredient->fat = $request->input('fat');
        $Ingredient->calories = $request->input('calories');
        $Ingredient->count_id = $request->input('count_id');
        $Ingredient->recipe_id = $request->input('recipe_id');
        $Ingredient->save();
        return response()->json(['Ingredient' => $Ingredient], 200);
    }

    public function deleteIngredient($id)
    {
        $Ingredient = Ingredient::find($id);
        $Ingredient->delete();
        return response()->json(['message' => 'Składnik pomyślnie usunięty'], 200);
    }

    public function getIngredientCount($id)
    {
        $count = Ingredient::find($id)->count;
        $response = [
          'IngredientCount' => $count
        ];
        return response()->json($response, 200);
    }
}