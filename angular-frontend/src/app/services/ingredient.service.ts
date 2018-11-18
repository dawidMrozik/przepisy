import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class IngredientService {
  token: String;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = authService.getToken();
  }

  getRecipeIngredients(recipeId: number) {
    return this.http.get('http://przepisy.test/api/recipe/' + recipeId + '/ingredients?token=' + this.token);
  }
}
