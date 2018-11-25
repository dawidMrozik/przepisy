import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  @Input() recipe: Recipe;
  userName: string = "";

  constructor(private authService: AuthService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.authService.getUserById(this.recipe.user_id)
      .subscribe(
        (response: Response) => {
          this.userName = response['User']['email']
        }
      )
  }

  eatRecipe(recipeCalories: number) {
    console.log('wywołane');
    this.recipeService.eatRecipe(recipeCalories)
      .subscribe(
        (response: Response) => console.log(response),
        (error) => console.log(error),
        () => {
          alert("Danie zjedzone, sprawdź dashboard :)");
          location.reload();
        }
      )
  }

}
