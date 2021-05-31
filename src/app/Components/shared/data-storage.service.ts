import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators'
import { AuthService } from "../auth/services/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { recipeService } from "../recipes/services/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor( private http: HttpClient , private RecipeService: recipeService, private authService: AuthService){}

    saveRecipes(){
        const recipes = this.RecipeService.getRecipes();
        this.http.put('https://ng-http-98581-default-rtdb.firebaseio.com/recipes.json', recipes )
        .subscribe((resp) => {
            console.log(resp);
        })
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://ng-http-98581-default-rtdb.firebaseio.com/recipes.json')
        .pipe(tap(recipes => this.RecipeService.setRecipes(recipes)));

    }



} 

