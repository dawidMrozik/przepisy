import { Component, OnInit, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.interface';
import { IngredientService } from 'src/app/services/ingredient.service';
import { CountService } from 'src/app/services/count.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  userId: number;
  newIngredient: boolean;
  ingredients: Ingredient[];
  recipeIngredients: Ingredient[] = [];
  newRecipeId: number;
  sumOfIngredientCalories: number = 0;
  countsAmounts: number[] = [];
  countsUnits: string[];

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService, 
    private router: Router,
    private ingredientService: IngredientService
    ) { }

  ngOnInit() {
    this.authService.getUser()
    .subscribe(
      (response: Response) => {
        this.userId = response['User']['id'];
      }
    );

    this.ingredientService.getIngredients()
      .subscribe(
        (response: Response) => this.ingredients = response['Ingredients']
      );
  }

  onAddIngredients() {
    this.newIngredient = true;
  }

  onAddIngredient(ingredient: Ingredient, index: number) {
    this.recipeIngredients.push(ingredient);
    this.ingredients.splice(index, 1);
    this.sumOfIngredientCalories += ingredient.calories;
  }

  onSubmit(form: NgForm) {
    this.recipeService.addRecipe(form.value.title, form.value.img_url, form.value.description, form.value.preparation, this.sumOfIngredientCalories ,this.userId)
      .subscribe(
        (response: Response) => {
          this.newRecipeId = response['Recipe']['id'];
        },
        (error) => console.log(error),
        () => {
          this.ingredientService.attachIngredient(this.recipeIngredients, this.newRecipeId)
            .subscribe(
              (response: Response) => console.log(response),
              (error) => console.log(error),
              () => {
                this.router.navigate(['/przepis/' + this.newRecipeId]);
              }
            );
        }
      );
  }
}
