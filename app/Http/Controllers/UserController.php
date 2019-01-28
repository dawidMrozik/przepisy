<?php
namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Detail;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
use Carbon\Carbon;

class UserController extends Controller
{
    public function signup(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        // $Detail = new Detail();
        // $Detail->calories = 0;
        // $Detail->height = 0;
        // $Detail->weight = 0;
        // $Detail->age = 0;
        // $Detail->carbs = 0;
        // $Detail->protein = 0;
        // $Detail->fat = 0;
        // $Detail->date = Carbon\Carbon::now();
        // $Detail->save();

        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role_id' => 2,
        ]);

        $user->save();

        return response()->json([
            'message' => 'Użytkownik dodany pomyślnie!'
        ], 201);
    }

    public function signin(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        
        $credentials = $request->only('email', 'password');

        try {
            if(!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'error' => 'Niepoprawne dane'
                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Nie mogę stworzyć tokenu :('
            ], 500);
        }

        return response()->json([
            'token' => $token
        ], 200);
    }

    public function getUsers()
    {
        $Users = User::all();
        $response = [
          'Users' => $Users
        ];
        return response()->json($response, 200);
    }

    public function getUser($id)
    {
        $User = User::find($id);
        $response = [
          'User' => $User
        ];
        return response()->json($response, 200);
    }

    public function putUser(Request $request, $id)
    {
        $User = User::find($id);
        if (!$User) {
            return response()->json(['message' => 'Użytkownik nie znaleziony'], 404);
        }
        $User->name = $request->input('name');
        $User->email = $request->input('email');
        $User->password = $request->input('password');
        $User->detail_id = $request->input('detail_id');
        $User->role_id = $request->input('role_id');
        $User->save();
        return response()->json(['User' => $User], 200);
    }

    public function deleteUser($id)
    {
        $User = User::find($id);
        $User->delete();
        return response()->json(['message' => 'Uzytkownik pomyślnie usunięty'], 200);
    }

    public function getUserDetails($id)
    {
        $User = User::find($id)->detail;
        $res = [
          'UserDetails' => $User
        ];
        return response()->json($res, 200);
    }

    public function updateDetails(Request $request, $id)
    {
        $User = User::find($id);
        if (!$User) {
            return response()->json(['message' => 'Użytkownik nie znaleziony'], 404);
        }

        $User->detail_id = $request->input('detail_id');
        $User->save();
        return response()->json(['User' => $User], 200);
    }
}