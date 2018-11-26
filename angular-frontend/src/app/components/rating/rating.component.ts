import { Component, OnInit, Input } from '@angular/core';
import { Rating } from 'src/app/models/rating.interface';
import { RecipeService } from 'src/app/services/recipe.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() recipe_id: number;
  @Input() userId: number;
  ratings: Rating[];
  avgRating: number;
  doesUserRated: boolean;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.getRecipeRatings();
  }

  getRecipeRatings() {
    this.recipeService.getRecipeRatings(this.recipe_id)
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

  onRate(form: NgForm) {
    let usersRatings = this.ratings.map((value: Rating) => {
      return value.user_id;
    });

    let rating_id;
    let doesUserRated = usersRatings.includes(this.userId)

    if(doesUserRated) {
      this.ratings.forEach((rating: Rating) => {
        if(rating.user_id == this.userId) {
          rating_id = rating.id;
        }
      })
      this.recipeService.updateRating(rating_id, this.recipe_id, this.userId, form.value.rate)
        .subscribe(
          (response: Response) => console.log(response['Rating']),
          (error) => console.log(error),
          () => {
            alert("Dziękujemy za ocenę :)");
            this.getRecipeRatings();
          }
        )
      
    } else {
      this.recipeService.addRating(this.recipe_id, this.userId, form.value.rate)
        .subscribe(
          (response: Response) => console.log(response["Rating"]),
          (error) => console.log(error),
          () => {
            alert("Dziękujemy za ocenę :)");
            this.getRecipeRatings();
          }
        )
    }
  }

}
