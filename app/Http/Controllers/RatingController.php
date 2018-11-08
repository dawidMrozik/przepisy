<?php
namespace App\Http\Controllers;
use App\Models\Rating;
use Illuminate\Http\Request;
class RatingController extends Controller
{
    public function postRating(Request $request)
    {
        $Rating = new Rating();
        $Rating->rate = $request->input('rate');
        $Rating->isRated = $request->input('isRated');
        $Rating->recipe_id = $request->input('recipe_id');
        $Rating->user_id = $request->input('user_id');
        $Rating->save();
        return response()->json(['Rating' => $Rating], 201);
    }

    public function getRatings()
    {
        $Ratings = Rating::all();

        $response = [
          'Ratings' => $Ratings
        ];
        return response()->json($response, 200);
    }

    public function getRating($id)
    {
        $Rating = Rating::find($id);
        $response = [
          'Rating' => $Rating
        ];
        return response()->json($response, 200);
    }

    public function putRating(Request $request, $id)
    {
        $Rating = Rating::find($id);
        if (!$Rating) {
            return response()->json(['message' => 'Ocena nie znaleziona'], 404);
        }
        $Rating->rate = $request->input('rate');
        $Rating->isRated = $request->input('isRated');
        $Rating->recipe_id = $request->input('recipe_id');
        $Rating->user_id = $request->input('user_id');
        $Rating->save();
        return response()->json(['Rating' => $Rating], 200);
    }

    public function deleteRating($id)
    {
        $Rating = Rating::find($id);
        $Rating->delete();
        return response()->json(['message' => 'Ocena pomyślnie usunięta'], 200);
    }
}