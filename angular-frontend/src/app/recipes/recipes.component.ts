import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.interface';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onGetRecipes() {
    this.recipeService.getRecipes()
      .subscribe(response => this.recipes = response.Recipes);
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
