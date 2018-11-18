import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../models/recipe.interface';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  isOwner: Boolean;
  userId: number;
  loadComments: boolean = false;
  loadIngredients: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.recipeService.getRecipe(this.route.snapshot.params['id'])
      .subscribe(
        (recipe: Recipe) => this.recipeDetails = recipe['Recipe']
      );
    
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

  private checkIfOnwer() {
    this.recipeDetails.user_id == this.userId ? this.isOwner = true : this.isOwner = false;
  }

  onEdit() {
    this.editing = true;
    this.titleEditValue = this.recipeDetails.title;
    this.descriptionEditValue = this.recipeDetails.description;
    this.preparationEditValue = this.recipeDetails.preparation;
    this.imgEditValue = this.recipeDetails.img_url;
  }

  //TODO: dodaj id zalogowanego użytkownika
  onUpdate() {
    this.recipeService.updateRecipe(this.recipeDetails.id, this.titleEditValue, this.imgEditValue, this.descriptionEditValue, this.preparationEditValue, this.userId)
      .subscribe(
        (Recipe: Recipe) => {
          this.recipeDetails = Recipe.Recipe;
          this.titleEditValue = '';
          this.descriptionEditValue = '';
          this.preparationEditValue = '';
          this.imgEditValue = '';
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
}
