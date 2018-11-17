import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.interface';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

}
