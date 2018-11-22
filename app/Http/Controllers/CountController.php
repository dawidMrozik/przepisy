<?php
namespace App\Http\Controllers;
use App\Models\Count;
use Illuminate\Http\Request;
class CountController extends Controller
{
    public function postCount(Request $request)
    {
        $Count = new Count();
        $Count->amount = $request->input('amount');
        $Count->unit = $request->input('unit');
        $Count->ingredient_id = $request->input('ingredient_id');
        $Count->save();
        return response()->json(['Count' => $Count], 201);
    }

    public function getCounts()
    {
        $Counts = Count::all();

        $response = [
          'Counts' => $Counts
        ];
        return response()->json($response, 200);
    }

    public function getCountsUnits()
    {
        $Counts = Count::distinct('unit')->pluck('unit');

        $response = [
          'CountsUnits' => $Counts
        ];
        return response()->json($response, 200);
    }

    public function getCountsWithUnit($unit)
    {
        $Counts = Count::where('unit', $unit)->get();

        if(!$Counts) {
            return response()->json([
                'message' => 'Jednostka nie znaleziona'
            ], 200);
        }

        $response = [
            'Counts' => $Counts
        ];

        return response()->json($response, 200);
    }

    public function getCount($id)
    {
        $Count = Count::find($id);
        $response = [
          'Count' => $Count
        ];
        return response()->json($response, 200);
    }

    public function putCount(Request $request, $id)
    {
        $Count = Count::find($id);
        if (!$Count) {
            return response()->json(['message' => 'Miara nie znaleziona'], 404);
        }
        $Count->amount = $request->input('amount');
        $Count->unit = $request->input('unit');
        $Count->ingredient_id = $request->input('ingredient_id');
        $Count->save();
        return response()->json(['Count' => $Count], 200);
    }

    public function deleteCount($id)
    {
        $Count = Count::find($id);
        $Count->delete();
        return response()->json(['message' => 'Miara pomyślnie usunięta'], 200);
    }

    public function findCountId($unit, $amount)
    {
        $Count = Count::where('unit', $unit)->where('amount', $amount)->get();

        if (!$Count) {
            return response()->json(['message' => 'Miara nie znaleziona'], 404);
        }

        return response()->json(['Count' => $Count], 200);
    }
}