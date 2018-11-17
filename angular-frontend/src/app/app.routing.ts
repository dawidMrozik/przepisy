import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from "./recipes/recipes.component";
import { NewRecipeComponent } from "./new-recipe/new-recipe.component";
import { ModuleWithProviders } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { NewCommentComponent } from './new-comment/new-comment.component';

const APP_ROUTES: Routes = [
    { path: '', component: RecipesComponent},
    { path: 'przepisy', component: RecipesComponent},
    { path: 'przepis/nowy', component: NewRecipeComponent},
    { path: 'przepis/:id', component: RecipeDetailComponent},
    { path: 'przepis/komentarz/nowy/:id', component: NewCommentComponent },
    { path: 'rejestracja', component: SignupComponent},
    { path: 'logowanie', component: SigninComponent},
    { path: '**', component: NotFoundComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);