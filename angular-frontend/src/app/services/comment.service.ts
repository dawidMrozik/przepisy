import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class CommentService {
  token: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  getComments(recipeId: number) {
    return this.http.get('http://przepisy.test/api/recipe/' + recipeId + '/comments');
  }

  addComment(commentContent: string, commentUserId: number, commentRecipeId: number) {
  const body = JSON.stringify({
    content: commentContent,
    recipe_id: commentRecipeId,
    user_id: commentUserId
  });

  const headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.http.post('http://przepisy.test/api/comment?token=' + this.token, body, {headers: headers});
  }

  updateComment(commentId: number, commentContent: string, commentUserId: number, commentRecipeId: number) {
    const body = JSON.stringify({
      id: commentId,
      content: commentContent,
      user_id: commentUserId,
      recipe_id: commentRecipeId,
  });
  const headers = new HttpHeaders({"Content-Type": "application/json"});
  return this.http.put('http://przepisy.test/api/comment/' + commentId +'?token=' + this.token, body, { headers: headers });
  }

  deleteComment(commentId: number) {
    return this.http.delete('http://przepisy.test/api/comment/' + commentId + '?token=' + this.token);
  }
}
