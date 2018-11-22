import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Ingredient } from '../models/ingredient.interface';
import { RecipeComponent } from '../components/recipe/recipe.component';

@Injectable()
export class IngredientService {
  token: String;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = authService.getToken();
  }

  getRecipeIngredients(recipeId: number) {
    return this.http.get('http://przepisy.test/api/recipe/' + recipeId + '/ingredients?token=' + this.token);
  }

  getIngredients() {
    return this.http.get('http://przepisy.test/api/ingredients?token=' + this.token);
  }

  //TODO: Count id to implement
  attachIngredient(ingredients: Ingredient[], recipe_id: number) {
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    const body = {
      ingredients: ingredients.map(ing => ing.id),
      recipe_id: recipe_id
    }
    
    return this.http.post('http://przepisy.test/api/recipe/' + recipe_id + '/ingredients/attach?token=' + this.token, body, {headers: headers});
  }

  addIngredient(name: string, carbs: number, proteins: number, fats: number, calories: number, count_id: number) {
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    const body = {
      name: name,
      carbs: carbs,
      proteins: proteins,
      fats: fats,
      calories: calories,
      count_id: count_id
    }

    return this.http.post('http://przepisy.test/api/ingredient?token=' + this.token, body, {headers: headers});
  }

  deleteIngredient(recipe_id: number, ingredient_id: number) {
      return this.http.delete('http://przepisy.test/api/recipe/' + recipe_id + '/ingredient/' + ingredient_id + '/detach?token=' + this.token);
  }
}
