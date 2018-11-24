<?php
namespace App\Http\Controllers;
use App\Models\Detail;
use Illuminate\Http\Request;
class DetailController extends Controller
{
    public function postDetail(Request $request)
    {
        $Detail = new Detail();
        $Detail->calories = $request->input('amount');
        $Detail->height = $request->input('unit');
        $Detail->weight = $request->input('ingredient_id');
        $Detail->age = $request->input('age');
        $Detail->carbs = $request->input('carbs');
        $Detail->protein = $request->input('protein');
        $Detail->fat = $request->input('fat');
        $Detail->date = $request->input('date');
        $Detail->user_id = $request->input('user_id');
        $Detail->save();
        return response()->json(['Detail' => $Detail], 201);
    }

    public function getDetails()
    {
        $Details = Detail::all();

        $response = [
          'Details' => $Details
        ];
        return response()->json($response, 200);
    }

    public function getDetail($id)
    {
        $Detail = Detail::find($id);
        $response = [
          'Detail' => $Detail
        ];
        return response()->json($response, 200);
    }

    public function putDetail(Request $request, $id)
    {
        $Detail = Detail::find($id);
        if (!$Detail) {
            return response()->json(['message' => 'Szczegóły użytkonwika nie znalezione'], 404);
        }
        $Detail->calories = $request->input('calories');
        $Detail->height = $request->input('height');
        $Detail->weight = $request->input('weight');
        $Detail->age = $request->input('age');
        $Detail->carbs = $request->input('carbs');
        $Detail->protein = $request->input('protein');
        $Detail->fat = $request->input('fat');
        $Detail->date = date("Y-m-d H:i:s");
        $Detail->save();
        return response()->json(['Detail' => $Detail], 200);
    }

    public function deleteDetail($id)
    {
        $Detail = Detail::find($id);
        $Detail->delete();
        return response()->json(['message' => 'Szczegóły użytkonwika pomyślnie usunięta'], 200);
    }

    public function getUserDetails($id)
    {
        $Detail = Detail::find($id)->user;

        if (!$Detail) {
            return response()->json(['message' => 'Szczegóły użytkonwika nie znalezione'], 404);
        }

        $response = [
            'UserDetails' => $Detail
        ];
        
        return response()->json($response, 200);
    }
}