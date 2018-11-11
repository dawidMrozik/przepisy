import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.interface';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeDeleted = new EventEmitter<Recipe>();
  editing: boolean = false;
  titleEditValue: String = '';
  descriptionEditValue: String = '';
  preparationEditValue: String = '';
  imgEditValue: String = '';

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onEdit() {
    this.editing = true;
    this.titleEditValue = this.recipe.title;
    this.descriptionEditValue = this.recipe.description;
    this.preparationEditValue = this.recipe.preparation;
    this.imgEditValue = this.recipe.img_url;
  }

  //TODO: dodaj id zalogowanego użytkownika
  onUpdate() {
    this.recipeService.updateRecipe(this.recipe.id, this.titleEditValue, this.imgEditValue, this.descriptionEditValue, this.preparationEditValue, 1)
      .subscribe(
        (Recipe: Recipe) => {
          this.recipe = Recipe.Recipe;
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
    this.recipeService.deleteRecipe(this.recipe.id)
      .subscribe(
        (res: Response) => {
          this.recipeDeleted.emit(this.recipe);
        }
      );
  }

}
