import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.interface';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  @Input() ingredient: Ingredient;
  @Input() recipeId: number;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
  }

  onDetachIngredient(ingredient: Ingredient) {
    this.ingredientService.deleteIngredient(this.recipeId, ingredient.id)
      .subscribe(
        (response: Response) => console.log(response['message'])
      );
  }

}
