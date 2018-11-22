import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.interface';
import { NgForm } from '@angular/forms';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CountService } from 'src/app/services/count.service';
import { Count } from 'src/app/models/count.interface';
import { Location } from '@angular/common';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.css']
})
export class NewIngredientComponent implements OnInit {
  ingredient: Ingredient[] = [];
  counts: Count[];
  countsAmounts: number[] = [];
  countsUnits: string[] = [];
  foundCountId: number;

  constructor(
    private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private countService: CountService,
    private recipeService: RecipeService,
    private location: Location) { }

  ngOnInit() {
    this.countService.getCountsUnits()
      .subscribe(
        (response: Response) => {
          this.countsUnits = response['CountsUnits'];
          console.log(this.countsUnits);
        }
        
      )
  }

  onSubmit(form: NgForm) {
    this.countService.findCountId(form.value.unit, form.value.amount)
      .subscribe(
        (response: Response) => {
          this.foundCountId = response['Count'][0]['id']
        },
        (error) => console.log(error),
        () => {
          this.ingredientService.addIngredient(form.value.name, form.value.carbs, form.value.proteins, form.value.fats, form.value.calories, this.foundCountId)
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
                    (response: Response) => console.log(response['message']),
                    (error) => console.log(error),
                    () => {
                      alert("Składnik dodany :)");
                      this.location.back();
                    }
                  );
              }
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
