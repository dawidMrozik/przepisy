import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.interface';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { IngredientService } from 'src/app/services/ingredient.service';
import { CountService } from 'src/app/services/count.service';
import { Count } from 'src/app/models/count.interface';
import { NgForm } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  @Input() ingredient: Ingredient;
  @Input() recipe: Recipe;
  @Input() editingIngredients: boolean;
  @Input() recipeCalories: number;
  @Input() isOwner: boolean;
  count: Count;
  loadIngredients: boolean = false;
  editingCount: boolean = false;
  countsAmounts: number[] = [];
  countsUnits: string[];
  foundCountId: number;
  userId: number;

  constructor(
    private ingredientService: IngredientService,
    private countService: CountService,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  ngOnInit() {
    this.countService.getIngredientCount(this.ingredient.count_id)
      .subscribe(
        (response: Response) => {
          this.count = response['Count'];
        },
        (error) => console.log(error),
        () => {
          this.loadIngredients = true;
          this.countService.getCountsUnits()
          .subscribe(
            (response: Response) => {
              this.countsUnits = response['CountsUnits'];
            },
            (error) => console.log(error),
            () => {
              this.authService.getUser()
                .subscribe(
                  (response: Response) => {
                    this.userId = response['User']['id'];
                  }
                )
            }
          )
        }
      )
  }

  onDetachIngredient(ingredient: Ingredient) {
    this.ingredientService.deleteIngredient(this.recipe.id, ingredient.id)
      .subscribe(
        (response: Response) => {
          console.log(response['message']);
        },
        (error) => console.log(error),
        () => {
          this.recipeCalories -= ingredient.calories;
          this.recipeService.updateRecipe(this.recipe.id, this.recipe.title, this.recipe.img_url, this.recipe.description, this.recipe.preparation, this.recipeCalories, this.userId)
            .subscribe()
        }
      );
  }

  onEditCount() {
    this.editingCount = true;
  }

  onSubmit(form: NgForm) {
    this.countService.findCountId(form.value.unit, form.value.amount)
      .subscribe(
        (response: Response) => {
          this.foundCountId = response['Count'][0]['id']
        },
        (error) => console.log(error),
        () => {
          this.recipeCalories -= this.ingredient.calories;
          this.ingredient.calories = form.value.calories;
          this.countService.updateCount(this.foundCountId, this.ingredient)
            .subscribe(
              () => alert("Składnik zaktualizowany"),
              (error) => console.log(error),
              () => {
                this.recipeCalories += this.ingredient.calories;
                this.recipeService.updateRecipe(this.recipe.id, this.recipe.title, this.recipe.img_url, this.recipe.description, this.recipe.preparation, form.value.calories, this.userId)
                  .subscribe()
              }
            )
        }
      )
  }

  onUnitChange(unit: string) {
    this.countsAmounts = [];
    this.countService.getCountsWithUnit(unit)
      .subscribe(
        (response: Response) => {
          response['Counts'].forEach(count => {
            this.countsAmounts.push(count.amount)
          });
        }
      ),
      (error) => console.log(error)
  }
}
