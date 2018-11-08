<?php
namespace App\Http\Controllers;
use App\Models\Role;
use Illuminate\Http\Request;
class RoleController extends Controller
{
    public function postRole(Request $request)
    {
        $Role = new Role();
        $Role->role = $request->input('role');
        $Role->save();
        return response()->json(['Role' => $Role], 201);
    }

    public function getRoles()
    {
        $Roles = Role::all();

        $response = [
          'Roles' => $Roles
        ];
        return response()->json($response, 200);
    }

    public function getRole($id)
    {
        $Role = Role::find($id);
        $response = [
          'Role' => $Role
        ];
        return response()->json($response, 200);
    }

    public function putRole(Request $request, $id)
    {
        $Role = Role::find($id);
        if (!$Role) {
            return response()->json(['message' => 'Rola nie znaleziona'], 404);
        }
        $Role->role = $request->input('role');
        $Role->save();
        return response()->json(['Role' => $Role], 200);
    }

    public function deleteRole($id)
    {
        $Role = Role::find($id);
        $Role->delete();
        return response()->json(['message' => 'Rola pomyślnie usunięta'], 200);
    }
}