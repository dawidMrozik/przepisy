<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class UserController extends Controller
{
    public function signup(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);
        
        // Role i detale do implementacji
        $user = new User([
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role_id' => 2,
            'detail_id' => 0
        ]);

        $user->save();
        return $response()->json([
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
          'User' => $User
        ];
        return response()->json($res, 200);
    }
}