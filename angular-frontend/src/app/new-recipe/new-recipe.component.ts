import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  //TODO: Dodaj user id zalogowanego użytkownika
  onSubmit(form: NgForm) {
    this.recipeService.addRecipe(form.value.title, form.value.img_url, form.value.description, form.value.preparation, 1)
      .subscribe(
        () => alert('Przepis dodany! :)')
      );
    form.resetForm();
  }
}
