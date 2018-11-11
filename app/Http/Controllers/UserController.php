<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
class UserController extends Controller
{
    public function signup(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        $user = new User([
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role_id' => 2
        ]);

        $user->save();
        return response()->json([
            'message' => 'Użytkownik dodany pomyślnie!'
        ], 201);
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
        $response = [
          'User' => $User
        ];
        return response()->json($response, 200);
    }
}