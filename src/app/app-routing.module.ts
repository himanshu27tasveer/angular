import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";


const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import('./Components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'recipes', loadChildren: () => import('./Components/recipes/recipes.module').then(m => m.RecipesModule) },
    { path: 'shopping-list', loadChildren: () => import('./Components/shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
    { path: '**', redirectTo: '/auth' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}