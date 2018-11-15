import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.interface';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private authService: AuthService) { }

  ngOnInit() {
  }

  onGetRecipes() {
    this.recipeService.getRecipes()
      .subscribe(
        (recipes: Recipe) => this.recipes = recipes['Recipes']);
  }

  onDeleted(recipe: Recipe) {
    const position = this.recipes.findIndex(
      (recipeEl: Recipe) => {
        return recipeEl.id == recipe.id;
      }
    );
    this.recipes.splice(position, 1);
    }
}
