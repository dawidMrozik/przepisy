<?php
namespace App\Http\Controllers;
use App\Models\Comment;
use Illuminate\Http\Request;
class CommentController extends Controller
{
    public function postComment(Request $request)
    {
        $Comment = new Comment();
        $Comment->content = $request->input('content');
        $Comment->user_id = $request->input('user_id');
        $Comment->recipe_id = $request->input('recipe_id');
        $Comment->save();
        return response()->json(['Comment' => $Comment], 201);
    }

    public function getComments()
    {
        $Comments = Comment::all();

        $response = [
          'Comments' => $Comments
        ];
        return response()->json($response, 200);
    }

    public function getComment($id)
    {
        $Comment = Comment::find($id);
        $response = [
          'Comment' => $Comment
        ];
        return response()->json($response, 200);
    }

    public function putComment(Request $request, $id)
    {
        $Comment = Comment::find($id);
        if (!$Comment) {
            return response()->json(['message' => 'Komentarz nie znaleziony'], 404);
        }
        $Comment->content = $request->input('content');
        $Comment->user_id = $request->input('user_id');
        $Comment->recipe_id = $request->input('recipe_id');
        $Comment->save();
        return response()->json(['Comment' => $Comment], 200);
    }

    public function deleteComment($id)
    {
        $Comment = Comment::find($id);
        $Comment->delete();
        return response()->json(['message' => 'Komentarz pomyślnie usunięty'], 200);
    }
}