import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { routing } from './app.routing';
import { RecipeService } from './services/recipe.service';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthService } from './services/auth.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentService } from './services/comment.service';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { IngredientService } from './services/ingredient.service';
import { NewIngredientsComponent } from './components/new-ingredients/new-ingredients.component';
import { NewIngredientComponent } from './components/new-ingredient/new-ingredient.component';
import { CountService } from './services/count.service';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    NewRecipeComponent,
    RecipesComponent,
    SignupComponent,
    SigninComponent,
    NotFoundComponent,
    RecipeDetailComponent,
    CommentsComponent,
    CommentComponent,
    NewCommentComponent,
    IngredientsComponent,
    IngredientComponent,
    NewIngredientsComponent,
    NewIngredientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
  ],
  providers: [RecipeService, AuthService, CommentService, IngredientService, CountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
