import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from "./recipes/recipes.component";
import { NewRecipeComponent } from "./new-recipe/new-recipe.component";
import { ModuleWithProviders } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

const APP_ROUTES: Routes = [
    { path: '', component: RecipesComponent},
    { path: 'nowy-przepis', component: NewRecipeComponent},
    { path: 'rejestracja', component: SignupComponent},
    { path: 'logowanie', component: SigninComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);