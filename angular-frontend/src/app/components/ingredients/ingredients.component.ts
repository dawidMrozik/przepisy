import { Component, OnInit, Input } from '@angular/core';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient.interface';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients: Ingredient[];
  @Input() recipeId;
  @Input() userId;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredientService.getRecipeIngredients(this.recipeId)
      .subscribe(
        (response: Response) => this.ingredients = response['RecipeIngredients']
      );
  }

}
