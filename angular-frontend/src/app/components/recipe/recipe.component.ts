import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  @Input() recipe: Recipe;
  userName: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserById(this.recipe.user_id)
      .subscribe(
        (response: Response) => {
          this.userName = response['User']['email']
        }
      )
  }

}
