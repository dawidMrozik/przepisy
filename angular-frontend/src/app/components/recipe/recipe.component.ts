import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Rating } from 'src/app/models/rating.interface';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  @Input() recipe: Recipe;
  userName: string = "";
  ratings: Rating[];
  avgRating: number;

  constructor(private authService: AuthService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.authService.getUserById(this.recipe.user_id)
      .subscribe(
        (response: Response) => {
          this.userName = response['User']['email']
        },
        (error) => console.log(error),
        () => {
          this.getRecipeRatings();
        }
      )
  }

  eatRecipe(recipeCalories: number) {
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

  getRecipeRatings() {
    this.recipeService.getRecipeRatings(this.recipe.id)
      .subscribe(
        (response: Response) => {
          this.ratings = response["RecipeRatings"]
          // console.log(this.ratings)
          let sum = 0;
          this.ratings.forEach((rating) => {
            sum += rating.rate;
          })
          this.avgRating = Number((sum / this.ratings.length).toFixed(1));
        }
      ),
      (error) => console.log(error),
      () => {
        
      }
  }

}
