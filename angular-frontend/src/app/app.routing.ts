import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from "./recipes/recipes.component";
import { NewRecipeComponent } from "./new-recipe/new-recipe.component";
import { ModuleWithProviders } from '@angular/core';

const APP_ROUTES: Routes = [
    { path: '', component: RecipesComponent},
    { path: 'nowy-przepis', component: NewRecipeComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);