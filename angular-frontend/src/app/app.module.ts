import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RecipeComponent } from './recipe/recipe.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { routing } from './app.routing';
import { RecipeService } from './recipe.service';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    NewRecipeComponent,
    RecipesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
