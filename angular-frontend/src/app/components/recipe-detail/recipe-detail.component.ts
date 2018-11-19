import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../models/recipe.interface';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient.interface';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetails: Recipe;
  editing: boolean = false;
  titleEditValue: String = '';
  descriptionEditValue: String = '';
  preparationEditValue: String = '';
  imgEditValue: String = '';
  caloriesEditValue: number;
  isOwner: Boolean;
  userId: number;
  loadComments: boolean = false;
  loadIngredients: boolean = false;
  loadComponent: boolean = false;
  ingredients: Ingredient[] = [];
  editingIngredients: boolean = false;
  recipeIngredients: Ingredient[] = [];
  editRecipeIngredients: Ingredient[] = [];
  addExistingIngredient: boolean = false;
  sumOfIngredientCalories: number = 0;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.recipeService.getRecipe(this.route.snapshot.params['id'])
      .subscribe(
        (recipe: Recipe) => this.recipeDetails = recipe['Recipe'],
        (error) => console.log(error),
        () => {
          this.loadComponent = true;
          this.authService.getUser()
          .subscribe(
            (response: Response) => {
              this.userId = response['User']['id'];
              this.checkIfOnwer();
            },
            error => console.log(error),
            () => {
              this.loadComments = true;
              this.loadIngredients = true;
            }
          );
        }
      );
  }

  private checkIfOnwer() {
    this.recipeDetails.user_id == this.userId ? this.isOwner = true : this.isOwner = false;
  }

  onEdit() {
    this.editing = true;
    this.titleEditValue = this.recipeDetails.title;
    this.descriptionEditValue = this.recipeDetails.description;
    this.preparationEditValue = this.recipeDetails.preparation;
    this.imgEditValue = this.recipeDetails.img_url;
    this.caloriesEditValue = this.recipeDetails.calories;
  }

  onEditIngredients() {
    this.editingIngredients = true;
    this.ingredientService.getRecipeIngredients(this.recipeDetails.id)
      .subscribe(
        (response: Response) => {
          this.editRecipeIngredients = response['RecipeIngredients'];
        }
      )
  }

  onCancelEditIngredients() {
    this.editingIngredients = false;
  }
  
  onDeleteIngredient(ingredient_id: number) {
    this.ingredientService.deleteIngredient(this.recipeDetails.id, ingredient_id)
      .subscribe(
        (response: Response) => console.log(response['message'])
      )
  }

  onUpdate() {
    this.recipeService.updateRecipe(this.recipeDetails.id, this.titleEditValue, this.imgEditValue, this.descriptionEditValue, this.preparationEditValue, this.caloriesEditValue, this.userId)
      .subscribe(
        (Recipe: Recipe) => {
          this.recipeDetails = Recipe.Recipe;
          this.titleEditValue = '';
          this.descriptionEditValue = '';
          this.preparationEditValue = '';
          this.imgEditValue = '';
        },
        (error) => console.log(error),
        () => {
          this.ingredientService.attachIngredient(this.recipeIngredients, this.recipeDetails.id)
            .subscribe(
              (response: Response) => console.log(response['message'])
            )
        }
      );
    this.editing = false;
  }

  onCancel() {
    this.editing = false;
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipeDetails.id)
      .subscribe(
        () => {
          this.router.navigate(['/']);
        }
      );
  }

  onAddExistingIngredient() {
    this.addExistingIngredient = true;
    this.ingredientService.getIngredients()
      .subscribe(
        (response: Response) => this.ingredients = response['Ingredients']
      )
  }

  onAddIngredient(ingredient: Ingredient, index: number) {
    this.recipeIngredients.push(ingredient);
    this.editRecipeIngredients.push(ingredient);
    this.ingredients.splice(index, 1);
    this.sumOfIngredientCalories += ingredient.calories;
  }

  onDeleteEditIngredient(index: number) {
    this.sumOfIngredientCalories -= this.recipeIngredients[index].calories;
    this.recipeIngredients.splice(index, 1);
  }
}
