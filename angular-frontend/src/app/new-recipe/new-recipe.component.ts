import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  userId: number;

  constructor(private recipeService: RecipeService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUser()
    .subscribe(
      (response: Response) => {
        this.userId = response['User']['id'];
      }
    );
  }

  onSubmit(form: NgForm) {
    this.recipeService.addRecipe(form.value.title, form.value.img_url, form.value.description, form.value.preparation, this.userId)
      .subscribe(
        () => {
          alert('Przepis dodany! :)');
          this.router.navigate['/przepisy'];
        }
      );
    form.resetForm();
  }
}
