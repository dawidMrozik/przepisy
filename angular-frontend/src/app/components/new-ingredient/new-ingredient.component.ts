import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.interface';
import { NgForm } from '@angular/forms';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.css']
})
export class NewIngredientComponent implements OnInit {
  ingredient: Ingredient[] = [];

  constructor(private ingredientService: IngredientService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.ingredientService.addIngredient(form.value.name, form.value.carbs, form.value.proteins, form.value.fats, form.value.calories, 1)
      .subscribe(
        (response: Response) => {
          console.log(response['Ingredient']);
          this.ingredient.push(response['Ingredient']);
        },
        (error) => console.log(error),
        () => {
          if(this.route.snapshot.params['id']) {
            this.ingredientService.attachIngredient(this.ingredient, parseInt(this.route.snapshot.params['id']))
              .subscribe(
                (response: Response) => console.log(response['message'])
              );
          }
          alert("Składnik dodany! :)")
        }
      )
    form.resetForm();
  }
}
