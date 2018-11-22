import { Component, OnInit, Input } from '@angular/core';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient.interface';
import { CountService } from 'src/app/services/count.service';
import { Recipe } from 'src/app/models/recipe.interface';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients: Ingredient[];
  @Input() recipe: Recipe;
  @Input() userId;
  @Input() editingIngredients;
  @Input() isOwner: boolean;
  recipeCalories: number = 0;

  constructor(private ingredientService: IngredientService, private countService: CountService) { }

  ngOnInit() {
    this.ingredientService.getRecipeIngredients(this.recipe.id)
      .subscribe(
        (response: Response) => this.ingredients = response['RecipeIngredients'],
        (error) => console.log(error),
        () => {
          this.ingredients.forEach((ingredient: Ingredient) => {
            this.recipeCalories += ingredient.calories;
          });
        }
      );
  }

}
