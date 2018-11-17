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
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthService } from './auth.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';
import { CommentService } from './comment.service';
import { NewCommentComponent } from './new-comment/new-comment.component';

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
    NewCommentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [RecipeService, AuthService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
