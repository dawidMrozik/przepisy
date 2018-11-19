import { Component, OnInit, Output, Input } from '@angular/core';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient.interface';

@Component({
  selector: 'app-new-ingredients',
  templateUrl: './new-ingredients.component.html',
  styleUrls: ['./new-ingredients.component.css']
})
export class NewIngredientsComponent implements OnInit {
  constructor() { }

  ngOnInit() {}
}
