import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { shoppingListService } from './Components/shopping-list/services/shoppingList.service';
import { recipeService } from './Components/recipes/services/recipe.service';
import { AuthInterceptService } from './Components/auth/services/auth-interceptor.service';

@NgModule({
    providers: [
        shoppingListService,
        recipeService, 
        {
            provide: HTTP_INTERCEPTORS, 
            useClass: AuthInterceptService, 
            multi: true
        }
    ]
})
export class CoreModule {

}